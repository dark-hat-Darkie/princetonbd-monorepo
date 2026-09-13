import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator.js';
import {
  ApiAdminErrors,
  ApiConflict,
  ApiNotFound,
  ApiValidationErrors,
} from '../common/http/api-errors.decorator.js';
import { TeacherDto } from '../teachers/dto/teacher.dto.js';
import { CoursesService } from './courses.service.js';
import { CourseDetailDto, CourseSummaryDto, CurriculumModuleDto } from './dto/course.dto.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { ReplaceCourseTeachersDto } from './dto/replace-course-teachers.dto.js';
import { ReplaceCurriculumDto } from './dto/replace-curriculum.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@ApiTags('admin: courses')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin/courses', version: '1' })
export class AdminCoursesController {
  constructor(private readonly courses: CoursesService) {}

  /** Every course regardless of status. */
  @Get()
  @ApiOperation({ operationId: 'adminListCourses', summary: 'List all courses' })
  @ApiOkResponse({ type: [CourseSummaryDto] })
  list(): Promise<CourseSummaryDto[]> {
    return this.courses.adminList();
  }

  @Post()
  @ApiOperation({ operationId: 'adminCreateCourse', summary: 'Create a course' })
  @ApiCreatedResponse({ type: CourseDetailDto })
  @ApiValidationErrors()
  @ApiConflict('Slug already in use')
  create(@Body() body: CreateCourseDto): Promise<CourseDetailDto> {
    return this.courses.create(body);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'adminGetCourse', summary: 'Get a course with everything attached' })
  @ApiOkResponse({ type: CourseDetailDto })
  @ApiNotFound('Course')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<CourseDetailDto> {
    return this.courses.adminGet(id);
  }

  /** Partial update; omitted fields are left as they are. Use this to publish or archive. */
  @Patch(':id')
  @ApiOperation({ operationId: 'adminUpdateCourse', summary: 'Update a course' })
  @ApiOkResponse({ type: CourseDetailDto })
  @ApiValidationErrors()
  @ApiNotFound('Course')
  @ApiConflict('Slug already in use')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCourseDto,
  ): Promise<CourseDetailDto> {
    return this.courses.update(id, body);
  }

  /** Permanently deletes the course and every batch, module and link under it. Prefer archiving. */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ operationId: 'adminDeleteCourse', summary: 'Delete a course' })
  @ApiNoContentResponse()
  @ApiNotFound('Course')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.courses.remove(id);
  }

  @Put(':id/curriculum')
  @ApiOperation({
    operationId: 'adminReplaceCurriculum',
    summary: 'Replace the whole curriculum module list',
  })
  @ApiOkResponse({ type: [CurriculumModuleDto] })
  @ApiValidationErrors()
  @ApiNotFound('Course')
  replaceCurriculum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ReplaceCurriculumDto,
  ): Promise<CurriculumModuleDto[]> {
    return this.courses.replaceCurriculum(id, body.modules);
  }

  @Put(':id/teachers')
  @ApiOperation({
    operationId: 'adminReplaceCourseTeachers',
    summary: 'Replace the teachers assigned to a course',
  })
  @ApiOkResponse({ type: [TeacherDto] })
  @ApiValidationErrors()
  @ApiNotFound('Course')
  replaceTeachers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ReplaceCourseTeachersDto,
  ): Promise<TeacherDto[]> {
    return this.courses.replaceTeachers(id, body.teacherIds);
  }
}
