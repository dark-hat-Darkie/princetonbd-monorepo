import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { pte } from '@/content/exams/pte';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = pte.seo;

export default function PtePage() {
  return <ExamPage content={pte} />;
}
