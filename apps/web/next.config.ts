import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Emits a self-contained server bundle with only the file-traced
     dependencies. Vercel does not need it, but it keeps the Docker option open
     at no cost — see the plan's deployment section. */
  output: 'standalone',

  /* In a monorepo, file tracing must start at the repo root or the standalone
     output misses hoisted dependencies in the root node_modules. */
  outputFileTracingRoot: new URL('../../', import.meta.url).pathname,

  /* Next 16 removed `next lint` and the `eslint` config key with it; linting
     is a separate turbo task over the whole workspace. */
  typedRoutes: true,
};

export default nextConfig;
