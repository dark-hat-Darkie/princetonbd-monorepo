import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { psat } from '@/content/exams/psat';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = psat.seo;

export default function PsatPage() {
  return <ExamPage content={psat} />;
}
