import { Module } from '@nestjs/common';

import { AdminPaymentsController } from './admin-payments.controller.js';
import { EnrollmentsController } from './enrollments.controller.js';
import { EnrollmentsService } from './enrollments.service.js';
import { PaymentsController } from './payments.controller.js';
import { PaymentsClient } from './payments-client.js';
import { PaymentsService } from './payments.service.js';

@Module({
  controllers: [EnrollmentsController, PaymentsController, AdminPaymentsController],
  providers: [EnrollmentsService, PaymentsClient, PaymentsService],
  exports: [EnrollmentsService, PaymentsService],
})
export class EnrollmentsModule {}
