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

const env = (adminEmails: string[] = []) => ({ ADMIN_EMAILS: adminEmails }) as never;

describe('UsersService.upsertProfile', () => {
  it('upserts on workosId so concurrent first requests cannot collide', async () => {
    const row = { id: 'uuid-1', workosId: 'user_01ABC', email: 'ada@example.com' };
    const db = makeDb([row]);
    const service = new UsersService(db as never, env());

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
    const service = new UsersService(db as never, env());

    await service.upsertProfile('user_01ABC', profile);

    expect(db.chain.values).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Ada',
        lastName: 'Lovelace',
        profilePictureUrl: null,
      }),
    );
  });

  it('promotes an allow-listed email on both the insert and the conflict path', async () => {
    const db = makeDb([{ id: 'uuid-3', role: 'admin' }]);
    const service = new UsersService(db as never, env(['ada@example.com']));

    await service.upsertProfile('user_01ABC', { ...profile, email: 'Ada@Example.com' });

    expect(db.chain.values).toHaveBeenCalledWith(expect.objectContaining({ role: 'admin' }));
    expect(db.chain.onConflictDoUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ set: expect.objectContaining({ role: 'admin' }) as unknown }),
    );
  });

  it('leaves the role alone for everyone else, so a demotion by hand sticks', async () => {
    const db = makeDb([{ id: 'uuid-4' }]);
    const service = new UsersService(db as never, env(['someone-else@example.com']));

    await service.upsertProfile('user_01ABC', profile);

    expect(db.chain.values).toHaveBeenCalledWith(expect.not.objectContaining({ role: 'admin' }));
    expect(db.chain.onConflictDoUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ set: expect.not.objectContaining({ role: 'admin' }) as unknown }),
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

describe('UsersService.applyAdminAllowlist', () => {
  const student = { id: 'uuid-1', email: 'ada@example.com', role: 'student' } as never;

  function makeUpdateDb(returning: unknown[]) {
    const chain = {
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue(returning),
    };
    return { update: vi.fn().mockReturnValue(chain), chain };
  }

  it('promotes an existing student row whose email is allow-listed', async () => {
    const promoted = { ...(student as object), role: 'admin' };
    const db = makeUpdateDb([promoted]);
    const service = new UsersService(db as never, env(['ada@example.com']));

    const result = await service.applyAdminAllowlist(student);

    expect(result).toEqual(promoted);
    expect(db.chain.set).toHaveBeenCalledWith({ role: 'admin' });
  });

  it('does not write when the row is already an admin or not listed', async () => {
    const db = makeUpdateDb([]);

    await new UsersService(db as never, env(['ada@example.com'])).applyAdminAllowlist({
      ...(student as object),
      role: 'admin',
    } as never);
    await new UsersService(db as never, env([])).applyAdminAllowlist(student);

    expect(db.update).not.toHaveBeenCalled();
  });
});
