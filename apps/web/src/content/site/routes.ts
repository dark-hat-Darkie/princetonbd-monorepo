/**
 * Every page on the marketing site, with the label and parent used to build
 * breadcrumbs, `/site-map` and `app/sitemap.ts`.
 *
 * Kept explicit rather than derived from `nav.ts`, for two reasons. Several
 * pages are reachable from more than one menu (the university finder sits under
 * both Admissions and Study Abroad) and only one of those can be its parent in
 * a breadcrumb; and a number of pages — the legal documents, the article index,
 * the site map itself — are linked only from the footer and would be missing
 * from a nav-derived list entirely.
 *
 * `routes.test.ts` keeps the two in step: it asserts every nav href appears
 * here, and that every path here resolves to a real file under `src/app`.
 *
 * On why this is not typed as Next's `Route`: `typedRoutes` is enabled in
 * next.config.ts, but the generated route union is not applied to link hrefs in
 * this project's TypeScript setup — a `<Link href="/does-not-exist">` compiles
 * and builds clean. Rather than type these as `Route` and imply a guarantee the
 * compiler is not making, the check lives in the test.
 */

export interface RouteNode {
  path: string;
  /** Breadcrumb and site-map label. Usually shorter than the page's <h1>. */
  label: string;
  /** Parent path; omitted for the six top-level sections and the home page. */
  parent?: string;
  /** Relative weight in sitemap.xml. */
  priority?: number;
}

