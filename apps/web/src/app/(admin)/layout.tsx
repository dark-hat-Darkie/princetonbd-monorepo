import type { Metadata } from 'next';
import { getCurrentUser } from '@repo/api-client';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

import { adminLinks } from '@/components/admin/admin-nav';
import { AccountChip } from '@/components/dashboard/account-chip';
import { PortalShell } from '@/components/dashboard/portal-shell';
import { getApiClient } from '@/lib/api';

export const metadata: Metadata = {
  title: { template: '%s · Admin', default: 'Admin' },
  robots: { index: false, follow: false },
};

/**
 * Layout for the admin panel.
 *
 * The proxy has already required a session for `/admin/*`; what it cannot
 * know is the role, which lives in the API's `users` row. So the layout asks
 * the API who the caller is and sends anyone who is not an admin back to the
 * student portal. That check is a convenience — the API's own RolesGuard is
 * what actually protects the data — but it keeps a student from ever seeing
 * an empty panel that errors on every save.
 *
 * Same shell as the student portal, different link list.
 */
export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  /* accessToken is stripped: it is a server credential and must not reach the
     browser through the provider's initial state. */
  const { accessToken: _accessToken, ...initialAuth } = await withAuth();
  const { user } = initialAuth;

  if (!user) {
    redirect('/sign-in');
  }

  const client = await getApiClient();
  const { data: me } = await getCurrentUser({ client });

  if (me?.role !== 'admin') {
    redirect('/dashboard');
  }

  const name =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || (user.email ?? 'Your account');

  return (
    <AuthKitProvider initialAuth={initialAuth}>
      <PortalShell
        links={adminLinks}
        account={<AccountChip name={name} email={user.email ?? ''} />}
      >
        {children}
      </PortalShell>
    </AuthKitProvider>
  );
}
