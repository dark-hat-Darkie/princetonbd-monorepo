import type { Metadata } from 'next';

import { HubPage } from '@/components/templates/hub-page';
import { studyAbroadHub } from '@/content/hubs/study-abroad';

export const metadata: Metadata = studyAbroadHub.seo;

export default function StudyAbroadPage() {
  return <HubPage content={studyAbroadHub} />;
}
