import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  and,
  asc,
  courseTeachers,
  courses,
  curriculumModules,
  eq,
  gte,
  inArray,
  ne,
  teachers,
  type Database,
  type SQL,
} from '@repo/db';

import { PG_UNIQUE_VIOLATION, isPgError } from '../common/db-errors.js';
import { definedEntries } from '../common/defined-entries.js';
import { dhakaToday } from '../common/dhaka-date.js';
import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { slugify } from '../common/slug.js';
import { InjectDb } from '../database/database.module.js';
import { TeacherDto } from '../teachers/dto/teacher.dto.js';
import { CourseDetailDto, CourseSummaryDto, CurriculumModuleDto } from './dto/course.dto.js';
import type { CreateCourseDto } from './dto/create-course.dto.js';
import type { CurriculumModuleInputDto } from './dto/replace-curriculum.dto.js';
import type { UpdateCourseDto } from './dto/update-course.dto.js';

/**
 * Courses, their curriculum and their teacher assignments.
 *
 * Public reads only ever see `published` rows, and only batches a learner can
 * still join (not closed, not yet ended on the Dhaka calendar). Admin reads
 * see everything. Both go through the same relational queries so the two
 * views cannot disagree about what a course is.
 */
@Injectable()
export class CoursesService {
  constructor(@InjectDb() private readonly db: Database) {}

  /* --- public -------------------------------------------------------------- */

  async findPublishedSummaries(): Promise<CourseSummaryDto[]> {
    const rows = await this.loadSummaries({ publishedOnly: true });
    return rows.map((row) => CourseSummaryDto.fromEntity(row));
  }

  async findPublishedBySlug(slug: string): Promise<CourseDetailDto | null> {
    const row = await this.loadDetail(
      and(eq(courses.slug, slug), eq(courses.status, 'published')),
      { publicOnly: true },
    );
    return row ? CourseDetailDto.fromDetail(row, { publicOnly: true }) : null;
  }

  /* --- admin --------------------------------------------------------------- */

  async adminList(): Promise<CourseSummaryDto[]> {
    const rows = await this.loadSummaries({ publishedOnly: false });
    return rows.map((row) => CourseSummaryDto.fromEntity(row));
  }

  async adminGet(id: string): Promise<CourseDetailDto> {
    const row = await this.loadDetail(eq(courses.id, id), { publicOnly: false });
    if (!row) throw new NotFoundException(`Course ${id} not found`);
    return CourseDetailDto.fromDetail(row, { publicOnly: false });
  }

  async create(dto: CreateCourseDto): Promise<CourseDetailDto> {
    const slug = dto.slug ?? slugify(dto.name);
    if (!slug) {
      throw ValidationFailedException.forField('slug', 'Could not derive a slug from that name');
    }

    let id: string;
    try {
      const [row] = await this.db
        .insert(courses)
        .values({ ...dto, slug })
        .returning({ id: courses.id });
      id = row!.id;
    } catch (error) {
      throw this.translateUniqueViolation(error, slug);
    }

    return this.adminGet(id);
  }

  async update(id: string, dto: UpdateCourseDto): Promise<CourseDetailDto> {
    const changes = definedEntries(dto);

    if (Object.keys(changes).length > 0) {
      let updated: { id: string } | undefined;
      try {
        [updated] = await this.db
          .update(courses)
          .set(changes)
          .where(eq(courses.id, id))
          .returning({ id: courses.id });
      } catch (error) {
        throw this.translateUniqueViolation(error, changes.slug);
      }
      if (!updated) throw new NotFoundException(`Course ${id} not found`);
    }

    return this.adminGet(id);
  }

  async remove(id: string): Promise<void> {
    const [deleted] = await this.db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning({ id: courses.id });
    if (!deleted) throw new NotFoundException(`Course ${id} not found`);
  }

