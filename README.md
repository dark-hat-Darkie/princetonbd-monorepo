# princetonbd-monorepo

Turborepo monorepo containing a **Next.js 16** web app and a **NestJS 11** API
sharing a **Neon Postgres** database, with **WorkOS AuthKit** for
authentication. TypeScript throughout, pnpm workspaces.

```
apps/
  web/                Next.js 16 · App Router · Tailwind 4 · AuthKit
  api/                NestJS 11 · Drizzle · Swagger · WorkOS JWKS verification
packages/
  db/                 Drizzle schema, pg client factory, SQL migrations
  api-client/         Typed client generated from the API's OpenAPI document
  env/                Zod-validated environment, separate api/web entry points
  eslint-config/      Shared flat configs (base / nest / next)
  typescript-config/  Shared tsconfigs (base / nest / nextjs / react-library)
```

## Prerequisites

| Tool   | Version    | Notes                                                   |
| ------ | ---------- | ------------------------------------------------------- |
| Node   | **24 LTS** | `.nvmrc` pins it. Node 20 went EOL on 2026-04-30.       |
| pnpm   | 11.22.0    | Provided by corepack via the `packageManager` field.    |
| Docker | any recent | Only for the local Postgres and building the API image. |

```bash
nvm use            # picks up .nvmrc
corepack enable
```

## Quick start

```bash
pnpm install
cp .env.example .env          # then fill in the WorkOS values
docker compose up -d          # local Postgres on :55432
pnpm db:migrate               # apply migrations
pnpm dev                      # web on :3000, api on :3001
```

Useful URLs: web http://localhost:3000 · API http://localhost:3001 ·
Swagger http://localhost:3001/api/docs · health http://localhost:3001/health

## Commands

All commands run from the repo root and are orchestrated by Turborepo.

| Command                             | What it does                                       |
| ----------------------------------- | -------------------------------------------------- |
| `pnpm dev`                          | Runs every app in watch mode                       |
| `pnpm build`                        | Builds packages then apps, in dependency order     |
| `pnpm lint` / `pnpm lint:fix`       | ESLint across the workspace                        |
| `pnpm typecheck`                    | `tsc --noEmit` per package                         |
| `pnpm test`                         | Vitest — unit plus API e2e against a real Postgres |
| `pnpm format` / `pnpm format:check` | Prettier                                           |
| `pnpm db:generate`                  | Emits a SQL migration from schema changes          |
| `pnpm db:migrate`                   | Applies pending migrations (direct connection)     |
| `pnpm db:studio`                    | Drizzle Studio                                     |
| `pnpm gen:api`                      | Regenerates `@repo/api-client` from the API        |

Scope any of them with `--filter`, e.g. `pnpm dev --filter=@repo/api`.

## Things that will bite you if you don't know them

These are the non-obvious constraints this setup is built around. Each one cost
real debugging time; they are documented inline at the relevant file too.

### TypeScript is pinned to 6.0.3, not 7.x

TypeScript 7 is the Go-native port and is `latest` on npm, but it **ships
without a programmatic compiler API** (deferred to 7.1). `nest build` calls
`ts.createProgram()`/`program.emit()` directly, so it simply does not run. Also
blocked: the `@nestjs/swagger` CLI plugin, ts-jest, ts-loader, and type-aware
ESLint — `typescript-eslint@8` peer-requires `typescript >=4.8.4 <6.1.0`.

A pnpm `overrides` entry collapses the whole tree to one compiler, because
`@nestjs/cli@11` carries `typescript: 5.9.3` as a direct dependency and would
otherwise build with a different version than `tsc --noEmit` checks with.
Revisit when 7.1 lands.

### ESLint is pinned to 9.x, not 10.x

`eslint-config-next` pulls in `eslint-plugin-react`, `-jsx-a11y` and `-import`.
None support ESLint 10 — they still call `context.getFilename()`, which ESLint
10 removed, and the failure is a hard crash inside rule loading rather than a
warning. Same shape of constraint as the TypeScript pin: the plugin ecosystem
is the ceiling.

### `incremental` must stay `false` in `apps/api/tsconfig.build.json`

