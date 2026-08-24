import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { User } from '@repo/db';

import { IS_PUBLIC_KEY } from '../common/decorators/public.decorator.js';
import { UsersService } from '../users/users.service.js';
import { WorkosService, type WorkosAccessTokenClaims } from './workos.service.js';
import type { AuthenticatedRequest } from './authenticated-request.js';

/**
 * Validates the `Authorization: Bearer <token>` header against WorkOS.
 *
 * Registered globally in AppModule, so every route is protected unless it
 * carries `@Public()`. The API is a pure resource server — it never runs the
 * AuthKit login flow itself; `apps/web` does that and forwards the resulting
 * access token.
 */
@Injectable()
export class WorkosAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly workos: WorkosService,
    private readonly users: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = extractBearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const claims = await this.workos.verifyAccessToken(token);
    if (!claims) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.claims = claims;
    request.user = await this.resolveUser(claims);

    return true;
  }

  /**
   * Turn verified claims into the local `users` row.
   *
   * The token only identifies the user; it carries no email unless a custom
   * claim has been configured in WorkOS. So the profile is resolved in three
   * steps, cheapest first:
   *
   *   1. A custom `email` claim, if one is configured — free and current.
   *   2. An existing local row that already has an email — one indexed read,
   *      no write and no call to WorkOS on the hot path.
   *   3. Otherwise fetch the profile from the Management API and upsert it.
   *
   * The consequence of step 2 is that an email changed in WorkOS does not
   * propagate to an existing row. That is the deliberate trade for not making
   * an outbound API call on every authenticated request; configuring the custom
   * claim removes the staleness by moving every user onto step 1.
   */
  private async resolveUser(claims: WorkosAccessTokenClaims): Promise<User> {
    const existing = await this.users.findByWorkosId(claims.sub);
    const claimedEmail = typeof claims.email === 'string' ? claims.email : '';

    if (claimedEmail && claimedEmail !== existing?.email) {
      return this.users.upsertProfile(claims.sub, {
        email: claimedEmail,
        firstName: existing?.firstName ?? null,
        lastName: existing?.lastName ?? null,
        profilePictureUrl: existing?.profilePictureUrl ?? null,
      });
    }

    if (existing?.email) {
      return existing;
    }

    const profile = await this.workos.getUserProfile(claims.sub);

    if (!profile) {
      /* A row we cannot complete is worse than none: `email` is NOT NULL, and
         an empty one would be indistinguishable from a real account with no
         address. If a row already exists, serve it rather than failing. */
      if (existing) {
        return existing;
      }
      throw new ServiceUnavailableException('Could not load your profile. Please try again.');
    }

    return this.users.upsertProfile(claims.sub, profile);
  }
}

function extractBearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const [scheme, value] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !value) return null;
  return value;
}