  /**
   * Replace the module list wholesale, inside one transaction, so a reader
   * never sees a half-written curriculum and positions are always 1..n.
   */
  async replaceCurriculum(
    id: string,
    modules: CurriculumModuleInputDto[],
  ): Promise<CurriculumModuleDto[]> {
    await this.assertExists(id);

    const rows = await this.db.transaction(async (tx) => {
      await tx.delete(curriculumModules).where(eq(curriculumModules.courseId, id));
      if (modules.length === 0) return [];
      return tx
        .insert(curriculumModules)
        .values(
          modules.map((module, index) => ({
            courseId: id,
            position: index + 1,
            title: module.title,
            summary: module.summary ?? '',
            topics: module.topics ?? [],
            hours: module.hours ?? null,
            outcome: module.outcome ?? null,
          })),
        )
        .returning();
    });

    return rows.map((row) => CurriculumModuleDto.fromEntity(row));
  }

  /** Replace the assignment list; order in the array is display order. */
  async replaceTeachers(id: string, teacherIds: string[]): Promise<TeacherDto[]> {
    await this.assertExists(id);

    if (teacherIds.length > 0) {
      const found = await this.db
        .select({ id: teachers.id })
        .from(teachers)
        .where(inArray(teachers.id, teacherIds));
      const known = new Set(found.map((row) => row.id));
      const missing = teacherIds.filter((teacherId) => !known.has(teacherId));
      if (missing.length > 0) {
        throw ValidationFailedException.forField(
          'teacherIds',
          `Unknown teacher${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`,
        );
      }
    }

    await this.db.transaction(async (tx) => {
      await tx.delete(courseTeachers).where(eq(courseTeachers.courseId, id));
      if (teacherIds.length > 0) {
        await tx
          .insert(courseTeachers)
          .values(teacherIds.map((teacherId, position) => ({ courseId: id, teacherId, position })));
      }
    });

    const links = await this.db.query.courseTeachers.findMany({
      where: eq(courseTeachers.courseId, id),
      orderBy: [asc(courseTeachers.position)],
      with: { teacher: { with: { branch: true } } },
    });
    return links.map((link) => TeacherDto.fromEntity(link.teacher));
  }

  /* --- internals ----------------------------------------------------------- */

  private async assertExists(id: string): Promise<void> {
    const [row] = await this.db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.id, id))
      .limit(1);
    if (!row) throw new NotFoundException(`Course ${id} not found`);
  }

  private translateUniqueViolation(error: unknown, slug: string | undefined): unknown {
    if (isPgError(error, PG_UNIQUE_VIOLATION)) {
      return new ConflictException(`A course with the slug "${slug ?? ''}" already exists`);
    }
    return error;
  }

  /* The nested `where`/`orderBy` callbacks below use the operators imported
     from @repo/db rather than the ones drizzle passes into the callback. The
     callback's copies are typed from drizzle's ESM declarations while this
     package resolves the CJS ones, and TypeScript refuses to unify the two.
     The callback is still needed for its `fields`, which carry the aliases
     drizzle gives nested tables. */

  /** Listings: every course (or only published ones) with its next joinable batch. */
  private loadSummaries({ publishedOnly }: { publishedOnly: boolean }) {
    const today = dhakaToday();
    return this.db.query.courses.findMany({
      where: publishedOnly ? eq(courses.status, 'published') : undefined,
      orderBy: [asc(courses.sortOrder), asc(courses.name)],
      with: {
        batches: {
          where: (batch) => and(ne(batch.status, 'closed'), gte(batch.endsOn, today)),
          orderBy: (batch) => [asc(batch.startsOn)],
          limit: 1,
          with: { branch: true, teacher: true },
        },
      },
    });
  }

  /** One course with everything its page (or its admin form) renders. */
  private loadDetail(where: SQL | undefined, { publicOnly }: { publicOnly: boolean }) {
    const today = dhakaToday();
    return this.db.query.courses.findFirst({
      where,
      with: {
        modules: { orderBy: (module) => [asc(module.position)] },
        batches: {
          where: publicOnly
            ? (batch) => and(ne(batch.status, 'closed'), gte(batch.endsOn, today))
            : undefined,
          orderBy: (batch) => [asc(batch.startsOn)],
          with: { branch: true, teacher: true },
        },
        courseTeachers: {
          orderBy: (link) => [asc(link.position)],
          with: { teacher: { with: { branch: true } } },
        },
        courseTestimonials: { with: { testimonial: true } },
      },
    });
  }
}
