import './setup-env.js';

import { ThrottlerGuard } from '@nestjs/throttler';
import { Test, type TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/configure-app.js';

interface HealthBody {
  status: string;
  details: Record<string, { status: string }>;
}

interface ErrorBody {
  message: string;
  statusCode: number;
}

describe('API (e2e)', () => {
  let app: INestApplication;

  /* `getHttpServer()` is typed `any`; narrowing it once here keeps every call
     site type-checked instead of scattering assertions through the suite. */
  const api = (): request.Agent => request(app.getHttpServer() as App);

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      /* Rate limiting is verified separately; leaving it on makes test order
         significant and produces flaky 429s as the suite grows. */
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  }, 30_000);

  afterAll(async () => {
    await app.close();
  });

  describe('GET /health', () => {
    it('is public and reports a live database', async () => {
      const res = await api().get('/health');
      const body = res.body as HealthBody;

      expect(res.status).toBe(200);
      expect(body.status).toBe('ok');
      expect(body.details.database?.status).toBe('up');
    });
  });

  describe('auth', () => {
    it('rejects a request with no Authorization header', async () => {
      const res = await api().get('/api/v1/users/me');

      expect(res.status).toBe(401);
      expect((res.body as ErrorBody).message).toBe('Missing bearer token');
    });

    it('rejects a malformed bearer token', async () => {
      const res = await api().get('/api/v1/users/me').set('Authorization', 'Bearer not-a-jwt');

      expect(res.status).toBe(401);
      expect((res.body as ErrorBody).message).toBe('Invalid or expired token');
    });

    it('rejects a non-bearer scheme', async () => {
      const res = await api().get('/api/v1/users/me').set('Authorization', 'Basic dXNlcjpwYXNz');

      expect(res.status).toBe(401);
    });
  });

  describe('routing', () => {
    it('serves versioned routes under the /api prefix', async () => {
      // 401 rather than 404 proves the route resolved and the guard ran.
      await api().get('/api/v1/users/me').expect(401);
      await api().get('/api/users/me').expect(404);
    });

    it('keeps /health outside the prefix and unversioned', async () => {
      await api().get('/health').expect(200);
      await api().get('/api/v1/health').expect(404);
    });
  });
});
