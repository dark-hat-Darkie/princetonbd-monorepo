import type { Metadata } from 'next';

import { LegalPage } from '@/components/templates/legal-page';
import { refundPolicy } from '@/content/legal/refund-policy';

export const metadata: Metadata = refundPolicy.seo;

export default function RefundPolicyPage() {
  return <LegalPage content={refundPolicy} />;
}
