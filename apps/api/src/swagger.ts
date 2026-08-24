import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, type OpenAPIObject } from '@nestjs/swagger';

/**
 * Single definition of the OpenAPI document.
 *
 * Shared between the running server (which serves it at /api/docs) and
 * `scripts/generate-openapi.ts` (which writes it to disk for client codegen),
 * so the published docs and the generated client can never describe different
 * APIs.
 */
export function buildOpenApiDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('PrincetonBD API')
    .setDescription('Backend API for the PrincetonBD web application.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'WorkOS AuthKit access token.',
      },
      'workos',
    )
    .addServer('/', 'Current host')
    .build();

  return SwaggerModule.createDocument(app, config, { operationIdFactory: (_c, method) => method });
}

export function configureSwagger(app: INestApplication): void {
  SwaggerModule.setup('api/docs', app, buildOpenApiDocument(app), {
    swaggerOptions: { persistAuthorization: true },
  });
}
