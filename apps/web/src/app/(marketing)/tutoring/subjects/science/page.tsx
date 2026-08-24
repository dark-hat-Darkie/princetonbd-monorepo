import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { subjectScience } from '@/content/programs/subject-science';

export const metadata: Metadata = subjectScience.seo;

export default function SubjectSciencePage() {
  return <ProgramPage content={subjectScience} />;
}
