## Goal

Add a full end-to-end enrollment flow to our platform: every Enrol button leads to a details form (name, date of birth, education, address, course/batch context), then to payment through the Centralized Payment System (SSLCommerz), then to a verified enrollment. Admins get a transactions list plus a full transaction detail view with re-sync.

## Success Criteria

- Every Enrol CTA on the marketing site lands on the new enrollment flow with validated course/batch context; the old enquiry-only path is preserved for non-payment enquiries.
- No enrollment is granted on browser redirect alone: enrollment becomes active only after our backend confirms `payment_status === "success"` via the provider status API.
- Amount charged always comes from our DB (course `priceAmount` / batch `feeAmount`), never from client input.
- Duplicate callbacks, refreshes, and retries cannot double-enroll or double-charge state.
- Admin can list, filter, inspect, and re-sync every transaction and see the linked enrollment and student details.
- Provider Bearer token never reaches the browser, logs, or git; PII fields are stored deliberately with access control.

## Context And Current Facts

- Request: use the Centralized Payment System doc (`Centralized_Payment_System_Documentation.pdf`, 14 pages) for payments; token was supplied in chat and must be treated as compromised-by-exposure (rotate; see Risks).
- Provider contract (from the doc): `POST /api/payment-init` creates a `payment_transactions` row and returns `transaction_id` + `payment_url`; `GET /api/payment-init/{reference}` is the source-scoped status check; `GET /api/payment-init/user/{external_user_id}` lists a user's payments. Browser handoff is `GET /api/payment?reference=...` → `POST /api/pay` → SSLCommerz → provider `/api/success|fail|cancel|ipn` (row-locked, gateway-revalidated, idempotent) → redirect to our `success_url`/`cancel_url`. Auth is `Authorization: Bearer <token>` header only. Guards include amount-consistency (±0.01), redirect-host allowlist, `success_method` whitelist, `(source_site, external_reference)` idempotency.
- Our stack: `apps/api` (NestJS 11, global `WorkosAuthGuard` + `RolesGuard`, throttler) in `apps/api/src/app.module.ts`; `apps/web` (Next.js 16 App Router); Drizzle Postgres in `packages/db/src/schema/` (today: users/courses/batches only, no purchases table — see `packages/db/src/schema/index.ts`); env contracts in `packages/env/src/api.ts` and `packages/env/src/web.ts`; generated client in `packages/api-client/src` (must be regenerated after controller changes per repo convention).
- Current enrol surface: course pages (`apps/web/src/components/templates/exam-page.tsx`) send every Enrol through `enrolHref()` (`apps/web/src/lib/batches.ts`) to `/contact?interest=&campus=&batch=`, validated in `apps/web/src/app/(marketing)/contact/page.tsx`. There is no checkout, no enrollment record, no payment code.
- Admin pattern: `/admin` pages use `getAdminClient()` (`apps/web/src/lib/admin/api.ts`, `cache: no-store`) against `@Roles('admin')` endpoints such as `apps/api/src/admin/admin.controller.ts`; overview at `apps/web/src/app/(admin)/admin/page.tsx`.
- Identity: local `users` row upserted on WorkOS `sub` (`apps/api/src/users/users.service.ts`); courses priced in whole taka (`priceAmount`, BDT) in `packages/db/src/schema/courses.ts`; batch overrides in `packages/db/src/schema/batches.ts` (`feeAmount`, classroom/online branch rule).

## Constraints And Non-goals

- Provider Bearer token lives only in API server env/secrets; never in web env, client bundles, logs, or the repo. `.env.example` gets placeholder names only.
- SSLCommerz path only for v1. Provider legacy gateways (PayPal/Stripe/Razorpay/etc., still session-bridged per their §11) are out of scope.
- No refunds, coupons engine, or installment logic in v1 unless the provider confirms support; capture `coupon`/`tax` as pass-through fields only.
- Keep `/contact` enquiry flow working; Enrol CTAs move to the new flow, general enquiries stay.
- No PII beyond the agreed details-form fields; no storage of full gateway card data (provider holds it).

## Key Decisions

