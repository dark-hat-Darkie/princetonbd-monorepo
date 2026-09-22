import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator.js';
import { ApiAdminErrors } from '../common/http/api-errors.decorator.js';
import { AdminService } from './admin.service.js';
import { AdminOverviewDto } from './dto/admin-overview.dto.js';

@ApiTags('admin: overview')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('overview')
  @ApiOperation({ operationId: 'adminGetOverview', summary: 'Counts for the admin overview page' })
  @ApiOkResponse({ type: AdminOverviewDto })
  adminGetOverview(): Promise<AdminOverviewDto> {
    return this.admin.overview();
  }
}
