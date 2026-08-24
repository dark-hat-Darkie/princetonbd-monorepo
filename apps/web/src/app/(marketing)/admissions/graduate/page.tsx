import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsGraduate } from '@/content/programs/admissions-graduate';

export const metadata: Metadata = admissionsGraduate.seo;

export default function AdmissionsGraduatePage() {
  return <ProgramPage content={admissionsGraduate} />;
}
