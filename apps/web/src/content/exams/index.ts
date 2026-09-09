/**
 * Every exam we teach, in the order the mega-menu lists them.
 *
 * The comparison table, the batch schedule and any "all exams" listing read
 * from here rather than repeating the facts, so an exam whose fee or length
 * changes changes in one place and shows up everywhere consistently.
 */

import type { ExamContent } from '../types';
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

export interface ExamFamily {
  title: string;
  exams: readonly ExamContent[];
}

export const examFamilies: readonly ExamFamily[] = [
  { title: 'Undergraduate', exams: [sat, act, ap, psat] },
  { title: 'Graduate & professional', exams: [gre, gmat, lsat, mcat] },
  { title: 'English proficiency', exams: [ielts, toefl, duolingo, pte] },
];

export const allExams: readonly ExamContent[] = examFamilies.flatMap((family) => family.exams);

const bySlug = new Map(allExams.map((exam) => [exam.slug, exam]));

/** Looks an exam up by its last path segment, e.g. "ielts". */
export function examBySlug(slug: string): ExamContent | undefined {
  return bySlug.get(slug);
}
