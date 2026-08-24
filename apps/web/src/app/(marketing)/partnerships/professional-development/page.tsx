import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { partnershipProfessionalDevelopment } from '@/content/programs/partnership-professional-development';

export const metadata: Metadata = partnershipProfessionalDevelopment.seo;

export default function PartnershipProfessionalDevelopmentPage() {
  return <ProgramPage content={partnershipProfessionalDevelopment} />;
}
