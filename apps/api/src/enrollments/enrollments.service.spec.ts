import { describe, expect, it, vi } from 'vitest';

import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { EnrollmentsService } from './enrollments.service.js';

const course = { id: 'course-1', priceAmount: 8500, status: 'published' };
const batch = { id: 'batch-1', courseId: 'course-1', feeAmount: 7000, status: 'open' };

/** Each `select().from().where().limit()` resolves the next entry in `selects`. */
function makeService(selects: unknown[][]) {
  const queue = [...selects];
  const selectChain = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn(() => Promise.resolve(queue.shift() ?? [])),
  };
  const inserted: unknown[] = [];
  const db = {
    select: vi.fn().mockReturnValue(selectChain),
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn(() => {
          const row = {
            id: 'enroll-1',
            userId: 'user-1',
            courseId: course.id,
            batchId: batch.id,
            status: 'draft',
            fullName: '',
          };
          inserted.push(row);
          return Promise.resolve([row]);
        }),
      }),
    }),
    update: vi.fn(),
  };
  return { service: new EnrollmentsService(db as never), db, inserted };
}

async function errorsOf(promise: Promise<unknown>): Promise<Record<string, string[]>> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof ValidationFailedException) return error.errors;
    throw error;
  }
  throw new Error('expected a ValidationFailedException');
}

describe('EnrollmentsService fees and drafts', () => {
  it('prefers the batch override over the course price', async () => {
    const { service } = makeService([[course], [batch]]);
    await expect(service.feeFor(course.id, batch.id)).resolves.toEqual({
      amount: 7000,
      currency: 'BDT',
    });
  });

  it('falls back to the course price without a batch', async () => {
    const { service } = makeService([[{ ...course, priceAmount: 8500 }]]);
    await expect(service.feeFor(course.id, null)).resolves.toEqual({
      amount: 8500,
      currency: 'BDT',
    });
  });

  it('rejects a course that is not published', async () => {
    const { service } = makeService([[]]);
    expect((await errorsOf(service.feeFor('missing', null))).courseId).toBeDefined();
  });

  it('resumes an open enrollment for the same batch instead of duplicating', async () => {
    const open = {
      id: 'enroll-9',
      status: 'pending_payment',
      courseId: course.id,
      batchId: batch.id,
    };
    const { service, db } = makeService([[course], [batch], [open]]);
    const result = await service.createDraft('user-1', { courseId: course.id, batchId: batch.id });
    expect(result.id).toBe('enroll-9');
    expect(db.insert).not.toHaveBeenCalled();
  });

  it('rejects a future date of birth', async () => {
    const draft = { id: 'enroll-1', status: 'draft', courseId: course.id, batchId: null };
    const { service } = makeService([[draft]]);
    expect(
      (await errorsOf(service.updateDetails('user-1', 'enroll-1', { dateOfBirth: '2999-01-01' })))
        .dateOfBirth,
    ).toBeDefined();
  });
});
