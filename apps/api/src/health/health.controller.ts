import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthCheck, HealthCheckService, type HealthCheckResult } from '@nestjs/terminus';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../common/decorators/public.decorator.js';
import { DatabaseHealthIndicator } from './database.health.js';

@ApiTags('health')
/* VERSION_NEUTRAL keeps this at a stable `/health`. It is excluded from the
   global `/api` prefix too, so the platform's health probe URL never moves
   when the API version is bumped. */
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: DatabaseHealthIndicator,
  ) {}

  /**
   * Readiness probe. Railway/Render poll this; a non-200 pulls the instance
   * out of rotation. Unauthenticated by necessity.
   */
  @Get()
  @Public()
  @HealthCheck()
  @ApiOperation({ operationId: 'getHealth', summary: 'Service and dependency health' })
  check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.database.isHealthy('database')]);
  }
}
