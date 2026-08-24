/**
 * Footer link columns.
 *
 * Every href here is checked against the filesystem by `routes.test.ts` — the
 * footer is where dead links accumulate fastest, because nothing on screen
 * tells you a column has gone stale.
 */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: readonly FooterLink[];
}

/** Rendered in the footer copyright line. */
export const year = 2026;

export const footerColumns: readonly FooterColumn[] = [
  {
    title: 'Test Prep',
    links: [
      { label: 'SAT', href: '/test-prep/sat' },
      { label: 'ACT', href: '/test-prep/act' },
      { label: 'GRE', href: '/test-prep/gre' },
      { label: 'GMAT', href: '/test-prep/gmat' },
      { label: 'IELTS', href: '/test-prep/ielts' },
      { label: 'TOEFL', href: '/test-prep/toefl' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Tutoring', href: '/tutoring' },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Study Abroad', href: '/study-abroad' },
      { label: 'Online Courses', href: '/online-courses' },
      { label: 'Partnerships', href: '/partnerships' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Instructors', href: '/about/instructors' },
      { label: 'Careers', href: '/careers' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Campuses',
    links: [
      { label: 'Dhaka — Gulshan', href: '/about/campuses' },
      { label: 'Dhaka — Dhanmondi', href: '/about/campuses' },
      { label: 'Chattogram', href: '/about/campuses' },
    ],
  },
];

export const legalLinks: readonly FooterLink[] = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Refund policy', href: '/legal/refund-policy' },
  { label: 'Site map', href: '/site-map' },
];
