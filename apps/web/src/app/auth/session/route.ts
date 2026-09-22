import { withAuth } from '@workos-inc/authkit-nextjs';
import { NextResponse } from 'next/server';

/**
 * Session status for the header's auth slot (`AuthSlot`).
 *
 * The marketing chrome stays a static Server Component on purpose (see the
 * note in `app/layout.tsx`), so it cannot read the session at render time.
 * Instead the header ships the logged-out default and this endpoint tells
 * the client island what to swap in. `no-store` throughout: a cached
 * "signed out" would re-show the Log in link to a signed-in user, and a
 * cached "signed in" would leak one visitor's name to the next.
 *
 * The proxy matcher covers this route (with an `unauthenticatedPaths`
 * exemption) so session refresh still runs here — without the exemption an
 * anonymous probe would be redirected to sign-in instead of getting JSON.
 */
export type SessionStatus =
  | { signedIn: false }
  | { signedIn: true; name: string; email: string };

export async function GET(): Promise<NextResponse> {
  const { user } = await withAuth();

  const body: SessionStatus = user
    ? {
        signedIn: true,
        name:
          [user.firstName, user.lastName].filter(Boolean).join(' ') || (user.email ?? 'Account'),
        email: user.email ?? '',
      }
    : { signedIn: false };

  return NextResponse.json(body, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
