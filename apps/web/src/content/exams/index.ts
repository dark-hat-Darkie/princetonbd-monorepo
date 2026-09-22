/**
 * The editorial overlays for the courses the CMS serves, keyed by slug.
 *
 * The course record itself — price, curriculum, batches, teachers, quotes —
 * comes from the API (`lib/cms.ts`). What lives here is the copy a writer
 * still owns for each course: hero, "what you get", statistics, FAQ and
 * search snippet. `editorialFor(slug)` returns nothing for a course nobody
 * has written a page for yet; `lib/course-view.ts` fills in defaults.
 */

import type { ExamEditorial } from '../types';
import { act } from './act';
import { ap } from './ap';
import { duolingo } from './duolingo';
import { gmat } from './gmat';
import { gre } from './gre';
import { ielts } from './ielts';
import { lsat } from './lsat';
import { mcat } from './mcat';
import { psat } from './psat';
import { pte } from './pte';
import { sat } from './sat';
import { toefl } from './toefl';

/** How the compare table and the hub group courses; the order is the display order. */
export const courseFamilies: readonly { title: string; slugs: readonly string[] }[] = [
  { title: 'Undergraduate', slugs: [sat, act, ap, psat].map((exam) => exam.slug) },
  { title: 'Graduate & professional', slugs: [gre, gmat, lsat, mcat].map((exam) => exam.slug) },
  { title: 'English proficiency', slugs: [ielts, toefl, duolingo, pte].map((exam) => exam.slug) },
];

export const editorials: readonly ExamEditorial[] = [
  sat,
  act,
  ap,
  psat,
  gre,
  gmat,
  lsat,
  mcat,
  ielts,
  toefl,
  duolingo,
  pte,
];

const bySlug = new Map(editorials.map((editorial) => [editorial.slug, editorial]));

/** The hand-written page copy for a course slug, if any. */
export function editorialFor(slug: string): ExamEditorial | undefined {
  return bySlug.get(slug);
}
