import 'server-only';

import {
  getBatchById,
  getCourseBySlug,
  listCourses,
  listEnrollments,
  type BatchDto,
  type CourseDetailDto,
} from '@repo/api-client';

import type { Course } from '@/content/dashboard/types';
import { getApiClient } from '@/lib/api';
import { toStudentCourseView, todayDhaka } from '@/lib/student-course-view';

export type StudentCourses = { courses: Course[] } | { error: string };

/**
 * The learner's courses, joined from their own enrollments.
 *
 * One row per visible enrollment (`draft`, `pending_payment`, `active`) that
 * resolves to a batch: the assigned batch when there is one, otherwise the
 * course's next joinable batch. Enrollments whose course was unpublished or
 * withdrawn after enrolling no longer resolve publicly, so they are left out
 * rather than rendered half-empty. Admin edits to courses, batches and
 * curriculum flow through here with no portal change.
 */
export async function loadStudentCourses(): Promise<StudentCourses> {
  const client = await getApiClient();

  const { data: enrollments, error: enrollmentsError } = await listEnrollments({ client });
  if (!enrollments) {
    return { error: JSON.stringify(enrollmentsError) || 'The API did not answer.' };
  }

  /* Slugs for the batchless enrollments: id → slug comes from the public catalog. */
  const slugByCourseId = new Map<string, string>();
  if (enrollments.some((enrollment) => !enrollment.batchId)) {
    const { data: catalog } = await listCourses({ client });
    for (const summary of catalog ?? []) {
      slugByCourseId.set(summary.id, summary.slug);
    }
  }

  /* Course details, fetched once per slug no matter how many enrollments share it. */
  const detailCache = new Map<string, Promise<CourseDetailDto | null>>();
  const detailFor = (slug: string): Promise<CourseDetailDto | null> => {
    let pending = detailCache.get(slug);
    if (!pending) {
      pending = getCourseBySlug({ client, path: { slug } }).then(
        ({ data }) => data ?? null,
      );
      detailCache.set(slug, pending);
    }
    return pending;
  };

  const today = todayDhaka();
  const cards = await Promise.all(
    enrollments.map(async (enrollment): Promise<Course | null> => {
      let slug: string | null = null;
      let batch: BatchDto | null = null;

      if (enrollment.batchId) {
        const { data } = await getBatchById({ client, path: { id: enrollment.batchId } });
        if (!data) {
          return null;
        }
        batch = data;
        slug = data.courseSlug;
      } else {
        slug = slugByCourseId.get(enrollment.courseId) ?? null;
      }
      if (!slug) {
        return null;
      }
      const course = await detailFor(slug);
      if (!course) {
        return null;
      }
      return toStudentCourseView({ enrollment, course, batch, today });
    }),
  );

  const courses = cards.filter((card): card is Course => card !== null);
  courses.sort((a, b) => a.startsOn.localeCompare(b.startsOn));
  return { courses };
}
