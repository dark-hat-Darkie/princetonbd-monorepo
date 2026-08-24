/**
 * The site's public origin, used for `metadataBase`, canonical URLs, Open
 * Graph tags and `sitemap.xml`.
 *
 * Read straight from `process.env` rather than through `@repo/env`: that
 * package validates a contract shared with the API and refuses to boot when
 * something is missing, which is right for a database URL and wrong for a
 * public origin that has a perfectly good local default. Next inlines
 * `NEXT_PUBLIC_*` at build time, so this must stay a literal member access.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const siteName = 'Princeton Review Bangladesh';

export const siteDescription =
  'Test preparation, tutoring and admissions counseling for Bangladeshi students — SAT, ACT, GRE, GMAT, IELTS and TOEFL, on campus in Dhaka and Chattogram or live online.';

/** Absolute URL for a site-relative path, for canonicals and the sitemap. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
