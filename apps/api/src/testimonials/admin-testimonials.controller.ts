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
  ApiNotFound,
  ApiValidationErrors,
} from '../common/http/api-errors.decorator.js';
import { TestimonialsService } from './testimonials.service.js';
import { TestimonialWithCoursesDto } from './dto/testimonial.dto.js';
import { CreateTestimonialDto } from './dto/create-testimonial.dto.js';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto.js';

@ApiTags('admin: testimonials')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin/testimonials', version: '1' })
export class AdminTestimonialsController {
  constructor(private readonly testimonials: TestimonialsService) {}

  @Get()
  @ApiOperation({ operationId: 'adminListTestimonials', summary: 'List all testimonials' })
  @ApiOkResponse({ type: [TestimonialWithCoursesDto] })
  adminListTestimonials(): Promise<TestimonialWithCoursesDto[]> {
    return this.testimonials.adminList();
  }

  @Post()
  @ApiOperation({ operationId: 'adminCreateTestimonial', summary: 'Create a testimonial' })
  @ApiCreatedResponse({ type: TestimonialWithCoursesDto })
  @ApiValidationErrors()
  adminCreateTestimonial(@Body() body: CreateTestimonialDto): Promise<TestimonialWithCoursesDto> {
    return this.testimonials.create(body);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'adminGetTestimonial', summary: 'Get a testimonial' })
  @ApiOkResponse({ type: TestimonialWithCoursesDto })
  @ApiNotFound('Testimonial')
  adminGetTestimonial(@Param('id', ParseUUIDPipe) id: string): Promise<TestimonialWithCoursesDto> {
    return this.testimonials.adminGet(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'adminUpdateTestimonial', summary: 'Update a testimonial' })
  @ApiOkResponse({ type: TestimonialWithCoursesDto })
  @ApiValidationErrors()
  @ApiNotFound('Testimonial')
  adminUpdateTestimonial(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTestimonialDto,
  ): Promise<TestimonialWithCoursesDto> {
    return this.testimonials.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ operationId: 'adminDeleteTestimonial', summary: 'Delete a testimonial' })
  @ApiNoContentResponse()
  @ApiNotFound('Testimonial')
  adminDeleteTestimonial(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.testimonials.remove(id);
  }
}
