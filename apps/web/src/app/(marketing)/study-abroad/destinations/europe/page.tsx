import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { destinationEurope } from '@/content/guides/destination-europe';

export const metadata: Metadata = destinationEurope.seo;

export default function DestinationEuropePage() {
  return <GuidePage content={destinationEurope} />;
}
