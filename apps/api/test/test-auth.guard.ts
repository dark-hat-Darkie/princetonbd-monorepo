import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { User } from '@repo/db';

import type { AuthenticatedRequest } from '../src/auth/authenticated-request.js';
import { IS_PUBLIC_KEY } from '../src/common/decorators/public.decorator.js';

/** Header an e2e request sets to say who it is. */
export const TEST_USER_HEADER = 'x-test-user';

/** Rows the suite inserted, keyed by the value sent in the header. */
export const testUsers = new Map<string, User>();

/**
 * Stands in for WorkosAuthGuard in e2e tests.
 *
 * The real guard needs a WorkOS-signed JWT, which a test cannot mint. This
 * one honours `@Public()` exactly like the real guard and otherwise attaches
 * whichever seeded user the request names. RolesGuard still runs unmodified
 * behind it, so 403s are tested for real.
 */
@Injectable()
export class TestAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const who = request.headers[TEST_USER_HEADER];
    const user = typeof who === 'string' ? testUsers.get(who) : undefined;

    if (!user) {
      /* Worded differently from the real guard's 401 so a suite can tell
         "the override did not apply" from "this request named nobody". */
      throw new UnauthorizedException(
        typeof who === 'string' ? `No test user named "${who}"` : 'No test user header',
      );
    }

    request.user = user;
    return true;
  }
}
