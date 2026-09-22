import type { NextConfig } from 'next';

/**
 * Admin-uploaded images (course thumbnails, teacher photos) are served from
 * the bucket's public URL, and `next/image` refuses any remote host it has
 * not been told about. The host comes from the same variable the app reads
 * at runtime, so the two cannot drift. Left unset, no remote host is allowed
 * and the site still builds — the pages then show monograms instead.
 */
function mediaRemotePattern(url: string | undefined) {
  if (!url) return undefined;
  const parsed = new URL(url);
  return {
    protocol: parsed.protocol === 'https:' ? ('https' as const) : ('http' as const),
    hostname: parsed.hostname,
    ...(parsed.port ? { port: parsed.port } : {}),
    pathname: `${parsed.pathname.replace(/\/+$/, '')}/**`,
  };
}

const mediaPattern = mediaRemotePattern(process.env.NEXT_PUBLIC_MEDIA_URL);

const nextConfig: NextConfig = {
  ...(mediaPattern ? { images: { remotePatterns: [mediaPattern] } } : {}),

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
