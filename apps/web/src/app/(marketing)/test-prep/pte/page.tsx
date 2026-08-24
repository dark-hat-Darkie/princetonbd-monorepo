import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { pte } from '@/content/exams/pte';

export const metadata: Metadata = pte.seo;

export default function PtePage() {
  return <ExamPage content={pte} />;
}
