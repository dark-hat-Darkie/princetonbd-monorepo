import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { ApiEnv } from '@repo/env/api';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module.js';
import { ENV } from './config/env.module.js';
import { configureApp } from './configure-app.js';
import { configureSwagger } from './swagger.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const env = app.get<ApiEnv>(ENV);

  app.useLogger(app.get(Logger));

  app.use(helmet());

  app.enableCors({
    origin: env.CORS_ORIGINS,
    credentials: true,
    /* The web app forwards the AuthKit access token here. */
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  });

  configureApp(app);

  /* Lets DatabaseModule.onApplicationShutdown drain the pool on SIGTERM. */
  app.enableShutdownHooks();

  configureSwagger(app);

  await app.listen(env.PORT, '0.0.0.0');
}

void bootstrap();
