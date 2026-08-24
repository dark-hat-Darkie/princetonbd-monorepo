import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { destinationCanada } from '@/content/guides/destination-canada';

export const metadata: Metadata = destinationCanada.seo;

export default function DestinationCanadaPage() {
  return <GuidePage content={destinationCanada} />;
}
