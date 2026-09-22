import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { User } from '@repo/db';

import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { ApiNotFound, ApiValidationErrors } from '../common/http/api-errors.decorator.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { EnrollmentDto } from './dto/enrollment.dto.js';
import { UpdateEnrollmentDetailsDto } from './dto/update-details.dto.js';
import { EnrollmentsService } from './enrollments.service.js';

/** The learner's own enrollments: draft, details, and history. */
@ApiTags('enrollments')
@ApiBearerAuth('workos')
@Controller({ path: 'enrollments', version: '1' })
export class EnrollmentsController {
  constructor(private readonly enrollments: EnrollmentsService) {}

  /** Start (or resume) an enrollment for a published course or open batch. */
  @Post()
  @ApiOperation({ operationId: 'createEnrollment', summary: 'Start an enrollment' })
  @ApiCreatedResponse({ type: EnrollmentDto })
  @ApiValidationErrors()
  create(@CurrentUser() user: User, @Body() dto: CreateEnrollmentDto): Promise<EnrollmentDto> {
    return this.enrollments.createDraft(user.id, dto);
  }

  /** The learner's own enrollments, for history and receipt views. */
  @Get()
  @ApiOperation({ operationId: 'listEnrollments', summary: 'List my enrollments' })
  @ApiOkResponse({ type: [EnrollmentDto] })
  list(@CurrentUser() user: User): Promise<EnrollmentDto[]> {
    return this.enrollments.listMine(user.id);
  }

  /** One enrollment the caller owns. Unknown ids and other learners' ids 404 alike. */
  @Get(':id')
  @ApiOperation({ operationId: 'getEnrollment', summary: 'Get my enrollment' })
  @ApiOkResponse({ type: EnrollmentDto })
  @ApiNotFound('Enrollment')
  get(@CurrentUser() user: User, @Param('id', ParseUUIDPipe) id: string): Promise<EnrollmentDto> {
    return this.enrollments.getOwned(user.id, id);
  }

  /** Save the details form (name, DOB, education, address) onto a draft. */
  @Patch(':id/details')
  @ApiOperation({ operationId: 'updateEnrollmentDetails', summary: 'Save enrollment details' })
  @ApiOkResponse({ type: EnrollmentDto })
  @ApiValidationErrors()
  @ApiNotFound('Enrollment')
  updateDetails(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEnrollmentDetailsDto,
  ): Promise<EnrollmentDto> {
    return this.enrollments.updateDetails(user.id, id, dto);
  }
}
