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
import { TeachersService } from './teachers.service.js';
import { TeacherWithCoursesDto } from './dto/teacher.dto.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { UpdateTeacherDto } from './dto/update-teacher.dto.js';

@ApiTags('admin: teachers')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin/teachers', version: '1' })
export class AdminTeachersController {
  constructor(private readonly teachers: TeachersService) {}

  @Get()
  @ApiOperation({ operationId: 'adminListTeachers', summary: 'List all teachers' })
  @ApiOkResponse({ type: [TeacherWithCoursesDto] })
  adminListTeachers(): Promise<TeacherWithCoursesDto[]> {
    return this.teachers.adminList();
  }

  @Post()
  @ApiOperation({ operationId: 'adminCreateTeacher', summary: 'Create a teacher' })
  @ApiCreatedResponse({ type: TeacherWithCoursesDto })
  @ApiValidationErrors()
  adminCreateTeacher(@Body() body: CreateTeacherDto): Promise<TeacherWithCoursesDto> {
    return this.teachers.create(body);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'adminGetTeacher', summary: 'Get a teacher' })
  @ApiOkResponse({ type: TeacherWithCoursesDto })
  @ApiNotFound('Teacher')
  adminGetTeacher(@Param('id', ParseUUIDPipe) id: string): Promise<TeacherWithCoursesDto> {
    return this.teachers.adminGet(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'adminUpdateTeacher', summary: 'Update a teacher' })
  @ApiOkResponse({ type: TeacherWithCoursesDto })
  @ApiValidationErrors()
  @ApiNotFound('Teacher')
  adminUpdateTeacher(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTeacherDto,
  ): Promise<TeacherWithCoursesDto> {
    return this.teachers.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ operationId: 'adminDeleteTeacher', summary: 'Delete a teacher' })
  @ApiNoContentResponse()
  @ApiNotFound('Teacher')
  @ApiConflict('Teacher is still assigned to a course or batch')
  adminDeleteTeacher(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.teachers.remove(id);
  }
}
