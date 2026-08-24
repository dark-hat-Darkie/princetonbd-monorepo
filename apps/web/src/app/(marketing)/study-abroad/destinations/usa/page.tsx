import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { destinationUsa } from '@/content/guides/destination-usa';

export const metadata: Metadata = destinationUsa.seo;

export default function DestinationUsaPage() {
  return <GuidePage content={destinationUsa} />;
}
