import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorService, type HealthIndicatorResult } from '@nestjs/terminus';
import type { DatabaseHandle } from '@repo/db';

import { DB_HANDLE } from '../database/database.module.js';

/**
 * Liveness probe for Postgres.
 *
 * Issues a real `select 1` rather than inspecting pool state, so a Neon
 * compute that has scaled to zero or a revoked credential is actually
 * detected. Bounded by the pool's own connection timeout.
 */
@Injectable()
export class DatabaseHealthIndicator {
  constructor(
    private readonly health: HealthIndicatorService,
    @Inject(DB_HANDLE) private readonly handle: DatabaseHandle,
  ) {}

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const indicator = this.health.check(key);
    const startedAt = Date.now();

    try {
      await this.handle.pool.query('select 1');
      return indicator.up({ responseTimeMs: Date.now() - startedAt });
    } catch (error) {
      return indicator.down({ message: (error as Error).message });
    }
  }
}
