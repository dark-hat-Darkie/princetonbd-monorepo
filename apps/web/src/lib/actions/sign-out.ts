'use server';

import { signOut } from '@workos-inc/authkit-nextjs';

import { siteUrl } from '@/lib/site';

/**
 * End the session and come back to the site.
 *
 * A caveat worth knowing before debugging this: WorkOS's session-logout
 * endpoint **ignores `return_to`**. Verified by following the chain by hand —
 * `api.workos.com/user_management/sessions/logout?...&return_to=<url>` 302s to
 * the environment's AuthKit domain at `/api/logout` with the parameter
 * stripped, and that hop decides where to land using the App Homepage URL
 * configured in the WorkOS dashboard. If that field is empty the user ends up
 * on `error.workos.com/user_management/app-homepage-url-not-found`, and no
 * amount of `returnTo` from here will change it.
 *
 * It is still passed, because it governs the other branch: when there is no
 * session id to log out, `signOut` redirects locally to `returnTo ?? '/'`, and
 * that path should land somewhere deliberate. It is absolute because the same
 * value would be handed to WorkOS, whose redirect resolves against its origin.
 */
export async function signOutAction(): Promise<void> {
  await signOut({ returnTo: siteUrl });
}
