import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { sat } from '@/content/exams/sat';

export const metadata: Metadata = sat.seo;

export default function SatPage() {
  return <ExamPage content={sat} />;
}
