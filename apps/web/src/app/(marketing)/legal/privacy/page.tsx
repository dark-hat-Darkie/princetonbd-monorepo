import type { Metadata } from 'next';

import { LegalPage } from '@/components/templates/legal-page';
import { privacyPolicy } from '@/content/legal/privacy';

export const metadata: Metadata = privacyPolicy.seo;

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyPolicy} />;
}
