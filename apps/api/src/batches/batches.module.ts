import { Module } from '@nestjs/common';

import { AdminBatchesController } from './admin-batches.controller.js';
import { BatchesController } from './batches.controller.js';
import { BatchesService } from './batches.service.js';

@Module({
  controllers: [BatchesController, AdminBatchesController],
  providers: [BatchesService],
  exports: [BatchesService],
})
export class BatchesModule {}
