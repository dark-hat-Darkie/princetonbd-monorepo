import { Module } from '@nestjs/common';

import { StorageModule } from '../storage/storage.module.js';
import { AdminUploadsController } from './admin-uploads.controller.js';

@Module({
  imports: [StorageModule],
  controllers: [AdminUploadsController],
})
export class UploadsModule {}
