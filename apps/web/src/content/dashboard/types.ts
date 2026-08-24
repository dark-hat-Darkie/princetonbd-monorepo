/**
 * Shapes for the student portal.
 *
 * Everything the portal renders beyond the signed-in identity is placeholder
 * data — the API exposes users and nothing else yet. These interfaces are
 * written as the contract we would want that API to satisfy, so replacing
 * `student.ts` with a fetch is the only change when the endpoints exist.
 */

export type CourseStatus = 'in-progress' | 'upcoming' | 'complete';

export interface Course {
  slug: string;
  name: string;
  /** The exam or subject, e.g. "SAT". */
  exam: string;
  format: string;
  instructor: string;
  status: CourseStatus;
  /** Sessions attended out of sessions scheduled. */
  sessionsAttended: number;
  sessionsTotal: number;
  startsOn: string;
  endsOn: string;
  /** Syllabus units, in teaching order. */
  modules: readonly { title: string; complete: boolean }[];
}

export interface Session {
  id: string;
  title: string;
  courseSlug: string;
  /** ISO 8601, in Asia/Dhaka. */
  startsAt: string;
  durationMinutes: number;
  mode: 'Campus' | 'LiveOnline';
  location: string;
  instructor: string;
}

export interface Task {
  id: string;
  title: string;
  courseSlug: string;
  dueAt: string;
  kind: 'Homework' | 'Mock test' | 'Essay' | 'Reading';
  done: boolean;
}

/** One sitting of a full-length practice test. */
export interface MockScore {
  id: string;
  label: string;
  takenOn: string;
  total: number;
  sections: readonly { name: string; score: number; max: number }[];
}

export type ApplicationStage =
  'Shortlisted' | 'Essays' | 'Submitted' | 'Interview' | 'Decision' | 'Accepted';

export interface Application {
  id: string;
  university: string;
  country: string;
  programme: string;
  intake: string;
  deadline: string;
  stage: ApplicationStage;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  courseSlug: string | null;
  kind: 'PDF' | 'Video' | 'Practice set' | 'Recording';
  addedOn: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  postedOn: string;
}

export interface Counselor {
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  nextCheckIn: string;
}

/** Everything the portal knows about the signed-in student. */
export interface StudentRecord {
  targetExam: string;
  targetScore: number;
  testDate: string;
  courses: readonly Course[];
  sessions: readonly Session[];
  tasks: readonly Task[];
  scores: readonly MockScore[];
  applications: readonly Application[];
  resources: readonly Resource[];
  announcements: readonly Announcement[];
  counselor: Counselor;
}

/** Ordered so a tracker can render progress through the stages. */
export const applicationStages: readonly ApplicationStage[] = [
  'Shortlisted',
  'Essays',
  'Submitted',
  'Interview',
  'Decision',
  'Accepted',
];
