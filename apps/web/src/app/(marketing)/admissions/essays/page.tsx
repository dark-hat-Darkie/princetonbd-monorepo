import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsEssays } from '@/content/programs/admissions-essays';

export const metadata: Metadata = admissionsEssays.seo;

export default function AdmissionsEssaysPage() {
  return <ProgramPage content={admissionsEssays} />;
}
