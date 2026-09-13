import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../common/decorators/public.decorator.js';
import { TeachersService } from './teachers.service.js';
import { TeacherWithCoursesDto } from './dto/teacher.dto.js';

@ApiTags('teachers')
@Public()
@Controller({ path: 'teachers', version: '1' })
export class TeachersController {
  constructor(private readonly teachers: TeachersService) {}

  @Get()
  @ApiOperation({ operationId: 'listTeachers', summary: 'List active teachers with their courses' })
  @ApiOkResponse({ type: [TeacherWithCoursesDto] })
  listTeachers(): Promise<TeacherWithCoursesDto[]> {
    return this.teachers.findActive();
  }
}
