import { describe, expect, it, vi } from 'vitest';

import { UsersService } from './users.service.js';
import type { WorkosUserProfile } from '../auth/workos.service.js';

/**
 * Unit tests instantiate the service directly rather than going through Nest's
 * testing module: there is no DI graph worth exercising here, and a plain
 * constructor call keeps the test honest about what it covers.
 */
function makeDb(returning: unknown[]) {
  const chain = {
    values: vi.fn().mockReturnThis(),
    onConflictDoUpdate: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue(returning),
  };
  return {
    insert: vi.fn().mockReturnValue(chain),
    chain,
  };
}

const profile: WorkosUserProfile = {
  email: 'ada@example.com',
  firstName: 'Ada',
  lastName: 'Lovelace',
  profilePictureUrl: null,
};

describe('UsersService.upsertProfile', () => {
  it('upserts on workosId so concurrent first requests cannot collide', async () => {
    const row = { id: 'uuid-1', workosId: 'user_01ABC', email: 'ada@example.com' };
    const db = makeDb([row]);
    const service = new UsersService(db as never);

    const result = await service.upsertProfile('user_01ABC', profile);

    expect(result).toBe(row);
    expect(db.insert).toHaveBeenCalledOnce();
    expect(db.chain.values).toHaveBeenCalledWith(
      expect.objectContaining({ workosId: 'user_01ABC', email: 'ada@example.com' }),
    );
    // The conflict path must update, not silently do nothing, or a changed
    // email in WorkOS would never propagate.
    expect(db.chain.onConflictDoUpdate).toHaveBeenCalledOnce();
  });

  it('persists every profile field it is given', async () => {
    const db = makeDb([{ id: 'uuid-2' }]);
    const service = new UsersService(db as never);

    await service.upsertProfile('user_01ABC', profile);

    expect(db.chain.values).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Ada',
        lastName: 'Lovelace',
        profilePictureUrl: null,
      }),
    );
  });

  /**
   * Regression guard. This method used to take raw token claims and read
   * `claims.email` from them — a claim WorkOS does not issue — so it wrote an
   * empty string for every user and rewrote it on every request. It now takes
   * a resolved profile, and there is no code path that can invent one.
   */
  it('takes a resolved profile rather than reading token claims', () => {
    /* `in` rather than reading the method off the prototype: pulling an unbound
       method out just to inspect it is the pattern typescript-eslint warns
       about, and presence is all this assertion needs. */
    expect('upsertFromClaims' in UsersService.prototype).toBe(false);
    expect('upsertProfile' in UsersService.prototype).toBe(true);
  });
});
