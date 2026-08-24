import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, type PoolConfig } from 'pg';

import * as schema from './schema/index.js';

export type Database = NodePgDatabase<typeof schema>;

export interface DatabaseHandle {
  db: Database;
  pool: Pool;
  close: () => Promise<void>;
}

export interface CreateDbOptions {
  /** Neon POOLED (`-pooler`) connection string. */
  connectionString: string;
  /** Per-process pool ceiling. Keep low when running many replicas. */
  max?: number;
  logger?: boolean;
  /** Force TLS on or off. Defaults to `shouldUseSsl(connectionString)`. */
  ssl?: boolean;
}

/**
 * Decide whether to negotiate TLS for a given connection string.
 *
 * Neon mandates TLS, but a Postgres running in Docker or on the developer's
 * machine usually has it switched off entirely — connecting to that with SSL
 * forced on fails with "The server does not support SSL connections". Rather
 * than making callers remember, derive it: loopback and explicit
 * `sslmode=disable` mean plaintext, anything else is treated as remote and
 * must be encrypted.
 */
export function shouldUseSsl(connectionString: string): boolean {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    return true;
  }

  if (url.searchParams.get('sslmode') === 'disable') return false;

  const host = url.hostname;
  return !(host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === 'postgres');
}

/**
 * Build a database handle backed by node-postgres.
 *
 * `pg` over plain TCP is the right driver here, not `@neondatabase/serverless`:
 * this API is a long-lived process that can hold a real connection pool.
 * The serverless driver tunnels queries over HTTP/WebSocket and exists for
 * edge runtimes that cannot open TCP sockets at all — using it here would add
 * per-query overhead and buy nothing.
 *
 * Returned as a factory rather than a module-level singleton so Nest's DI
 * container owns the lifecycle and tests can supply their own instance.
 */
export function createDb({
  connectionString,
  max = 10,
  logger = false,
  ssl,
}: CreateDbOptions): DatabaseHandle {
  const useSsl = ssl ?? shouldUseSsl(connectionString);

  const config: PoolConfig = {
    connectionString,
    max,
    /* Postgres backends leak a little memory across many thousands of queries.
       Recycling a connection after 7,500 uses keeps RSS flat on a process that
       stays up for weeks. */
    maxUses: 7_500,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    /* Neon presents a valid public certificate, so verification stays on for
       any remote host. Never set rejectUnauthorized:false to silence a
       certificate error — that removes the protection TLS is there for. */
    ssl: useSsl ? { rejectUnauthorized: true } : false,
  };

  const pool = new Pool(config);

  /* `pg` emits 'error' on idle clients killed by the server (Neon scales
     computes to zero). Unhandled, this takes down the process. */
  pool.on('error', (err) => {
    console.error('[db] idle client error', err);
  });

  const db = drizzle(pool, { schema, logger });

  return {
    db,
    pool,
    close: async () => {
      await pool.end();
    },
  };
}
