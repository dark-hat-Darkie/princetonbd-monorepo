import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { mcat } from '@/content/exams/mcat';

export const metadata: Metadata = mcat.seo;

export default function McatPage() {
  return <ExamPage content={mcat} />;
}
