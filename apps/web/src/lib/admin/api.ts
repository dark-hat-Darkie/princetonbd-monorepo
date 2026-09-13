import 'server-only';

import { createApiClient, type Client } from '@repo/api-client';
import { getWebClientEnv } from '@repo/env/web';
import { withAuth } from '@workos-inc/authkit-nextjs';

/**
 * The API client the admin panel uses: the caller's token, and no caching.
 *
 * Admin pages must always show the row as it is now — an admin who has just
 * saved a course and sees yesterday's price will save it again. The wrapped
 * `fetch` pins `cache: 'no-store'` on every request the generated SDK makes,
 * which also keeps every admin route dynamically rendered, as a page behind a
 * session should be. The public site reads through `lib/cms.ts` instead,
 * which tags and caches.
 */
export async function getAdminClient(): Promise<Client> {
  const { accessToken } = await withAuth();
  const { NEXT_PUBLIC_API_URL } = getWebClientEnv();

  return createApiClient({
    baseUrl: NEXT_PUBLIC_API_URL,
    accessToken: accessToken ?? null,
    fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
  });
}
