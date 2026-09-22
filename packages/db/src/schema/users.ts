import { relations } from 'drizzle-orm';
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { userRoleEnum } from './enums.js';

/**
 * Local mirror of a WorkOS user.
 *
 * WorkOS remains the identity provider and the source of truth for
 * credentials; this table exists so application data can hold a stable
 * foreign key and so we can attach domain fields WorkOS knows nothing about.
 * Rows are upserted on `workosId` the first time a verified token is seen.
 *
 * `role` is the application's own authorization flag, independent of anything
 * WorkOS knows. It defaults to `student`; the API promotes a row to `admin`
 * when its email is on the `ADMIN_EMAILS` allowlist.
 */
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    /** The `sub` claim of a verified WorkOS access token. */
    workosId: text('workos_id').notNull().unique(),
    email: text('email').notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    profilePictureUrl: text('profile_picture_url'),
    role: userRoleEnum('role').notNull().default('student'),
    /**
     * The counselor shown on the student's portal overview, assigned by an
     * admin. Free text per student rather than a roster reference — the
     * counselor is often not on the teaching faculty. All null means no
     * counselor is assigned yet; `name` carries the assignment.
     */
    counselorName: text('counselor_name'),
    counselorRole: text('counselor_role'),
    counselorEmail: text('counselor_email'),
    counselorPhone: text('counselor_phone'),
    counselorNextCheckIn: timestamp('counselor_next_check_in', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('users_email_idx').on(table.email)],
);

export const usersRelations = relations(users, () => ({}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
