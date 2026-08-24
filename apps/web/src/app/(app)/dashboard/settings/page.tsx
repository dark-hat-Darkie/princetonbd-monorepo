import type { Metadata } from 'next';
import { getCurrentUser } from '@repo/api-client';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

import { Panel } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { getApiClient } from '@/lib/api';
import { formatFullDate } from '@/lib/dates';

export const metadata: Metadata = { title: 'Settings', robots: { index: false, follow: false } };

/**
 * The account we actually hold.
 *
 * This is the only portal page showing real data, and it doubles as the
 * end-to-end proof the original scaffold page provided: AuthKit session →
 * access token → NestJS guard → JWKS verification → local users row. The name
 * and email under "Your record" come from Postgres via the API, not from the
 * session, so a successful render means the upsert ran.
 */
export default async function SettingsPage() {
  const { user } = await withAuth();

  if (!user) {
    redirect('/sign-in');
  }

  const link = portalLinkFor('/dashboard/settings');
  const client = await getApiClient();
  const { data: profile, error } = await getCurrentUser({ client });

  return (
    <>
      <PortalHeader title="Settings" blurb={link?.blurb ?? ''} />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
        <Panel title="Your record" meta="from the API">
          {profile ? (
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 px-6 py-6 text-[14.5px]">
              <dt className="text-warm">Name</dt>
              <dd className="text-ink-soft">
                {[profile.firstName, profile.lastName].filter(Boolean).join(' ') || '—'}
              </dd>
              <dt className="text-warm">Email</dt>
              <dd className="text-ink-soft">{profile.email}</dd>
              <dt className="text-warm">Member since</dt>
              <dd className="text-ink-soft">{formatFullDate(profile.createdAt)}</dd>
              <dt className="text-warm">Account id</dt>
              <dd className="font-mono text-[12.5px] break-all text-muted">{profile.id}</dd>
            </dl>
          ) : (
            <p className="px-6 py-6 text-[14.5px] leading-[1.6] text-[#a8452f]">
              We could not reach the API just now. Your session is fine — try reloading.
              {error ? (
                <span className="mt-2 block font-mono text-[12.5px] break-words text-muted">
                  {JSON.stringify(error)}
                </span>
              ) : null}
            </p>
          )}
        </Panel>

        <Panel title="Sign-in" meta="from WorkOS">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 px-6 py-6 text-[14.5px]">
            <dt className="text-warm">Signed in as</dt>
            <dd className="text-ink-soft">{user.email}</dd>
            <dt className="text-warm">Identity id</dt>
            <dd className="font-mono text-[12.5px] break-all text-muted">{user.id}</dd>
          </dl>

          <div className="border-t border-t-[rgba(27,36,54,.09)] px-6 py-5 text-[14px] leading-[1.6] text-muted">
            Your password and sign-in method are managed by our identity provider, not here. To
            change your email, contact us and we will update both records together.
          </div>
        </Panel>
      </div>

      <p className="mt-7 max-w-[640px] border-l-[3px] border-l-gold bg-cream px-6 py-4 text-[14px] leading-[1.6] text-ink-soft">
        Preferences &mdash; notifications, timetable reminders, language &mdash; are not built yet.
        Everything else in this portal outside this page is placeholder data.
      </p>
    </>
  );
}
