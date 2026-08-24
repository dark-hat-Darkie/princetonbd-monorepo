import type { Metadata } from 'next';

import { LegalPage } from '@/components/templates/legal-page';
import { termsOfUse } from '@/content/legal/terms';

export const metadata: Metadata = termsOfUse.seo;

export default function TermsOfUsePage() {
  return <LegalPage content={termsOfUse} />;
}
