import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { subjectEnglish } from '@/content/programs/subject-english';

export const metadata: Metadata = subjectEnglish.seo;

export default function SubjectEnglishPage() {
  return <ProgramPage content={subjectEnglish} />;
}
