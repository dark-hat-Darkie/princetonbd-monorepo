import type { Metadata } from 'next';
import { adminGetCourse } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { CourseForm } from '@/components/admin/course-form';
import { CourseHeader } from '@/components/admin/course-header';
import { Flash, single } from '@/components/admin/flash';
import { getAdminClient } from '@/lib/admin/api';
import { updateCourseAction } from '@/lib/admin/actions/courses';

export const metadata: Metadata = { title: 'Course details' };

export default async function EditCoursePage({
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
      <CourseHeader course={course} active="details" />
      <Flash message={single(query.flash)} />
      <CourseForm action={updateCourseAction.bind(null, course.id)} initial={course} />
    </>
  );
}
