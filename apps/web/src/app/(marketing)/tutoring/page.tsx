import type { Metadata } from 'next';

import { HubPage } from '@/components/templates/hub-page';
import { tutoringHub } from '@/content/hubs/tutoring';

export const metadata: Metadata = tutoringHub.seo;

export default function TutoringPage() {
  return <HubPage content={tutoringHub} />;
}
