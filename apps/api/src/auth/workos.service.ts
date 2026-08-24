import { Injectable, Logger } from '@nestjs/common';
import type { ApiEnv } from '@repo/env/api';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import { WorkOS } from '@workos-inc/node';

import { InjectEnv } from '../config/env.module.js';

/** Claims WorkOS puts on an AuthKit access token. */
export interface WorkosAccessTokenClaims extends JWTPayload {
  /** WorkOS user id. */
  sub: string;
  /** Session id. */
  sid?: string;
  /** Organization id, when the session is scoped to one. */
  org_id?: string;
  role?: string;
  permissions?: string[];
  /**
   * NOT present by default. WorkOS deliberately keeps personal data out of the
   * access token; this only appears if a custom claim has been configured in
   * the WorkOS dashboard. Anything reading it must cope with `undefined` —
   * treating it as always-present silently stores empty emails for every user.
   */
  email?: string;
}

/**
 * The fields of a WorkOS user that the local `users` table mirrors.
 *
 * Deliberately narrower than the SDK's `User`: this is the contract between
 * the identity provider and our row, and it should not widen just because the
 * SDK's type does.
 */
export interface WorkosUserProfile {
  email: string;
  firstName: string | null;
  lastName: string | null;
  profilePictureUrl: string | null;
}

@Injectable()
export class WorkosService {
  private readonly logger = new Logger(WorkosService.name);
  private readonly workos: WorkOS;

  /**
   * Remote JWKS with an in-process cache. Built once so key material is
   * fetched on first use and reused afterwards — verification costs no network
   * round trip per request, and key rotation is picked up automatically.
   */
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(@InjectEnv() private readonly env: ApiEnv) {
    this.workos = new WorkOS(this.env.WORKOS_API_KEY, { clientId: this.env.WORKOS_CLIENT_ID });
    this.jwks = createRemoteJWKSet(
      new URL(this.workos.userManagement.getJwksUrl(this.env.WORKOS_CLIENT_ID)),
    );
  }

  get client(): WorkOS {
    return this.workos;
  }

  /**
   * Fetch a user's profile from the WorkOS Management API.
   *
   * Needed because the access token carries only `sub` — the email and name
   * live behind this call unless a custom claim has been configured.
   *
   * Returns `null` rather than throwing so the caller can decide whether a
   * WorkOS outage is fatal for that request; for a caller that already holds a
   * local row it usually is not.
   */
  async getUserProfile(userId: string): Promise<WorkosUserProfile | null> {
    try {
      const user = await this.workos.userManagement.getUser(userId);
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePictureUrl: user.profilePictureUrl,
      };
    } catch (error) {
      this.logger.warn(`Could not load WorkOS profile for ${userId}: ${(error as Error).message}`);
      return null;
    }
  }

  /**
   * Verify an AuthKit access token's signature, issuer and expiry.
   *
   * Returns the claims on success and `null` on any failure — callers turn
   * that into a 401. The reason is logged at debug level only: a verification
   * failure is normal traffic (expired tokens, probes), not an incident.
   */
  async verifyAccessToken(token: string): Promise<WorkosAccessTokenClaims | null> {
    try {
      const { payload } = await jwtVerify(token, this.jwks);
      if (typeof payload.sub !== 'string' || payload.sub.length === 0) {
        return null;
      }
      return payload as WorkosAccessTokenClaims;
    } catch (error) {
      this.logger.debug(`Access token rejected: ${(error as Error).message}`);
      return null;
    }
  }
}
