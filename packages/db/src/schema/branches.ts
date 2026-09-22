import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.js';

/**
 * A physical campus a classroom batch runs at.
 *
 * `slug` is the stable handle the seed script and URLs use; `name` is what a
 * visitor reads ("Dhaka — Gulshan"). Deactivating hides a branch from public
 * lists without breaking the batches that already reference it.
 */
export const branches = pgTable('branches', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  address: text('address'),
  phone: text('phone'),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

export type Branch = typeof branches.$inferSelect;
export type NewBranch = typeof branches.$inferInsert;
