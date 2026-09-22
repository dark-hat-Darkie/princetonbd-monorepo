## Goal

Fix the logged-in header state, harden auth-route protection, and replace the WorkOS hosted login/signup redirect with our own fully functional auth pages that match the site's look and feel — with all WorkOS calls made server-side.

## Success Criteria

- A signed-in visitor never sees a "Log in" link anywhere on the site (desktop header, mobile drawer, marketing pages, portal); a signed-out visitor always sees it.
- Every auth-protected route (`/dashboard/*`, `/admin/*`, `/enroll/*`) is unreachable without a session, redirects to our sign-in with a safe return path, and lands back where the user started after signing in.
- `/sign-in` and `/sign-up` are our own pages (no WorkOS hosted UI in the flow). Sign-in, sign-up + email verification, forgot/reset password, and sign-out all work end to end against WorkOS from server-side code only.
- Auth pages reuse the existing design tokens and components (they look like the rest of the site, including mobile and error states).
- `pnpm typecheck`, `pnpm lint`, and the web test suite pass; the proxy-matcher invariant test stays green.

## Context And Current Facts

- `apps/web/src/components/site/site-header.tsx` is a static Server Component with a hardcoded `Log in → /sign-in` link. The root layout (`apps/web/src/app/layout.tsx`) deliberately avoids `withAuth()` so marketing pages stay static — that is why the header cannot reflect session state today. The mobile drawer (`mobile-nav.tsx`, already a client component) has the same hardcoded link in its footer.
- `apps/web/src/app/sign-in/route.ts` is a route handler that `redirect(await getSignInUrl())` — the entire login UX is the WorkOS hosted page. No sign-up page exists (`getSignUpUrl` is unused).
- Session enforcement lives in `apps/web/src/proxy.ts` (`authkitProxy` with `middlewareAuth: { enabled: true }`, matcher: `/dashboard/*`, `/admin/*`, `/enroll/*`, `/auth/callback`). Role separation lives in the `(app)` and `(admin)` layouts (admin → `/admin`, non-admin → `/dashboard`). The NestJS API is guarded globally (`WorkosAuthGuard` + `RolesGuard` in `apps/api/src/auth/`) and needs no changes.
- `proxy.test.ts` enforces an invariant: every `await withAuth(` caller under `src/app` must resolve to a matcher-covered route. Any new route that reads the session must keep this green.
- AuthKit 4.3.1 exports `saveSession`, `getWorkOS`, `withAuth`, `signOut`, `handleAuth`. Installed `@workos-inc/node@10.10.0` types confirm `createUser`, `authenticateWithPassword`, `authenticateWithEmailVerification`, `sendVerificationEmail`, `verifyEmail`, `createPasswordReset`, `resetPassword`.
- Headless pattern is documented by WorkOS: authenticate server-side with the Node SDK, then `saveSession({ accessToken, refreshToken, user, impersonator }, req)` to set the AuthKit cookie; `authenticateWithPassword` returns exactly those fields; unverified email surfaces as an `email_verification_required` error carrying a pending token, completed via `authenticateWithEmailVerification({ clientId, code, pendingAuthenticationToken })`.
- Design vocabulary to reuse: `Container`, `CtaButton`, `Eyebrow`, the enroll checkout card (`rounded-lg border border-line bg-surface shadow-card`), feedback colors (`--color-danger` / `danger-soft`), focus ring (`brand`), display font (Bricolage) + body (Hanken).
- No new env vars are needed: `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`, `WORKOS_COOKIE_PASSWORD` (validated in `packages/env/src/web.ts`) already power both AuthKit and `getWorkOS()`.

## Constraints And Non-goals

- Marketing pages stay statically renderable; no `withAuth()` in the root or marketing layouts.
- The NestJS API is untouched (guards already correct). No session-lifetime, cookie-name, or env changes.
- Non-goals for this slice: social/OAuth buttons, MFA/TOTP UI, SSO/organizations, changing the sign-out destination behavior (the WorkOS `return_to` caveat documented in `sign-out.ts` stands).

## Key Decisions

