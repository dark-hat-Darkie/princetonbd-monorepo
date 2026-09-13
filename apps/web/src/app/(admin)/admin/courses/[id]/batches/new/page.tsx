import type { Metadata } from 'next';
import { adminGetCourse, adminListBranches, adminListTeachers } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { BatchForm } from '@/components/admin/batch-form';
import { CourseHeader } from '@/components/admin/course-header';
import { getAdminClient } from '@/lib/admin/api';
import { createBatchAction } from '@/lib/admin/actions/batches';

export const metadata: Metadata = { title: 'New batch' };

export default async function NewBatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getAdminClient();
  const [{ data: course }, { data: branches = [] }, { data: teachers = [] }] = await Promise.all([
    adminGetCourse({ client, path: { id } }),
    adminListBranches({ client }),
    adminListTeachers({ client }),
  ]);
  if (!course) notFound();

  return (
    <>
      <CourseHeader course={course} active="batches" />
      <BatchForm
        action={createBatchAction.bind(null, course.id)}
        course={course}
        branches={branches.filter((branch) => branch.isActive)}
        teachers={teachers.filter((teacher) => teacher.isActive)}
      />
    </>
  );
}
