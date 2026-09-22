/**
 * Content shapes shared across pages.
 *
 * These live under `content/` rather than beside the components that render
 * them: the components are one possible presentation of the data, not its
 * definition. Keeping the shapes here is also what makes the eventual move to
 * a CMS or an API a change of module, not a change of every consumer.
 */

import type { LeadInterest } from '@/lib/actions/lead-shape';
import type { Price } from '@/lib/money';

export interface Stat {
  value: string;
  label: string;
}

export interface Step {
  no: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  initials: string;
  name: string;
  /** Score and destination, e.g. "SAT 1540 · NUS, Singapore". */
  result: string;
  quote: string;
  /** Slugs this quote may be shown against, e.g. ['sat', 'test-prep']. */
  tags?: readonly string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CourseFormat {
  name: string;
  /** One line on who the format suits, e.g. "Most personalised prep". */
  pitch: string;
  price: Price;
  /** What the price buys, e.g. "per 20-hour package". */
  priceUnit: string;
  /** Format facts: hours, cohort size, delivery mode. */
  facts: readonly string[];
  includes: readonly string[];
  href: string;
  /** Marks the recommended option: tinted ground, lifted shadow, "Most chosen" badge. */
  featured?: boolean;
}

/* ---------------------------------------------------------------------------
 * Course shapes: what a course costs and what it teaches, as the page
 * sections take them. Filled by `lib/course-view.ts` from the CMS record;
 * batches, teachers and quotes arrive through the same mapper as their own
 * view types.
 * ------------------------------------------------------------------------- */

/** The one price a learner pays for the course; a batch may override it. */
export interface CourseFee {
  price: Price;
  /** What the price buys, e.g. "per 10-week course". */
  unit: string;
  /** What is bundled into the fee: materials, mocks, labs, the guarantee. */
  includes: readonly string[];
  /** Payment terms: instalments, registration, refunds. */
  notes?: readonly string[];
}

export interface CurriculumModule {
  /** Display order, e.g. "01". */
  no: string;
  title: string;
  summary: string;
  topics: readonly string[];
  hours?: number;
  /** "By the end you can…" — one line. */
  outcome?: string;
}

export interface Curriculum {
  eyebrow: string;
  title: string;
  intro?: string;
  modules: readonly CurriculumModule[];
  /** Each is optional in the CMS; a null tile is simply not shown. */
  totals: {
    weeks: number | null;
    taughtHours: number | null;
    mocks: number | null;
    classSize: string | null;
  };
  /** What the learner can do on completion; rendered under the modules. */
  outcomes?: readonly string[];
}

/** A card in the bordered hairline grid. */
export interface GridCard {
  /** Display number, e.g. "01". Omit for unnumbered grids. */
  no?: string;
  tag?: string;
  title: string;
  desc: string;
  meta?: string;
  href?: string;
  /** Optional cover image (a course thumbnail), shown across the top of the card. */
  image?: string;
}

/** A plain feature/value card — no number, no trailing meta row. */
export interface Feature {
  title: string;
  desc: string;
}

/**
 * A unit of long-form body copy.
 *
 * Authored as data rather than as an HTML string: the compiler checks every
 * block, and `Prose` renders it through React, so copy cannot inject markup
 * even by accident. Adding a block type here is what makes it renderable.
 */
export type Block =
  | { type: 'heading'; text: string; id?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: readonly string[]; ordered?: boolean }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'table'; head: readonly string[]; rows: readonly (readonly string[])[] };

export type { Price };

/* ---------------------------------------------------------------------------
 * Page records.
 *
 * Each template takes exactly one of these. Optional fields are the switch for
 * an optional section: a page with no `stats` renders no stats band, rather
 * than rendering an empty one.
 * ------------------------------------------------------------------------- */

export interface Cta {
  label: string;
  href: string;
  variant?: 'solid' | 'outline';
}

export interface HeroFact {
  label: string;
  value: string;
}

/** Per-route `<title>` and meta description. */
export interface PageSeo {
  title: string;
  description: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  intro: string;
  actions?: readonly Cta[];
  facts?: readonly HeroFact[];
}

export interface ClosingContent {
  eyebrow?: string;
  title: string;
  body: string;
  action: Cta;
}

export interface CardsBlock {
  eyebrow: string;
  title: string;
  intro?: string;
  action?: Cta;
  columns?: 2 | 3 | 4;
  items: readonly GridCard[];
}

export interface FeaturesBlock {
  eyebrow: string;
  title: string;
  intro?: string;
  items: readonly Feature[];
}

/** Shared by every page record: where it lives and how it is indexed. */
export interface PageBase {
  path: string;
  seo: PageSeo;
  hero: HeroContent;
  closing?: ClosingContent;
}

export interface HubContent extends PageBase {
  strip?: { kicker: string; items: readonly string[] };
  cards: CardsBlock;
  features?: FeaturesBlock;
  stats?: readonly Stat[];
  /** Shows the shared score-guarantee band. */
  guarantee?: boolean;
  /** Testimonial tags to filter the shared pool by. Empty shows none. */
  testimonials?: readonly string[];
  faq?: readonly FaqItem[];
}

/**
 * The editorial half of a course page — the copy the API does not own.
 *
 * The course itself (name, price, curriculum, batches, teachers, quotes)
 * comes from the CMS via `lib/cms.ts`; this is the per-course hero, feature
 * grid, statistics, FAQ and search snippet a writer still hand-crafts. Keyed
 * by the course slug; a course with no overlay gets sensible defaults from
 * `lib/course-view.ts`, so the admin can launch a course before anyone has
 * written a page for it.
 */
export interface ExamEditorial {
  /** Matches the course slug in the CMS. */
  slug: string;
  /** Which enquiry-form option this course maps to. */
  interest: LeadInterest;
  seo: PageSeo;
  hero: HeroContent;
  includes: FeaturesBlock;
  stats?: readonly Stat[];
  faq: readonly FaqItem[];
  /** Heading copy above the module list; the modules themselves are CMS data. */
  curriculum?: { eyebrow?: string; title?: string; intro?: string };
  closing?: ClosingContent;
}

export interface ProgramContent extends PageBase {
  features: FeaturesBlock;
  /** The numbered process this programme follows. */
  process?: { eyebrow: string; title: string; intro?: string; steps: readonly Step[] };
  formats?: readonly CourseFormat[];
  cards?: CardsBlock;
  stats?: readonly Stat[];
  testimonials?: readonly string[];
  faq?: readonly FaqItem[];
}

export interface LegalContent {
  path: string;
  seo: PageSeo;
  title: string;
  /** ISO date, rendered as "Last updated". */
  updated: string;
  body: readonly Block[];
}
