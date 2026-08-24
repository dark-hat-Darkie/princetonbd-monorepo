import { defineConfig } from 'drizzle-kit';

/**
 * drizzle-kit runs migrations over the DIRECT (unpooled) Neon host.
 *
 * Migrations use session-level operations — advisory locks, `CREATE INDEX
 * CONCURRENTLY`, transactional DDL held across statements — that PgBouncer in
 * transaction pooling mode cannot proxy. Pointing this at the `-pooler` host
 * produces intermittent, hard-to-reproduce failures.
 */
export default defineConfig({
  schema: './src/schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED ?? '',
  },
  strict: true,
  verbose: true,
});
