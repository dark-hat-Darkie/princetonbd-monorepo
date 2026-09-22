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
    'ADMIN_EMAILS',
    'S3_ENDPOINT',
    'S3_REGION',
    'S3_BUCKET',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
    'S3_PUBLIC_URL',
    'S3_FORCE_PATH_STYLE',
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
  S3_BUCKET: 'media',
  S3_ACCESS_KEY_ID: 'key',
  S3_SECRET_ACCESS_KEY: 'secret',
  S3_PUBLIC_URL: 'https://media.example.com/',
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

  it('normalises ADMIN_EMAILS to a lower-cased, trimmed list and defaults to none', async () => {
    const env = await loadEnv({ ...valid, ADMIN_EMAILS: ' Ada@Example.com, grace@example.com ,' });
    expect(env.ADMIN_EMAILS).toEqual(['ada@example.com', 'grace@example.com']);

    const none = await loadEnv({ ...valid, ADMIN_EMAILS: undefined });
    expect(none.ADMIN_EMAILS).toEqual([]);
  });

  it('requires the storage bucket and credentials', async () => {
    await expect(loadEnv({ ...valid, S3_BUCKET: undefined })).rejects.toThrow(/S3_BUCKET/);
    await expect(loadEnv({ ...valid, S3_PUBLIC_URL: 'not a url' })).rejects.toThrow(
      /S3_PUBLIC_URL/,
    );
  });

  it('treats an empty S3_ENDPOINT as unset and strips the public URL trailing slash', async () => {
    const env = await loadEnv({ ...valid, S3_ENDPOINT: '', S3_FORCE_PATH_STYLE: 'true' });
    expect(env.S3_ENDPOINT).toBeUndefined();
    expect(env.S3_PUBLIC_URL).toBe('https://media.example.com');
    expect(env.S3_FORCE_PATH_STYLE).toBe(true);
    expect(env.S3_REGION).toBe('auto');
  });

  it('bypasses validation when SKIP_ENV_VALIDATION is set, for image builds', async () => {
    await expect(loadEnv({ SKIP_ENV_VALIDATION: '1' })).resolves.toBeDefined();
  });
});
