import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { subjectAdvancedPlacement } from '@/content/programs/subject-advanced-placement';

export const metadata: Metadata = subjectAdvancedPlacement.seo;

export default function SubjectAdvancedPlacementPage() {
  return <ProgramPage content={subjectAdvancedPlacement} />;
}
