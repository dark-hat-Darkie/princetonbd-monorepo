/**
 * Where and how to reach Princeton Review Bangladesh.
 *
 * Lives apart from page content because the header, footer, announcement bar,
 * every closing CTA and the contact page all render some slice of it — one
 * phone-number change should not mean editing six files.
 */

export interface Campus {
  /** Short label used in nav and cards, e.g. "Dhaka — Gulshan". */
  name: string;
  address: string;
  /** Local landline or mobile in the display format used across the site. */
  phone: string;
}

export const contact = {
  address: 'House 00, Road 00, Gulshan-2, Dhaka',
  email: 'hello@princetonreviewbd.com',
  phone: '+880 1700-000000',
} as const;

export const campuses: readonly Campus[] = [
  {
    name: 'Dhaka — Gulshan',
    address: 'House 00, Road 00, Gulshan-2, Dhaka 1212',
    phone: '+880 1700-000000',
  },
  {
    name: 'Dhaka — Dhanmondi',
    address: 'House 00, Road 00, Dhanmondi, Dhaka 1205',
    phone: '+880 1700-000001',
  },
  {
    name: 'Chattogram',
    address: 'Level 0, 00 CDA Avenue, Chattogram 4000',
    phone: '+880 1700-000002',
  },
];

/**
 * `tel:` hrefs need the punctuation stripped; the display strings keep it.
 * One helper so the two never drift apart.
 */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}
