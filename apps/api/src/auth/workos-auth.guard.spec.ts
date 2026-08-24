import { ServiceUnavailableException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { WorkosAuthGuard } from './workos-auth.guard.js';
import type { WorkosAccessTokenClaims } from './workos.service.js';

/**
 * Covers how a verified token becomes a local `users` row.
 *
 * The bug these guard against: a WorkOS access token carries no email, so an
 * earlier version stored an empty string for every user and overwrote it on
 * every subsequent request.
 */
const claims = { sub: 'user_01ABC' } as WorkosAccessTokenClaims;

const stored = {
  id: 'uuid-1',
  workosId: 'user_01ABC',
  email: 'ada@example.com',
  firstName: 'Ada',
  lastName: 'Lovelace',
  profilePictureUrl: null,
};

function makeGuard({
  existing,
  profile,
}: {
  existing?: unknown;
  profile?: unknown;
} = {}) {
  const users = {
    findByWorkosId: vi.fn().mockResolvedValue(existing),
    upsertProfile: vi.fn().mockResolvedValue({ ...stored, ...(profile ?? {}) }),
  };
  const workos = {
    getUserProfile: vi.fn().mockResolvedValue(profile ?? null),
  };
  const guard = new WorkosAuthGuard({} as never, workos as never, users as never);

  /* `resolveUser` is private by design — it is an implementation detail of
     canActivate — but it is the whole of the logic worth testing, so it is
     reached directly rather than by building a fake ExecutionContext. */
  const resolve = (c: WorkosAccessTokenClaims = claims) =>
    (guard as unknown as { resolveUser(c: WorkosAccessTokenClaims): Promise<unknown> }).resolveUser(
      c,
    );

  return { guard, users, workos, resolve };
}

describe('WorkosAuthGuard user resolution', () => {
  it('fetches the WorkOS profile on first sight and stores the real email', async () => {
    const profile = {
      email: 'ada@example.com',
      firstName: 'Ada',
      lastName: 'Lovelace',
      profilePictureUrl: null,
    };
    const { workos, users, resolve } = makeGuard({ existing: undefined, profile });

    await resolve();

    expect(workos.getUserProfile).toHaveBeenCalledWith('user_01ABC');
    expect(users.upsertProfile).toHaveBeenCalledWith('user_01ABC', profile);
  });

  it('serves an existing row without writing or calling WorkOS', async () => {
    const { workos, users, resolve } = makeGuard({ existing: stored });

    const result = await resolve();

    expect(result).toBe(stored);
    expect(workos.getUserProfile).not.toHaveBeenCalled();
    expect(users.upsertProfile).not.toHaveBeenCalled();
  });

  /** The exact state the old implementation left every user in. */
  it('repairs a row whose email was left empty', async () => {
    const profile = {
      email: 'ada@example.com',
      firstName: null,
      lastName: null,
      profilePictureUrl: null,
    };
    const { workos, users, resolve } = makeGuard({
      existing: { ...stored, email: '' },
      profile,
    });

    await resolve();

    expect(workos.getUserProfile).toHaveBeenCalledOnce();
    expect(users.upsertProfile).toHaveBeenCalledWith('user_01ABC', profile);
  });

  it('uses a custom email claim when one is configured, without calling WorkOS', async () => {
    const { workos, users, resolve } = makeGuard({ existing: undefined });

    await resolve({ sub: 'user_01ABC', email: 'ada@example.com' });

    expect(workos.getUserProfile).not.toHaveBeenCalled();
    expect(users.upsertProfile).toHaveBeenCalledWith(
      'user_01ABC',
      expect.objectContaining({ email: 'ada@example.com' }),
    );
  });

  it('keeps serving a known user when WorkOS cannot be reached', async () => {
    const { users, resolve } = makeGuard({ existing: { ...stored, email: '' }, profile: null });

    const result = await resolve();

    expect(result).toEqual({ ...stored, email: '' });
    expect(users.upsertProfile).not.toHaveBeenCalled();
  });

  it('refuses to create a row it cannot complete', async () => {
    const { users, resolve } = makeGuard({ existing: undefined, profile: null });

    await expect(resolve()).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(users.upsertProfile).not.toHaveBeenCalled();
  });
});
