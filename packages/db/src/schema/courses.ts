import { sql } from 'drizzle-orm';
import { index, integer, pgTable, primaryKey, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.js';
import { courseStatusEnum, deliveryModeEnum } from './enums.js';
import { teachers } from './teachers.js';

/**
 * A course as sold: the thing a learner pays for. A batch is one scheduled
 * run of it (see batches.ts); the curriculum is its module list.
 *
 * Prices are whole taka in `priceAmount`; the currency is fixed to BDT and
 * lives in the API's response shape rather than a column nobody would vary.
 * `feeIncludes` and `outcomes` are the bullet lists on the fee card and at
 * the foot of the curriculum. `durationWeeks`, `taughtHours`, `mockCount` and
 * `classSize` are the four summary tiles above the curriculum; each is
 * optional so a course can be published before those are settled.
 *
 * Only `published` courses are served publicly. `archived` keeps the row and
 * its history but removes it from every public list.
 */
export const courses = pgTable(
  'courses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    description: text('description').notNull().default(''),
    thumbnailUrl: text('thumbnail_url'),
    priceAmount: integer('price_amount').notNull(),
    priceUnit: text('price_unit').notNull().default('per course'),
    feeIncludes: text('fee_includes')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    modes: deliveryModeEnum('modes').array().notNull(),
    status: courseStatusEnum('status').notNull().default('draft'),
    durationWeeks: integer('duration_weeks'),
    taughtHours: integer('taught_hours'),
    mockCount: integer('mock_count'),
    classSize: text('class_size'),
    outcomes: text('outcomes')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    sortOrder: integer('sort_order').notNull().default(0),
    ...timestamps,
  },
  (table) => [index('courses_status_sort_idx').on(table.status, table.sortOrder)],
);

/**
 * One module of a course's curriculum. `position` is 1-based display order
 * and is unique per course; the admin editor replaces the whole list in one
 * transaction, so positions never need renumbering in place.
 */
export const curriculumModules = pgTable(
  'curriculum_modules',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),
    position: integer('position').notNull(),
    title: text('title').notNull(),
    summary: text('summary').notNull().default(''),
    topics: text('topics')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    hours: integer('hours'),
    outcome: text('outcome'),
  },
  (table) => [
    uniqueIndex('curriculum_modules_course_position_idx').on(table.courseId, table.position),
  ],
);

/** Which teachers are shown on a course page, in `position` order. */
export const courseTeachers = pgTable(
  'course_teachers',
  {
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),
    teacherId: uuid('teacher_id')
      .notNull()
      .references(() => teachers.id, { onDelete: 'cascade' }),
    position: integer('position').notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.courseId, table.teacherId] })],
);

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type CurriculumModule = typeof curriculumModules.$inferSelect;
export type NewCurriculumModule = typeof curriculumModules.$inferInsert;
export type CourseTeacher = typeof courseTeachers.$inferSelect;
