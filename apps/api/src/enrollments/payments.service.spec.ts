import { NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { PaymentsService } from './payments.service.js';

const enrollment = {
  id: 'enroll-1',
  userId: 'user-1',
  courseId: 'course-1',
  batchId: null,
  status: 'pending_payment',
};

function attempt(id: string, reference: string) {
  return {
    id,
    enrollmentId: 'enroll-1',
    providerReference: reference,
    amount: 8500,
    currency: 'BDT',
    status: 'pending',
  };
}

/**
 * Stubbed query chain. Convention: every `selects` entry is the ROWS array
 * the terminal call resolves — `.limit()` and the thenable `.orderBy()`
 * both hand the entry straight to `const [row]` / `for...of`. Every
 * `writes` entry is the rows one tx `.returning()` resolves.
 */
function makeService(
  selects: unknown[][],
  writes: unknown[][],
  statuses: Record<string, 'pending' | 'success'>,
) {
  const selectQueue = [...selects];
  const writeQueue = [...writes];
  const chain = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    innerJoin: vi.fn().mockReturnThis(),
    leftJoin: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn(() => Promise.resolve(selectQueue.shift() ?? [])),
    then: (resolve: (value: unknown) => void) => resolve(selectQueue.shift() ?? []),
  };
  const tx = {
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          returning: vi.fn(() => Promise.resolve(writeQueue.shift() ?? [])),
        }),
      }),
    }),
  };
  const db = {
    select: vi.fn().mockReturnValue(chain),
    transaction: vi.fn((callback: (tx: unknown) => Promise<unknown>) => callback(tx)),
  };
  const enrollmentsService = { loadOwned: vi.fn().mockResolvedValue({ ...enrollment }) };
  const provider = {
    getOutcome: vi.fn((reference: string) =>
      Promise.resolve({
        reference,
        sourceSite: 'princetonbd',
        externalUserId: 'user-1',
        paymentStatus: statuses[reference] ?? 'pending',
        payableAmount: 8500,
        currency: 'BDT',
        paidAt: null,
        raw: { payable_amount: 8500 },
      }),
    ),
  };
  const service = new PaymentsService(db as never, enrollmentsService as never, provider as never);
  return { service, provider };
}

describe('PaymentsService.verifyStatus across attempts', () => {
  it('grants active when an older attempt settled but the latest is still pending', async () => {
    const fresh = attempt('a-new', 'PAY-NEW');
    const older = attempt('a-old', 'PAY-OLD');
    const { service, provider } = makeService(
      [[{ ...fresh }, { ...older }], [{ ...fresh }], [{ ...older }]],
      [
        [{ ...fresh }],
        [{ ...enrollment }],
        [{ ...older, status: 'success' }],
        [{ ...enrollment, status: 'active' }],
      ],
      { 'PAY-NEW': 'pending', 'PAY-OLD': 'success' },
    );

    const result = await service.verifyStatus({ id: 'user-1' } as never, 'enroll-1');

    expect(result.enrollmentStatus).toBe('active');
    expect(result.attemptId).toBe('a-old');
    expect(provider.getOutcome).toHaveBeenCalledWith('PAY-NEW');
    expect(provider.getOutcome).toHaveBeenCalledWith('PAY-OLD');
  });

  it('verifies by reference for the owning learner', async () => {
    const owned = attempt('a-owned', 'PAY-OWNED');
    const { service } = makeService(
      [
        [{ enrollment: { ...enrollment, status: 'pending_payment' } }],
        [{ ...owned }],
        [{ ...owned }],
      ],
      [[{ ...owned, status: 'success' }], [{ ...enrollment, status: 'active' }]],
      { 'PAY-OWNED': 'success' },
    );

    const result = await service.verifyByReference({ id: 'user-1' } as never, 'PAY-OWNED');

    expect(result.enrollmentStatus).toBe('active');
    expect(result.providerReference).toBe('PAY-OWNED');
  });

  it('404s a reference belonging to another learner', async () => {
    const { service } = makeService([[]], [], {});

    await expect(service.verifyByReference({ id: 'user-1' } as never, 'PAY-OTHER')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('stays pending when every open attempt is still pending', async () => {
    const only = attempt('a-only', 'PAY-ONLY');
    const { service } = makeService(
      [[{ ...only }], [{ ...only }], [{ ...only }]],
      [[{ ...only }], [{ ...enrollment }]],
      { 'PAY-ONLY': 'pending' },
    );

    const result = await service.verifyStatus({ id: 'user-1' } as never, 'enroll-1');

    expect(result.enrollmentStatus).toBe('pending_payment');
    expect(result.attemptStatus).toBe('pending');
  });
});
