import { beforeEach, describe, expect, it, vi } from 'vitest';

const signOut = vi.hoisted(() => vi.fn());
vi.mock('@workos-inc/authkit-nextjs', () => ({ signOut }));

import { signOutAction } from './sign-out';

/**
 * `returnTo` governs the branch `signOut` takes when there is no session id to
 * log out: it redirects locally to `returnTo ?? '/'`. It does NOT control where
 * a real WorkOS logout lands — that endpoint discards the parameter and uses
 * the App Homepage URL from the dashboard. See the note in `sign-out.ts`.
 */
describe('signOutAction', () => {
  beforeEach(() => {
    signOut.mockReset();
  });

  it('always tells WorkOS where to send the user back to', async () => {
    await signOutAction();

    expect(signOut).toHaveBeenCalledOnce();
    const [options] = signOut.mock.calls[0] as [{ returnTo?: string }];
    expect(options.returnTo).toBeTruthy();
  });

  it('passes an absolute URL, since WorkOS redirects from its own origin', async () => {
    await signOutAction();

    const [options] = signOut.mock.calls[0] as [{ returnTo?: string }];
    expect(() => new URL(options.returnTo ?? '')).not.toThrow();
    expect(options.returnTo).toMatch(/^https?:\/\//);
  });
});
