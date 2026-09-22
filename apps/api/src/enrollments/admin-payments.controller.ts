import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator.js';
import { ApiAdminErrors, ApiNotFound } from '../common/http/api-errors.decorator.js';
import {
  AdminPaymentDetailDto,
  AdminPaymentListDto,
  AdminPaymentListQuery,
} from './dto/admin-payment.dto.js';
import { PaymentsService } from './payments.service.js';

/** Every payment attempt, for the admin panel. Students never see this surface. */
@ApiTags('admin: payments')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin', version: '1' })
export class AdminPaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  /** Paginated attempts, filterable by status and searchable by reference or name. */
  @Get('payments')
  @ApiOperation({ operationId: 'adminListPayments', summary: 'List payment attempts' })
  @ApiOkResponse({ type: AdminPaymentListDto })
  list(@Query() query: AdminPaymentListQuery): Promise<AdminPaymentListDto> {
    return this.payments.adminList(query);
  }

  /** One attempt with its enrollment snapshot and provider timeline. */
  @Get('payments/:reference')
  @ApiOperation({ operationId: 'adminGetPayment', summary: 'Get a payment attempt' })
  @ApiOkResponse({ type: AdminPaymentDetailDto })
  @ApiNotFound('Payment')
  get(@Param('reference') reference: string): Promise<AdminPaymentDetailDto> {
    return this.payments.adminGet(reference);
  }

  /** Force a fresh provider check for one attempt. Idempotent. */
  @Post('payments/:reference/resync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'adminResyncPayment', summary: 'Re-sync a payment attempt' })
  @ApiOkResponse({ type: AdminPaymentDetailDto })
  @ApiNotFound('Payment')
  resync(@Param('reference') reference: string): Promise<AdminPaymentDetailDto> {
    return this.payments.adminResync(reference);
  }
}
