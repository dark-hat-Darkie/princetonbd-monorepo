import type { Metadata } from 'next';
import { adminListBranches } from '@repo/api-client';
import Link from 'next/link';

import { adminLinkFor } from '@/components/admin/admin-nav';
import { DataTable } from '@/components/admin/data-table';
import { EmptyState } from '@/components/admin/empty-state';
import { Flash, single } from '@/components/admin/flash';
import { StatusBadge } from '@/components/admin/status-badge';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { getAdminClient } from '@/lib/admin/api';

export const metadata: Metadata = { title: 'Branches' };

export default async function AdminBranchesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const link = adminLinkFor('/admin/branches');
  const client = await getAdminClient();
  const { data: branches = [] } = await adminListBranches({ client });

  return (
    <>
      <PortalHeader title="Branches" blurb={link?.blurb ?? ''}>
        <CtaButton href="/admin/branches/new" size="sm">
          New branch
        </CtaButton>
      </PortalHeader>

      <Flash message={single(params.flash)} />

      <DataTable
        rows={branches}
        rowKey={(branch) => branch.id}
        empty={
          <EmptyState
            title="No branches yet."
            body="Add the campuses classroom batches run at. Live-online batches need none."
            action={{ label: 'Add a branch', href: '/admin/branches/new' }}
          />
        }
        columns={[
          {
            key: 'name',
            header: 'Branch',
            cell: (branch) => (
              <Link
                href={`/admin/branches/${branch.id}`}
                className="font-semibold text-ink underline-offset-4 hover:underline"
              >
                {branch.name}
              </Link>
            ),
          },
          {
            key: 'slug',
            header: 'Slug',
            cell: (branch) => <code className="text-[13px]">{branch.slug}</code>,
          },
          { key: 'address', header: 'Address', cell: (branch) => branch.address ?? '—' },
          { key: 'phone', header: 'Phone', cell: (branch) => branch.phone ?? '—' },
          {
            key: 'status',
            header: 'Status',
            cell: (branch) => <StatusBadge status={branch.isActive ? 'active' : 'inactive'} />,
          },
          {
            key: 'order',
            header: 'Order',
            className: 'text-right',
            cell: (branch) => branch.sortOrder,
          },
        ]}
      />
    </>
  );
}
