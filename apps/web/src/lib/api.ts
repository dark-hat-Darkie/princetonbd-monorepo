import 'server-only';

import { createApiClient, type Client } from '@repo/api-client';
import { getWebClientEnv } from '@repo/env/web';
import { withAuth } from '@workos-inc/authkit-nextjs';

/**
 * Build an API client carrying the current user's AuthKit access token.
 *
 * `import 'server-only'` makes it a build error to pull this into a Client
 * Component — without it, a stray import would ship the token-forwarding path
 * to the browser.
 *
 * A fresh client per call, never a shared one: a single server process handles
 * many users concurrently, so a module-level client configured with an
 * Authorization header would serve one user's token on another's request.
 */
export async function getApiClient(): Promise<Client> {
  const { accessToken } = await withAuth();
  const { NEXT_PUBLIC_API_URL } = getWebClientEnv();

  return createApiClient({
    baseUrl: NEXT_PUBLIC_API_URL,
    accessToken: accessToken ?? null,
  });
}
