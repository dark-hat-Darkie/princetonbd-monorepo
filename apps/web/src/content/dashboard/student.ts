/**
 * Placeholder portal data for the signed-in student.
 *
 * NOT real. The API currently exposes users and nothing else, so every course,
 * session, score and application below is invented to give the portal
 * something honest-looking to render. Swap this module for API calls when the
 * endpoints exist; the components depend on the shapes in `types.ts`, not on
 * where the data comes from.
 *
 * Dates are fixed rather than computed from `Date.now()` so the portal renders
 * identically in tests and in review.
 */

import type { StudentRecord } from './types';

export const student: StudentRecord = {
  targetExam: 'SAT',
  targetScore: 1450,
  testDate: '2026-10-03',

  courses: [
    {
      slug: 'sat-1400',
      name: 'SAT Classroom 1400+',
      exam: 'SAT',
      format: 'Campus · Gulshan',
      instructor: 'Farzana Haque',
      status: 'in-progress',
      sessionsAttended: 14,
      sessionsTotal: 24,
      startsOn: '2026-07-06',
      endsOn: '2026-09-25',
      modules: [
        { title: 'Diagnostic & goal setting', complete: true },
        { title: 'Reading: evidence & inference', complete: true },
        { title: 'Writing: grammar rules that repeat', complete: true },
        { title: 'Math: heart of algebra', complete: true },
        { title: 'Math: problem solving & data', complete: false },
        { title: 'Adaptive module strategy', complete: false },
        { title: 'Full-length mocks & review', complete: false },
        { title: 'Test-week timing plan', complete: false },
      ],
    },
    {
      slug: 'ielts-evening',
      name: 'IELTS Academic — evening batch',
      exam: 'IELTS',
      format: 'LiveOnline',
      instructor: 'Rehnuma Siddiqui',
      status: 'upcoming',
      sessionsAttended: 0,
      sessionsTotal: 16,
      startsOn: '2026-09-14',
      endsOn: '2026-11-06',
      modules: [
        { title: 'Listening: signposting', complete: false },
        { title: 'Reading: skimming under time', complete: false },
        { title: 'Writing Task 1 & 2', complete: false },
        { title: 'Speaking lab', complete: false },
      ],
    },
  ],

  sessions: [
    {
      id: 's1',
      title: 'Math: problem solving & data',
      courseSlug: 'sat-1400',
      startsAt: '2026-08-26T18:00:00+06:00',
      durationMinutes: 120,
      mode: 'Campus',
      location: 'Gulshan · Room 3',
      instructor: 'Farzana Haque',
    },
    {
      id: 's2',
      title: 'Full-length mock #4',
      courseSlug: 'sat-1400',
      startsAt: '2026-08-29T09:30:00+06:00',
      durationMinutes: 150,
      mode: 'Campus',
      location: 'Gulshan · Hall A',
      instructor: 'Proctored',
    },
    {
      id: 's3',
      title: 'Mock #4 review',
      courseSlug: 'sat-1400',
      startsAt: '2026-09-01T18:00:00+06:00',
      durationMinutes: 90,
      mode: 'LiveOnline',
      location: 'Zoom',
      instructor: 'Farzana Haque',
    },
    {
      id: 's4',
      title: 'Counselling check-in',
      courseSlug: 'sat-1400',
      startsAt: '2026-09-03T17:00:00+06:00',
      durationMinutes: 45,
      mode: 'LiveOnline',
      location: 'Zoom',
      instructor: 'Shafqat Rahman',
    },
    {
      id: 's5',
      title: 'Adaptive module strategy',
      courseSlug: 'sat-1400',
      startsAt: '2026-09-05T18:00:00+06:00',
      durationMinutes: 120,
      mode: 'Campus',
      location: 'Gulshan · Room 3',
      instructor: 'Farzana Haque',
    },
  ],

  tasks: [
    {
      id: 't1',
      title: 'Problem set 7 — linear systems',
      courseSlug: 'sat-1400',
      dueAt: '2026-08-25T21:00:00+06:00',
      kind: 'Homework',
      done: false,
    },
    {
      id: 't2',
      title: 'Error journal for mock #3',
      courseSlug: 'sat-1400',
      dueAt: '2026-08-27T21:00:00+06:00',
      kind: 'Homework',
      done: false,
    },
    {
      id: 't3',
      title: 'Sit full-length mock #4',
      courseSlug: 'sat-1400',
      dueAt: '2026-08-29T09:30:00+06:00',
      kind: 'Mock test',
      done: false,
    },
    {
      id: 't4',
      title: 'Common App personal statement — first draft',
      courseSlug: 'sat-1400',
      dueAt: '2026-09-08T21:00:00+06:00',
      kind: 'Essay',
      done: false,
    },
    {
      id: 't5',
      title: 'Reading: two passages a day',
      courseSlug: 'sat-1400',
      dueAt: '2026-08-22T21:00:00+06:00',
      kind: 'Reading',
      done: true,
    },
  ],

  scores: [
    {
      id: 'm0',
      label: 'Diagnostic',
      takenOn: '2026-07-05',
      total: 1180,
      sections: [
        { name: 'Reading & Writing', score: 610, max: 800 },
        { name: 'Math', score: 570, max: 800 },
      ],
    },
    {
      id: 'm1',
      label: 'Mock #1',
      takenOn: '2026-07-19',
      total: 1250,
      sections: [
        { name: 'Reading & Writing', score: 640, max: 800 },
        { name: 'Math', score: 610, max: 800 },
      ],
    },
    {
      id: 'm2',
      label: 'Mock #2',
      takenOn: '2026-08-02',
      total: 1310,
      sections: [
        { name: 'Reading & Writing', score: 670, max: 800 },
        { name: 'Math', score: 640, max: 800 },
      ],
    },
    {
      id: 'm3',
      label: 'Mock #3',
      takenOn: '2026-08-16',
      total: 1380,
      sections: [
        { name: 'Reading & Writing', score: 700, max: 800 },
        { name: 'Math', score: 680, max: 800 },
      ],
    },
  ],

  applications: [
    {
      id: 'a1',
      university: 'University of Toronto',
      country: 'Canada',
      programme: 'BSc Computer Science',
      intake: 'Fall 2027',
      deadline: '2027-01-15',
      stage: 'Essays',
    },
    {
      id: 'a2',
      university: 'University of British Columbia',
      country: 'Canada',
      programme: 'BSc Computer Science',
      intake: 'Fall 2027',
      deadline: '2027-01-15',
      stage: 'Shortlisted',
    },
    {
      id: 'a3',
      university: 'Arizona State University',
      country: 'USA',
      programme: 'BS Computer Science',
      intake: 'Fall 2027',
      deadline: '2026-11-01',
      stage: 'Submitted',
    },
    {
      id: 'a4',
      university: 'University of Manchester',
      country: 'UK',
      programme: 'BSc Computer Science',
      intake: 'Sept 2027',
      deadline: '2027-01-29',
      stage: 'Shortlisted',
    },
  ],

  resources: [
    {
      id: 'r1',
      title: 'Digital SAT — adaptive module strategy',
      description: 'How the second module is chosen, and how to bank the first one fast.',
      courseSlug: 'sat-1400',
      kind: 'PDF',
      addedOn: '2026-08-18',
    },
    {
      id: 'r2',
      title: 'Mock #3 full review',
      description: 'Recording of the session, timestamped by question type.',
      courseSlug: 'sat-1400',
      kind: 'Recording',
      addedOn: '2026-08-17',
    },
    {
      id: 'r3',
      title: 'Heart of algebra — 60 questions',
      description: 'Worked solutions included. Attempt untimed first, then at pace.',
      courseSlug: 'sat-1400',
      kind: 'Practice set',
      addedOn: '2026-08-10',
    },
    {
      id: 'r4',
      title: 'Personal statement: what admissions officers actually read',
      description: 'A 20-minute talk from our counselling team.',
      courseSlug: null,
      kind: 'Video',
      addedOn: '2026-08-04',
    },
  ],

  announcements: [
    {
      id: 'n1',
      title: 'Mock #4 moves to Hall A',
      body: 'Saturday’s full-length mock is in Hall A rather than Room 3. Arrive by 9:15am with photo ID.',
      postedOn: '2026-08-21',
    },
    {
      id: 'n2',
      title: 'October SAT registration closes 19 September',
      body: 'If you are sitting the 3 October test, register before the late fee applies. Ask at the front desk if you need help with the College Board account.',
      postedOn: '2026-08-14',
    },
  ],

  counselor: {
    name: 'Shafqat Rahman',
    initials: 'SR',
    role: 'Senior Admissions Counselor',
    email: 'counselling@princetonreviewbd.com',
    phone: '+880 1700-000000',
    nextCheckIn: '2026-09-03T17:00:00+06:00',
  },
};
