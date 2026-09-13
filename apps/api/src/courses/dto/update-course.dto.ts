import { PartialType } from '@nestjs/swagger';

import { CreateCourseDto } from './create-course.dto.js';

/** Every field optional; only the keys present are written. */
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
