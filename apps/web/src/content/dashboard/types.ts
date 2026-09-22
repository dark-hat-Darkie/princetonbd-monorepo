/**
 * View-models for the student portal.
 *
 * The portal reads live data through the generated API client (`@repo/api-client`),
 * whose DTOs are the contract with the backend. The `Course` below is the one
 * portal-specific view-model left: an enrollment joined to its course and batch,
 * shaped for the course cards (see `@/lib/student-course-view.ts`). It only carries
 * fields the API can actually supply — there is no exam tag, attendance count,
 * or progress tracking behind it yet.
 */

export type CourseStatus = 'in-progress' | 'upcoming' | 'complete';

export interface Course {
  slug: string;
  name: string;
  format: string;
  instructor: string;
  status: CourseStatus;
  startsOn: string;
  endsOn: string;
  /** Syllabus units, in teaching order. None is ever marked complete: the API
      exposes the curriculum, but nothing records per-learner progress yet. */
  modules: readonly { title: string; complete: boolean }[];
}

