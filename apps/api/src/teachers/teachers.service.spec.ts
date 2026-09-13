import { ConflictException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { TeachersService } from './teachers.service.js';

describe('TeachersService', () => {
  describe('remove', () => {
    it('throws ConflictException and never calls db.delete when a course assignment exists', async () => {
      const db = {
        select: vi.fn(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([{ value: 1 }]),
        })),
        delete: vi.fn(),
      };
      const service = new TeachersService(db as never);

      await expect(service.remove('teacher-1')).rejects.toThrow(ConflictException);
      expect(db.delete).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('throws ValidationFailedException with unknown branchId and never calls insert', async () => {
      const db = {
        select: vi.fn(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([]),
        })),
        insert: vi.fn(),
      };
      const service = new TeachersService(db as never);

      await expect(
        service.create({
          name: 'Farzana Haque',
          designation: 'Instructor',
          branchId: 'unknown-id',
        }),
      ).rejects.toThrow(ValidationFailedException);
      expect(db.insert).not.toHaveBeenCalled();
    });
  });
});