1. **Header state via a client-side session island, not a dynamic layout.** A tiny client component (`AuthSlot`) in the header and drawer fetches `GET /auth/session` (no-store) and swaps `Log in` → `Dashboard` + account menu. SSR default is logged-out (correct for crawlers/first paint), then upgrades. *Rejected: calling `withAuth()` in the marketing layout* — it would force the whole brochure subtree dynamic, hurting TTFB/caching, against the documented intent in `app/layout.tsx`.
2. **Custom email+password pages backed by Next.js server-side WorkOS calls.** Server Actions/route handlers use `getWorkOS().userManagement.*` + `saveSession`. The browser never talks to WorkOS; passwords never leave the server action. *Rejected: keeping `getSignInUrl` hosted flow* (explicit user requirement) and *rejected: proxying auth through the NestJS API* (the AuthKit session cookie can only be sealed/set by the Next.js app holding `WORKOS_COOKIE_PASSWORD`).
3. **Pending verification token lives in a short-lived httpOnly cookie, never in the URL.** Mirrors the existing `enroll_pending` cookie pattern in `lib/enroll/actions.ts`. Same-origin `next` param validated as a root-relative path (no `//`, no scheme) to block open redirects; `?course=&batch=` return trips are preserved through it.
4. **Keep `/auth/callback` (`handleAuth`) intact.** Zero-cost fallback for in-flight hosted sessions and old bookmarks; WorkOS dashboard Redirect URI config stays valid. Removal is a later cleanup, not this slice.
5. **Signed-in visitors hitting `/sign-in` or `/sign-up` are redirected to `next` (default `/dashboard`)**, which then role-routes admins to `/admin` via the existing `(app)` layout. No duplicate role logic in auth pages.
6. **Auth errors are generic by default** ("Invalid email or password", "If an account exists…") with per-case friendly copy only where it cannot enumerate users; WorkOS internals stay in server logs. Rate-limit/‎lockout errors surface as "too many attempts, try later".

## Recommended Approach

Five ordered slices, each independently shippable behind no flags (new pages are additive until the `/sign-in` route is replaced):

1. Session island + status route (fixes the header bug on its own).
2. `/sign-in` page + server action (replaces `sign-in/route.ts`).
3. `/sign-up` + `/verify-email` pages + actions.
4. `/forgot-password` + `/reset-password` pages + actions.
5. Protection audit: proxy matcher for the new public routes, explicit layout gating, role-redirect polish, dashboard-config checklist.

Implementation correction (verified against AuthKit 4.3.1 source during build):
proxy `middlewareAuth.enabled` is now `false`. With it enabled, anonymous
visits to gated routes redirect to the WorkOS *hosted* login — the SDK offers
no custom-login-URL override — which would defeat the whole slice. The proxy
still runs everywhere matched (session refresh, `x-url` forwarding, the
`withAuth()` green light); gating moved one layer down into the `(app)` and
`(admin)` layouts plus the enroll page/action, which redirect to our
`/sign-in` with the return path (`lib/auth/current-path.ts` reads the
proxy-forwarded `x-url` header; `signInHref()` builds the target).

Auth UI shape (all pages): centered narrow card on the `subtle` band — `Eyebrow` + Bricolage headline + `rounded-lg border bg-surface shadow-card` form card with labeled inputs, `danger-soft` error region with `role="alert"`, full-width `CtaButton` submit with pending state, `brand-ink` secondary links (sign-up ↔ sign-in, forgot password). Server Actions validate with zod, return field errors, and `redirect()` only on success.

## Work Plan

### 1. Session-aware header

- New public route `GET /auth/session` returning `{ signedIn, firstName, email }` (or signed-out shape), `Cache-Control: no-store`. Add `/auth/session` to the proxy matcher **and** to `middlewareAuth.unauthenticatedPaths` so the proxy still refreshes sessions there without gating it (keeps `proxy.test.ts` green).
- New client component `AuthSlot` (loading skeleton → Log in link | Dashboard link + name + sign-out form reusing `signOutAction`). Mount in `SiteHeader` (desktop slot) and in the `MobileNav` drawer footer (replacing the hardcoded link). Both keep SSR logged-out default.
- Tests: unit test for the `next`-path validator (shared helper) and for the status-route shape; update `proxy.test.ts` only if the matcher-parsing needs the new entry (it parses source, so no change expected).

### 2. Sign-in page

- Delete `app/sign-in/route.ts`; add `app/(marketing)/sign-in/page.tsx` (metadata `robots: noindex`) with email+password form posting to `signInAction` (`lib/auth/actions.ts`): zod-validate → `authenticateWithPassword({ clientId, email, password })` → `saveSession({ accessToken, refreshToken, user, impersonator }, url)` → redirect to validated `next` (default `/dashboard`).
- Map `email_verification_required` → park pending token in httpOnly 10-min cookie → redirect `/verify-email?next=…`; invalid credentials → generic form error; rate-limit errors → "try later" copy.
- If `withAuth()` already has a user, redirect away (no form for signed-in users).
- Update all existing `/sign-in` links (header, drawer, enroll prompt, auth error page, dashboard/settings redirects) to carry `?next=<current path>` where a return trip matters (enroll checkout).

