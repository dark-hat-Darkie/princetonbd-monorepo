import { ApiProperty } from '@nestjs/swagger';
import {
  courseStatuses,
  deliveryModes,
  type Batch,
  type Branch,
  type Course,
  type CourseStatus,
  type CurriculumModule,
  type DeliveryMode,
  type Teacher,
  type Testimonial,
} from '@repo/db';

import { BatchDto } from '../../batches/dto/batch.dto.js';
import { TeacherDto } from '../../teachers/dto/teacher.dto.js';
import { TestimonialDto } from '../../testimonials/dto/testimonial.dto.js';

/** A course row plus the one upcoming batch a listing shows. */
export type CourseSummaryRow = Course & {
  batches: (Batch & { branch: Branch | null; teacher: Teacher | null })[];
};

/** A course row with everything its page renders. */
export type CourseDetailRow = Course & {
  modules: CurriculumModule[];
  batches: (Batch & { branch: Branch | null; teacher: Teacher | null })[];
  courseTeachers: { position: number; teacher: Teacher & { branch: Branch | null } }[];
  courseTestimonials: { testimonial: Testimonial }[];
};

export class CurriculumModuleDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  /** 1-based display order. */
  @ApiProperty({ example: 1 })
  position!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  summary!: string;

  @ApiProperty({ type: [String] })
  topics!: string[];

  @ApiProperty({ nullable: true, type: Number })
  hours!: number | null;

  @ApiProperty({ nullable: true, type: String })
  outcome!: string | null;

  static fromEntity(row: CurriculumModule): CurriculumModuleDto {
    return {
      id: row.id,
      position: row.position,
      title: row.title,
      summary: row.summary,
      topics: row.topics,
      hours: row.hours,
      outcome: row.outcome,
    };
  }
}

/** What a course listing needs. */
export class CourseSummaryDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'sat' })
  slug!: string;

  @ApiProperty({ example: 'SAT' })
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ nullable: true, type: String })
  thumbnailUrl!: string | null;

  /** Whole taka. */
  @ApiProperty({ example: 45000 })
  priceAmount!: number;

  @ApiProperty({ example: 'per 10-week course' })
  priceUnit!: string;

  @ApiProperty({ enum: ['BDT'], enumName: 'Currency' })
  currency!: 'BDT';

  @ApiProperty({ enum: deliveryModes, enumName: 'DeliveryMode', isArray: true })
  modes!: DeliveryMode[];

  @ApiProperty({ enum: courseStatuses, enumName: 'CourseStatus' })
  status!: CourseStatus;

  @ApiProperty({ nullable: true, type: Number })
  durationWeeks!: number | null;

  @ApiProperty({ nullable: true, type: Number })
  taughtHours!: number | null;

  @ApiProperty({ nullable: true, type: Number })
  mockCount!: number | null;

  @ApiProperty({ nullable: true, type: String, example: 'Max 10' })
  classSize!: string | null;

  @ApiProperty()
  sortOrder!: number;

  /** The soonest batch a learner can still join, or null when none is scheduled. */
  @ApiProperty({ type: () => BatchDto, nullable: true })
  nextBatch!: BatchDto | null;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;

  static fromEntity(row: CourseSummaryRow): CourseSummaryDto {
    const next = row.batches[0];
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
      thumbnailUrl: row.thumbnailUrl,
      priceAmount: row.priceAmount,
      priceUnit: row.priceUnit,
      currency: 'BDT',
      modes: row.modes,
      status: row.status,
      durationWeeks: row.durationWeeks,
      taughtHours: row.taughtHours,
      mockCount: row.mockCount,
      classSize: row.classSize,
      sortOrder: row.sortOrder,
      nextBatch: next ? BatchDto.fromEntity({ ...next, course: row }) : null,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}

/** The full course: what its page renders and what the admin edits. */
export class CourseDetailDto extends CourseSummaryDto {
  /** Bullet list on the fee card. */
  @ApiProperty({ type: [String] })
  feeIncludes!: string[];

  /** "By the end of the course you will…" */
  @ApiProperty({ type: [String] })
  outcomes!: string[];

  @ApiProperty({ type: () => [CurriculumModuleDto] })
  modules!: CurriculumModuleDto[];

  /** Publicly: upcoming, joinable batches soonest first. For admins: every batch. */
  @ApiProperty({ type: () => [BatchDto] })
  batches!: BatchDto[];

  @ApiProperty({ type: () => [TeacherDto] })
  teachers!: TeacherDto[];

  @ApiProperty({ type: () => [TestimonialDto] })
  testimonials!: TestimonialDto[];

  static fromDetail(
    row: CourseDetailRow,
    { publicOnly }: { publicOnly: boolean },
  ): CourseDetailDto {
    const teachers = row.courseTeachers
      .map((link) => link.teacher)
      .filter((teacher) => !publicOnly || teacher.isActive);
    const testimonials = row.courseTestimonials
      .map((link) => link.testimonial)
      .filter((testimonial) => !publicOnly || testimonial.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      ...CourseSummaryDto.fromEntity(row),
      feeIncludes: row.feeIncludes,
      outcomes: row.outcomes,
      modules: row.modules.map((module) => CurriculumModuleDto.fromEntity(module)),
      batches: row.batches.map((batch) => BatchDto.fromEntity({ ...batch, course: row })),
      teachers: teachers.map((teacher) => TeacherDto.fromEntity(teacher)),
      testimonials: testimonials.map((testimonial) => TestimonialDto.fromEntity(testimonial)),
    };
  }
}
