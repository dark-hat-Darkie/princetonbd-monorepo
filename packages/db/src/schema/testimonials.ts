import { boolean, integer, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.js';
import { courses } from './courses.js';

/**
 * A student quote. `result` is the one-line outcome shown under the name
 * ("SAT 1540 · NUS, Singapore"). A testimonial is linked to the courses it
 * may appear on through `course_testimonials`; one quote can back several.
 */
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  result: text('result').notNull(),
  quote: text('quote').notNull(),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  ...timestamps,
});

export const courseTestimonials = pgTable(
  'course_testimonials',
  {
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),
    testimonialId: uuid('testimonial_id')
      .notNull()
      .references(() => testimonials.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.courseId, table.testimonialId] })],
);

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
export type CourseTestimonial = typeof courseTestimonials.$inferSelect;
