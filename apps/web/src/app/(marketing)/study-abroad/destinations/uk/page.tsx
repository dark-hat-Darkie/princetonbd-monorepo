import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { destinationUk } from '@/content/guides/destination-uk';

export const metadata: Metadata = destinationUk.seo;

export default function DestinationUkPage() {
  return <GuidePage content={destinationUk} />;
}
