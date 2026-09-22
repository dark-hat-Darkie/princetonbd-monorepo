import { describe, expect, it, vi } from 'vitest';

import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { TestimonialsService } from './testimonials.service.js';

describe('TestimonialsService', () => {
  describe('create', () => {
    it('throws ValidationFailedException with unknown course id and never calls db.transaction', async () => {
      const db = {
        select: vi.fn(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([]),
        })),
        insert: vi.fn(),
        transaction: vi.fn(),
      };
      const service = new TestimonialsService(db as never);

      await expect(
        service.create({
          name: 'Test',
          result: 'Test Result',
          quote: 'Test Quote',
          courseIds: ['unknown-course-id'],
        }),
      ).rejects.toThrow(ValidationFailedException);

      expect(db.transaction).not.toHaveBeenCalled();
    });
  });
});
