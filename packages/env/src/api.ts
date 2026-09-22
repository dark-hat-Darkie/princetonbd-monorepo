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

  /**
   * Comma-separated emails that are promoted to the `admin` role the first
   * time they sign in (and on every request after, if their row was demoted
   * by hand). Compared case-insensitively. Empty means nobody is bootstrapped.
   */
  ADMIN_EMAILS: z
    .string()
    .default('')
    .transform((v) =>
      v
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    ),

  /* --- Object storage (S3-compatible) ---------------------------------------
     Uploads never touch the API's own filesystem — the container is read-only
     and replicas share nothing. The API only signs PUT URLs; the browser
     uploads straight to the bucket and the resulting public URL is what gets
     stored. Works with AWS S3, Cloudflare R2 (region "auto") and MinIO
     (path-style, custom endpoint) alike. */
  /** Custom endpoint for R2 / MinIO. Leave unset for AWS S3. */
  S3_ENDPOINT: z
    .string()
    .trim()
    .default('')
    .transform((v) => v || undefined)
    .pipe(z.url().optional()),
  S3_REGION: z.string().trim().min(1).default('auto'),
  S3_BUCKET: z.string().trim().min(1),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),
  /** Base URL objects are served from, e.g. the R2 public bucket URL or a CDN. No trailing slash. */
  S3_PUBLIC_URL: z.url().transform((v) => v.replace(/\/+$/, '')),
  /** MinIO and some S3 clones need path-style addressing (`host/bucket/key`). */
  S3_FORCE_PATH_STYLE: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),

  /* --- Centralized payments (SSLCommerz via the shared payment app) ---------
     The Bearer token is server-only: only apps/api ever reads it, and the
     logger redacts Authorization headers. All fields are optional so a dev
     checkout without payment credentials still boots; the payments service
     answers 503 until a base URL and token are configured. */
  /** Origin of the centralized payment app, e.g. https://payments.example.com. No trailing slash. */
  PAYMENTS_BASE_URL: z
    .string()
    .trim()
    .default('')
    .transform((v) => v.replace(/\/+$/, '') || undefined)
    .pipe(z.url().optional()),
  /** Server-to-server Bearer token for the payment API. Never expose to the browser. */
  PAYMENTS_API_TOKEN: z
    .string()
    .trim()
    .default('')
    .transform((v) => v || undefined)
    .pipe(z.string().min(1).optional()),
  /** Our source_site as registered in the payment app's api_clients table. */
  PAYMENTS_SOURCE_SITE: z.string().trim().min(1).default('princetonbd'),
  /** Where the provider sends the browser after settlement. Must be allowlisted provider-side. */
  PAYMENTS_SUCCESS_URL: z.url().default('http://localhost:3000/enroll/success'),
  PAYMENTS_CANCEL_URL: z.url().default('http://localhost:3000/enroll/failed'),
  /** Outbound HTTP timeout for provider calls, in milliseconds. */
  PAYMENTS_TIMEOUT_MS: z.coerce.number().int().positive().max(60_000).default(10_000),
  /**
   * The provider's whitelisted post-settlement hook to invoke. Our own grant
   * never depends on it — we verify via the status API — but the provider
   * requires a whitelisted value, so confirm these with the payment team.
   */
  PAYMENTS_SUCCESS_MODEL: z.string().trim().min(1).default('PurchaseCourse'),
  PAYMENTS_SUCCESS_FUNCTION: z.string().trim().min(1).default('purchase_course'),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

let cached: ApiEnv | undefined;

/** Lazily validated so importing this module never has side effects at build time. */
export function getApiEnv(): ApiEnv {
  cached ??= parseEnv(apiEnvSchema, process.env, 'API');
  return cached;
}
