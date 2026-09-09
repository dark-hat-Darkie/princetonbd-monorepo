import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { sat } from '@/content/exams/sat';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = sat.seo;

export default function SatPage() {
  return <ExamPage content={sat} />;
}
