import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { partnershipHighDosage } from '@/content/programs/partnership-high-dosage-tutoring';

export const metadata: Metadata = partnershipHighDosage.seo;

export default function PartnershipHighDosagePage() {
  return <ProgramPage content={partnershipHighDosage} />;
}
