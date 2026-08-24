import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { visa } from '@/content/guides/visa';

export const metadata: Metadata = visa.seo;

export default function VisaPage() {
  return <GuidePage content={visa} />;
}
