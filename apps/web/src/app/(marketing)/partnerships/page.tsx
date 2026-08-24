import type { Metadata } from 'next';

import { HubPage } from '@/components/templates/hub-page';
import { partnershipsHub } from '@/content/hubs/partnerships';

export const metadata: Metadata = partnershipsHub.seo;

export default function PartnershipsPage() {
  return <HubPage content={partnershipsHub} />;
}
