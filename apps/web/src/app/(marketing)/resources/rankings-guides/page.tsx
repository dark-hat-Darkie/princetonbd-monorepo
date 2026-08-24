import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { rankingsGuides } from '@/content/guides/rankings-guides';

export const metadata: Metadata = rankingsGuides.seo;

export default function RankingsGuidesPage() {
  return <GuidePage content={rankingsGuides} />;
}
