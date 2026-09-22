import { relations } from 'drizzle-orm';

import { batches } from './batches.js';
import { branches } from './branches.js';
import { courseTeachers, courses, curriculumModules } from './courses.js';
import { enrollments, paymentAttempts } from './enrollments.js';
import { teachers } from './teachers.js';
import { courseTestimonials, testimonials } from './testimonials.js';
import { users } from './users.js';

/**
 * Relational-query wiring for the CMS tables, kept in one file on purpose.
 *
 * `relations()` needs both sides of every edge in scope. Declaring them next
 * to each table would make courses.ts import batches.ts and vice versa, and
 * this package is CommonJS, where a require cycle hands one side an empty
 * object at load time. A single file that imports every table has no cycle.
 *
 * These power `db.query.courses.findFirst({ with: { modules, batches, ... } })`
 * in the API; `createDb` already passes the schema (this file included)
 * to drizzle.
 */
export const branchesRelations = relations(branches, ({ many }) => ({
  teachers: many(teachers),
  batches: many(batches),
}));

export const teachersRelations = relations(teachers, ({ one, many }) => ({
  branch: one(branches, { fields: [teachers.branchId], references: [branches.id] }),
  courseTeachers: many(courseTeachers),
  batches: many(batches),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  modules: many(curriculumModules),
  batches: many(batches),
  courseTeachers: many(courseTeachers),
  courseTestimonials: many(courseTestimonials),
}));

export const curriculumModulesRelations = relations(curriculumModules, ({ one }) => ({
  course: one(courses, { fields: [curriculumModules.courseId], references: [courses.id] }),
}));

export const courseTeachersRelations = relations(courseTeachers, ({ one }) => ({
  course: one(courses, { fields: [courseTeachers.courseId], references: [courses.id] }),
  teacher: one(teachers, { fields: [courseTeachers.teacherId], references: [teachers.id] }),
}));

export const batchesRelations = relations(batches, ({ one }) => ({
  course: one(courses, { fields: [batches.courseId], references: [courses.id] }),
  branch: one(branches, { fields: [batches.branchId], references: [branches.id] }),
  teacher: one(teachers, { fields: [batches.teacherId], references: [teachers.id] }),
}));

export const testimonialsRelations = relations(testimonials, ({ many }) => ({
  courseTestimonials: many(courseTestimonials),
}));

export const courseTestimonialsRelations = relations(courseTestimonials, ({ one }) => ({
  course: one(courses, { fields: [courseTestimonials.courseId], references: [courses.id] }),
  testimonial: one(testimonials, {
    fields: [courseTestimonials.testimonialId],
    references: [testimonials.id],
  }),
}));

export const enrollmentsRelations = relations(enrollments, ({ one, many }) => ({
  user: one(users, { fields: [enrollments.userId], references: [users.id] }),
  course: one(courses, { fields: [enrollments.courseId], references: [courses.id] }),
  batch: one(batches, { fields: [enrollments.batchId], references: [batches.id] }),
  paymentAttempts: many(paymentAttempts),
}));

export const paymentAttemptsRelations = relations(paymentAttempts, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [paymentAttempts.enrollmentId],
    references: [enrollments.id],
  }),
}));
