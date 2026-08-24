/**
 * The primary navigation tree.
 *
 * This is the site's spine. The header mega-menu, the mobile drawer, the
 * breadcrumb trail, the `/site-map` page and `app/sitemap.ts` all derive from
 * it, so a page reached from the header is by construction a page that exists
 * in the sitemap and knows its own ancestry.
 *
 * `typedRoutes` is enabled, but it does not currently reject an unknown literal
 * href in this project — see the note in `routes.ts`. Link integrity is
 * enforced by `routes.test.ts`, which checks every href here against the actual
 * files under `src/app`.
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

export const navGroups: readonly NavGroup[] = [
  {
    label: 'Test Prep',
    href: '/test-prep',
    hubLabel: 'All test prep courses',
    columns: [
      {
        title: 'Undergraduate',
        links: [
          { label: 'SAT', href: '/test-prep/sat' },
          { label: 'ACT', href: '/test-prep/act' },
          { label: 'AP', href: '/test-prep/ap' },
          { label: 'PSAT', href: '/test-prep/psat' },
        ],
      },
      {
        title: 'Graduate & professional',
        links: [
          { label: 'GRE', href: '/test-prep/gre' },
          { label: 'GMAT', href: '/test-prep/gmat' },
          { label: 'LSAT', href: '/test-prep/lsat' },
          { label: 'MCAT', href: '/test-prep/mcat' },
        ],
      },
      {
        title: 'English proficiency',
        links: [
          { label: 'IELTS', href: '/test-prep/ielts' },
          { label: 'TOEFL', href: '/test-prep/toefl' },
          { label: 'Duolingo English Test', href: '/test-prep/duolingo' },
          { label: 'PTE Academic', href: '/test-prep/pte' },
        ],
      },
    ],
    featured: [
      { label: 'Free diagnostic test', href: '/free-diagnostic' },
      { label: 'Compare all courses', href: '/test-prep/compare' },
    ],
  },
  {
    label: 'Tutoring',
    href: '/tutoring',
    hubLabel: 'All tutoring options',
    columns: [
      {
        title: 'Formats',
        links: [
          { label: 'Private 1-on-1', href: '/tutoring/private' },
          { label: 'Small group', href: '/tutoring/small-group' },
          { label: 'Online tutoring', href: '/tutoring/online' },
        ],
      },
      {
        title: 'Subjects',
        links: [
          { label: 'Mathematics', href: '/tutoring/subjects/math' },
          { label: 'Science', href: '/tutoring/subjects/science' },
          { label: 'English', href: '/tutoring/subjects/english' },
          { label: 'Social studies', href: '/tutoring/subjects/social-studies' },
          { label: 'AP support', href: '/tutoring/subjects/advanced-placement' },
        ],
      },
      {
        title: 'For institutions',
        links: [
          { label: 'Schools & districts', href: '/partnerships/schools' },
          { label: 'High-dosage tutoring', href: '/partnerships/high-dosage-tutoring' },
          { label: 'Teacher development', href: '/partnerships/professional-development' },
        ],
      },
    ],
    featured: [{ label: 'Book a tutor', href: '/contact' }],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    hubLabel: 'All counseling programs',
    columns: [
      {
        title: 'Counseling',
        links: [
          { label: 'Undergraduate', href: '/admissions/undergraduate' },
          { label: 'Graduate (MS & PhD)', href: '/admissions/graduate' },
          { label: 'Business school', href: '/admissions/business' },
          { label: 'Medical school', href: '/admissions/medical' },
          { label: 'Law school', href: '/admissions/law' },
        ],
      },
      {
        title: 'Application support',
        links: [
          { label: 'Essays & personal statements', href: '/admissions/essays' },
          { label: 'Recommendations', href: '/admissions/recommendations' },
          { label: 'Interview preparation', href: '/admissions/interviews' },
          { label: 'Financial aid & scholarships', href: '/admissions/financial-aid' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { label: 'University finder', href: '/study-abroad/university-finder' },
          { label: 'Rankings & guides', href: '/resources/rankings-guides' },
          { label: 'Majors & careers', href: '/resources/majors-and-careers' },
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
        title: 'Plan your application',
        links: [
          { label: 'University finder', href: '/study-abroad/university-finder' },
          { label: 'Scholarships & funding', href: '/study-abroad/scholarships' },
          { label: 'Visa & documentation', href: '/study-abroad/visa' },
          { label: 'Pre-departure', href: '/study-abroad/pre-departure' },
        ],
      },
    ],
    featured: [{ label: 'Book a free consultation', href: '/contact' }],
  },
  {
    label: 'Online Courses',
    href: '/online-courses',
    hubLabel: 'All online formats',
    columns: [
      {
        title: 'Formats',
        links: [
          { label: 'LiveOnline classes', href: '/online-courses/live-online' },
          { label: 'Self-paced', href: '/online-courses/self-paced' },
          { label: 'On-demand library', href: '/online-courses/on-demand' },
        ],
      },
      {
        title: 'Free to start',
        links: [
          { label: 'Free practice tests', href: '/free-practice-tests' },
          { label: 'Free diagnostic', href: '/free-diagnostic' },
          { label: 'Events & webinars', href: '/events' },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    hubLabel: 'About Princeton Review Bangladesh',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'Our story', href: '/about' },
          { label: 'Instructors', href: '/about/instructors' },
          { label: 'Campuses', href: '/about/campuses' },
          { label: 'Results', href: '/about/results' },
          { label: 'Our guarantee', href: '/about/guarantee' },
        ],
      },
      {
        title: 'Join us',
        links: [
          { label: 'Careers', href: '/careers' },
          { label: 'Teach for us', href: '/careers/teach' },
          { label: 'Partner with us', href: '/partnerships' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'Contact', href: '/contact' },
          { label: 'Advice & resources', href: '/resources' },
          { label: 'Press & media', href: '/media' },
        ],
      },
    ],
  },
];

/** Flat list of every link the mega-menu can reach, hubs included. */
export const navLinks: readonly NavLink[] = navGroups.flatMap((group) => [
  { label: group.label, href: group.href },
  ...group.columns.flatMap((column) => column.links),
  ...(group.featured ?? []),
]);
