import { Module } from '@nestjs/common';

import { AdminTeachersController } from './admin-teachers.controller.js';
import { TeachersController } from './teachers.controller.js';
import { TeachersService } from './teachers.service.js';

@Module({
  controllers: [TeachersController, AdminTeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
