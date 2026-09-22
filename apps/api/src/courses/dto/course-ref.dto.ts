import { ApiProperty } from '@nestjs/swagger';
import { courseStatuses, type Course, type CourseStatus } from '@repo/db';

/** The minimum a related record needs to say about a course: enough to link to it. */
export class CourseRefDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'sat' })
  slug!: string;

  @ApiProperty({ example: 'SAT' })
  name!: string;

  @ApiProperty({ enum: courseStatuses, enumName: 'CourseStatus' })
  status!: CourseStatus;

  static fromEntity(course: Pick<Course, 'id' | 'slug' | 'name' | 'status'>): CourseRefDto {
    return { id: course.id, slug: course.slug, name: course.name, status: course.status };
  }
}
