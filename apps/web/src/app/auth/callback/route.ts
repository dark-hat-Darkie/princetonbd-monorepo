import { CallbackError, handleAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

/**
 * AuthKit redirects here after a successful sign-in. Must match
 * NEXT_PUBLIC_WORKOS_REDIRECT_URI and the Redirect URI configured in the
 * WorkOS dashboard.
 *
 * `onError` replaces AuthKit's default, which renders a raw JSON body carrying
 * the same "Something went wrong" text for every distinct failure — a dead end
 * both for the person signing in and for whoever has to debug it.
 */

/**
 * AuthKit raises a typed `CallbackError` for the failures it checks itself, but
 * everything after that — unsealing the state cookie and exchanging the code
 * with WorkOS — arrives as a bare `Error`. Those are three different problems
 * with three different fixes, so they are separated here rather than all being
 * reported as a failed exchange:
 *
 * - `session_expired`   the sealed state carries a 10-minute TTL and it lapsed,
 *                       which is what happens when a consent screen is left
 *                       sitting. By far the most common real cause.
 * - `session_unverified` the seal would not verify — almost always
 *                       WORKOS_COOKIE_PASSWORD changing between the redirect
 *                       out and the redirect back.
 * - `exchange_failed`   WorkOS rejected the code itself.
 *
 * Matched on message text because iron-session throws plain `Error`s with no
 * code to switch on. If a future version reworks the wording the classifier
 * degrades to `exchange_failed`, which is the safe direction to fail.
 */
const SEAL_EXPIRED = 'Expired seal';
const SEAL_INVALID = ['Bad hmac value', 'Cannot find password', 'Incorrect number of sealed'];

function classify(error: unknown): string {
  if (error instanceof CallbackError) return error.code;

  const message = error instanceof Error ? error.message : String(error);
  if (message.includes(SEAL_EXPIRED)) return 'session_expired';
  if (SEAL_INVALID.some((needle) => message.includes(needle))) return 'session_unverified';
  return 'exchange_failed';
}

export const GET = handleAuth({
  returnPathname: '/dashboard',

  onError({ error, request }) {
    const reason = classify(error);
    const message = error instanceof Error ? error.message : String(error);

    /* One structured line so the cause is greppable. The error is included
       whole: it is server-side only, and for an exchange failure the WorkOS
       description is the entire diagnosis. */
    console.error('[auth] sign-in callback failed', {
      reason,
      ...(error instanceof CallbackError
        ? { hasCode: error.hasCode, hasState: error.hasState }
        : {}),
      error,
    });

    const url = new URL('/auth/error', request.url);
    url.searchParams.set('reason', reason);

    /* Development only. Putting the underlying message in the URL is a debugging
       affordance, not a feature: in production it would leak internals into
       browser history, proxy logs and referrer headers. */
    if (process.env.NODE_ENV !== 'production') {
      url.searchParams.set('detail', message.slice(0, 300));
    }

    /* 303 so the browser issues a GET, and the single-use `code` never stays
       in history where a refresh could replay it. */
    return NextResponse.redirect(url, 303);
  },
});
