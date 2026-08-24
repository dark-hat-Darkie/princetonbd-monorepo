import type { Metadata } from 'next';

import { HubPage } from '@/components/templates/hub-page';
import { testPrepHub } from '@/content/hubs/test-prep';

export const metadata: Metadata = testPrepHub.seo;

export default function TestPrepPage() {
  return <HubPage content={testPrepHub} />;
}
