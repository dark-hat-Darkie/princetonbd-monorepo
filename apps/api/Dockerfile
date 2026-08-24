# syntax=docker/dockerfile:1
#
# Multi-stage image for the NestJS API. Built from the REPOSITORY ROOT:
#   docker build -f apps/api/Dockerfile -t princetonbd-api .
#
# The `turbo prune` stage is what makes the layer cache useful in a monorepo:
# it emits a reduced lockfile and only the package.json files @repo/api
# actually depends on, so an unrelated change in apps/web does not invalidate
# the (slow) dependency-install layer.

FROM node:24-alpine AS base
# libc6-compat backs the glibc-linked native binaries some tooling ships.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Materialise pnpm here rather than letting Corepack fetch it lazily the first
# time `corepack pnpm` runs in a later stage. Two reasons: the download happens
# once instead of per stage, and if a builder's network cannot reach the
# registry it fails here with a clear message rather than surfacing as a
# missing binary halfway through an install.
#
# The root package.json is copied in first so `corepack prepare --activate`
# reads the version from its `packageManager` field — pinning it a second time
# in this file would be a version to forget to update.
COPY package.json ./
RUN corepack enable && corepack prepare --activate && pnpm --version

# ---------------------------------------------------------------------------
# 1. Prune the workspace down to @repo/api and its dependencies.
# ---------------------------------------------------------------------------
FROM base AS pruner
COPY . .
RUN pnpm dlx turbo@2.10.11 prune @repo/api --docker

# ---------------------------------------------------------------------------
# 2. Install dependencies. Only out/json is copied first, so this layer is
#    reused whenever the manifests are unchanged.
# ---------------------------------------------------------------------------
FROM base AS installer
COPY --from=pruner /app/out/json/ .
# Deliberately no BuildKit cache mount. Railway's builder rejects a cache `id`
# that is not prefixed with its own service-scoped key
# (`id=s/<service-id>-<path>`), and hardcoding that would tie this Dockerfile to
# one platform while breaking `docker build` locally and in CI. The layer above
# is keyed on the pruned manifests, so a dependency install only reruns when
# dependencies actually change — which is most of what the mount was buying.
RUN pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------
# 3. Build.
# ---------------------------------------------------------------------------
FROM installer AS builder
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo run build --filter=@repo/api

# `pnpm deploy` resolves workspace: links into a single self-contained tree
# holding only production dependencies — no dev toolchain, no source.
RUN pnpm --filter=@repo/api deploy --prod --legacy /prod/api

# ---------------------------------------------------------------------------
# 4. Runtime.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS runner
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Never run the server as root.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 --ingroup nodejs nestjs

COPY --from=builder --chown=nestjs:nodejs /prod/api ./

USER nestjs

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

# Matches the platform health probe; /health is public and pings the database.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3001/health || exit 1

CMD ["node", "dist/main.js"]
