import type { Metadata } from 'next';
import { adminGetCourse } from '@repo/api-client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CourseHeader } from '@/components/admin/course-header';
import { DataTable } from '@/components/admin/data-table';
import { EmptyState } from '@/components/admin/empty-state';
import { Flash, single } from '@/components/admin/flash';
import { StatusBadge } from '@/components/admin/status-badge';
import { CtaButton } from '@/components/ui/cta-button';
import { getAdminClient } from '@/lib/admin/api';
import { formatSchedule } from '@/lib/batches';
import { deliveryModeLabels } from '@/lib/cms-enums';
import { formatDayMonth } from '@/lib/dates';
import { formatPrice } from '@/lib/money';

export const metadata: Metadata = { title: 'Batches' };

export default async function CourseBatchesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const { data: course } = await adminGetCourse({ client, path: { id } });
  if (!course) notFound();

  return (
    <>
      <CourseHeader course={course} active="batches" />
      <Flash message={single(query.flash)} />

      <div className="mb-6 flex justify-end">
        <CtaButton href={`/admin/courses/${course.id}/batches/new`} size="sm">
          New batch
        </CtaButton>
      </div>

      <DataTable
        rows={course.batches}
        rowKey={(batch) => batch.id}
        empty={
          <EmptyState
            title="No batches scheduled."
            body="The public page says dates are coming soon until the first batch is added."
            action={{ label: 'Schedule a batch', href: `/admin/courses/${course.id}/batches/new` }}
          />
        }
        columns={[
          {
            key: 'starts',
            header: 'Starts',
            cell: (batch) => (
              <Link
                href={`/admin/courses/${course.id}/batches/${batch.id}`}
                className="font-semibold text-ink tabular-nums underline-offset-4 hover:underline"
              >
                {formatDayMonth(batch.startsOn)}
              </Link>
            ),
          },
          {
            key: 'ends',
            header: 'Ends',
            cell: (batch) => <span className="tabular-nums">{formatDayMonth(batch.endsOn)}</span>,
          },
          {
            key: 'schedule',
            header: 'Schedule',
            cell: (batch) => (
              <>
                {formatSchedule(batch.days, batch.startTime, batch.endTime)}
                {batch.teacher ? (
                  <span className="block text-[12.5px] text-muted-2">
                    with {batch.teacher.name}
                  </span>
                ) : null}
              </>
            ),
          },
          {
            key: 'where',
            header: 'Mode & branch',
            cell: (batch) => (
              <>
                {deliveryModeLabels[batch.mode]}
                <span className="block text-[12.5px] text-muted-2">
                  {batch.branch?.name ?? 'No branch'}
                </span>
              </>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            cell: (batch) => (
              <>
                <StatusBadge status={batch.status} />
                {batch.seatsLeft !== null ? (
                  <span className="mt-1 block text-[12.5px] text-muted-2">
                    {batch.seatsLeft} seats left
                  </span>
                ) : null}
              </>
            ),
          },
          {
            key: 'fee',
            header: 'Fee',
            className: 'text-right',
            cell: (batch) => (
              <span className="tabular-nums">
                {batch.feeAmount === null ? (
                  <span className="text-muted-2">course price</span>
                ) : (
                  formatPrice({ amount: batch.feeAmount, currency: 'BDT' })
                )}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
