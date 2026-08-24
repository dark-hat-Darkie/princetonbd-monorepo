import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import type { ApiEnv } from '@repo/env/api';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';

import { AuthModule } from './auth/auth.module.js';
import { WorkosAuthGuard } from './auth/workos-auth.guard.js';
import { ENV, EnvModule } from './config/env.module.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './health/health.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,

    LoggerModule.forRootAsync({
      imports: [EnvModule],
      inject: [ENV],
      useFactory: (env: ApiEnv) => ({
        pinoHttp: {
          level: env.LOG_LEVEL,
          /* Pretty output is a development convenience only; production logs
             stay as newline-delimited JSON so the platform can index them. */
          transport: env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
          genReqId: (req, res) => {
            const existing = req.headers['x-request-id'];
            const id = typeof existing === 'string' && existing ? existing : randomUUID();
            res.setHeader('x-request-id', id);
            return id;
          },
          /* Never log credentials or session material. */
          redact: {
            paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
            remove: true,
          },
          autoLogging: {
            ignore: (req) => req.url === '/health',
          },
        },
      }),
    }),

    ThrottlerModule.forRoot({
      throttlers: [{ name: 'default', ttl: 60_000, limit: 120 }],
    }),

    AuthModule,
    UsersModule,
    HealthModule,
  ],
  providers: [
    /* Order matters: rate limiting runs before token verification so a flood
       of junk tokens cannot force a JWKS lookup per request. */
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: WorkosAuthGuard },
  ],
})
export class AppModule {}
