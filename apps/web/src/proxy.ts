import { authkitProxy } from '@workos-inc/authkit-nextjs';

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts`; AuthKit exports
 * `authkitProxy` for it (`authkitMiddleware` is the deprecated alias).
 *
 * `middlewareAuth` puts the redirect-if-signed-out decision here rather than in
 * page components. That is not a style preference: session refresh writes the
 * session cookie, and Next.js only permits cookie writes from Server Actions,
 * Route Handlers and proxies. Calling `withAuth({ ensureSignedIn: true })`
 * inside a Server Component therefore throws
 * "Cookies can only be modified in a Server Action or Route Handler".
 *
 * With this enabled, pages call plain `withAuth()` and can trust that anything
 * the matcher covers already has a session.
 */
export default authkitProxy({
  /* Every path the matcher covers requires a session, so no exemptions are
     needed — `/` is no longer matched at all. */
  middlewareAuth: { enabled: true, unauthenticatedPaths: [] },
});

/**
 * Explicit matcher, never a catch-all: a catch-all also intercepts
 * `/_next/static/*`, fonts and images, which breaks Tailwind v4 stylesheets in
 * a way that presents as a CSS bug rather than a routing one.
 *
 * `/` is deliberately absent. Running the proxy over a route makes it
 * dynamically rendered, and the landing page needs to stay static — so its
 * header links to /sign-in rather than reflecting live session state.
 */
export const config = {
  matcher: ['/dashboard/:path*', '/auth/callback'],
};
