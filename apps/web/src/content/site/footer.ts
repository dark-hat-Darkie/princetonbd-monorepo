/**
 * Footer link columns.
 *
 * Grouped the way princetonreview.com groups its own footer — by level
 * (College, Graduate), then the English-proficiency tests, then how a course
 * can be taken.
 *
 * Column ORDER is load-bearing, not alphabetical. The grid is four across and
 * these four fill exactly one row; the three exam columns come first so the
 * eye reads exams left to right and lands on the formats last.
 *
 * The footer is where the exams that have no slot in the header live — MCAT
 * and LSAT are here and nowhere else. Same shape as the parent, whose header is
 * six items and whose footer carries the long tail.
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
    title: 'College',
    links: [
      { label: 'SAT', href: '/test-prep/sat' },
      { label: 'ACT', href: '/test-prep/act' },
      { label: 'PSAT', href: '/test-prep/psat' },
      { label: 'AP Tests', href: '/test-prep/ap' },
    ],
  },
  {
    title: 'Graduate',
    links: [
      { label: 'GRE', href: '/test-prep/gre' },
      { label: 'GMAT', href: '/test-prep/gmat' },
      { label: 'LSAT', href: '/test-prep/lsat' },
      { label: 'MCAT', href: '/test-prep/mcat' },
    ],
  },
  {
    title: 'English Proficiency',
    links: [
      { label: 'IELTS', href: '/test-prep/ielts' },
      { label: 'TOEFL', href: '/test-prep/toefl' },
      { label: 'Duolingo English Test', href: '/test-prep/duolingo' },
      { label: 'PTE Academic', href: '/test-prep/pte' },
    ],
  },
  {
    title: 'Ways to Study',
    links: [
      { label: 'All Online Courses', href: '/online-courses' },
      { label: 'LiveOnline Classes', href: '/online-courses/live-online' },
      { label: 'Self-Paced', href: '/online-courses/self-paced' },
      { label: 'On-Demand Library', href: '/online-courses/on-demand' },
      { label: 'Compare All Courses', href: '/test-prep/compare' },
    ],
  },
];

export const legalLinks: readonly FooterLink[] = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Refund policy', href: '/legal/refund-policy' },
  { label: 'Site map', href: '/site-map' },
];
