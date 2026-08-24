import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { toefl } from '@/content/exams/toefl';

export const metadata: Metadata = toefl.seo;

export default function ToeflPage() {
  return <ExamPage content={toefl} />;
}
