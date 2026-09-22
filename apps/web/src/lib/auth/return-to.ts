/**
 * Safe `next` return-path handling for the auth pages.
 *
 * After signing in the user is sent back to where they came from
 * (`/sign-in?next=/enroll?course=x&batch=y`). That value is attacker-visible
 * — a crafted link could point it at another origin — so every consumer
 * funnels it through `safeNextPath`, which only ever returns a root-relative
 * path on this site.
 */

/** Where a successful sign-in lands when no safe return path was given. */
export const DEFAULT_NEXT = '/dashboard';

export function safeNextPath(raw: unknown, fallback: string = DEFAULT_NEXT): string {
  if (typeof raw !== 'string' || raw.length === 0) return fallback;
  /* Must be root-relative: reject absolute URLs, protocol-relative URLs and
     backslash tricks (`\/evil`, `\\\evil`). Query and hash stay — the enroll
     checkout needs `?course=`/`?batch=` to survive the round trip. */
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return fallback;
  return raw;
}

/** Sign-in URL preserving the return path, for links that interrupt a flow. */
export function signInHref(next?: string | null): string {
  if (!next || next === DEFAULT_NEXT) return '/sign-in';
  return `/sign-in?next=${encodeURIComponent(next)}`;
}
