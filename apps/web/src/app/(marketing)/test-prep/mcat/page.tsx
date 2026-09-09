import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { mcat } from '@/content/exams/mcat';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = mcat.seo;

export default function McatPage() {
  return <ExamPage content={mcat} />;
}
