import { Global, Inject, Module } from '@nestjs/common';
import { getApiEnv, type ApiEnv } from '@repo/env/api';

/** DI token for the validated environment. */
export const ENV = 'ENV';

/** Typed injector so consumers never hand-write the token string. */
export const InjectEnv = (): ParameterDecorator => Inject(ENV);

export type { ApiEnv };

/**
 * Validates the environment once, at module construction, and shares the
 * result. A missing or malformed variable throws here — during bootstrap —
 * rather than surfacing as `undefined` deep inside a request.
 */
@Global()
@Module({
  providers: [{ provide: ENV, useFactory: getApiEnv }],
  exports: [ENV],
})
export class EnvModule {}
