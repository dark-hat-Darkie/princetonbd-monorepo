import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../common/decorators/public.decorator.js';
import { ApiNotFound } from '../common/http/api-errors.decorator.js';
import { CoursesService } from './courses.service.js';
import { CourseDetailDto, CourseSummaryDto } from './dto/course.dto.js';

/** What the public site reads. Published courses only. */
@ApiTags('courses')
@Public()
@Controller({ path: 'courses', version: '1' })
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  /** Every published course, in display order, each with its next joinable batch. */
  @Get()
  @ApiOperation({ operationId: 'listCourses', summary: 'List published courses' })
  @ApiOkResponse({ type: [CourseSummaryDto] })
  listCourses(): Promise<CourseSummaryDto[]> {
    return this.courses.findPublishedSummaries();
  }

  /** A published course with its curriculum, upcoming batches, teachers and testimonials. */
  @Get(':slug')
  @ApiOperation({ operationId: 'getCourseBySlug', summary: 'Get a published course by slug' })
  @ApiOkResponse({ type: CourseDetailDto })
  @ApiNotFound('Course')
  async getCourseBySlug(@Param('slug') slug: string): Promise<CourseDetailDto> {
    const course = await this.courses.findPublishedBySlug(slug);
    if (!course) throw new NotFoundException(`Course "${slug}" not found`);
    return course;
  }
}
