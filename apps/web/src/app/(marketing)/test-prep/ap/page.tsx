import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { ap } from '@/content/exams/ap';

export const metadata: Metadata = ap.seo;

export default function ApPage() {
  return <ExamPage content={ap} />;
}
