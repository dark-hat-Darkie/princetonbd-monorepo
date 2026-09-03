/**
 * The primary navigation tree.
 *
 * This is the site's spine. The header mega-menu, the mobile drawer, the
 * breadcrumb trail, the `/site-map` page and `app/sitemap.ts` all derive from
 * it, so a page reached from the header is by construction a page that exists
 * in the sitemap and knows its own ancestry.
 *
 * STRUCTURE MIRRORS princetonreview.com. The parent site organises by student
 * life stage rather than by service type, and the column headings ("Explore
 * Schools", "For School Administrators") and link wording ("Academic Tutoring",
 * "College Admissions Counseling", "Find Your College") are taken from it
 * verbatim so the two sites read as one brand.
 *
 * Three deliberate departures, all forced by what this franchise actually is:
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
 *     applicant they are the whole point. Keeping them here rather than
 *     repeating them inside every Pre-* menu is what lets those menus stay
 *     faithful to the parent.
 *
 *  3. Each Pre-* menu carries the application-support links (essays,
 *     recommendations, interviews, aid) that the parent keeps on its counseling
 *     pages. With three stages removed those pages would otherwise have no
 *     route into them from the header at all.
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
  /** One-line gloss shown in the mega-menu under wider entries. */
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
   Pre-* menu on princetonreview.com carries its own "Academic Tutoring" and
   "For School Administrators" entries rather than factoring them out. */
const academicTutoring: NavLink = { label: 'Academic Tutoring', href: '/tutoring' };
const forAdministrators: NavLink = {
  label: 'For School Administrators',
  href: '/partnerships/schools',
};

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
      {
        title: 'Admissions',
        links: [
          { label: 'College Admissions Counseling', href: '/admissions/undergraduate' },
          { label: 'Essays & Personal Statements', href: '/admissions/essays' },
          { label: 'Recommendations', href: '/admissions/recommendations' },
          { label: 'Interview Preparation', href: '/admissions/interviews' },
        ],
      },
      {
        title: 'Explore Schools',
        links: [
          { label: 'Find Your College', href: '/study-abroad/university-finder' },
          { label: 'College Rankings & Ratings', href: '/resources/rankings-guides' },
          { label: 'Find Majors & Careers', href: '/resources/majors-and-careers' },
        ],
      },
      {
        title: 'For School Administrators',
        links: [
          { label: 'Schools & Districts', href: '/partnerships/schools' },
          { label: 'High-Dosage Tutoring', href: '/partnerships/high-dosage-tutoring' },
          { label: 'Professional Development', href: '/partnerships/professional-development' },
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
      {
        title: 'Admissions',
        links: [
          { label: 'Graduate Admissions Counseling', href: '/admissions/graduate' },
          { label: 'Essays & Personal Statements', href: '/admissions/essays' },
          { label: 'Financial Aid & Scholarships', href: '/admissions/financial-aid' },
        ],
      },
      {
        title: 'Explore Schools',
        links: [
          { label: 'Find Your Grad School', href: '/study-abroad/university-finder' },
          { label: 'Find Grad Programs', href: '/resources/majors-and-careers' },
          forAdministrators,
        ],
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
      {
        title: 'Admissions',
        links: [
          { label: 'Business School Admissions Counseling', href: '/admissions/business' },
          { label: 'Essays & Personal Statements', href: '/admissions/essays' },
          { label: 'Interview Preparation', href: '/admissions/interviews' },
        ],
      },
      {
        title: 'Explore Schools',
        links: [
          { label: 'Find Your Business School', href: '/study-abroad/university-finder' },
          { label: 'Business School Rankings & Ratings', href: '/resources/rankings-guides' },
          forAdministrators,
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
      {
        title: 'Destinations',
        links: [
          { label: 'United States', href: '/study-abroad/destinations/usa' },
          { label: 'United Kingdom', href: '/study-abroad/destinations/uk' },
          { label: 'Canada', href: '/study-abroad/destinations/canada' },
          { label: 'Australia', href: '/study-abroad/destinations/australia' },
          { label: 'Europe', href: '/study-abroad/destinations/europe' },
        ],
      },
      {
        title: 'Plan Your Application',
        links: [
          { label: 'Find Your School', href: '/study-abroad/university-finder' },
          { label: 'Scholarships & Funding', href: '/study-abroad/scholarships' },
          { label: 'Visa & Documentation', href: '/study-abroad/visa' },
          { label: 'Pre-departure', href: '/study-abroad/pre-departure' },
        ],
      },
    ],
    featured: [{ label: 'Book a free consultation', href: '/contact' }],
  },
];

/** Flat list of every link the mega-menu can reach, hubs included. */
export const navLinks: readonly NavLink[] = navGroups.flatMap((group) => [
  { label: group.label, href: group.href },
  ...group.columns.flatMap((column) => column.links),
  ...(group.featured ?? []),
]);
