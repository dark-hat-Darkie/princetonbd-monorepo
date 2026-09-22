import type { Metadata } from 'next';
import { adminListUsers } from '@repo/api-client';
import Link from 'next/link';

import { adminLinkFor } from '@/components/admin/admin-nav';
import { DataTable } from '@/components/admin/data-table';
import { EmptyState } from '@/components/admin/empty-state';
import { Flash, single } from '@/components/admin/flash';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { getAdminClient } from '@/lib/admin/api';
import { formatFullDate } from '@/lib/dates';

export const metadata: Metadata = { title: 'Students' };

function displayName(user: { firstName?: string | null; lastName?: string | null; email: string }) {
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;
}

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const link = adminLinkFor('/admin/students');
  const client = await getAdminClient();
  const { data: users = [] } = await adminListUsers({ client });

  return (
    <>
      <PortalHeader title="Students" blurb={link?.blurb ?? ''} />

      <Flash message={single(params.flash)} />

      <DataTable
        rows={users}
        rowKey={(user) => user.id}
        empty={
          <EmptyState
            title="No accounts yet."
            body="Students appear here the first time they sign in; open one to assign their counselor."
          />
        }
        columns={[
          {
            key: 'name',
            header: 'Student',
            cell: (user) => (
              <div>
                <Link
                  href={`/admin/students/${user.id}`}
                  className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:text-brand-ink hover:decoration-brand"
                >
                  {displayName(user)}
                </Link>
                <div className="text-[12.5px] text-muted-2">{user.email}</div>
              </div>
            ),
          },
          {
            key: 'role',
            header: 'Role',
            cell: (user) => (user.role === 'admin' ? 'Admin' : 'Student'),
          },
          {
            key: 'counselor',
            header: 'Counselor',
            cell: (user) => user.counselor?.name ?? '—',
          },
          {
            key: 'joined',
            header: 'Joined',
            cell: (user) => formatFullDate(user.createdAt),
          },
          {
            key: 'edit',
            header: <span className="sr-only">Actions</span>,
            className: 'text-right',
            cell: (user) => (
              <CtaButton href={`/admin/students/${user.id}`} size="sm" variant="outline">
                Edit counselor
              </CtaButton>
            ),
          },
        ]}
      />
    </>
  );
}
