/**
 * Footer link columns.
 *
 * Grouped the way princetonreview.com groups its own footer — by level
 * (College, Graduate), then subjects, then the applications, resources and
 * company tails.
 *
 * Column ORDER is load-bearing, not alphabetical. The grid is four across, so
 * the four short exam-and-format columns take the first row and the four long
 * tails take the second. Interleaving them puts a nine-link column beside three
 * four-link ones and leaves a visible hole under the short ones.
 *
 * The footer carries more weight here than it did before the navigation moved
 * to the parent's stage-based structure. The header is down to the four stages
 * that lead with an exam this centre runs, so everything else routes through
 * here — the MCAT and LSAT pages, medical and law counseling, tutoring formats,
 * course formats, company and campus pages, the free-resource funnels. Same
 * shape as the parent, whose header is six items and whose footer is seven
 * columns.
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
  {
    title: 'Tutoring & Subjects',
    links: [
      { label: 'All Academic Tutoring', href: '/tutoring' },
      { label: 'Private 1-on-1', href: '/tutoring/private' },
      { label: 'Small Group', href: '/tutoring/small-group' },
      { label: 'Online Tutoring', href: '/tutoring/online' },
      { label: 'Mathematics', href: '/tutoring/subjects/math' },
      { label: 'Science', href: '/tutoring/subjects/science' },
      { label: 'English', href: '/tutoring/subjects/english' },
      { label: 'Social Studies', href: '/tutoring/subjects/social-studies' },
      { label: 'AP Support', href: '/tutoring/subjects/advanced-placement' },
    ],
  },
  {
    title: 'Applications & Aid',
    links: [
      { label: 'All Admissions Counseling', href: '/admissions' },
      { label: 'Medical/Dental School', href: '/admissions/medical' },
      { label: 'Law School', href: '/admissions/law' },
      { label: 'Find Your School', href: '/study-abroad/university-finder' },
      { label: 'Essays & Personal Statements', href: '/admissions/essays' },
      { label: 'Interview Preparation', href: '/admissions/interviews' },
      { label: 'Financial Aid & Scholarships', href: '/admissions/financial-aid' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Advice & Resources', href: '/resources' },
      { label: 'Rankings & Guides', href: '/resources/rankings-guides' },
      { label: 'Majors & Careers', href: '/resources/majors-and-careers' },
      { label: 'Events & Webinars', href: '/events' },
      { label: 'Free Practice Tests', href: '/free-practice-tests' },
      { label: 'Free Diagnostic Test', href: '/free-diagnostic' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Instructors', href: '/about/instructors' },
      { label: 'Campuses', href: '/about/campuses' },
      { label: 'Results', href: '/about/results' },
      { label: 'Our Guarantee', href: '/about/guarantee' },
      { label: 'Careers', href: '/careers' },
      { label: 'Teach For Us', href: '/careers/teach' },
      { label: 'Partnerships', href: '/partnerships' },
      { label: 'Press & Media', href: '/media' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const legalLinks: readonly FooterLink[] = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Refund policy', href: '/legal/refund-policy' },
  { label: 'Site map', href: '/site-map' },
];
