import { timestamp } from 'drizzle-orm/pg-core';

/**
 * The audit pair every table carries. Spread into a table definition
 * (`...timestamps`) so the column names, timezone handling and the
 * `$onUpdate` hook cannot differ from one table to the next.
 */
export const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