1. Backend-orchestrated payments (recommended) over frontend-direct. Only `apps/api` holds the token and calls the provider; the browser only receives `payment_url` and is redirected. Rejected frontend-direct: would leak the token and let clients set amounts/redirects.
2. Require sign-in before the details form (recommended) over guest checkout. `external_user_id` becomes our stable `users.id` (fallback: WorkOS `sub`), so status checks, user-payment lists, and enrollment grants reconcile. Guest-then-claim was rejected: creates orphan provider transactions and support load.
3. Mirror provider state locally (`payment_attempts` + `enrollments`, see Approach) rather than relying on provider as our ledger. Needed for admin pages, idempotent enrollment grants, and operation during provider downtime. Rejected provider-only reads: too slow/fragile for admin and grants.
4. Verification authority is `GET /api/payment-init/{reference}` from our backend only. `success_url` landing, query params, and client claims never grant enrollment. Includes a user-facing "check status / retry" and an admin "re-sync" using the same verifier.
5. Amount authority is our DB: `fee = batch.feeAmount ?? course.priceAmount`, currency fixed `BDT`; request totals are recomputed and any mismatch is a 422 before calling the provider.
6. Idempotency key is our `payment_attempts.id` sent as provider `external_reference`, with a unique constraint on `(enrollment_id)` locally and reliance on provider `(source_site, external_reference)` remotely. Retries resume the same attempt; back-button/double-submit is safe.
7. New `/enroll` route (recommended) over reusing `/contact`. `/enroll?course=&batch=` validates IDs against the API like `contact/page.tsx` does, then shows the details form. `enrolHref` call sites are repointed; `/contact` stays for enquiries.
8. Admin extends existing surfaces: new `admin/payments` list + detail under `(admin)`, backed by new `@Roles('admin')` endpoints, `no-store` fetching, and the shared generated client. No parallel admin auth scheme.

## Recommended Approach

Data model (new migration via `pnpm db:generate`):

- `enrollments`: `id` (uuid, also used as provider `external_reference`), `user_id → users.id`, `course_id`, `batch_id` (nullable), `status` (`draft → pending_payment → active | failed | cancelled | expired`), applicant snapshot fields (full name, dob, phone, education level/institution/year, address lines, city, notes), `created_at/updated_at`. Unique on `(user_id, batch_id)` where batch present, to prevent double enrollment.
- `payment_attempts`: `id` (uuid), `enrollment_id → enrollments.id` (one active attempt per enrollment; history kept), `provider_reference` (`PAY-...`, unique, nullable until created), `amount`, `currency` (`BDT`), `status` (mirror: `pending|processing|success|failed|cancelled|expired`), `success_url/cancel_url` sent, `last_provider_payload` (redacted JSON for audit, never full card data), timestamps including `paid_at`. Unique on `provider_reference`; index on `(enrollment_id, created_at)`.

API (`apps/api`, new `PaymentsModule` + `EnrollmentsModule`):

- `POST /api/v1/enrollments` (auth): validate course/batch (published/open, seats), upsert draft enrollment, compute fee server-side.
- `PUT /api/v1/enrollments/:id/details` (auth, owner-only): validate + store applicant fields with Zod DTOs (past-date DOB with minimum-age rule per policy, phone/address formats, education enums).
- `POST /api/v1/enrollments/:id/payment-init` (auth, owner-only): enforce one active attempt, call provider `POST /api/payment-init` with items from our DB, `custom_field` carrying our enrollment/user IDs, fixed `success_url`/`cancel_url` under registered hosts, `external_reference = attempt.id`; persist `provider_reference`, return `payment_url`.
- `GET /api/v1/enrollments/:id/status` (auth, owner-only): call provider `GET /api/payment-init/{reference}`, update attempt + enrollment under a DB transaction, grant `active` only on verified `success`; safe to poll from the success page.
- `GET /api/v1/admin/payments` + `GET /api/v1/admin/payments/:reference` (`@Roles('admin')`): list with filters (status, course, batch, date, search by ref/student) and pagination; detail joins attempt + enrollment + applicant snapshot + verification timeline; `POST /api/v1/admin/payments/:reference/resync` re-runs the verifier.
- Env: `PAYMENTS_BASE_URL`, `PAYMENTS_API_TOKEN` (secret), `PAYMENTS_SOURCE_SITE`, `PAYMENTS_SUCCESS_URL`, `PAYMENTS_CANCEL_URL`; Zod-validated in `packages/env/src/api.ts`; timeouts (e.g. 10s), single retry on network failure only, never on 4xx; redact token in logs (extend existing pino redact).

Web (`apps/web`):

- New `/enroll` flow: `page.tsx` validates `course`/`batch` against the API (same discipline as contact page); steps Details → Review → Pay (redirect out to `payment_url`) → Return. Return pages (`/enroll/success`, `/enroll/failed`) call our status endpoint server-side and render from verified state, with explicit "payment pending — check again" and retry states.
- Repoint every Enrol CTA (`exam-page.tsx`, batch list, fee card, closing CTA) from `/contact?...` to `/enroll?...`; keep `/contact` for enquiries.
- Admin: `admin/payments/page.tsx` (filters + table) and `admin/payments/[reference]/page.tsx` (status timeline, amount breakdown, applicant details, enrollment link, re-sync button) via `getAdminClient()` + regenerated `@repo/api-client` (`pnpm gen:api`).

