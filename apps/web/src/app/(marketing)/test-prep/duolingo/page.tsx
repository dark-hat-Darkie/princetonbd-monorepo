import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { duolingo } from '@/content/exams/duolingo';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = duolingo.seo;

export default function DuolingoPage() {
  return <ExamPage content={duolingo} />;
}
