/**
 * Content shapes shared across pages.
 *
 * These live under `content/` rather than beside the components that render
 * them: the components are one possible presentation of the data, not its
 * definition. Keeping the shapes here is also what makes the eventual move to
 * a CMS or an API a change of module, not a change of every consumer.
 */

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
  /** Draws the gold top rule and cream ground on the recommended option. */
  featured?: boolean;
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

export interface ExamContent extends PageBase {
  /** Short exam name used in headings and structured data, e.g. "SAT". */
  name: string;
  formats: readonly CourseFormat[];
  includes: FeaturesBlock;
  stats?: readonly Stat[];
  testimonials?: readonly string[];
  faq: readonly FaqItem[];
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

export interface GuideContent extends PageBase {
  /** Optional hero photograph, shown in the arched frame beside the title. */
  image?: { src: string; alt: string };
  body: readonly Block[];
  related?: readonly GridCard[];
  faq?: readonly FaqItem[];
}

export interface CompanyContent extends PageBase {
  body?: readonly Block[];
  cards?: CardsBlock;
  features?: FeaturesBlock;
  stats?: readonly Stat[];
}

export interface LegalContent {
  path: string;
  seo: PageSeo;
  title: string;
  /** ISO date, rendered as "Last updated". */
  updated: string;
  body: readonly Block[];
}

/**
 * An advice article.
 *
 * The only content on the site behind a dynamic route: the set grows over time
 * and nothing links to an individual piece by literal href, so a `[slug]`
 * segment with `generateStaticParams` is the right shape here where explicit
 * directories are right everywhere else.
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  /** Rendered as a filter pill on the index. */
  category: string;
  /** ISO date. Sorts the index, newest first. */
  published: string;
  readingMinutes: number;
  body: readonly Block[];
}
