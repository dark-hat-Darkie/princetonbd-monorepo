import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { act } from '@/content/exams/act';

/* Statically built, re-rendered daily so the batch list drops runs that have
   ended without a deploy. */
export const revalidate = 86400;

export const metadata: Metadata = act.seo;

export default function ActPage() {
  return <ExamPage content={act} />;
}
