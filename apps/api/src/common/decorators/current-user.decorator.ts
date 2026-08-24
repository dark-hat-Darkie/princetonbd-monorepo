import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { User } from '@repo/db';

import type { AuthenticatedRequest } from '../../auth/authenticated-request.js';

/**
 * Injects the local `users` row for the authenticated caller.
 *
 * Only valid on routes covered by WorkosAuthGuard; on a `@Public()` route
 * there is no user and this resolves to `undefined`.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User =>
    ctx.switchToHttp().getRequest<AuthenticatedRequest>().user,
);
