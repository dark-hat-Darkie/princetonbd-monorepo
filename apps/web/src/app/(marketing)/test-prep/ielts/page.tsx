import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { ielts } from '@/content/exams/ielts';

export const metadata: Metadata = ielts.seo;

export default function IeltsPage() {
  return <ExamPage content={ielts} />;
}
