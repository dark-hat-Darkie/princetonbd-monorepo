import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { subjectMath } from '@/content/programs/subject-math';

export const metadata: Metadata = subjectMath.seo;

export default function SubjectMathPage() {
  return <ProgramPage content={subjectMath} />;
}
