import type { Metadata } from 'next';

import { HubPage } from '@/components/templates/hub-page';
import { admissionsHub } from '@/content/hubs/admissions';

export const metadata: Metadata = admissionsHub.seo;

export default function AdmissionsPage() {
  return <HubPage content={admissionsHub} />;
}
