import { ConflictException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { BranchesService } from './branches.service.js';

describe('BranchesService', () => {
  describe('remove', () => {
    it('throws ConflictException and never calls db.delete when batch count is 1', async () => {
      const db = {
        select: vi.fn(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([{ value: 1 }]),
        })),
        delete: vi.fn(),
      };
      const service = new BranchesService(db as never);

      await expect(service.remove('branch-1')).rejects.toThrow(ConflictException);
      expect(db.delete).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('derives slug from name', async () => {
      const insertChain = {
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: 'branch-1' }]),
      };
      const selectChain = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([
          {
            id: 'branch-1',
            slug: 'dhaka-gulshan',
            name: 'Dhaka — Gulshan',
            address: null,
            phone: null,
            isActive: true,
            sortOrder: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]),
      };
      const db = {
        insert: vi.fn().mockReturnValue(insertChain),
        select: vi.fn().mockReturnValue(selectChain),
        insertChain,
      };
      const service = new BranchesService(db as never);

      const result = await service.create({ name: 'Dhaka — Gulshan' });

      expect(db.insert).toHaveBeenCalledOnce();
      expect(insertChain.values).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'dhaka-gulshan' }),
      );
      expect(result.slug).toBe('dhaka-gulshan');
    });
  });
});
