import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { ielts } from '@/content/exams/ielts';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = ielts.seo;

export default function IeltsPage() {
  return <ExamPage content={ielts} />;
}
