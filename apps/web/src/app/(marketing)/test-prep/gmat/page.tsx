import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { gmat } from '@/content/exams/gmat';

export const metadata: Metadata = gmat.seo;

export default function GmatPage() {
  return <ExamPage content={gmat} />;
}
