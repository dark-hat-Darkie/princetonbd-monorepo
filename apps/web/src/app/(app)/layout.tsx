import { getCurrentUser } from '@repo/api-client';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

import { AccountChip } from '@/components/dashboard/account-chip';
import { PortalShell } from '@/components/dashboard/portal-shell';
import { getApiClient } from '@/lib/api';

/**
 * Layout for the student portal.
 *
 * `withAuth()` lives here rather than in the root layout so that reading the
 * session — and the cookie access it implies — only forces dynamic rendering
 * for the routes that actually need it, leaving the marketing pages static.
 *
 * The portal and the admin panel are mutually exclusive surfaces: an admin
 * is sent to `/admin` from here, and a student is sent here from `/admin`.
 * The role comes from the API's `users` row, which the proxy cannot see, so
 * the check happens in the layout. If the API is unreachable the caller is
 * treated as a student — a student must never be locked out of their own
 * portal by an outage on the admin side.
 *
 * The portal chrome is mounted here too, so the rail and the account chip
 * survive navigation between portal pages instead of re-rendering per route.
 */
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  /* accessToken is stripped: it is a server credential and must not reach the
     browser through the provider's initial state. */
  const { accessToken: _accessToken, ...initialAuth } = await withAuth();
  const { user } = initialAuth;

  if (user) {
    const client = await getApiClient();
    const { data: me } = await getCurrentUser({ client });
    if (me?.role === 'admin') {
      redirect('/admin');
    }
  }

  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') || (user?.email ?? 'Your account');

  return (
    <AuthKitProvider initialAuth={initialAuth}>
      <PortalShell account={<AccountChip name={name} email={user?.email ?? ''} />}>
        {children}
      </PortalShell>
    </AuthKitProvider>
  );
}