nest-cli prefers `ts.createIncrementalProgram()`. On TypeScript 6 that reports
a successful emit with zero diagnostics while writing **no files** — `nest
build` exits 0 and leaves `dist/` empty. Upstream:
[nest-cli#3312](https://github.com/nestjs/nest-cli/issues/3312) (open).

### Anything that constructs Nest providers must run through tsc or SWC — never tsx/esbuild

esbuild transpiles file-by-file with no type information, so it cannot emit
`emitDecoratorMetadata`. Without `design:paramtypes`, every constructor
injection resolves to `undefined` and you get a misleading
`Nest can't resolve dependencies of X (?, ...)`.

Consequences: `src/openapi/generate.ts` lives under `src/` so `nest build`
compiles it, and is run as `node dist/openapi/generate.js`; and
`apps/api/vitest.config.mts` swaps esbuild for SWC via `unplugin-swc`.

For the same reason `verbatimModuleSyntax` is forced `false` in
`@repo/typescript-config/nest.json`.

### Neon needs two connection strings and they are not interchangeable

| Variable                | Host                                             | Used by             |
| ----------------------- | ------------------------------------------------ | ------------------- |
| `DATABASE_URL`          | the `-pooler` host (PgBouncer, transaction mode) | all runtime queries |
| `DATABASE_URL_UNPOOLED` | the direct host                                  | migrations only     |

Migrations use session-level operations PgBouncer cannot proxy. `@repo/env`
validates this and refuses to start if the two are swapped, because the failure
mode otherwise is intermittent and hard to trace.

The API uses plain `pg` over TCP, **not** `@neondatabase/serverless` — it is a
long-lived process that can hold a real pool. The serverless driver exists for
edge runtimes that cannot open TCP sockets.

### Internal packages are compiled, not just-in-time

`apps/api` is compiled by `tsc`, which will not transpile TypeScript found in
`node_modules`. Every package in `packages/` therefore has a `build` script and
exports `dist/` JavaScript, with `types` pointing at source for IDE
navigation. Turborepo orders the builds; do not add TypeScript project
references on top.

### `packages/api-client/src/generated` is committed

Vercel builds `apps/web` and its dependency graph only. Generating the client
during the build would drag `apps/api` — and a full Nest bootstrap — into every
web deploy. It is committed instead, and CI regenerates and fails on a
non-empty `git diff`, so a stale client breaks the build rather than shipping.

After changing any controller or DTO: `pnpm gen:api`, then commit the result.

## Authentication flow

```
browser ──▶ apps/web  /sign-in ──▶ AuthKit hosted UI
                 ▲                       │
                 └──── /auth/callback ◀──┘   session cookie (sealed)
                          │
              withAuth() ──▶ accessToken (JWT)
                          │
                          ▼   Authorization: Bearer <token>
                     apps/api  WorkosAuthGuard
                          │
                 jose · createRemoteJWKSet(WorkOS JWKS)
                          │
                 upsert users row by workos_id (Drizzle)
```

`apps/web` runs the login flow; `apps/api` is a pure resource server that only
verifies tokens. WorkOS stays the identity provider while the local `users`
table owns application data. The guard is registered globally, so a new
controller is protected unless it opts out with `@Public()`.

Next.js 16 renamed `middleware.ts` to `proxy.ts`; AuthKit exports
`authkitProxy` for it. The matcher in `src/proxy.ts` is explicit on purpose — a
catch-all also intercepts static assets and breaks Tailwind v4 styles.

## Deployment

**`apps/web` → Vercel.** Root directory `apps/web`. Set the Ignored Build Step
to `npx turbo-ignore` so untouched web deploys are skipped.

**`apps/api` → Railway / Render**, from `apps/api/Dockerfile` built at the
repository root:

```bash
docker build -f apps/api/Dockerfile -t princetonbd-api .
```

Multi-stage with `turbo prune --docker`, so an unrelated change in `apps/web`
does not invalidate the dependency-install layer. Runs as a non-root user and
ships only `dist/` plus production dependencies. Health probe: `GET /health`.

**Migrations** run from CI on `main` (see `.github/workflows/ci.yml`), never at
application boot — multiple replicas starting at once would race, and a failed
migration should fail a deploy step rather than crash-loop the service.
