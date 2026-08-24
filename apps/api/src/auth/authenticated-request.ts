import type { Request } from 'express';
import type { User } from '@repo/db';

import type { WorkosAccessTokenClaims } from './workos.service.js';

/** A request that has passed WorkosAuthGuard. */
export interface AuthenticatedRequest extends Request {
  user: User;
  claims: WorkosAccessTokenClaims;
}
