import { describe, expect, it, vi } from 'vitest';

import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { BatchesService } from './batches.service.js';

/**
 * The cross-field rules, exercised directly. `validate` is private — it is
 * an implementation detail of create/update — but it is the logic that
 * matters, so it is reached through a cast rather than through the
 * relational queries around it.
 */

interface Rules {
  mode: 'classroom' | 'live_online';
  branchId: string | null;
  teacherId: string | null;
  startsOn: string;
  endsOn: string;
  startTime: string;
  endTime: string;
}

const bothModes = { id: 'c1', name: 'SAT', modes: ['classroom', 'live_online'] } as never;
const classroomOnly = { id: 'c2', name: 'AP', modes: ['classroom'] } as never;

const valid: Rules = {
  mode: 'classroom',
  branchId: 'b1',
  teacherId: null,
  startsOn: '2030-01-10',
  endsOn: '2030-03-20',
  startTime: '18:30',
  endTime: '20:30',
};

/** Each `select().from().where().limit()` resolves the next entry in `lookups`. */
function makeService(
  lookups: unknown[][] = [[{ id: 'b1' }], [{ id: 't1' }]],
  course: unknown = bothModes,
) {
  const queue = [...lookups];
  const chain = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn(() => Promise.resolve(queue.shift() ?? [])),
  };
  const db = { select: vi.fn().mockReturnValue(chain) };
  const service = new BatchesService(db as never);
  const validate = (rules: Rules) =>
    (service as unknown as { validate(c: unknown, r: Rules): Promise<void> }).validate(
      course,
      rules,
    );
  return { validate, db };
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

describe('BatchesService rules', () => {
  it('accepts a well-formed classroom batch', async () => {
    const { validate } = makeService();
    await expect(validate(valid)).resolves.toBeUndefined();
  });

  it('requires a branch for classroom and forbids one for live-online', async () => {
    const { validate } = makeService();
    expect((await errorsOf(validate({ ...valid, branchId: null }))).branchId).toBeDefined();

    const { validate: validate2 } = makeService();
    expect(
      (await errorsOf(validate2({ ...valid, mode: 'live_online', branchId: 'b1' }))).branchId?.[0],
    ).toMatch(/no branch/);
  });

  it('rejects a mode the course is not offered in', async () => {
    const { validate } = makeService([], classroomOnly);
    const errors = await errorsOf(validate({ ...valid, mode: 'live_online', branchId: null }));
    expect(errors.mode?.[0]).toMatch(/not offered as live online/);
  });

  it('orders dates and times', async () => {
    const { validate } = makeService();
    const errors = await errorsOf(
      validate({ ...valid, endsOn: '2029-12-31', startTime: '20:30', endTime: '18:30' }),
    );
    expect(Object.keys(errors).sort()).toEqual(['endTime', 'endsOn']);
  });

  it('reports unknown branch and teacher ids, and collects everything at once', async () => {
    const { validate } = makeService([[], []]);
    const errors = await errorsOf(validate({ ...valid, teacherId: 't-missing', endTime: '18:00' }));
    expect(errors.branchId).toEqual(['Unknown branch']);
    expect(errors.teacherId).toEqual(['Unknown teacher']);
    expect(errors.endTime).toBeDefined();
  });

  it('does not look a branch up when the branch rule already failed', async () => {
    const { validate, db } = makeService([]);
    await errorsOf(validate({ ...valid, mode: 'live_online' }));
    expect(db.select).not.toHaveBeenCalled();
  });
});
