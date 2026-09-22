import { Injectable, NotFoundException } from '@nestjs/common';
import {
  and,
  asc,
  batches,
  branches,
  courses,
  eq,
  gte,
  inArray,
  ne,
  teachers,
  type Course,
  type Database,
} from '@repo/db';

import { definedEntries } from '../common/defined-entries.js';
import { dhakaToday } from '../common/dhaka-date.js';
import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { InjectDb } from '../database/database.module.js';
import { BatchDto, toHHMM } from './dto/batch.dto.js';
import type { CreateBatchDto } from './dto/create-batch.dto.js';
import type { UpdateBatchDto } from './dto/update-batch.dto.js';

/** The fields the cross-field rules look at, after merging a PATCH onto the stored row. */
interface BatchRules {
  mode: CreateBatchDto['mode'];
  branchId: string | null;
  teacherId: string | null;
  startsOn: string;
  endsOn: string;
  startTime: string;
  endTime: string;
}

@Injectable()
export class BatchesService {
  constructor(@InjectDb() private readonly db: Database) {}

  /* --- public -------------------------------------------------------------- */

  /**
   * Every batch a visitor can still join, across every published course:
   * not closed and not yet ended on the Dhaka calendar, soonest first. The
   * batch-schedule page filters this by campus and course in the browser,
   * so one cached read serves every combination.
   *
   * The publication check is a subquery rather than a post-filter, so a
   * draft course's batches never leave the database on a public route.
   */
  async findUpcoming(): Promise<BatchDto[]> {
    const today = dhakaToday();
    const published = this.db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.status, 'published'));
    const rows = await this.db.query.batches.findMany({
      where: and(
        ne(batches.status, 'closed'),
        gte(batches.endsOn, today),
        inArray(batches.courseId, published),
      ),
      orderBy: [asc(batches.startsOn), asc(batches.startTime)],
      with: { branch: true, teacher: true, course: true },
    });
    return rows.map((row) => BatchDto.fromEntity(row));
  }

  /** A batch by id, only while its course is published — the enquiry form's lookup. */
  async findPublishedById(id: string): Promise<BatchDto | null> {
    const row = await this.load(id);
    if (row?.course.status !== 'published') return null;
    return BatchDto.fromEntity(row);
  }

  /* --- admin --------------------------------------------------------------- */

  async adminListForCourse(courseId: string): Promise<BatchDto[]> {
    await this.assertCourse(courseId);
    const rows = await this.db.query.batches.findMany({
      where: eq(batches.courseId, courseId),
      orderBy: [asc(batches.startsOn)],
      with: { branch: true, teacher: true, course: true },
    });
    return rows.map((row) => BatchDto.fromEntity(row));
  }

  async adminGet(id: string): Promise<BatchDto> {
    const row = await this.load(id);
    if (!row) throw new NotFoundException(`Batch ${id} not found`);
    return BatchDto.fromEntity(row);
  }

  async create(courseId: string, dto: CreateBatchDto): Promise<BatchDto> {
    const course = await this.assertCourse(courseId);
    const rules: BatchRules = {
      mode: dto.mode,
      branchId: dto.branchId ?? null,
      teacherId: dto.teacherId ?? null,
      startsOn: dto.startsOn,
      endsOn: dto.endsOn,
      startTime: dto.startTime,
      endTime: dto.endTime,
    };
    await this.validate(course, rules);

    const [row] = await this.db
      .insert(batches)
      .values({
        ...dto,
        ...rules,
        courseId,
        status: dto.status ?? 'open',
        seatsLeft: dto.seatsLeft ?? null,
        feeAmount: dto.feeAmount ?? null,
      })
      .returning({ id: batches.id });

    return this.adminGet(row!.id);
  }

  async update(id: string, dto: UpdateBatchDto): Promise<BatchDto> {
    const existing = await this.load(id);
    if (!existing) throw new NotFoundException(`Batch ${id} not found`);

    /* Rules are checked against what the row will look like, not just the
       fields being changed — switching a classroom batch to live-online must
       clear the branch, and a new end date must still follow the start. */
    const rules: BatchRules = {
      mode: dto.mode ?? existing.mode,
      branchId: dto.branchId === undefined ? existing.branchId : dto.branchId,
      teacherId: dto.teacherId === undefined ? existing.teacherId : dto.teacherId,
      startsOn: dto.startsOn ?? existing.startsOn,
      endsOn: dto.endsOn ?? existing.endsOn,
      startTime: dto.startTime ?? toHHMM(existing.startTime),
      endTime: dto.endTime ?? toHHMM(existing.endTime),
    };
    await this.validate(existing.course, rules);

    await this.db
      .update(batches)
      .set({ ...definedEntries(dto), ...rules })
      .where(eq(batches.id, id));

    return this.adminGet(id);
  }

  async remove(id: string): Promise<void> {
    const [deleted] = await this.db
      .delete(batches)
      .where(eq(batches.id, id))
      .returning({ id: batches.id });
    if (!deleted) throw new NotFoundException(`Batch ${id} not found`);
  }

  /* --- internals ----------------------------------------------------------- */

  private load(id: string) {
    return this.db.query.batches.findFirst({
      where: eq(batches.id, id),
      with: { branch: true, teacher: true, course: true },
    });
  }

  private async assertCourse(courseId: string): Promise<Course> {
    const [course] = await this.db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (!course) throw new NotFoundException(`Course ${courseId} not found`);
    return course;
  }

  /**
   * The rules a single decorator cannot express. All of them are collected
   * before throwing so the form can show every problem at once.
   */
  private async validate(course: Course, rules: BatchRules): Promise<void> {
    const errors: Record<string, string[]> = {};

    if (!course.modes.includes(rules.mode)) {
      errors.mode = [`${course.name} is not offered as ${rules.mode.replace('_', ' ')}`];
    }
    if (rules.mode === 'classroom' && !rules.branchId) {
      errors.branchId = ['Choose a branch for a classroom batch'];
    }
    if (rules.mode === 'live_online' && rules.branchId) {
      errors.branchId = ['A live-online batch has no branch'];
    }
    /* 'YYYY-MM-DD' and 'HH:MM' compare correctly as strings. */
    if (rules.endsOn < rules.startsOn) {
      errors.endsOn = ['The end date must be on or after the start date'];
    }
    if (rules.endTime <= rules.startTime) {
      errors.endTime = ['The end time must be after the start time'];
    }

    if (rules.branchId && !errors.branchId) {
      const [branch] = await this.db
        .select({ id: branches.id })
        .from(branches)
        .where(eq(branches.id, rules.branchId))
        .limit(1);
      if (!branch) errors.branchId = ['Unknown branch'];
    }
    if (rules.teacherId) {
      const [teacher] = await this.db
        .select({ id: teachers.id })
        .from(teachers)
        .where(eq(teachers.id, rules.teacherId))
        .limit(1);
      if (!teacher) errors.teacherId = ['Unknown teacher'];
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationFailedException(errors);
    }
  }
}
