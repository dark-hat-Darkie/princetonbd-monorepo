import type { Metadata } from 'next';
import {
  adminGetBatch,
  adminGetCourse,
  adminListBranches,
  adminListTeachers,
} from '@repo/api-client';
import { notFound } from 'next/navigation';

import { BatchForm } from '@/components/admin/batch-form';
import { ConfirmForm } from '@/components/admin/confirm-form';
import { CourseHeader } from '@/components/admin/course-header';
import { Flash, single } from '@/components/admin/flash';
import { getAdminClient } from '@/lib/admin/api';
import { deleteBatchAction, updateBatchAction } from '@/lib/admin/actions/batches';
import { formatDayMonth } from '@/lib/dates';

export const metadata: Metadata = { title: 'Edit batch' };

export default async function EditBatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; batchId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id, batchId }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const [{ data: course }, { data: batch }, { data: branches = [] }, { data: teachers = [] }] =
    await Promise.all([
      adminGetCourse({ client, path: { id } }),
      adminGetBatch({ client, path: { id: batchId } }),
      adminListBranches({ client }),
      adminListTeachers({ client }),
    ]);
  if (!course) notFound();
  if (batch?.courseId !== course.id) notFound();

  return (
    <>
      <CourseHeader course={course} active="batches" />
      <Flash message={single(query.flash)} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-[22px] font-semibold text-ink">
          Batch starting {formatDayMonth(batch.startsOn)}
        </h2>
        <ConfirmForm
          action={deleteBatchAction.bind(null, batch.id, course.id, course.slug)}
          confirm="Delete this batch? Anyone holding an enquiry link to it will be told it no longer exists."
          label="Delete batch"
          pendingLabel="Deleting…"
        />
      </div>

      <BatchForm
        action={updateBatchAction.bind(null, batch.id)}
        course={course}
        branches={branches.filter((branch) => branch.isActive || branch.id === batch.branch?.id)}
        teachers={teachers.filter(
          (teacher) => teacher.isActive || teacher.id === batch.teacher?.id,
        )}
        initial={batch}
      />
    </>
  );
}
