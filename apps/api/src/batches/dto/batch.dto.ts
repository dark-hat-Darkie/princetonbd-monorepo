import { ApiProperty } from '@nestjs/swagger';
import {
  batchStatuses,
  deliveryModes,
  weekdays,
  type Batch,
  type BatchStatus,
  type Branch,
  type Course,
  type DeliveryMode,
  type Teacher,
  type Weekday,
} from '@repo/db';

import { BranchDto } from '../../branches/dto/branch.dto.js';

/** A batch row with the relations `BatchDto` needs. */
export type BatchRow = Batch & {
  branch: Branch | null;
  teacher: Pick<Teacher, 'id' | 'slug' | 'name'> | null;
  course: Pick<Course, 'id' | 'slug' | 'name'>;
};

export class BatchTeacherDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;

  static fromEntity(row: Pick<Teacher, 'id' | 'slug' | 'name'>): BatchTeacherDto {
    return { id: row.id, slug: row.slug, name: row.name };
  }
}

/** Postgres returns `time` as HH:MM:SS; the API speaks HH:MM. */
export function toHHMM(value: string): string {
  return value.slice(0, 5);
}

export class BatchDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  courseId!: string;

  @ApiProperty({ example: 'sat' })
  courseSlug!: string;

  @ApiProperty({ example: 'SAT' })
  courseName!: string;

  @ApiProperty({ enum: deliveryModes, enumName: 'DeliveryMode' })
  mode!: DeliveryMode;

  /** Null for a live-online batch. */
  @ApiProperty({ type: () => BranchDto, nullable: true })
  branch!: BranchDto | null;

  @ApiProperty({ type: () => BatchTeacherDto, nullable: true })
  teacher!: BatchTeacherDto | null;

  /** Dhaka calendar day, YYYY-MM-DD. */
  @ApiProperty({ example: '2026-10-12' })
  startsOn!: string;

  @ApiProperty({ example: '2026-12-18' })
  endsOn!: string;

  /** Which days of the week the batch meets, Saturday first. */
  @ApiProperty({ enum: weekdays, enumName: 'Weekday', isArray: true })
  days!: Weekday[];

  /** Dhaka wall-clock time, HH:MM. */
  @ApiProperty({ example: '18:30' })
  startTime!: string;

  @ApiProperty({ example: '20:30' })
  endTime!: string;

  @ApiProperty({ enum: batchStatuses, enumName: 'BatchStatus' })
  status!: BatchStatus;

  @ApiProperty({ nullable: true, type: Number })
  seatsLeft!: number | null;

  /** Whole taka; null means the course price applies. */
  @ApiProperty({ nullable: true, type: Number })
  feeAmount!: number | null;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;

  static fromEntity(row: BatchRow): BatchDto {
    return {
      id: row.id,
      courseId: row.courseId,
      courseSlug: row.course.slug,
      courseName: row.course.name,
      mode: row.mode,
      branch: row.branch ? BranchDto.fromEntity(row.branch) : null,
      teacher: row.teacher ? BatchTeacherDto.fromEntity(row.teacher) : null,
      startsOn: row.startsOn,
      endsOn: row.endsOn,
      days: row.days,
      startTime: toHHMM(row.startTime),
      endTime: toHHMM(row.endTime),
      status: row.status,
      seatsLeft: row.seatsLeft,
      feeAmount: row.feeAmount,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}
