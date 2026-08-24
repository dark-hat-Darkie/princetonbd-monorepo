import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { lsat } from '@/content/exams/lsat';

export const metadata: Metadata = lsat.seo;

export default function LsatPage() {
  return <ExamPage content={lsat} />;
}
