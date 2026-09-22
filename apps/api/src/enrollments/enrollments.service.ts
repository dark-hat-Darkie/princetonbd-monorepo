import { Injectable, NotFoundException } from '@nestjs/common';
import {
  and,
  batches,
  courses,
  enrollments,
  eq,
  gte,
  ne,
  type Batch,
  type Course,
  type Database,
  type Enrollment,
} from '@repo/db';

import { definedEntries } from '../common/defined-entries.js';
import { dhakaToday } from '../common/dhaka-date.js';
import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { InjectDb } from '../database/database.module.js';
import type { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { EnrollmentDto } from './dto/enrollment.dto.js';
import type { UpdateEnrollmentDetailsDto } from './dto/update-details.dto.js';

export interface EnrollmentFee {
  amount: number;
  currency: string;
}

const FEE_CURRENCY = 'BDT';

/**
 * Enrollments: a learner's seat in a course or batch, before and after pay.
 *
 * Money rule lives here: the fee is always recomputed from the course row
 * and its batch override (`feeAmount ?? priceAmount`). Callers never accept
 * a total from the request — the payments service asks this service, so the
 * amount sent to the provider and the amount shown on the fee card always
 * come from the same rows.
 */
@Injectable()
export class EnrollmentsService {
  constructor(@InjectDb() private readonly db: Database) {}

  /** Fee for a course/batch pair. Throws 400 when the pair is not joinable. */
  async feeFor(courseId: string, batchId: string | null): Promise<EnrollmentFee> {
    const { course, batch } = await this.loadJoinable(courseId, batchId);
    return { amount: batch?.feeAmount ?? course.priceAmount, currency: FEE_CURRENCY };
  }

  async createDraft(userId: string, dto: CreateEnrollmentDto): Promise<EnrollmentDto> {
    const batchId = dto.batchId ?? null;
    const { course, batch } = await this.loadJoinable(dto.courseId, batchId);

    /* Idempotent re-enroll: the same learner re-clicking Enrol on the same
       batch resumes their open enrollment instead of tripping the unique
       (user, batch) constraint. Course-only enrollments skip this — a NULL
       batchId is intentionally repeatable. */
    if (batchId) {
      const [existing] = await this.db
        .select()
        .from(enrollments)
        .where(and(eq(enrollments.userId, userId), eq(enrollments.batchId, batchId)))
        .limit(1);
      if (existing && existing.status !== 'active') {
        return EnrollmentDto.fromEntity(existing, {
          amount: batch?.feeAmount ?? course.priceAmount,
          currency: FEE_CURRENCY,
        });
      }
      if (existing) {
        throw ValidationFailedException.forField(
          'batchId',
          'You are already enrolled in this batch',
        );
      }
    }

    const [row] = await this.db
      .insert(enrollments)
      .values({ userId, courseId: course.id, batchId: batch?.id ?? null })
      .returning();
    return EnrollmentDto.fromEntity(row!, {
      amount: batch?.feeAmount ?? course.priceAmount,
      currency: FEE_CURRENCY,
    });
  }

  async updateDetails(
    userId: string,
    id: string,
    dto: UpdateEnrollmentDetailsDto,
  ): Promise<EnrollmentDto> {
    const enrollment = await this.loadOwned(userId, id);
    if (enrollment.status === 'active') {
      throw ValidationFailedException.forField(
        'enrollment',
        'An active enrollment cannot be edited',
      );
    }
    if (dto.dateOfBirth && dto.dateOfBirth >= dhakaToday()) {
      throw ValidationFailedException.forField('dateOfBirth', 'Date of birth must be in the past');
    }

    /* Same helper the CMS services use: drop undefined keys so a partial
       PATCH never nulls a field the form did not send. */
    const patch = definedEntries(dto);
    const [row] =
      Object.keys(patch).length > 0
        ? await this.db.update(enrollments).set(patch).where(eq(enrollments.id, id)).returning()
        : [enrollment];
    const fee = await this.feeFor(row!.courseId, row!.batchId);
    return EnrollmentDto.fromEntity(row!, fee);
  }

  async listMine(userId: string): Promise<EnrollmentDto[]> {
    const rows = await this.db.select().from(enrollments).where(eq(enrollments.userId, userId));
    const out: EnrollmentDto[] = [];
    for (const row of rows) {
      out.push(EnrollmentDto.fromEntity(row, await this.feeFor(row.courseId, row.batchId)));
    }
    return out;
  }

  async getOwned(userId: string, id: string): Promise<EnrollmentDto> {
    const enrollment = await this.loadOwned(userId, id);
    return EnrollmentDto.fromEntity(
      enrollment,
      await this.feeFor(enrollment.courseId, enrollment.batchId),
    );
  }

  /** The raw row, for the payments service — ownership already checked by callers. */
  async loadOwned(userId: string, id: string): Promise<Enrollment> {
    const [row] = await this.db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.id, id), eq(enrollments.userId, userId)))
      .limit(1);
    if (!row) throw new NotFoundException(`Enrollment ${id} not found`);
    return row;
  }

  private async loadJoinable(
    courseId: string,
    batchId: string | null,
  ): Promise<{ course: Course; batch: Batch | null }> {
    const [course] = await this.db
      .select()
      .from(courses)
      .where(and(eq(courses.id, courseId), eq(courses.status, 'published')))
      .limit(1);
    if (!course) {
      throw ValidationFailedException.forField(
        'courseId',
        'That course is not available for enrollment',
      );
    }

    if (!batchId) return { course, batch: null };

    const [batch] = await this.db
      .select()
      .from(batches)
      .where(
        and(
          eq(batches.id, batchId),
          eq(batches.courseId, course.id),
          ne(batches.status, 'closed'),
          gte(batches.endsOn, dhakaToday()),
        ),
      )
      .limit(1);
    if (!batch) {
      throw ValidationFailedException.forField(
        'batchId',
        'That batch is not available for enrollment',
      );
    }
    return { course, batch };
  }
}
