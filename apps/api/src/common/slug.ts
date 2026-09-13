/**
 * Derive a URL-safe slug from a display name: "Dhaka — Gulshan" → "dhaka-gulshan".
 *
 * Diacritics are stripped after NFKD decomposition, everything that is not
 * a letter or digit collapses to a single hyphen, and leading/trailing
 * hyphens go. The result is what the public course URL is built from, so it
 * must be stable and unambiguous.
 */
export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** kebab-case: lower-case letters and digits separated by single hyphens. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
