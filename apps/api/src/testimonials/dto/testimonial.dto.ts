import { ApiProperty } from '@nestjs/swagger';
import type { Course, Testimonial } from '@repo/db';

import { CourseRefDto } from '../../courses/dto/course-ref.dto.js';

export type TestimonialWithCoursesRow = Testimonial & {
  courseTestimonials: { course: Pick<Course, 'id' | 'slug' | 'name' | 'status'> }[];
};

export class TestimonialDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'Nafisa Rahman' })
  name!: string;

  /** Score and destination, e.g. "SAT 1540 · NUS, Singapore". */
  @ApiProperty({ example: 'SAT 1540 · NUS, Singapore' })
  result!: string;

  @ApiProperty()
  quote!: string;

  @ApiProperty({ nullable: true, type: String })
  imageUrl!: string | null;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  sortOrder!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;

  static fromEntity(row: Testimonial): TestimonialDto {
    return {
      id: row.id,
      name: row.name,
      result: row.result,
      quote: row.quote,
      imageUrl: row.imageUrl,
      isActive: row.isActive,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}

/** A testimonial plus the courses it may appear on; the shape of the admin endpoints. */
export class TestimonialWithCoursesDto extends TestimonialDto {
  @ApiProperty({ type: () => [CourseRefDto] })
  courses!: CourseRefDto[];

  static fromEntityWithCourses(row: TestimonialWithCoursesRow): TestimonialWithCoursesDto {
    return {
      ...TestimonialDto.fromEntity(row),
      courses: row.courseTestimonials.map((link) => CourseRefDto.fromEntity(link.course)),
    };
  }
}
