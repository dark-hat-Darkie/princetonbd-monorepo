import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { duolingo } from '@/content/exams/duolingo';

export const metadata: Metadata = duolingo.seo;

export default function DuolingoPage() {
  return <ExamPage content={duolingo} />;
}
