import { Injectable } from '@nestjs/common';
import { eq, type Database, type User, users } from '@repo/db';

import { InjectDb } from '../database/database.module.js';
import type { WorkosUserProfile } from '../auth/workos.service.js';

@Injectable()
export class UsersService {
  constructor(@InjectDb() private readonly db: Database) {}

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
    const [row] = await this.db
      .insert(users)
      .values({ workosId, ...profile })
      .onConflictDoUpdate({
        target: users.workosId,
        set: { ...profile, updatedAt: new Date() },
      })
      .returning();

    /* `.returning()` on an upsert always yields the affected row. */
    return row!;
  }
}
