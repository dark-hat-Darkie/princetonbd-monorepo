import { describe, expect, it, vi } from 'vitest';

const withAuth = vi.hoisted(() => vi.fn());
vi.mock('@workos-inc/authkit-nextjs', () => ({ withAuth }));

import { GET } from './route';

describe('GET /auth/session', () => {
  it('reports signed-out with no-store when there is no user', async () => {
    withAuth.mockResolvedValue({ user: null });

    const response = await GET();
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.json()).toEqual({ signedIn: false });
  });

  it('reports the display name and email when signed in', async () => {
    withAuth.mockResolvedValue({
      user: { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com' },
    });

    const response = await GET();
    expect(await response.json()).toEqual({
      signedIn: true,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
  });

  it('falls back to the email when no name is set', async () => {
    withAuth.mockResolvedValue({
      user: { firstName: null, lastName: null, email: 'ada@example.com' },
    });

    const response = await GET();
    expect(await response.json()).toEqual({
      signedIn: true,
      name: 'ada@example.com',
      email: 'ada@example.com',
    });
  });
});
