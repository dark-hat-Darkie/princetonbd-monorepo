import type { BatchDto, CourseDetailDto, EnrollmentDto } from '@repo/api-client';

import type { Course, CourseStatus } from '@/content/dashboard/types';

/**
 * Enrollment states shown on My courses. Failed, cancelled and expired rows
 * are history without a view, so they are left out.
 */
const VISIBLE_STATUSES: ReadonlySet<EnrollmentDto['status']> = new Set([
  'draft',
  'pending_payment',
  'active',
]);

export interface StudentCourseViewSource {
  enrollment: EnrollmentDto;
  course: CourseDetailDto;
  /** The learner's own batch, or null when the enrollment names none. */
  batch: BatchDto | null;
  /** Today as a Dhaka calendar day (YYYY-MM-DD). Injected so tests control time. */
  today: string;
}

/** Today in Asia/Dhaka as YYYY-MM-DD, matching the API's calendar-day fields. */
export function todayDhaka(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

function formatBatch(batch: BatchDto): string {
  const mode = batch.mode === 'classroom' ? 'Campus' : 'LiveOnline';
  return batch.branch ? `${mode} · ${batch.branch.name}` : mode;
}

function deriveStatus(
  enrollment: EnrollmentDto,
  batch: BatchDto,
  today: string,
): CourseStatus {
  if (enrollment.status !== 'active' || batch.startsOn > today) {
    return 'upcoming';
  }
  return batch.endsOn < today ? 'complete' : 'in-progress';
}

/**
 * Shape one enrollment into a course card. Returns null when the enrollment
 * should not appear: a terminal state, or no batch to take dates from —
 * neither an assigned batch nor a next joinable one on the course.
 */
export function toStudentCourseView({
  enrollment,
  course,
  batch,
  today,
}: StudentCourseViewSource): Course | null {
  if (!VISIBLE_STATUSES.has(enrollment.status)) {
    return null;
  }
  const display = batch ?? course.nextBatch;
  if (!display) {
    return null;
  }
  return {
    slug: course.slug,
    name: course.name,
    format: formatBatch(display),
    instructor: display.teacher?.name ?? course.teachers[0]?.name ?? 'To be announced',
    status: deriveStatus(enrollment, display, today),
    startsOn: display.startsOn,
    endsOn: display.endsOn,
    modules: course.modules.map((unit) => ({ title: unit.title, complete: false })),
  };
}
