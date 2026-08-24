import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { partnershipSchools } from '@/content/programs/partnership-schools';

export const metadata: Metadata = partnershipSchools.seo;

export default function PartnershipSchoolsPage() {
  return <ProgramPage content={partnershipSchools} />;
}
