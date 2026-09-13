import { Module } from '@nestjs/common';

import { AdminTestimonialsController } from './admin-testimonials.controller.js';
import { TestimonialsService } from './testimonials.service.js';

@Module({
  controllers: [AdminTestimonialsController],
  providers: [TestimonialsService],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}
