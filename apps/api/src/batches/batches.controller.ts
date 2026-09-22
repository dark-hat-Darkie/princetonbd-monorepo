import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../common/decorators/public.decorator.js';
import { ApiNotFound } from '../common/http/api-errors.decorator.js';
import { BatchesService } from './batches.service.js';
import { BatchDto } from './dto/batch.dto.js';

@ApiTags('batches')
@Public()
@Controller({ path: 'batches', version: '1' })
export class BatchesController {
  constructor(private readonly batches: BatchesService) {}

  /** Every joinable batch of every published course, soonest first. */
  @Get()
  @ApiOperation({
    operationId: 'listBatches',
    summary: 'List upcoming batches of published courses',
  })
  @ApiOkResponse({ type: [BatchDto] })
  listBatches(): Promise<BatchDto[]> {
    return this.batches.findUpcoming();
  }

  /**
   * One batch by id, for the enquiry form to echo back what a visitor is
   * asking about. Only resolves while the course is published.
   */
  @Get(':id')
  @ApiOperation({ operationId: 'getBatchById', summary: 'Get a batch of a published course' })
  @ApiOkResponse({ type: BatchDto })
  @ApiNotFound('Batch')
  async getBatchById(@Param('id', ParseUUIDPipe) id: string): Promise<BatchDto> {
    const batch = await this.batches.findPublishedById(id);
    if (!batch) throw new NotFoundException(`Batch ${id} not found`);
    return batch;
  }
}
