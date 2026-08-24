import { Global, Inject, Module, type OnApplicationShutdown } from '@nestjs/common';
import { createDb, type Database, type DatabaseHandle } from '@repo/db';
import type { ApiEnv } from '@repo/env/api';

import { ENV } from '../config/env.module.js';

/** DI token for the Drizzle database instance. */
export const DRIZZLE = 'DRIZZLE';
/** DI token for the underlying handle, for health checks and shutdown. */
export const DB_HANDLE = 'DB_HANDLE';

export const InjectDb = (): ParameterDecorator => Inject(DRIZZLE);

export type { Database };

@Global()
@Module({
  providers: [
    {
      provide: DB_HANDLE,
      inject: [ENV],
      useFactory: (env: ApiEnv): DatabaseHandle =>
        createDb({
          connectionString: env.DATABASE_URL,
          max: env.DATABASE_POOL_MAX,
          logger: env.NODE_ENV === 'development',
        }),
    },
    {
      provide: DRIZZLE,
      inject: [DB_HANDLE],
      useFactory: (handle: DatabaseHandle): Database => handle.db,
    },
  ],
  exports: [DRIZZLE, DB_HANDLE],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(@Inject(DB_HANDLE) private readonly handle: DatabaseHandle) {}

  /* Drain the pool on SIGTERM so in-flight queries finish before the container
     is torn down. Requires `app.enableShutdownHooks()` in main.ts. */
  async onApplicationShutdown(): Promise<void> {
    await this.handle.close();
  }
}
