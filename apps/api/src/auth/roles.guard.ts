import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { UserRole } from '@repo/db';

import { ROLES_KEY } from '../common/decorators/roles.decorator.js';
import type { AuthenticatedRequest } from './authenticated-request.js';

/**
 * Enforces `@Roles()`.
 *
 * Registered globally after WorkosAuthGuard, so by the time it runs a
 * protected request already carries `request.user`. Routes without the
 * decorator pass straight through; the only thing this guard ever adds is a
 * 403 for a signed-in caller whose role is not on the list.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<UserRole[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required || required.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    /* Reaching here without a user means `@Roles()` was combined with
       `@Public()`, which is a wiring mistake — fail closed rather than open. */
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (!required.includes(user.role)) {
      throw new ForbiddenException(`This action requires the ${required.join(' or ')} role`);
    }

    return true;
  }
}
