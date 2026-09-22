import 'server-only';

import { headers } from 'next/headers';

import { safeNextPath } from './return-to';

/**
 * The path of the current request, for `next` return trips.
 *
 * Server Components cannot see their own URL; the AuthKit proxy forwards it
 * in the `x-url` request header on every route the matcher covers (see
 * `partitionAuthkitHeaders` — internal headers go downstream, never to the
 * browser). Layouts use this to send an anonymous visitor to
 * `/sign-in?next=<here>` instead of a bare `/sign-in` that would strand them
 * on the dashboard after login.
 *
 * Anything unparseable falls back — the sign-in page re-validates anyway.
 */
export async function currentPath(fallback = '/dashboard'): Promise<string> {
  const raw = (await headers()).get('x-url');
  if (!raw) return fallback;
  try {
    const url = new URL(raw);
    return safeNextPath(`${url.pathname}${url.search}`, fallback);
  } catch {
    return fallback;
  }
}
