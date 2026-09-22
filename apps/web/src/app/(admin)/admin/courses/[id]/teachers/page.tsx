import type { Metadata } from 'next';
import { adminGetCourse, adminListTeachers } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { CourseHeader } from '@/components/admin/course-header';
import { CourseTeachersForm } from '@/components/admin/course-teachers-form';
import { Flash, single } from '@/components/admin/flash';
import { getAdminClient } from '@/lib/admin/api';
import { replaceCourseTeachersAction } from '@/lib/admin/actions/courses';

export const metadata: Metadata = { title: 'Course teachers' };

export default async function CourseTeachersPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const [{ data: course }, { data: teachers = [] }] = await Promise.all([
    adminGetCourse({ client, path: { id } }),
    adminListTeachers({ client }),
  ]);
  if (!course) notFound();

  return (
    <>
      <CourseHeader course={course} active="teachers" />
      <Flash message={single(query.flash)} />
      <CourseTeachersForm
        action={replaceCourseTeachersAction.bind(null, course.id, course.slug)}
        teachers={teachers}
        assigned={course.teachers.map((teacher) => teacher.id)}
      />
    </>
  );
}
