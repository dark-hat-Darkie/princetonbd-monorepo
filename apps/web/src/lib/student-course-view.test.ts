import { describe, expect, it } from 'vitest';
import type { BatchDto, CourseDetailDto, EnrollmentDto } from '@repo/api-client';

import { toStudentCourseView, todayDhaka } from './student-course-view';

const TODAY = '2026-08-24';

function enrollment(overrides: Partial<EnrollmentDto> = {}): EnrollmentDto {
  return {
    id: 'e1',
    courseId: 'c1',
    batchId: 'b1',
    status: 'active',
    feeAmount: 25000,
    feeCurrency: 'BDT',
    fullName: 'Test Learner',
    dateOfBirth: null,
    phone: null,
    educationLevel: null,
    institution: null,
    graduationYear: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    notes: null,
    ...overrides,
  };
}

function batch(overrides: Partial<BatchDto> = {}): BatchDto {
  return {
    id: 'b1',
    courseId: 'c1',
    courseSlug: 'sat-1400',
    courseName: 'SAT Classroom 1400+',
    mode: 'classroom',
    branch: {
      id: 'br1',
      slug: 'gulshan',
      name: 'Gulshan',
      address: null,
      phone: null,
      isActive: true,
      sortOrder: 0,
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    teacher: { id: 't1', slug: 'farzana-haque', name: 'Farzana Haque' },
    startsOn: '2026-07-06',
    endsOn: '2026-09-25',
    days: ['sat'],
    startTime: '18:00',
    endTime: '20:00',
    status: 'open',
    seatsLeft: null,
    feeAmount: null,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    ...overrides,
  };
}

function course(overrides: Partial<CourseDetailDto> = {}): CourseDetailDto {
  return {
    id: 'c1',
    slug: 'sat-1400',
    name: 'SAT Classroom 1400+',
    description: 'Desc',
    thumbnailUrl: null,
    priceAmount: 25000,
    priceUnit: 'course',
    currency: 'BDT',
    modes: ['classroom'],
    status: 'published',
    durationWeeks: 12,
    taughtHours: null,
    mockCount: null,
    classSize: null,
    sortOrder: 0,
    nextBatch: null,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    feeIncludes: [],
    outcomes: [],
    modules: [
      {
        id: 'm1',
        position: 1,
        title: 'Heart of algebra',
        summary: '',
        topics: [],
        hours: null,
        outcome: null,
      },
    ],
    batches: [],
    teachers: [],
    testimonials: [],
    ...overrides,
  };
}

describe('toStudentCourseView', () => {
  it('maps an active enrollment in a running batch to in-progress', () => {
    const view = toStudentCourseView({
      enrollment: enrollment(),
      course: course(),
      batch: batch(),
      today: TODAY,
    });

    expect(view).toMatchObject({
      slug: 'sat-1400',
      name: 'SAT Classroom 1400+',
      format: 'Campus · Gulshan',
      instructor: 'Farzana Haque',
      status: 'in-progress',
      startsOn: '2026-07-06',
      endsOn: '2026-09-25',
      modules: [{ title: 'Heart of algebra', complete: false }],
    });
  });

  it('marks a batch that has not started yet as upcoming', () => {
    const view = toStudentCourseView({
      enrollment: enrollment(),
      course: course(),
      batch: batch({ startsOn: '2026-09-14', endsOn: '2026-11-06' }),
      today: TODAY,
    });

    expect(view?.status).toBe('upcoming');
  });

  it('marks a batch that already ended as complete', () => {
    const view = toStudentCourseView({
      enrollment: enrollment(),
      course: course(),
      batch: batch({ startsOn: '2026-05-01', endsOn: '2026-06-30' }),
      today: TODAY,
    });

    expect(view?.status).toBe('complete');
  });

  it('keeps unpaid enrollments upcoming even when the batch has started', () => {
    const view = toStudentCourseView({
      enrollment: enrollment({ status: 'pending_payment' }),
      course: course(),
      batch: batch(),
      today: TODAY,
    });

    expect(view?.status).toBe('upcoming');
  });

  it('falls back to the course next batch when no batch is assigned', () => {
    const next = batch({ id: 'b2', startsOn: '2026-09-14', endsOn: '2026-11-06' });
    const view = toStudentCourseView({
      enrollment: enrollment({ batchId: null }),
      course: course({ nextBatch: next }),
      batch: null,
      today: TODAY,
    });

    expect(view?.status).toBe('upcoming');
    expect(view?.startsOn).toBe('2026-09-14');
  });

  it('leaves out enrollments with nowhere to take dates from', () => {
    expect(
      toStudentCourseView({
        enrollment: enrollment({ batchId: null }),
        course: course({ nextBatch: null }),
        batch: null,
        today: TODAY,
      }),
    ).toBeNull();
  });

  it('leaves out terminal enrollment states', () => {
    for (const status of ['failed', 'cancelled', 'expired'] as const) {
      expect(
        toStudentCourseView({
          enrollment: enrollment({ status }),
          course: course(),
          batch: batch(),
          today: TODAY,
        }),
      ).toBeNull();
    }
  });

  it('renders a live-online batch without a branch and falls back to the course teacher', () => {
    const view = toStudentCourseView({
      enrollment: enrollment(),
      course: course({
        teachers: [
          {
            id: 't2',
            slug: 'rehnuma-siddiqui',
            name: 'Rehnuma Siddiqui',
            designation: 'IELTS Lead',
            bio: 'Bio',
            imageUrl: null,
            branch: null,
            isActive: true,
            sortOrder: 0,
            createdAt: '2026-01-01',
            updatedAt: '2026-01-01',
          },
        ],
      }),
      batch: batch({ mode: 'live_online', branch: null, teacher: null }),
      today: TODAY,
    });

    expect(view?.format).toBe('LiveOnline');
    expect(view?.instructor).toBe('Rehnuma Siddiqui');
  });
});

describe('todayDhaka', () => {
  it('reports the Dhaka calendar day, not the UTC one', () => {
    // 20:00 UTC is 02:00 the next day in Dhaka (+06:00).
    expect(todayDhaka(new Date('2026-08-23T20:00:00Z'))).toBe('2026-08-24');
  });
});
