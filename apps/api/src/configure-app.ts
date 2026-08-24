import { ValidationPipe, VersioningType, type INestApplication } from '@nestjs/common';

/**
 * Routing and validation setup shared by the running server and the OpenAPI
 * generator.
 *
 * This exists so the two cannot drift. `setGlobalPrefix` and
 * `enableVersioning` both change the emitted paths, so a generator that
 * skipped either would produce a client calling `/api/users/me` while the
 * server actually serves `/api/v1/users/me` — a mismatch that only shows up as
 * a 404 at runtime, long after the build went green.
 *
 * Runtime-only concerns (helmet, CORS, logging, shutdown hooks) stay in
 * main.ts, since they have no effect on the document.
 */
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api', { exclude: ['health'] });

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
}