### 3. Sign-up + email verification

- `app/(marketing)/sign-up/page.tsx`: first/last name + email + password (min-length + strength hint copy, no custom meter in v1) → `signUpAction`: `createUser({ email, password, firstName, lastName })` then `authenticateWithPassword`; unverified → pending-token cookie → `/verify-email`.
- `app/(marketing)/verify-email/page.tsx`: 6-digit code form (inputmode numeric, autocomplete one-time-code) → `verifyEmailAction`: `authenticateWithEmailVerification({ clientId, code, pendingAuthenticationToken })` → `saveSession` → redirect `next`. Include "resend code" via `sendVerificationEmail`, and expired/invalid-code copy with retry.
- Handle `createUser` conflict (existing email) with "Try signing in instead" link — acceptable minimal disclosure, standard practice.

### 4. Password reset

- `app/(marketing)/forgot-password/page.tsx` → `createPasswordReset({ email })`; always render the same success panel (no enumeration). `app/(marketing)/reset-password/page.tsx` reads `?token=` → new-password form → `resetPassword({ token, newPassword })` → redirect `/sign-in` with a "password updated" notice (query flag, rendered once, no token leakage).
- Confirm exact `createPasswordReset`/`resetPassword` signatures against installed SDK types during implementation (names verified; parameter shapes to be pinned by `typecheck`).

### 5. Protection + config audit

- Verify final proxy matcher covers all session-reading routes; run the full `proxy.test.ts` invariant. Confirm `/sign-in`, `/sign-up`, `/verify-email`, `/forgot-password`, `/reset-password`, `/auth/session` are public and everything else protected behaves (spot-check `/dashboard`, `/admin` as student/admin/anonymous, `/enroll?course=&batch=` return trip).
- WorkOS dashboard checklist (no code): AuthKit password authentication enabled; email-verification and password-reset emails enabled with links pointing at our `/verify-email` and `/reset-password`; Sign-in URL still `/sign-in`; Redirect URI unchanged; App Homepage URL set (existing sign-out caveat).
- Update `.env.example` comments only if dashboard settings need documenting; no new variables.

## Validation Plan

- `pnpm --filter @repo/web typecheck && pnpm --filter @repo/web lint && pnpm --filter @repo/web test` (covers `proxy.test.ts`, new validator/error-map tests). Highest-risk gate: `proxy.test.ts` + manual redirect matrix, because a matcher mistake locks users out or leaks pages.
- Manual E2E against dev with real WorkOS test env: sign-up → code → dashboard shows name; sign-out → header flips to Log in; sign-in wrong password → generic error; anonymous `/dashboard`, `/admin`, `/enroll?course=X` → our sign-in → back to origin after login; signed-in `/sign-in` → dashboard; admin login → `/admin`; student `/admin` → `/dashboard`; reset flow → sign-in notice; `/auth/callback` still loads (no crash).
- Check header on a cold marketing page load (signed in): Log in must be replaced without layout shift beyond the slot; confirm no `withAuth` in marketing/root layouts (`grep -rn withAuth apps/web/src/app/layout.tsx 'apps/web/src/app/(marketing)/layout.tsx'` empty).

## Risks / Rollback

- **WorkOS dashboard methods not enabled** (password auth, verification/reset emails) → pages fail at runtime with API errors. Mitigation: dashboard checklist in slice 5 runs before sign-off; error mapping degrades to a "contact us" panel, never a stack trace.
- **SDK error-shape drift** (v10 types vs. runtime error codes for `email_verification_required`, breached-password, rate limits). Mitigation: match on both `code` and message-substring with a safe generic fallback; pin behavior with unit tests over captured shapes.
- **In-flight hosted logins during deploy** → kept `/auth/callback` absorbs them.
- **Rollback**: each slice is additive except the `sign-in/route.ts` → page swap; restoring the route file restores hosted login instantly. Pending-token and session cookies are short-lived and version-independent.

## Open Questions

1. WorkOS dashboard: are password authentication, required email verification, and the verification/reset email templates currently enabled — and should verification stay required before first dashboard access, or auto-sign-in immediately after sign-up?
2. Should the custom pages also offer social sign-in (e.g. Google) via provider-specific WorkOS calls, or is email+password the complete v1 scope?

## Sources

- https://workos.com/docs/sdks/authkit-nextjs
- https://workos.com/docs/reference/authkit/authentication/password
