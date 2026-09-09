import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { lsat } from '@/content/exams/lsat';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = lsat.seo;

export default function LsatPage() {
  return <ExamPage content={lsat} />;
}
