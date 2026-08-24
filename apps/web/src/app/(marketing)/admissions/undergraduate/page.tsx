import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsUndergraduate } from '@/content/programs/admissions-undergraduate';

export const metadata: Metadata = admissionsUndergraduate.seo;

export default function AdmissionsUndergraduatePage() {
  return <ProgramPage content={admissionsUndergraduate} />;
}
