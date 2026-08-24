import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { AppModule } from '../app.module.js';
import { configureApp } from '../configure-app.js';
import { buildOpenApiDocument } from '../swagger.js';

/**
 * Emit apps/api/openapi.json without starting a server.
 *
 * This lives under src/ so `nest build` compiles it with tsc. It CANNOT be run
 * through tsx/esbuild: esbuild transpiles file-by-file and does not implement
 * `emitDecoratorMetadata`, so `design:paramtypes` is never emitted and every
 * Nest constructor injection resolves to undefined. The symptom is a
 * misleading "Nest can't resolve dependencies of X (?, ...)" at bootstrap.
 * Run the compiled output: `node dist/openapi/generate.js`.
 *
 * Safe to run in CI with no database: the app is created but never listens,
 * and `pg.Pool` opens connections lazily, so nothing dials Postgres. Env
 * validation is stubbed with placeholders for the same reason — the document
 * depends on decorators and types, not on runtime configuration.
 */
async function main(): Promise<void> {
  process.env.DATABASE_URL ??= 'postgresql://codegen:codegen@localhost:5432/codegen-pooler';
  process.env.DATABASE_URL_UNPOOLED ??= 'postgresql://codegen:codegen@localhost:5432/codegen';
  process.env.WORKOS_API_KEY ??= 'sk_codegen';
  process.env.WORKOS_CLIENT_ID ??= 'client_codegen';
  process.env.LOG_LEVEL ??= 'fatal';

  /* abortOnError:false is essential here: with the logger disabled, Nest's
     default behaviour is to exit(1) silently on a bootstrap failure, which
     turns any error into an unexplained non-zero exit in CI. */
  const app = await NestFactory.create(AppModule, { logger: false, abortOnError: false });
  configureApp(app);

  const document = buildOpenApiDocument(app);
  // dist/openapi/generate.js -> apps/api/openapi.json
  const outFile = path.resolve(__dirname, '..', '..', 'openapi.json');

  writeFileSync(outFile, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
  console.warn(`[openapi] wrote ${outFile}`);

  await app.close();
}

main().catch((error: unknown) => {
  console.error('[openapi] generation failed:', error);
  process.exit(1);
});
