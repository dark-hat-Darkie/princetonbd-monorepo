import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
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
import { PaymentInitDto, PaymentStatusDto } from './dto/payment.dto.js';
import { PaymentsService } from './payments.service.js';

/**
 * The money half of an enrollment. Every route is owner-scoped and funnels
 * through verified provider state — landing on the provider's success URL
 * grants nothing until `status` re-checks the transaction server-side.
 */
@ApiTags('enrollments')
@ApiBearerAuth('workos')
@Controller({ path: 'enrollments', version: '1' })
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  /** Create (or resume) the payment attempt and get the hosted-checkout URL. */
  @Post(':id/payment-init')
  @ApiOperation({ operationId: 'initEnrollmentPayment', summary: 'Start enrollment payment' })
  @ApiCreatedResponse({ type: PaymentInitDto })
  @ApiValidationErrors()
  @ApiNotFound('Enrollment')
  init(@CurrentUser() user: User, @Param('id', ParseUUIDPipe) id: string): Promise<PaymentInitDto> {
    return this.payments.initPayment(user, id);
  }

  /** Re-verify against the provider. Safe to poll from the success page. */
  @Get(':id/status')
  @ApiOperation({ operationId: 'getEnrollmentPaymentStatus', summary: 'Verify enrollment payment' })
  @ApiOkResponse({ type: PaymentStatusDto })
  @ApiNotFound('Enrollment')
  status(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PaymentStatusDto> {
    return this.payments.verifyStatus(user, id);
  }

  /**
   * Same verification starting from the provider's reference — for return
   * pages reached without the enrollment id (a provider receipt link, a
   * fresh browser). Owner-scoped: another learner's reference 404s.
   */
  @Get('by-reference/:reference/status')
  @ApiOperation({
    operationId: 'getEnrollmentPaymentStatusByReference',
    summary: 'Verify enrollment payment by provider reference',
  })
  @ApiOkResponse({ type: PaymentStatusDto })
  @ApiNotFound('Payment')
  statusByReference(
    @CurrentUser() user: User,
    @Param('reference') reference: string,
  ): Promise<PaymentStatusDto> {
    return this.payments.verifyByReference(user, reference);
  }
}
