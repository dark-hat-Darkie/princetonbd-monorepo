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
  /* Gating is OFF here on purpose. With `enabled: true` an anonymous visit to
     a matched route redirects to the WorkOS *hosted* login — the one this
     site no longer uses. The proxy still runs everywhere the matcher covers
     (session refresh, the `x-url` header, the `withAuth()` green light); the
     actual "you must sign in" decision lives one layer down, in the (app) and
     (admin) layouts and the enroll page/action, which redirect to OUR
     `/sign-in` with the return path preserved. */
  middlewareAuth: { enabled: false, unauthenticatedPaths: [] },
});

/**
 * Explicit matcher, never a catch-all: a catch-all also intercepts
 * `/_next/static/*`, fonts and images, which breaks Tailwind v4 stylesheets in
 * a way that presents as a CSS bug rather than a routing one.
 *
 * `/` is deliberately absent. Running the proxy over a route makes it
 * dynamically rendered, and the landing page needs to stay static — so its
 * header ships the logged-out link and the auth slot upgrades it client-side
 * once /auth/session answers.
 *
 * The public auth pages (`/sign-in`, `/sign-up`, `/verify-email`,
 * `/forgot-password`, `/reset-password`) ARE matched, exempted from gating
 * via `unauthenticatedPaths` above: their pages call `withAuth()` to bounce
 * already-signed-in visitors, which throws on routes the proxy skips.
 */
export const config = {
  /* `/enroll` calls `withAuth()` in its pages and its checkout action, so the
     proxy must run there: without its header `withAuth` throws
     "isn't covered by the AuthKit middleware". Gating is a bonus — checkout
     requires a session anyway — and the sign-in return path keeps the full
     URL, so `?course=`/`?batch=` survive the round trip. */
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/enroll/:path*',
    '/auth/callback',
    '/auth/session',
    '/sign-in',
    '/sign-up',
    '/verify-email',
    '/forgot-password',
    '/reset-password',
  ],
};