export const routes: readonly RouteNode[] = [
  { path: '/', label: 'Home', priority: 1 },

  /* — Test prep ——————————————————————————————————————————————————————— */
  { path: '/test-prep', label: 'Test Prep', priority: 0.9 },
  { path: '/test-prep/compare', label: 'Compare courses', parent: '/test-prep' },
  { path: '/test-prep/sat', label: 'SAT', parent: '/test-prep', priority: 0.9 },
  { path: '/test-prep/act', label: 'ACT', parent: '/test-prep', priority: 0.9 },
  { path: '/test-prep/ap', label: 'AP', parent: '/test-prep' },
  { path: '/test-prep/psat', label: 'PSAT', parent: '/test-prep' },
  { path: '/test-prep/gre', label: 'GRE', parent: '/test-prep', priority: 0.9 },
  { path: '/test-prep/gmat', label: 'GMAT', parent: '/test-prep' },
  { path: '/test-prep/lsat', label: 'LSAT', parent: '/test-prep' },
  { path: '/test-prep/mcat', label: 'MCAT', parent: '/test-prep' },
  { path: '/test-prep/ielts', label: 'IELTS', parent: '/test-prep', priority: 0.9 },
  { path: '/test-prep/toefl', label: 'TOEFL', parent: '/test-prep' },
  { path: '/test-prep/duolingo', label: 'Duolingo English Test', parent: '/test-prep' },
  { path: '/test-prep/pte', label: 'PTE Academic', parent: '/test-prep' },

  /* — Tutoring ———————————————————————————————————————————————————————— */
  { path: '/tutoring', label: 'Tutoring', priority: 0.9 },
  { path: '/tutoring/private', label: 'Private 1-on-1', parent: '/tutoring' },
  { path: '/tutoring/small-group', label: 'Small group', parent: '/tutoring' },
  { path: '/tutoring/online', label: 'Online tutoring', parent: '/tutoring' },
  { path: '/tutoring/subjects/math', label: 'Mathematics', parent: '/tutoring' },
  { path: '/tutoring/subjects/science', label: 'Science', parent: '/tutoring' },
  { path: '/tutoring/subjects/english', label: 'English', parent: '/tutoring' },
  { path: '/tutoring/subjects/social-studies', label: 'Social studies', parent: '/tutoring' },
  { path: '/tutoring/subjects/advanced-placement', label: 'AP support', parent: '/tutoring' },

  /* — Admissions —————————————————————————————————————————————————————— */
  { path: '/admissions', label: 'Admissions', priority: 0.9 },
  { path: '/admissions/undergraduate', label: 'Undergraduate', parent: '/admissions' },
  { path: '/admissions/graduate', label: 'Graduate', parent: '/admissions' },
  { path: '/admissions/business', label: 'Business school', parent: '/admissions' },
  { path: '/admissions/medical', label: 'Medical school', parent: '/admissions' },
  { path: '/admissions/law', label: 'Law school', parent: '/admissions' },
  { path: '/admissions/essays', label: 'Essays', parent: '/admissions' },
  { path: '/admissions/recommendations', label: 'Recommendations', parent: '/admissions' },
  { path: '/admissions/interviews', label: 'Interviews', parent: '/admissions' },
  { path: '/admissions/financial-aid', label: 'Financial aid', parent: '/admissions' },

  /* — Study abroad ———————————————————————————————————————————————————— */
  { path: '/study-abroad', label: 'Study Abroad', priority: 0.9 },
  { path: '/study-abroad/destinations/usa', label: 'United States', parent: '/study-abroad' },
  { path: '/study-abroad/destinations/uk', label: 'United Kingdom', parent: '/study-abroad' },
  { path: '/study-abroad/destinations/canada', label: 'Canada', parent: '/study-abroad' },
  { path: '/study-abroad/destinations/australia', label: 'Australia', parent: '/study-abroad' },
  { path: '/study-abroad/destinations/europe', label: 'Europe', parent: '/study-abroad' },
  { path: '/study-abroad/university-finder', label: 'University finder', parent: '/study-abroad' },
  { path: '/study-abroad/scholarships', label: 'Scholarships', parent: '/study-abroad' },
  { path: '/study-abroad/visa', label: 'Visa', parent: '/study-abroad' },
  { path: '/study-abroad/pre-departure', label: 'Pre-departure', parent: '/study-abroad' },

  /* — Online courses —————————————————————————————————————————————————— */
  { path: '/online-courses', label: 'Online Courses', priority: 0.9 },
  { path: '/online-courses/live-online', label: 'LiveOnline', parent: '/online-courses' },
  { path: '/online-courses/self-paced', label: 'Self-paced', parent: '/online-courses' },
  { path: '/online-courses/on-demand', label: 'On-demand library', parent: '/online-courses' },

  /* — About & company ————————————————————————————————————————————————— */
  { path: '/about', label: 'About', priority: 0.8 },
  { path: '/about/instructors', label: 'Instructors', parent: '/about' },
  { path: '/about/campuses', label: 'Campuses', parent: '/about' },
  { path: '/about/results', label: 'Results', parent: '/about' },
  { path: '/about/guarantee', label: 'Our guarantee', parent: '/about' },
  { path: '/careers', label: 'Careers', parent: '/about' },
  { path: '/careers/teach', label: 'Teach for us', parent: '/careers' },
  { path: '/media', label: 'Press & media', parent: '/about' },

  /* — Partnerships ———————————————————————————————————————————————————— */
  { path: '/partnerships', label: 'Partnerships' },
  { path: '/partnerships/schools', label: 'Schools & districts', parent: '/partnerships' },
  {
    path: '/partnerships/high-dosage-tutoring',
    label: 'High-dosage tutoring',
    parent: '/partnerships',
  },
  {
    path: '/partnerships/professional-development',
    label: 'Teacher development',
    parent: '/partnerships',
  },

  /* — Lead capture ———————————————————————————————————————————————————— */
  { path: '/contact', label: 'Contact', priority: 0.9 },
  { path: '/free-diagnostic', label: 'Free diagnostic', priority: 0.9 },
  { path: '/free-practice-tests', label: 'Free practice tests' },
  { path: '/events', label: 'Events & webinars' },

  /* — Resources ——————————————————————————————————————————————————————— */
  { path: '/resources', label: 'Resources', priority: 0.8 },
  { path: '/resources/rankings-guides', label: 'Rankings & guides', parent: '/resources' },
  { path: '/resources/majors-and-careers', label: 'Majors & careers', parent: '/resources' },

  /* — Legal & utility ————————————————————————————————————————————————— */
  { path: '/legal/privacy', label: 'Privacy policy', priority: 0.3 },
  { path: '/legal/terms', label: 'Terms of use', priority: 0.3 },
  { path: '/legal/refund-policy', label: 'Refund policy', priority: 0.3 },
  { path: '/legal/enrollment-terms', label: 'Enrolment terms', priority: 0.3 },
  { path: '/legal/accessibility', label: 'Accessibility', priority: 0.3 },
  { path: '/site-map', label: 'Site map', priority: 0.3 },
];

const byPath = new Map(routes.map((route) => [route.path, route]));

export function routeFor(path: string): RouteNode | undefined {
  return byPath.get(path);
}

export function routeLabel(path: string): string {
  return byPath.get(path)?.label ?? path;
}

/**
 * The breadcrumb trail for a page, walking `parent` up to the home page.
 *
 * The final crumb is the page itself and carries no href — `Breadcrumb`
 * renders it as the current location rather than a link back to here.
 */
export function breadcrumbFor(path: string): { label: string; href?: string }[] {
  /* The home page is its own trail — anything else gets Home prepended below. */
  if (path === '/') return [{ label: 'Home' }];

  const trail: { label: string; href?: string }[] = [];

  let current = byPath.get(path);
  /* Guard against a cycle in hand-written `parent` values: without it a
     mistake here would hang the render rather than fail visibly. */
  const seen = new Set<string>();

  while (current && !seen.has(current.path)) {
    seen.add(current.path);
    trail.unshift({ label: current.label, href: current.path });
    current = current.parent ? byPath.get(current.parent) : undefined;
  }

  trail.unshift({ label: 'Home', href: '/' });

  const last = trail[trail.length - 1];
  if (last) delete last.href;

  return trail;
}
