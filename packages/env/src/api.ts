import { z } from 'zod';

import { parseEnv } from './parse.js';

/**
 * Environment contract for the NestJS API (`apps/api`).
 *
 * Neon exposes two connection strings and they are NOT interchangeable:
 *
 *   DATABASE_URL           the `-pooler` host. Routes through PgBouncer in
 *                          transaction mode. Used for all runtime queries.
 *   DATABASE_URL_UNPOOLED  the direct host. Required for migrations, which use
 *                          session-level operations PgBouncer cannot proxy.
 */
const apiEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3001),

  DATABASE_URL: z
    .string()
    .min(1)
    .refine((v) => v.startsWith('postgres://') || v.startsWith('postgresql://'), {
      message: 'must be a postgres:// connection string',
    })
    .refine((v) => !v.includes('.neon.tech') || v.includes('-pooler.'), {
      message:
        'Neon runtime connections must use the POOLED host (contains "-pooler"). ' +
        'The direct host belongs in DATABASE_URL_UNPOOLED.',
    }),

  DATABASE_URL_UNPOOLED: z
    .string()
    .min(1)
    .refine((v) => v.startsWith('postgres://') || v.startsWith('postgresql://'), {
      message: 'must be a postgres:// connection string',
    })
    .refine((v) => !v.includes('-pooler.'), {
      message:
        'Migrations must use the DIRECT (unpooled) host. PgBouncer transaction ' +
        'mode cannot proxy the session-level operations migrations need.',
    }),

  DATABASE_POOL_MAX: z.coerce.number().int().positive().default(10),

  WORKOS_API_KEY: z.string().min(1),
  WORKOS_CLIENT_ID: z.string().min(1),

  /** Comma-separated list of origins allowed to call this API. */
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000')
    .transform((v) =>
      v
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    ),

  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

let cached: ApiEnv | undefined;

/** Lazily validated so importing this module never has side effects at build time. */
export function getApiEnv(): ApiEnv {
  cached ??= parseEnv(apiEnvSchema, process.env, 'API');
  return cached;
}
