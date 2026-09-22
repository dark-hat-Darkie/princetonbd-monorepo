import type { BatchDto, CourseDetailDto } from '@repo/api-client';
import { describe, expect, it } from 'vitest';

import { enrollHref, resolveEnrollTarget } from './enroll';

const course = { id: 'course-1', slug: 'sat', priceAmount: 8500 } as CourseDetailDto;
const batch = {
  courseId: 'course-1',
  status: 'open',
  startsOn: '2026-10-01',
  endsOn: '2026-12-20',
  feeAmount: 7000,
} as unknown as BatchDto;

describe('enrollHref', () => {
  it('points checkout at the course and batch', () => {
    expect(enrollHref({ courseSlug: 'sat', batchId: 'b1' })).toBe('/enroll?course=sat&batch=b1');
  });

  it('omits the batch for course-only enrollment', () => {
    expect(enrollHref({ courseSlug: 'sat', batchId: null })).toBe('/enroll?course=sat');
  });
});

describe('resolveEnrollTarget', () => {
  it('prefers the batch override over the course price', () => {
    expect(resolveEnrollTarget(course, batch)?.feeAmount).toBe(7000);
  });

  it('falls back to the course price without a batch', () => {
    expect(resolveEnrollTarget(course, null)?.feeAmount).toBe(8500);
  });

  it('rejects a batch from another course', () => {
    expect(resolveEnrollTarget(course, { ...batch, courseId: 'other' })).toBeNull();
  });

  it('rejects a closed batch', () => {
    expect(resolveEnrollTarget(course, { ...batch, status: 'closed' })).toBeNull();
  });
});
