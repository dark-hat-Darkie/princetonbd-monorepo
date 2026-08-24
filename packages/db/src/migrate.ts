import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { shouldUseSsl } from './client.js';
import path from 'node:path';

/**
 * Apply pending migrations over the DIRECT (unpooled) Neon connection.
 *
 * Run by CI on `main` after a successful build, and locally via
 * `pnpm db:migrate`. Deliberately a script rather than something the API runs
 * at boot: multiple replicas starting at once would race, and a failed
 * migration should fail a deploy step, not crash-loop the service.
 */
async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL_UNPOOLED;

  if (!connectionString) {
    throw new Error('DATABASE_URL_UNPOOLED is required to run migrations.');
  }

  if (connectionString.includes('-pooler.')) {
    throw new Error(
      'DATABASE_URL_UNPOOLED points at the Neon pooled host. Migrations need the direct host.',
    );
  }

  // This package emits CommonJS, so `__dirname` is available and
  // `import.meta.url` is not. Resolves to packages/db/migrations whether run
  // from src via tsx or from the compiled dist.
  const migrationsFolder = path.resolve(__dirname, '..', 'migrations');

  const pool = new Pool({
    connectionString,
    max: 1,
    ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: true } : false,
  });

  try {
    console.warn('[migrate] applying migrations from', migrationsFolder);
    await migrate(drizzle(pool), { migrationsFolder });
    console.warn('[migrate] up to date');
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error('[migrate] failed:', error);
  process.exit(1);
});
