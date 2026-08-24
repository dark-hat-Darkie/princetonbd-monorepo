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
RUN corepack enable
# libc6-compat backs the glibc-linked native binaries some tooling ships.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---------------------------------------------------------------------------
# 1. Prune the workspace down to @repo/api and its dependencies.
# ---------------------------------------------------------------------------
FROM base AS pruner
COPY . .
RUN corepack pnpm dlx turbo@2.10.11 prune @repo/api --docker

# ---------------------------------------------------------------------------
# 2. Install dependencies. Only out/json is copied first, so this layer is
#    reused whenever the manifests are unchanged.
# ---------------------------------------------------------------------------
FROM base AS installer
COPY --from=pruner /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    corepack pnpm install --frozen-lockfile --store-dir=/pnpm/store

# ---------------------------------------------------------------------------
# 3. Build.
# ---------------------------------------------------------------------------
FROM installer AS builder
COPY --from=pruner /app/out/full/ .
RUN corepack pnpm turbo run build --filter=@repo/api

# `pnpm deploy` resolves workspace: links into a single self-contained tree
# holding only production dependencies — no dev toolchain, no source.
RUN corepack pnpm --filter=@repo/api deploy --prod --legacy /prod/api

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
