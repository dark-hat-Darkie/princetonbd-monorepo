import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsLaw } from '@/content/programs/admissions-law';

export const metadata: Metadata = admissionsLaw.seo;

export default function AdmissionsLawPage() {
  return <ProgramPage content={admissionsLaw} />;
}
