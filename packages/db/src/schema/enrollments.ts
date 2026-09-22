import {
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { batches } from './batches.js';
import { timestamps } from './columns.js';
import { courses } from './courses.js';
import { enrollmentStatusEnum, paymentAttemptStatusEnum } from './enums.js';
import { users } from './users.js';

/**
 * A learner's enrollment in a course (optionally one batch), independent of
 * any single payment attempt.
 *
 * The applicant fields are a snapshot taken at enrollment time: later profile
 * edits must not rewrite what the admin saw when the seat was granted. Money
 * itself never lives here — see `paymentAttempts` for the locked amount of
 * each attempt.
 *
 * Uniqueness is one row per (user, batch) when a batch is chosen. Postgres
 * treats NULLs as distinct, so course-only enrollments (batchId NULL) are
 * intentionally repeatable while batch enrollments cannot double up.
 */
export const enrollments = pgTable(
  'enrollments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'restrict' }),
    batchId: uuid('batch_id').references(() => batches.id, { onDelete: 'set null' }),
    status: enrollmentStatusEnum('status').notNull().default('draft'),
    fullName: text('full_name').notNull().default(''),
    dateOfBirth: date('date_of_birth'),
    phone: text('phone'),
    educationLevel: text('education_level'),
    institution: text('institution'),
    graduationYear: integer('graduation_year'),
    addressLine1: text('address_line1'),
    addressLine2: text('address_line2'),
    city: text('city'),
    notes: text('notes'),
    ...timestamps,
  },
  (table) => [
    index('enrollments_user_idx').on(table.userId),
    index('enrollments_course_idx').on(table.courseId),
    index('enrollments_status_idx').on(table.status),
    uniqueIndex('enrollments_user_batch_idx').on(table.userId, table.batchId),
  ],
);

/**
 * One attempt to pay for an enrollment through the centralized payment app.
 *
 * `id` doubles as the provider's `external_reference` (idempotency key), and
 * `providerReference` is the provider's `PAY-...` transaction id once created.
 * `amount` is locked here at init from our own course/batch price and is never
 * taken from client input or the provider callback. `lastProviderPayload` is a
 * redacted audit copy of the last status response — never card data.
 */
export const paymentAttempts = pgTable(
  'payment_attempts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    enrollmentId: uuid('enrollment_id')
      .notNull()
      .references(() => enrollments.id, { onDelete: 'cascade' }),
    providerReference: text('provider_reference').unique(),
    amount: integer('amount').notNull(),
    currency: text('currency').notNull().default('BDT'),
    status: paymentAttemptStatusEnum('status').notNull().default('pending'),
    successUrl: text('success_url'),
    cancelUrl: text('cancel_url'),
    lastProviderPayload: jsonb('last_provider_payload').$type<Record<string, unknown>>(),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    index('payment_attempts_enrollment_idx').on(table.enrollmentId),
    index('payment_attempts_status_idx').on(table.status),
  ],
);

export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;
export type PaymentAttempt = typeof paymentAttempts.$inferSelect;
export type NewPaymentAttempt = typeof paymentAttempts.$inferInsert;
