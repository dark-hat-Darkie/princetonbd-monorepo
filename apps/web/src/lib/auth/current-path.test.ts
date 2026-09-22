import { describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

const get = vi.hoisted(() => vi.fn());
vi.mock('next/headers', () => ({ headers: () => ({ get }) }));

import { currentPath } from './current-path';

describe('currentPath', () => {
  it('returns pathname plus search from the forwarded request URL', async () => {
    get.mockReturnValue('http://localhost:3000/enroll?course=sat&batch=abc');

    await expect(currentPath()).resolves.toBe('/enroll?course=sat&batch=abc');
  });

  it('falls back when the header is missing or unparseable', async () => {
    get.mockReturnValue(null);
    await expect(currentPath()).resolves.toBe('/dashboard');

    get.mockReturnValue('not a url');
    await expect(currentPath('/sign-in')).resolves.toBe('/sign-in');
  });

  it('keeps only the path of a forwarded URL, never its origin', async () => {
    get.mockReturnValue('https://evil.example.com/phish?x=1');

    await expect(currentPath()).resolves.toBe('/phish?x=1');
  });
});
