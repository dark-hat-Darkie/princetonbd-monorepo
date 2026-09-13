import { Injectable, NotFoundException } from '@nestjs/common';
import {
  asc,
  courses,
  courseTestimonials,
  eq,
  inArray,
  testimonials,
  type Database,
  type SQL,
} from '@repo/db';

import { definedEntries } from '../common/defined-entries.js';
import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { InjectDb } from '../database/database.module.js';
import { TestimonialWithCoursesDto } from './dto/testimonial.dto.js';
import type { CreateTestimonialDto } from './dto/create-testimonial.dto.js';
import type { UpdateTestimonialDto } from './dto/update-testimonial.dto.js';

@Injectable()
export class TestimonialsService {
  constructor(@InjectDb() private readonly db: Database) {}

  async adminList(): Promise<TestimonialWithCoursesDto[]> {
    const rows = await this.load(undefined);
    return rows.map((row) => TestimonialWithCoursesDto.fromEntityWithCourses(row));
  }

  async adminGet(id: string): Promise<TestimonialWithCoursesDto> {
    const rows = await this.load(eq(testimonials.id, id));
    if (rows.length === 0) throw new NotFoundException(`Testimonial ${id} not found`);
    return TestimonialWithCoursesDto.fromEntityWithCourses(rows[0]!);
  }

  async create(dto: CreateTestimonialDto): Promise<TestimonialWithCoursesDto> {
    const { courseIds = [], ...fields } = dto;
    await this.assertCourses(courseIds);

    /* Row and links in one transaction: a failed link insert must not leave
       an orphan quote that appears in the admin list but on no course. */
    const testimonialId = await this.db.transaction(async (tx) => {
      const [row] = await tx.insert(testimonials).values(fields).returning({ id: testimonials.id });
      const id = row!.id;
      if (courseIds.length > 0) {
        await tx
          .insert(courseTestimonials)
          .values(courseIds.map((courseId) => ({ courseId, testimonialId: id })));
      }
      return id;
    });

    return this.adminGet(testimonialId);
  }

  async update(id: string, dto: UpdateTestimonialDto): Promise<TestimonialWithCoursesDto> {
    const { courseIds, ...fields } = dto;
    const changes = definedEntries(fields);

    const [existing] = await this.db
      .select({ id: testimonials.id })
      .from(testimonials)
      .where(eq(testimonials.id, id));
    if (!existing) throw new NotFoundException(`Testimonial ${id} not found`);

    if (courseIds !== undefined) {
      await this.assertCourses(courseIds);
    }

    await this.db.transaction(async (tx) => {
      if (Object.keys(changes).length > 0) {
        await tx.update(testimonials).set(changes).where(eq(testimonials.id, id));
      }

      if (courseIds !== undefined) {
        await tx.delete(courseTestimonials).where(eq(courseTestimonials.testimonialId, id));
        if (courseIds.length > 0) {
          await tx.insert(courseTestimonials).values(
            courseIds.map((courseId) => ({
              courseId,
              testimonialId: id,
            })),
          );
        }
      }
    });

    return this.adminGet(id);
  }

  async remove(id: string): Promise<void> {
    const [deleted] = await this.db
      .delete(testimonials)
      .where(eq(testimonials.id, id))
      .returning({ id: testimonials.id });
    if (!deleted) throw new NotFoundException(`Testimonial ${id} not found`);
  }

  private load(where: SQL | undefined) {
    return this.db.query.testimonials.findMany({
      where,
      orderBy: [asc(testimonials.sortOrder), asc(testimonials.createdAt)],
      with: {
        courseTestimonials: {
          with: {
            course: {
              columns: { id: true, slug: true, name: true, status: true },
            },
          },
        },
      },
    });
  }

  private async assertCourses(courseIds: string[]): Promise<void> {
    if (courseIds.length === 0) return;

    const found = await this.db
      .select({ id: courses.id })
      .from(courses)
      .where(inArray(courses.id, courseIds));
    const known = new Set(found.map((row) => row.id));
    const missing = courseIds.filter((courseId) => !known.has(courseId));

    if (missing.length > 0) {
      throw ValidationFailedException.forField(
        'courseIds',
        `Unknown course${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`,
      );
    }
  }
}
