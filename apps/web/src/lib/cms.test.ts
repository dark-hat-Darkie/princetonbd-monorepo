import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getBatch, getCourse } from './cms';

/* `lib/cms` is `server-only`, which refuses to load outside the App Router —
   stub the guard so the real readers run. The network is stubbed too: every
   test below decides what `fetch` does. */
vi.mock('server-only', () => ({}));

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('cms single-item readers', () => {
  beforeEach(() => {
    vi.stubEnv('SKIP_ENV_VALIDATION', '1');
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'http://localhost:1');
    vi.stubEnv('NEXT_PUBLIC_WORKOS_REDIRECT_URI', 'http://localhost:3000/auth/callback');
    vi.stubEnv('NEXT_PHASE', '');
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('fetch failed'));
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns data when the API answers', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue(jsonResponse({ slug: 'sat' }, 200));
    await expect(getCourse('sat')).resolves.toEqual({ slug: 'sat' });
  });

  it('returns null for a 404 in any phase', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue(jsonResponse({ message: 'nope' }, 404));
    await expect(getCourse('nope')).resolves.toBeNull();

    vi.stubEnv('NEXT_PHASE', 'phase-production-build');
    await expect(getCourse('nope')).resolves.toBeNull();
  });

  it('throws on transport failure at runtime', async () => {
    await expect(getCourse('sat')).rejects.toThrow();
    await expect(getBatch('b1')).rejects.toThrow();
  });

  it('returns null on transport failure while `next build` prerenders', async () => {
    vi.stubEnv('NEXT_PHASE', 'phase-production-build');
    /* A sick API must degrade to on-demand rendering, never fail the deploy. */
    await expect(getCourse('sat')).resolves.toBeNull();
    await expect(getBatch('b1')).resolves.toBeNull();
  });
});
