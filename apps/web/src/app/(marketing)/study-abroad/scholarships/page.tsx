import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { scholarships } from '@/content/guides/scholarships';

export const metadata: Metadata = scholarships.seo;

export default function ScholarshipsPage() {
  return <GuidePage content={scholarships} />;
}
