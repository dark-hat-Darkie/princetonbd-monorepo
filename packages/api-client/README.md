# @repo/api-client

Typed client for the NestJS API, generated from `apps/api/openapi.json` by
[`@hey-api/openapi-ts`](https://heyapi.dev).

## `src/generated/` is committed on purpose

Vercel builds `apps/web` and its dependency graph only. If this client were
generated during the build, every web deploy would have to build `apps/api` and
boot Nest just to produce the document. Committing the output keeps web builds
fast, hermetic, and independent of the API's own toolchain.

CI regenerates and runs `git diff --exit-code`, so a stale client fails the
build rather than shipping.

## Regenerating

```bash
pnpm gen:api      # from the repo root: rebuilds the API, re-emits openapi.json,
                  # regenerates this package, then rebuilds it
```

Never hand-edit anything under `src/generated/` — change the NestJS DTO or
controller decorators instead and regenerate.
