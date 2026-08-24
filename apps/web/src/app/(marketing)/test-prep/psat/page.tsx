import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { psat } from '@/content/exams/psat';

export const metadata: Metadata = psat.seo;

export default function PsatPage() {
  return <ExamPage content={psat} />;
}
