import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const NEON_POOLED =
  'postgresql://u:p@ep-cool-rain-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';
const NEON_DIRECT =
  'postgresql://u:p@ep-cool-rain-123456.us-east-2.aws.neon.tech/neondb?sslmode=require';

/** getApiEnv memoises, so each case needs a fresh module instance. */
async function loadEnv(overrides: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  const mod = await import('./api.js');
  return mod.getApiEnv();
}

const original = { ...process.env };

beforeEach(() => {
  for (const key of [
    'DATABASE_URL',
    'DATABASE_URL_UNPOOLED',
    'WORKOS_API_KEY',
    'WORKOS_CLIENT_ID',
    'CORS_ORIGINS',
    'PORT',
    'SKIP_ENV_VALIDATION',
    'NODE_ENV',
  ]) {
    delete process.env[key];
  }
});

afterEach(() => {
  process.env = { ...original };
});

const valid = {
  DATABASE_URL: NEON_POOLED,
  DATABASE_URL_UNPOOLED: NEON_DIRECT,
  WORKOS_API_KEY: 'sk_test_x',
  WORKOS_CLIENT_ID: 'client_x',
};

describe('API env validation', () => {
  it('accepts a correct Neon pooled/direct pair', async () => {
    const env = await loadEnv(valid);
    expect(env.DATABASE_URL).toBe(NEON_POOLED);
    expect(env.PORT).toBe(3001);
  });

  it('rejects a direct Neon host used for runtime queries', async () => {
    await expect(loadEnv({ ...valid, DATABASE_URL: NEON_DIRECT })).rejects.toThrow(
      /must use the POOLED host/,
    );
  });

  it('rejects a pooled Neon host used for migrations', async () => {
    await expect(loadEnv({ ...valid, DATABASE_URL_UNPOOLED: NEON_POOLED })).rejects.toThrow(
      /must use the DIRECT \(unpooled\) host/,
    );
  });

  it('reports every missing variable at once, not just the first', async () => {
    await expect(loadEnv({ DATABASE_URL: NEON_POOLED })).rejects.toThrow(
      /DATABASE_URL_UNPOOLED[\s\S]*WORKOS_API_KEY[\s\S]*WORKOS_CLIENT_ID/,
    );
  });

  it('splits CORS_ORIGINS into a trimmed list', async () => {
    const env = await loadEnv({
      ...valid,
      CORS_ORIGINS: 'https://a.example.com, https://b.example.com ',
    });
    expect(env.CORS_ORIGINS).toEqual(['https://a.example.com', 'https://b.example.com']);
  });

  it('coerces PORT from its string form', async () => {
    const env = await loadEnv({ ...valid, PORT: '8080' });
    expect(env.PORT).toBe(8080);
  });

  it('bypasses validation when SKIP_ENV_VALIDATION is set, for image builds', async () => {
    await expect(loadEnv({ SKIP_ENV_VALIDATION: '1' })).resolves.toBeDefined();
  });
});
