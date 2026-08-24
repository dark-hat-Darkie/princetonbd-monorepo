import type { Metadata } from 'next';

import { ExamPage } from '@/components/templates/exam-page';
import { act } from '@/content/exams/act';

export const metadata: Metadata = act.seo;

export default function ActPage() {
  return <ExamPage content={act} />;
}
