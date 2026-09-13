import { sql } from 'drizzle-orm';
import { check, date, index, integer, pgTable, time, uuid } from 'drizzle-orm/pg-core';

import { branches } from './branches.js';
import { timestamps } from './columns.js';
import { courses } from './courses.js';
import { batchStatusEnum, deliveryModeEnum, weekdayEnum } from './enums.js';
import { teachers } from './teachers.js';

/**
 * One scheduled run of a course: when, where, in which mode, and who teaches.
 *
 * Dates are calendar days (`date`, read back as 'YYYY-MM-DD' strings) and
 * times are wall-clock (`time`, read back as 'HH:MM:SS'), both understood as
 * Asia/Dhaka. They are deliberately not `timestamptz`: a batch that meets
 * "Saturdays at 6:30 pm" is a local-time fact, and storing it as an instant
 * would shift it by an hour whenever the server's zone differed.
 *
 * `feeAmount` overrides the course price for this run (a live-online rate,
 * say); null means the course price applies. A classroom batch must name a
 * branch and a live-online batch must not — enforced by a CHECK so the rule
 * holds regardless of which client wrote the row.
 */
export const batches = pgTable(
  'batches',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),
    branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'restrict' }),
    teacherId: uuid('teacher_id').references(() => teachers.id, { onDelete: 'set null' }),
    mode: deliveryModeEnum('mode').notNull(),
    startsOn: date('starts_on').notNull(),
    endsOn: date('ends_on').notNull(),
    days: weekdayEnum('days').array().notNull(),
    startTime: time('start_time').notNull(),
    endTime: time('end_time').notNull(),
    status: batchStatusEnum('status').notNull().default('open'),
    seatsLeft: integer('seats_left'),
    feeAmount: integer('fee_amount'),
    ...timestamps,
  },
  (table) => [
    index('batches_course_starts_idx').on(table.courseId, table.startsOn),
    check(
      'batches_branch_matches_mode',
      sql`(${table.mode} = 'live_online' AND ${table.branchId} IS NULL) OR (${table.mode} = 'classroom' AND ${table.branchId} IS NOT NULL)`,
    ),
    check('batches_dates_ordered', sql`${table.endsOn} >= ${table.startsOn}`),
  ],
);

export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;
