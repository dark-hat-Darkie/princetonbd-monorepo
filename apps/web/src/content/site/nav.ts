/**
 * The primary navigation tree.
 *
 * This is the site's spine. The header dropdowns, the mobile drawer, the
 * breadcrumb trail, the `/site-map` page and `app/sitemap.ts` all derive from
 * it, so a page reached from the header is by construction a page that exists
 * in the sitemap and knows its own ancestry.
 *
 * Structure follows princetonreview.com's stage-based spine — the site
 * organises by student life stage rather than by service type — but the header
 * carries only the exams each stage leads with. The parent's wider columns
 * (admissions counselling, school finders, rankings, the administrator
 * programmes) are deliberately not here, and this site no longer has pages for
 * them: each dropdown is one column, with the section hub as its first row.
 *
 * Two departures from the parent's stage list, both forced by what this
 * franchise actually is:
 *
 *  1. Only the stages that lead with an exam this centre runs — SAT, GRE, GMAT,
 *     TOEFL, IELTS — get a slot in the bar. That drops the parent's Pre-High
 *     School (SSAT, SHSAT, ISEE), Pre-Med (MCAT, DAT, OAT, NCLEX-RN) and
 *     Pre-Law (LSAT). MCAT and LSAT pages still exist and are reachable from
 *     the footer; the rest are US private-school entry, the NYC specialised
 *     high-school test, and US dental/optometry/nursing licensure, which
 *     Bangladesh does not run at all.
 *
 *  2. Study Abroad is a fourth top-level entry with no parent equivalent, and
 *     it carries the English-proficiency exams (IELTS, TOEFL, Duolingo, PTE).
 *     The parent is a US-domestic site and needs neither. For a Bangladeshi
 *     applicant they are the whole point.
 *
 * Anything that leaves this tree lands in the footer — which is also how the
 * parent site handles its long tail. Nothing is required to appear here:
 * `routes.test.ts` checks that every nav href resolves, not that every route is
 * navigable.
 *
 * `typedRoutes` is enabled, but it does not currently reject an unknown literal
 * href in this project — see the note in `routes.ts`.
 */

export interface NavLink {
  label: string;
  href: string;
  /** One-line gloss shown in the dropdown under wider entries. */
  desc?: string;
}

export interface NavColumn {
  title: string;
  links: readonly NavLink[];
}

export interface NavGroup {
  /** The label in the header bar. */
  label: string;
  /** The section hub, linked from the panel's first row. */
  href: string;
  /** What the hub row says, e.g. "All test prep courses". */
  hubLabel: string;
  columns: readonly NavColumn[];
  /** Promoted links along the bottom of the panel. */
  featured?: readonly NavLink[];
}

/* Repeated across stages exactly as the parent site repeats them — every
   Pre-* menu on princetonreview.com carries its own "Academic Tutoring" entry
   rather than factoring it out. */
const academicTutoring: NavLink = { label: 'Academic Tutoring', href: '/tutoring' };

export const navGroups: readonly NavGroup[] = [
  {
    label: 'Pre-College',
    href: '/test-prep',
    hubLabel: 'All college test prep',
    columns: [
      {
        title: 'Tests',
        links: [
          { label: 'SAT', href: '/test-prep/sat' },
          { label: 'ACT', href: '/test-prep/act' },
          { label: 'AP', href: '/test-prep/ap' },
          { label: 'PSAT', href: '/test-prep/psat' },
          academicTutoring,
        ],
      },
    ],
    featured: [
      { label: 'Free diagnostic test', href: '/free-diagnostic' },
      { label: 'Compare all courses', href: '/test-prep/compare' },
    ],
  },
  {
    label: 'Pre-Grad',
    href: '/admissions/graduate',
    hubLabel: 'Graduate school admissions',
    columns: [
      {
        title: 'Tests',
        links: [{ label: 'GRE', href: '/test-prep/gre' }, academicTutoring],
      },
    ],
    featured: [{ label: 'Talk to a counselor', href: '/contact' }],
  },
  {
    label: 'Pre-Business',
    href: '/admissions/business',
    hubLabel: 'Business school admissions',
    columns: [
      {
        title: 'Tests',
        links: [
          { label: 'GMAT', href: '/test-prep/gmat' },
          { label: 'GRE', href: '/test-prep/gre' },
          academicTutoring,
        ],
      },
    ],
    featured: [{ label: 'Talk to a counselor', href: '/contact' }],
  },
  {
    label: 'Study Abroad',
    href: '/study-abroad',
    hubLabel: 'The whole journey, end to end',
    columns: [
      {
        title: 'English Proficiency',
        links: [
          { label: 'IELTS', href: '/test-prep/ielts' },
          { label: 'TOEFL', href: '/test-prep/toefl' },
          { label: 'Duolingo English Test', href: '/test-prep/duolingo' },
          { label: 'PTE Academic', href: '/test-prep/pte' },
        ],
      },
    ],
    featured: [{ label: 'Book a free consultation', href: '/contact' }],
  },
];

/** Flat list of every link the dropdowns can reach, hubs included. */
export const navLinks: readonly NavLink[] = navGroups.flatMap((group) => [
  { label: group.label, href: group.href },
  ...group.columns.flatMap((column) => column.links),
  ...(group.featured ?? []),
]);
