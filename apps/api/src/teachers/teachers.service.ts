import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  asc,
  batches,
  branches,
  count,
  courseTeachers,
  eq,
  teachers,
  type Database,
  type SQL,
} from '@repo/db';

import { PG_UNIQUE_VIOLATION, isPgError } from '../common/db-errors.js';
import { definedEntries } from '../common/defined-entries.js';
import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { slugify } from '../common/slug.js';
import { InjectDb } from '../database/database.module.js';
import { TeacherWithCoursesDto } from './dto/teacher.dto.js';
import type { CreateTeacherDto } from './dto/create-teacher.dto.js';
import type { UpdateTeacherDto } from './dto/update-teacher.dto.js';

@Injectable()
export class TeachersService {
  constructor(@InjectDb() private readonly db: Database) {}

  async findActive(): Promise<TeacherWithCoursesDto[]> {
    const rows = await this.load(eq(teachers.isActive, true));
    return rows.map((row) =>
      TeacherWithCoursesDto.fromEntityWithCourses({
        ...row,
        courseTeachers: row.courseTeachers.filter((link) => link.course.status === 'published'),
      }),
    );
  }

  async adminList(): Promise<TeacherWithCoursesDto[]> {
    const rows = await this.load(undefined);
    return rows.map((row) => TeacherWithCoursesDto.fromEntityWithCourses(row));
  }

  async adminGet(id: string): Promise<TeacherWithCoursesDto> {
    const rows = await this.load(eq(teachers.id, id));
    if (rows.length === 0) throw new NotFoundException(`Teacher ${id} not found`);
    return TeacherWithCoursesDto.fromEntityWithCourses(rows[0]!);
  }

  async create(dto: CreateTeacherDto): Promise<TeacherWithCoursesDto> {
    const slug = dto.slug ?? slugify(dto.name);
    if (!slug) {
      throw ValidationFailedException.forField('slug', 'Could not derive a slug from that name');
    }

    if (dto.branchId) {
      await this.assertBranch(dto.branchId);
    }

    let id: string;
    try {
      const [row] = await this.db
        .insert(teachers)
        .values({ ...dto, slug })
        .returning({ id: teachers.id });
      id = row!.id;
    } catch (error) {
      if (isPgError(error, PG_UNIQUE_VIOLATION)) {
        throw new ConflictException(`A teacher with the slug "${slug}" already exists`);
      }
      throw error;
    }

    return this.adminGet(id);
  }

  async update(id: string, dto: UpdateTeacherDto): Promise<TeacherWithCoursesDto> {
    const changes = definedEntries(dto);

    if (changes.branchId !== undefined && typeof changes.branchId === 'string') {
      await this.assertBranch(changes.branchId);
    }

    if (Object.keys(changes).length > 0) {
      let updated: { id: string } | undefined;
      try {
        [updated] = await this.db
          .update(teachers)
          .set(changes)
          .where(eq(teachers.id, id))
          .returning({ id: teachers.id });
      } catch (error) {
        if (isPgError(error, PG_UNIQUE_VIOLATION)) {
          throw new ConflictException(
            `A teacher with the slug "${changes.slug ?? ''}" already exists`,
          );
        }
        throw error;
      }
      if (!updated) throw new NotFoundException(`Teacher ${id} not found`);
    }

    return this.adminGet(id);
  }

  async remove(id: string): Promise<void> {
    const [courseUse] = await this.db
      .select({ value: count() })
      .from(courseTeachers)
      .where(eq(courseTeachers.teacherId, id));
    const [batchUse] = await this.db
      .select({ value: count() })
      .from(batches)
      .where(eq(batches.teacherId, id));

    const courseCount = courseUse?.value ?? 0;
    const batchCount = batchUse?.value ?? 0;

    if (courseCount > 0 || batchCount > 0) {
      throw new ConflictException(
        `This teacher is still assigned to ${courseCount} course(s) and ${batchCount} batch(es); unassign them or deactivate the teacher instead`,
      );
    }

    const [deleted] = await this.db
      .delete(teachers)
      .where(eq(teachers.id, id))
      .returning({ id: teachers.id });
    if (!deleted) throw new NotFoundException(`Teacher ${id} not found`);
  }

  private load(where: SQL | undefined) {
    return this.db.query.teachers.findMany({
      where,
      orderBy: [asc(teachers.sortOrder), asc(teachers.name)],
      with: {
        branch: true,
        courseTeachers: {
          with: {
            course: {
              columns: { id: true, slug: true, name: true, status: true },
            },
          },
        },
      },
    });
  }

  private async assertBranch(branchId: string): Promise<void> {
    const [branch] = await this.db
      .select({ id: branches.id })
      .from(branches)
      .where(eq(branches.id, branchId))
      .limit(1);
    if (!branch) {
      throw ValidationFailedException.forField('branchId', 'Unknown branch');
    }
  }
}
