import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { gre } from '@/content/exams/gre';

export const metadata: Metadata = gre.seo;

export default function GrePage() {
  return <ExamPage content={gre} />;
}
