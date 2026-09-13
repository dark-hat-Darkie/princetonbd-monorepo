import { Injectable } from '@nestjs/common';
import { eq, type Database, type User, users } from '@repo/db';

import { InjectEnv, type ApiEnv } from '../config/env.module.js';
import { InjectDb } from '../database/database.module.js';
import type { WorkosUserProfile } from '../auth/workos.service.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectDb() private readonly db: Database,
    @InjectEnv() private readonly env: ApiEnv,
  ) {}

  /**
   * Whether an email is on the `ADMIN_EMAILS` bootstrap list.
   *
   * This is how the first admin comes to exist: there is no UI to grant the
   * role before someone holds it. The list only ever promotes — it never
   * demotes — so removing an address from it does not lock anyone out
   * mid-session; that is a deliberate `UPDATE users SET role` away.
   */
  private isAllowListedAdmin(email: string): boolean {
    return this.env.ADMIN_EMAILS.includes(email.trim().toLowerCase());
  }

  async findByWorkosId(workosId: string): Promise<User | undefined> {
    const [row] = await this.db.select().from(users).where(eq(users.workosId, workosId)).limit(1);
    return row;
  }

  async findById(id: string): Promise<User | undefined> {
    const [row] = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return row;
  }

  /**
   * Write the local row for a verified WorkOS identity, creating it on first
   * sight.
   *
   * WorkOS owns authentication; this table exists so application data has a
   * stable local foreign key. Written as a single `ON CONFLICT` upsert rather
   * than select-then-insert so two concurrent first requests for the same user
   * cannot race into a duplicate-key error.
   *
   * Takes a resolved profile rather than raw token claims. An access token
   * carries only `sub`, so a version of this that read `claims.email` stored an
   * empty string for every user — and, because the conflict branch wrote it
   * back, re-emptied the column on every subsequent request. Deciding where the
   * profile comes from is the caller's job (see WorkosAuthGuard); this method's
   * job is to persist it.
   */
  async upsertProfile(workosId: string, profile: WorkosUserProfile): Promise<User> {
    const promotion = this.isAllowListedAdmin(profile.email) ? { role: 'admin' as const } : {};

    const [row] = await this.db
      .insert(users)
      .values({ workosId, ...profile, ...promotion })
      .onConflictDoUpdate({
        target: users.workosId,
        set: { ...profile, ...promotion, updatedAt: new Date() },
      })
      .returning();

    /* `.returning()` on an upsert always yields the affected row. */
    return row!;
  }

  /**
   * Promote an existing row whose email has since been allow-listed.
   *
   * `upsertProfile` handles the first sign-in, but the guard serves a known
   * user from its row without writing, so an address added to `ADMIN_EMAILS`
   * after that first sign-in would otherwise never take effect. Cheap on the
   * hot path: an in-memory check, and a write only on the one request that
   * actually changes something.
   */
  async applyAdminAllowlist(user: User): Promise<User> {
    if (user.role === 'admin' || !this.isAllowListedAdmin(user.email)) {
      return user;
    }

    const [row] = await this.db
      .update(users)
      .set({ role: 'admin' })
      .where(eq(users.id, user.id))
      .returning();

    return row ?? { ...user, role: 'admin' };
  }
}
