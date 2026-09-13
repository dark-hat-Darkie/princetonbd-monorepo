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
import { BatchesService } from './batches.service.js';
import { BatchDto } from './dto/batch.dto.js';
import { CreateBatchDto } from './dto/create-batch.dto.js';
import { UpdateBatchDto } from './dto/update-batch.dto.js';

/**
 * Batches are created under their course (`/admin/courses/:courseId/batches`)
 * and addressed by their own id afterwards (`/admin/batches/:id`).
 */
@ApiTags('admin: batches')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin', version: '1' })
export class AdminBatchesController {
  constructor(private readonly batches: BatchesService) {}

  /** Every batch of a course, past and future, soonest first. */
  @Get('courses/:courseId/batches')
  @ApiOperation({ operationId: 'adminListBatches', summary: 'List the batches of a course' })
  @ApiOkResponse({ type: [BatchDto] })
  @ApiNotFound('Course')
  list(@Param('courseId', ParseUUIDPipe) courseId: string): Promise<BatchDto[]> {
    return this.batches.adminListForCourse(courseId);
  }

  @Post('courses/:courseId/batches')
  @ApiOperation({ operationId: 'adminCreateBatch', summary: 'Schedule a batch of a course' })
  @ApiCreatedResponse({ type: BatchDto })
  @ApiValidationErrors()
  @ApiNotFound('Course')
  create(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() body: CreateBatchDto,
  ): Promise<BatchDto> {
    return this.batches.create(courseId, body);
  }

  @Get('batches/:id')
  @ApiOperation({ operationId: 'adminGetBatch', summary: 'Get a batch' })
  @ApiOkResponse({ type: BatchDto })
  @ApiNotFound('Batch')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<BatchDto> {
    return this.batches.adminGet(id);
  }

  @Patch('batches/:id')
  @ApiOperation({ operationId: 'adminUpdateBatch', summary: 'Update a batch' })
  @ApiOkResponse({ type: BatchDto })
  @ApiValidationErrors()
  @ApiNotFound('Batch')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateBatchDto): Promise<BatchDto> {
    return this.batches.update(id, body);
  }

  @Delete('batches/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ operationId: 'adminDeleteBatch', summary: 'Delete a batch' })
  @ApiNoContentResponse()
  @ApiNotFound('Batch')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.batches.remove(id);
  }
}
