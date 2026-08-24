import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsRecommendations } from '@/content/programs/admissions-recommendations';

export const metadata: Metadata = admissionsRecommendations.seo;

export default function AdmissionsRecommendationsPage() {
  return <ProgramPage content={admissionsRecommendations} />;
}
