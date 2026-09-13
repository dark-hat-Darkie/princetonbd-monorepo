import { ApiProperty } from '@nestjs/swagger';
import type { Branch, Course, Teacher } from '@repo/db';

import { BranchDto } from '../../branches/dto/branch.dto.js';
import { CourseRefDto } from '../../courses/dto/course-ref.dto.js';

export type TeacherRow = Teacher & { branch: Branch | null };

export type TeacherWithCoursesRow = TeacherRow & {
  courseTeachers: { course: Pick<Course, 'id' | 'slug' | 'name' | 'status'> }[];
};

export class TeacherDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'farzana-haque' })
  slug!: string;

  @ApiProperty({ example: 'Farzana Haque' })
  name!: string;

  /** The title shown under the name. */
  @ApiProperty({ example: 'Lead Instructor, Quantitative' })
  designation!: string;

  /** One or two lines: the credential that matters. */
  @ApiProperty()
  bio!: string;

  /** Public URL of an uploaded photo; null renders a monogram. */
  @ApiProperty({ nullable: true, type: String })
  imageUrl!: string | null;

  @ApiProperty({ type: () => BranchDto, nullable: true })
  branch!: BranchDto | null;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  sortOrder!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;

  static fromEntity(row: TeacherRow): TeacherDto {
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      designation: row.designation,
      bio: row.bio,
      imageUrl: row.imageUrl,
      branch: row.branch ? BranchDto.fromEntity(row.branch) : null,
      isActive: row.isActive,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}

/** A teacher plus the courses they are assigned to; the shape of the teacher endpoints. */
export class TeacherWithCoursesDto extends TeacherDto {
  @ApiProperty({ type: () => [CourseRefDto] })
  courses!: CourseRefDto[];

  static fromEntityWithCourses(row: TeacherWithCoursesRow): TeacherWithCoursesDto {
    return {
      ...TeacherDto.fromEntity(row),
      courses: row.courseTeachers.map((link) => CourseRefDto.fromEntity(link.course)),
    };
  }
}
