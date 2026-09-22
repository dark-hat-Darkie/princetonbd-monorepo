import { boolean, index, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { branches } from './branches.js';
import { timestamps } from './columns.js';

/**
 * A member of the teaching faculty.
 *
 * `designation` is the title under the name ("Lead Instructor, Quantitative");
 * `bio` is the one-line credential the course page shows. `imageUrl` is the
 * public URL of an uploaded photo; when null the UI renders a monogram.
 * A teacher's home branch is informational — a teacher may still be assigned
 * to a batch at any branch.
 */
export const teachers = pgTable(
  'teachers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    designation: text('designation').notNull(),
    bio: text('bio').notNull().default(''),
    imageUrl: text('image_url'),
    branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'set null' }),
    isActive: boolean('is_active').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    ...timestamps,
  },
  (table) => [index('teachers_branch_idx').on(table.branchId)],
);

export type Teacher = typeof teachers.$inferSelect;
export type NewTeacher = typeof teachers.$inferInsert;
