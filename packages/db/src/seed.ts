import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, inArray, sql } from 'drizzle-orm';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Pool } from 'pg';

import { shouldUseSsl } from './client.js';
import * as schema from './schema/index.js';
import type { BatchStatus, CourseStatus, DeliveryMode, Weekday } from './schema/index.js';

/**
 * Load `seed/cms-seed.json` into the CMS tables.
 *
 * Idempotent by construction so it can be re-run after a schema change or on
 * a fresh environment without producing duplicates:
 *
 *   - branches, teachers and courses are upserted on `slug`;
 *   - a course's modules and teacher assignments are replaced wholesale,
 *     which is also what the admin editor does;
 *   - batches are only inserted for a course that has none, and testimonials
 *     only when the table is empty — those are the rows an admin is most
 *     likely to have edited by hand, and a seed must never undo that.
 *
 * Runs over the direct (unpooled) connection like `migrate.ts`, because it
 * is a one-off operator task rather than request traffic.
 */

interface SeedModule {
  position: number;
  title: string;
  summary: string;
  topics: string[];
  hours: number | null;
  outcome: string | null;
}

export interface CmsSeed {
  branches: {
    slug: string;
    name: string;
    address: string | null;
    phone: string | null;
    sortOrder: number;
  }[];
  teachers: {
    slug: string;
    name: string;
    designation: string;
    bio: string;
    branchSlug: string | null;
    sortOrder: number;
  }[];
  courses: {
    slug: string;
    name: string;
    description: string;
    priceAmount: number;
    priceUnit: string;
    feeIncludes: string[];
    modes: DeliveryMode[];
    status: CourseStatus;
    durationWeeks: number | null;
    taughtHours: number | null;
    mockCount: number | null;
    classSize: string | null;
    outcomes: string[];
    sortOrder: number;
    modules: SeedModule[];
    teacherSlugs: string[];
  }[];
  batches: {
    courseSlug: string;
    branchSlug: string | null;
    teacherSlug: string | null;
    mode: DeliveryMode;
    startsOn: string;
    endsOn: string;
    days: Weekday[];
    startTime: string;
    endTime: string;
    status: BatchStatus;
    seatsLeft: number | null;
    feeAmount: number | null;
  }[];
  testimonials: {
    name: string;
    result: string;
    quote: string;
    courseSlugs: string[];
    sortOrder: number;
  }[];
}

