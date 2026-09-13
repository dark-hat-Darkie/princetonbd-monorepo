/**
 * Where and how to reach Princeton Review Bangladesh.
 *
 * Lives apart from page content because the header, footer, announcement bar,
 * every closing CTA and the contact page all render some slice of it — one
 * phone-number change should not mean editing six files.
 *
 * The campuses themselves are CMS records now (branches, via `lib/cms.ts`);
 * only the head-office contact stays here.
 */

export const contact = {
  address: 'House 00, Road 00, Gulshan-2, Dhaka',
  email: 'hello@princetonreviewbd.com',
  phone: '+880 1700-000000',
} as const;

/**
 * `tel:` hrefs need the punctuation stripped; the display strings keep it.
 * One helper so the two never drift apart.
 */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}
