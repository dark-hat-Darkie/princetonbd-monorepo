import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { gmat } from '@/content/exams/gmat';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = gmat.seo;

export default function GmatPage() {
  return <ExamPage content={gmat} />;
}
