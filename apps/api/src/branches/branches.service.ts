import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { asc, batches, branches, count, eq, teachers, type Database } from '@repo/db';

import { PG_UNIQUE_VIOLATION, isPgError } from '../common/db-errors.js';
import { definedEntries } from '../common/defined-entries.js';
import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { slugify } from '../common/slug.js';
import { InjectDb } from '../database/database.module.js';
import { BranchDto } from './dto/branch.dto.js';
import type { CreateBranchDto } from './dto/create-branch.dto.js';
import type { UpdateBranchDto } from './dto/update-branch.dto.js';

@Injectable()
export class BranchesService {
  constructor(@InjectDb() private readonly db: Database) {}

  async findActive(): Promise<BranchDto[]> {
    const rows = await this.db
      .select()
      .from(branches)
      .where(eq(branches.isActive, true))
      .orderBy(asc(branches.sortOrder), asc(branches.name));
    return rows.map((row) => BranchDto.fromEntity(row));
  }

  async adminList(): Promise<BranchDto[]> {
    const rows = await this.db
      .select()
      .from(branches)
      .orderBy(asc(branches.sortOrder), asc(branches.name));
    return rows.map((row) => BranchDto.fromEntity(row));
  }

  async adminGet(id: string): Promise<BranchDto> {
    const [row] = await this.db.select().from(branches).where(eq(branches.id, id)).limit(1);
    if (!row) throw new NotFoundException(`Branch ${id} not found`);
    return BranchDto.fromEntity(row);
  }

  async create(dto: CreateBranchDto): Promise<BranchDto> {
    const slug = dto.slug ?? slugify(dto.name);
    if (!slug) {
      throw ValidationFailedException.forField('slug', 'Could not derive a slug from that name');
    }

    let id: string;
    try {
      const [row] = await this.db
        .insert(branches)
        .values({ ...dto, slug })
        .returning({ id: branches.id });
      id = row!.id;
    } catch (error) {
      if (isPgError(error, PG_UNIQUE_VIOLATION)) {
        throw new ConflictException(`A branch with the slug "${slug}" already exists`);
      }
      throw error;
    }

    return this.adminGet(id);
  }

  async update(id: string, dto: UpdateBranchDto): Promise<BranchDto> {
    const changes = definedEntries(dto);

    if (Object.keys(changes).length > 0) {
      let updated: { id: string } | undefined;
      try {
        [updated] = await this.db
          .update(branches)
          .set(changes)
          .where(eq(branches.id, id))
          .returning({ id: branches.id });
      } catch (error) {
        if (isPgError(error, PG_UNIQUE_VIOLATION)) {
          throw new ConflictException(
            `A branch with the slug "${changes.slug ?? ''}" already exists`,
          );
        }
        throw error;
      }
      if (!updated) throw new NotFoundException(`Branch ${id} not found`);
    }

    return this.adminGet(id);
  }

  async remove(id: string): Promise<void> {
    const [batchUse] = await this.db
      .select({ value: count() })
      .from(batches)
      .where(eq(batches.branchId, id));
    const [teacherUse] = await this.db
      .select({ value: count() })
      .from(teachers)
      .where(eq(teachers.branchId, id));

    const batchCount = batchUse?.value ?? 0;
    const teacherCount = teacherUse?.value ?? 0;

    if (batchCount > 0 || teacherCount > 0) {
      throw new ConflictException(
        `This branch is still used by ${batchCount} batch(es) and ${teacherCount} teacher(s); reassign them first`,
      );
    }

    const [deleted] = await this.db
      .delete(branches)
      .where(eq(branches.id, id))
      .returning({ id: branches.id });
    if (!deleted) throw new NotFoundException(`Branch ${id} not found`);
  }
}