function lookup(map: Map<string, string>, key: string, what: string): string {
  const value = map.get(key);
  if (value === undefined) throw new Error(`[seed] unknown ${what}: ${key}`);
  return value;
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL_UNPOOLED;

  if (!connectionString) {
    throw new Error('DATABASE_URL_UNPOOLED is required to seed.');
  }

  // CommonJS package: `__dirname` resolves to src/ under tsx and dist/ when
  // compiled; the seed folder sits beside both.
  const seedFile = path.resolve(__dirname, '..', 'seed', 'cms-seed.json');
  const seed = JSON.parse(readFileSync(seedFile, 'utf8')) as CmsSeed;

  const pool = new Pool({
    connectionString,
    max: 1,
    ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: true } : false,
  });
  const db = drizzle(pool, { schema });

  try {
    await db.transaction(async (tx) => {
      /* Branches */
      const branchIds = new Map<string, string>();
      for (const branch of seed.branches) {
        const [row] = await tx
          .insert(schema.branches)
          .values(branch)
          .onConflictDoUpdate({
            target: schema.branches.slug,
            set: {
              name: branch.name,
              address: branch.address,
              phone: branch.phone,
              sortOrder: branch.sortOrder,
              updatedAt: new Date(),
            },
          })
          .returning({ id: schema.branches.id });
        branchIds.set(branch.slug, row!.id);
      }

      /* Teachers */
      const teacherIds = new Map<string, string>();
      for (const teacher of seed.teachers) {
        const { branchSlug, ...fields } = teacher;
        const branchId = branchSlug ? lookup(branchIds, branchSlug, 'branch') : null;
        const [row] = await tx
          .insert(schema.teachers)
          .values({ ...fields, branchId })
          .onConflictDoUpdate({
            target: schema.teachers.slug,
            set: {
              name: fields.name,
              designation: fields.designation,
              bio: fields.bio,
              branchId,
              sortOrder: fields.sortOrder,
              updatedAt: new Date(),
            },
          })
          .returning({ id: schema.teachers.id });
        teacherIds.set(teacher.slug, row!.id);
      }

      /* Courses, with their modules and teacher assignments replaced */
      const courseIds = new Map<string, string>();
      for (const course of seed.courses) {
        const { modules, teacherSlugs, ...fields } = course;
        const [row] = await tx
          .insert(schema.courses)
          .values(fields)
          .onConflictDoUpdate({
            target: schema.courses.slug,
            set: { ...fields, updatedAt: new Date() },
          })
          .returning({ id: schema.courses.id });
        const courseId = row!.id;
        courseIds.set(course.slug, courseId);

        await tx
          .delete(schema.curriculumModules)
          .where(eq(schema.curriculumModules.courseId, courseId));
        if (modules.length > 0) {
          await tx
            .insert(schema.curriculumModules)
            .values(modules.map((module) => ({ ...module, courseId })));
        }

        await tx.delete(schema.courseTeachers).where(eq(schema.courseTeachers.courseId, courseId));
        if (teacherSlugs.length > 0) {
          await tx.insert(schema.courseTeachers).values(
            teacherSlugs.map((slug, position) => ({
              courseId,
              teacherId: lookup(teacherIds, slug, 'teacher'),
              position,
            })),
          );
        }
      }

      /* Batches: only for courses that have none yet */
      const seededCourseIds = [...courseIds.values()];
      const withBatches = new Set(
        (
          await tx
            .selectDistinct({ courseId: schema.batches.courseId })
            .from(schema.batches)
            .where(inArray(schema.batches.courseId, seededCourseIds))
        ).map((entry) => entry.courseId),
      );
      const newBatches = seed.batches
        .map((batch) => {
          const { courseSlug, branchSlug, teacherSlug, ...fields } = batch;
          return {
            ...fields,
            courseId: lookup(courseIds, courseSlug, 'course'),
            branchId: branchSlug ? lookup(branchIds, branchSlug, 'branch') : null,
            teacherId: teacherSlug ? lookup(teacherIds, teacherSlug, 'teacher') : null,
          };
        })
        .filter((batch) => !withBatches.has(batch.courseId));
      if (newBatches.length > 0) {
        await tx.insert(schema.batches).values(newBatches);
      }

      /* Testimonials: only into an empty table */
      const [{ existing }] = (await tx
        .select({ existing: sql<number>`count(*)::int` })
        .from(schema.testimonials)) as [{ existing: number }];
      let insertedTestimonials = 0;
      if (existing === 0) {
        for (const testimonial of seed.testimonials) {
          const { courseSlugs, ...fields } = testimonial;
          const [row] = await tx
            .insert(schema.testimonials)
            .values(fields)
            .returning({ id: schema.testimonials.id });
          insertedTestimonials += 1;
          if (courseSlugs.length > 0) {
            await tx.insert(schema.courseTestimonials).values(
              courseSlugs.map((slug) => ({
                courseId: lookup(courseIds, slug, 'course'),
                testimonialId: row!.id,
              })),
            );
          }
        }
      }

      console.warn(
        `[seed] ${String(seed.branches.length)} branches, ${String(seed.teachers.length)} teachers, ${String(seed.courses.length)} courses upserted; ${String(newBatches.length)} batches and ${String(insertedTestimonials)} testimonials inserted`,
      );
    });
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error('[seed] failed:', error);
  process.exit(1);
});
