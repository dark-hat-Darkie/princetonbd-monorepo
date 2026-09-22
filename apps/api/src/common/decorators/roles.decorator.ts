import { SetMetadata, type CustomDecorator } from '@nestjs/common';
import type { UserRole } from '@repo/db';

export const ROLES_KEY = 'roles';

/**
 * Restrict a route (or a whole controller) to callers holding one of the
 * given roles. Evaluated by RolesGuard after WorkosAuthGuard has attached
 * the local user, so it is meaningless on a `@Public()` route.
 */
export const Roles = (...roles: UserRole[]): CustomDecorator => SetMetadata(ROLES_KEY, roles);
