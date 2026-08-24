import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* `output: 'standalone'` is deliberately NOT set. It emits a self-contained
     server bundle for a container runtime, which this app no longer has a
     consumer for — the API is the Dockerised half, the web app deploys to
     Vercel, and Vercel builds its own output format. Setting both is at best
     redundant work on every build. Restore it if web ever ships in an image.

     File tracing still starts at the repo root: in a monorepo the trace has to
     reach hoisted dependencies in the root node_modules, and that is true for
     Vercel's output too. */
  outputFileTracingRoot: new URL('../../', import.meta.url).pathname,

  /* Next 16 removed `next lint` and the `eslint` config key with it; linting
     is a separate turbo task over the whole workspace. */
  typedRoutes: true,
};

export default nextConfig;