Security invariants (enforced in code, not just docs): token server-only; amount recomputed; redirect hosts fixed and allowlisted on both sides; owner-or-admin checks on every enrollment/payment read; throttled init/status endpoints; audit log on status transitions; PII visible only to owner + admin.

## Work Plan

1. Phase 0 — Secrets and contracts: rotate the exposed token; set `PAYMENTS_*` in hosting secrets and local `.env` (untracked); add names + placeholders to `.env.example` and Zod schemas; confirm `source_site`, registered redirect hosts, and test-vs-live provider base URL with the payment team.
2. Phase 1 — Data: add `enrollments` + `payment_attempts` schema, relations, `db:generate` migration, seed-safe rollback (`downgrade` drops new tables only); Drizzle Studio spot-check.
3. Phase 2 — API core: `EnrollmentsModule` (draft + details with Zod DTOs, owner checks, fee computation from course/batch); `PaymentsModule` (provider HTTP client with timeout/redaction, init, verified status, owner list proxy); Swagger + `pnpm gen:api`.
4. Phase 3 — Web enroll flow: `/enroll` validation + details form (server actions or route handlers calling our API with the user's token) + review + redirect-out + verified return pages + pending/retry/expired states; form validation mirrored client/server.
5. Phase 4 — CTA rewiring: repoint all Enrol CTAs to `/enroll`, keep `/contact` intact; update `#enroll` anchors, JSON-LD offer URLs, and `page.test.tsx`-style CTA assertions.
6. Phase 5 — Admin: list + detail + resync endpoints and pages; filters, pagination, timeline, enrollment link; access-denied checks for non-admins.
7. Phase 6 — Hardening and docs: rate limits, audit logging, PII minimization review, `PAYMENT_API.md`-style runbook (rotation, re-sync, reconciliation query), admin user guide.
8. Phase 7 — Rollout: staging against provider test mode end-to-end, then production with one course/batch pilot before all CTAs flip.

Dependencies: 0 → 1 → 2 → (3, 5) → 4 → 6 → 7. Phases 3 and 5 can run in parallel after Phase 2.

## Validation Plan

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (new unit + e2e: fee computation, DTO validation, owner/admin guards, idempotent init, verified-grant-only, duplicate-callback safety with a stubbed provider).
- Contract checks: init rejects tampered amounts (422 before provider call); status poll with stubbed `success` grants once; repeated polls/refreshes stay `active` without side effects; unknown or other-user references 404; non-admin blocked from admin endpoints.
- Manual staging: full pass (enroll → pay in test mode → return → verified active), cancel/fail paths, expired attempt retry, admin re-sync after provider-side settlement, cross-user access attempts, tampered `success_url` query (must not grant).
- Highest-risk check: the "land on success URL without paying" case — direct navigation to `/enroll/success` for an unpaid reference must render unpaid/pending and grant nothing.
- Migration check: `pnpm db:migrate` up/down on a staging clone; `pnpm gen:api` produces no unexpected diff beyond the new endpoints.

## Risks / Rollback

- Exposed token (pasted in chat, and provider repo tracks `.env` in git per their §2.3/§11): rotate before any integration traffic, restrict to server env, confirm old token revoked. If rotation is refused, do not proceed past Phase 0.
- Amount drift (our price edits vs in-flight attempts): lock `amount` on the attempt at init; later price changes affect new attempts only; admin detail shows attempted vs current price.
- Open redirect: fixed host allowlist on both sides; any unlisted host falls back to home — add a test for it.
- Double enrollment on race: unique constraints + single-grant transaction; resync is idempotent.
- Provider downtime: pending states with safe retry; admin re-sync queue; never mark failed on timeout alone.
- PII: DOB/address/education visible only to owner + admin; no export endpoint in v1; confirm retention policy with the business.
- Rollback: feature-flag the `/enroll` CTAs (flag off restores `/contact` links); new tables are additive so rollback is a flag flip + optional migration downgrade; in-flight provider transactions are reconciled via re-sync before downgrade.

## Open Questions

1. Final details-form field list: which of name, DOB, phone, education level/institution/year, address lines, city, guardian info are required vs optional, and is there a minimum age rule?
2. Account policy: is sign-in-before-enroll acceptable, or must guests pay and claim later (rejected default above)?
3. Provider registration: which production hosts should be allowlisted for `success_url`/`cancel_url`, and are we cleared for test mode first?
4. Money rules: any coupons, discounts, or batch-specific fees beyond `feeAmount ?? priceAmount` for v1, and what is the refund path for mistaken payments?
5. Admin scope: which roles beyond `admin` (if any) may view PII or press re-sync, and should students see a receipt/history page too?
