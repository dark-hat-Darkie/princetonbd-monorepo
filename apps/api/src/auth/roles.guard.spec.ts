import { ForbiddenException, UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { RolesGuard } from './roles.guard.js';

function makeContext(user: { role: string } | undefined): ExecutionContext {
  return {
    getHandler: () => ({}),
    getClass: () => ({}),
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
  } as unknown as ExecutionContext;
}

function makeGuard(required: string[] | undefined) {
  const reflector = { getAllAndOverride: vi.fn().mockReturnValue(required) };
  return new RolesGuard(reflector as never);
}

describe('RolesGuard', () => {
  it('lets a route without @Roles through regardless of the caller', () => {
    expect(makeGuard(undefined).canActivate(makeContext({ role: 'student' }))).toBe(true);
    expect(makeGuard([]).canActivate(makeContext(undefined))).toBe(true);
  });

  it('admits a caller whose role is on the list', () => {
    expect(makeGuard(['admin']).canActivate(makeContext({ role: 'admin' }))).toBe(true);
  });

  it('rejects a signed-in caller with the wrong role with 403', () => {
    expect(() => makeGuard(['admin']).canActivate(makeContext({ role: 'student' }))).toThrow(
      ForbiddenException,
    );
  });

  /* `@Roles()` on a `@Public()` route would otherwise let anyone through. */
  it('fails closed when no user was attached', () => {
    expect(() => makeGuard(['admin']).canActivate(makeContext(undefined))).toThrow(
      UnauthorizedException,
    );
  });
});
