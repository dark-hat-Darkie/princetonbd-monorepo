import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { toefl } from '@/content/exams/toefl';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = toefl.seo;

export default function ToeflPage() {
  return <ExamPage content={toefl} />;
}
