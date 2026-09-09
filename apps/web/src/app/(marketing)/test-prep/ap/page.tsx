import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { ap } from '@/content/exams/ap';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = ap.seo;

export default function ApPage() {
  return <ExamPage content={ap} />;
}
