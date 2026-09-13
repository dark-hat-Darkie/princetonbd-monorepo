import { describe, expect, it } from 'vitest';

import { PRESIGN_TTL_SECONDS, S3StorageService } from './s3-storage.service.js';

const env = {
  S3_REGION: 'auto',
  S3_ENDPOINT: 'http://localhost:9000',
  S3_BUCKET: 'media',
  S3_ACCESS_KEY_ID: 'key',
  S3_SECRET_ACCESS_KEY: 'secret',
  S3_PUBLIC_URL: 'http://localhost:9000/media',
  S3_FORCE_PATH_STYLE: true,
} as never;

describe('S3StorageService', () => {
  const storage = new S3StorageService(env);

  it('builds a random key under a per-kind, per-month prefix with the right extension', () => {
    const key = storage.objectKey('teacher-image', 'image/png', new Date('2026-09-13T10:00:00Z'));

    expect(key).toMatch(/^teacher-image\/2026\/09\/[0-9a-f-]{36}\.png$/);
    expect(storage.objectKey('course-thumbnail', 'image/jpeg')).toMatch(/\.jpg$/);
    expect(storage.objectKey('course-thumbnail', 'image/webp')).toMatch(/\.webp$/);
  });

  it('never reuses a key', () => {
    const a = storage.objectKey('course-thumbnail', 'image/png');
    const b = storage.objectKey('course-thumbnail', 'image/png');
    expect(a).not.toBe(b);
  });

  it('joins the public URL onto the key', () => {
    expect(storage.publicUrl('a/b/c.png')).toBe('http://localhost:9000/media/a/b/c.png');
  });

  /* Signing is pure computation — no bucket has to exist for this to pass. */
  it('signs a PUT for the bucket, key and content type without touching the network', async () => {
    const { url, expiresIn } = await storage.presignPut({
      key: 'course-thumbnail/2026/09/x.png',
      contentType: 'image/png',
    });
    const parsed = new URL(url);

    expect(parsed.origin).toBe('http://localhost:9000');
    expect(parsed.pathname).toBe('/media/course-thumbnail/2026/09/x.png');
    expect(parsed.searchParams.get('X-Amz-Expires')).toBe(String(PRESIGN_TTL_SECONDS));
    expect(parsed.searchParams.get('X-Amz-SignedHeaders')).toContain('content-type');
    expect(expiresIn).toBe(PRESIGN_TTL_SECONDS);
  });
});
