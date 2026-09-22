import type { BatchDto, CourseDetailDto } from '@repo/api-client';

import { formatPrice } from './money';

/**
 * The checkout link for a course, or one run of it.
 *
 * Canonical form is `/enroll?course=<slug>&batch=<id>` — slugs stay readable
 * and stable while the batch id is validated against the API, exactly like
 * the `/contact` enquiry flow validates its own params before trusting them.
 */
export function enrollHref({
  courseSlug,
  batchId,
}: {
  courseSlug: string;
  batchId?: string | null;
}): string {
  const params = new URLSearchParams({ course: courseSlug });
  if (batchId) params.set('batch', batchId);
  return `/enroll?${params.toString()}`;
}

export interface EnrollTarget {
  course: CourseDetailDto;
  batch: BatchDto | null;
  feeAmount: number;
}

/**
 * Pair a validated course with a validated batch. `null` means the URL was
 * hand-edited or the batch moved: the page renders "no longer available",
 * never a mismatched fee.
 */
export function resolveEnrollTarget(
  course: CourseDetailDto,
  batch: BatchDto | null,
): EnrollTarget | null {
  if (batch && batch.courseId !== course.id) return null;
  if (batch && (batch.status === 'closed' || batch.endsOn < batch.startsOn)) return null;
  return {
    course,
    batch,
    feeAmount: batch?.feeAmount ?? course.priceAmount,
  };
}

/** "৳8,500" — the one line the review step and the fee echo share. */
export function formatFee(amount: number): string {
  return formatPrice({ amount, currency: 'BDT' });
}
