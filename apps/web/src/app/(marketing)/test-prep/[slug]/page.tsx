import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ExamPage } from '@/components/templates/exam-page';
import { editorialFor } from '@/content/exams';
import { getCourse, getPublishedCourses } from '@/lib/cms';
import { toCourseView } from '@/lib/course-view';

/**
 * One route for every course the CMS publishes.
 *
 * Statically built for every published slug and re-rendered daily, so the
 * batch list drops runs that have ended without a deploy; an admin save
 * expires the page sooner (see `lib/admin/revalidate.ts`). A slug not built
 * at deploy time — a course published afterwards — is rendered on its first
 * visit and cached like the rest, which is what `dynamicParams` allows.
 *
 * If the API is unreachable at build time the params list is empty and every
 * page falls back to on-demand rendering, rather than the build failing.
 */
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const courses = await getPublishedCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  return toCourseView(course, editorialFor(slug)).seo;
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  return <ExamPage course={toCourseView(course, editorialFor(slug))} />;
}
