import type { Metadata } from 'next';
import { adminListCourses } from '@repo/api-client';
import Link from 'next/link';

import { adminLinkFor } from '@/components/admin/admin-nav';
import { DataTable } from '@/components/admin/data-table';
import { EmptyState } from '@/components/admin/empty-state';
import { Flash, single } from '@/components/admin/flash';
import { StatusBadge } from '@/components/admin/status-badge';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { getAdminClient } from '@/lib/admin/api';
import { deliveryModeLabels } from '@/lib/cms-enums';
import { formatDayMonth } from '@/lib/dates';
import { formatPrice } from '@/lib/money';

export const metadata: Metadata = { title: 'Courses' };

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const link = adminLinkFor('/admin/courses');
  const client = await getAdminClient();
  const { data: courses = [] } = await adminListCourses({ client });

  return (
    <>
      <PortalHeader title="Courses" blurb={link?.blurb ?? ''}>
        <CtaButton href="/admin/courses/new" size="sm">
          New course
        </CtaButton>
      </PortalHeader>

      <Flash message={single(params.flash)} />

      <DataTable
        rows={courses}
        rowKey={(course) => course.id}
        empty={
          <EmptyState
            title="No courses yet."
            body="Create the first course. It stays a draft, invisible on the site, until you publish it."
            action={{ label: 'Create a course', href: '/admin/courses/new' }}
          />
        }
        columns={[
          {
            key: 'name',
            header: 'Course',
            cell: (course) => (
              <>
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:text-brand-ink hover:decoration-brand"
                >
                  {course.name}
                </Link>
                <span className="mt-0.5 block font-mono text-[12px] text-muted-2">
                  /test-prep/{course.slug}
                </span>
              </>
            ),
          },
          {
            key: 'price',
            header: 'Price',
            cell: (course) => (
              <>
                <span className="tabular-nums">
                  {formatPrice({ amount: course.priceAmount, currency: 'BDT' })}
                </span>
                <span className="block text-[12.5px] text-muted-2">{course.priceUnit}</span>
              </>
            ),
          },
          {
            key: 'modes',
            header: 'Modes',
            cell: (course) => course.modes.map((mode) => deliveryModeLabels[mode]).join(' · '),
          },
          {
            key: 'next',
            header: 'Next batch',
            cell: (course) =>
              course.nextBatch ? (
                <>
                  <time dateTime={course.nextBatch.startsOn} className="tabular-nums">
                    {formatDayMonth(course.nextBatch.startsOn)}
                  </time>
                  <span className="block text-[12.5px] text-muted-2">
                    {course.nextBatch.branch?.name ?? 'Live online'}
                  </span>
                </>
              ) : (
                <span className="text-muted-2">None scheduled</span>
              ),
          },
          {
            key: 'status',
            header: 'Status',
            cell: (course) => <StatusBadge status={course.status} />,
          },
          {
            key: 'order',
            header: 'Order',
            className: 'text-right',
            cell: (course) => course.sortOrder,
          },
          {
            key: 'edit',
            header: <span className="sr-only">Actions</span>,
            className: 'text-right',
            cell: (course) => (
              <CtaButton href={`/admin/courses/${course.id}`} size="sm" variant="outline">
                Edit
              </CtaButton>
            ),
          },
        ]}
      />
    </>
  );
}
