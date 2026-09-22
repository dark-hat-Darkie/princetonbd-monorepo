import type { Metadata } from 'next';
import { adminGetCourse } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { CourseHeader } from '@/components/admin/course-header';
import { CurriculumForm } from '@/components/admin/curriculum-form';
import { Flash, single } from '@/components/admin/flash';
import { getAdminClient } from '@/lib/admin/api';
import { replaceCurriculumAction } from '@/lib/admin/actions/courses';

export const metadata: Metadata = { title: 'Curriculum' };

export default async function CourseCurriculumPage({
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
      <CourseHeader course={course} active="curriculum" />
      <Flash message={single(query.flash)} />
      <CurriculumForm
        action={replaceCurriculumAction.bind(null, course.id, course.slug)}
        initial={course.modules}
      />
    </>
  );
}
