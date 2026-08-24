import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { destinationAustralia } from '@/content/guides/destination-australia';

export const metadata: Metadata = destinationAustralia.seo;

export default function DestinationAustraliaPage() {
  return <GuidePage content={destinationAustralia} />;
}
