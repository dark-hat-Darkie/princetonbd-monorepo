import type { Metadata } from 'next';
import { adminListTeachers } from '@repo/api-client';
import Link from 'next/link';

import { adminLinkFor } from '@/components/admin/admin-nav';
import { DataTable } from '@/components/admin/data-table';
import { EmptyState } from '@/components/admin/empty-state';
import { Flash, single } from '@/components/admin/flash';
import { StatusBadge } from '@/components/admin/status-badge';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { getAdminClient } from '@/lib/admin/api';

export const metadata: Metadata = { title: 'Teachers' };

export default async function AdminTeachersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const link = adminLinkFor('/admin/teachers');
  const client = await getAdminClient();
  const { data: teachers = [] } = await adminListTeachers({ client });

  return (
    <>
      <PortalHeader title="Teachers" blurb={link?.blurb ?? ''}>
        <CtaButton href="/admin/teachers/new" size="sm">
          New teacher
        </CtaButton>
      </PortalHeader>

      <Flash message={single(params.flash)} />

      <DataTable
        rows={teachers}
        rowKey={(teacher) => teacher.id}
        empty={
          <EmptyState
            title="No teachers yet."
            body="Add the faculty shown on course pages; each can have a photo, a title and a home branch."
            action={{ label: 'Add a teacher', href: '/admin/teachers/new' }}
          />
        }
        columns={[
          {
            key: 'name',
            header: 'Teacher',
            cell: (teacher) => (
              <div>
                <Link
                  href={`/admin/teachers/${teacher.id}`}
                  className="font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {teacher.name}
                </Link>
                <div className="text-[12.5px] text-muted-2">{teacher.designation}</div>
              </div>
            ),
          },
          {
            key: 'branch',
            header: 'Branch',
            cell: (teacher) => teacher.branch?.name ?? '—',
          },
          {
            key: 'courses',
            header: 'Courses',
            cell: (teacher) => teacher.courses.map((c) => c.name).join(' · ') || '—',
          },
          {
            key: 'imageUrl',
            header: 'Photo',
            cell: (teacher) => (teacher.imageUrl ? 'Yes' : 'Monogram'),
          },
          {
            key: 'status',
            header: 'Status',
            cell: (teacher) => <StatusBadge status={teacher.isActive ? 'active' : 'inactive'} />,
          },
          {
            key: 'order',
            header: 'Order',
            className: 'text-right',
            cell: (teacher) => teacher.sortOrder,
          },
        ]}
      />
    </>
  );
}
