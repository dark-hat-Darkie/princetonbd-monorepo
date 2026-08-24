/**
 * Every exam we teach, in the order the mega-menu lists them.
 *
 * The comparison table and any "all exams" listing read from here rather than
 * repeating the facts, so an exam whose price or format changes changes in one
 * place and shows up everywhere consistently.
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

/** The cheapest format on an exam page — what "from" means in a listing. */
export function startingPrice(exam: ExamContent): number {
  return Math.min(...exam.formats.map((format) => format.price.amount));
}
