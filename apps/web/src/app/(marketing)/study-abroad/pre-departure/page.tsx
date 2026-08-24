import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { preDeparture } from '@/content/guides/pre-departure';

export const metadata: Metadata = preDeparture.seo;

export default function PreDeparturePage() {
  return <GuidePage content={preDeparture} />;
}
