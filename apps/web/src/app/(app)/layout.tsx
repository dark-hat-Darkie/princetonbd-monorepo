import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import { withAuth } from '@workos-inc/authkit-nextjs';

import { AccountChip } from '@/components/dashboard/account-chip';
import { PortalShell } from '@/components/dashboard/portal-shell';

/**
 * Layout for session-aware routes.
 *
 * `withAuth()` lives here rather than in the root layout so that reading the
 * session — and the cookie access it implies — only forces dynamic rendering
 * for the routes that actually need it, leaving the marketing pages static.
 *
 * The portal chrome is mounted here too, so the rail and the account chip
 * survive navigation between portal pages instead of re-rendering per route.
 */
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  /* accessToken is stripped: it is a server credential and must not reach the
     browser through the provider's initial state. */
  const { accessToken: _accessToken, ...initialAuth } = await withAuth();
  const { user } = initialAuth;

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
