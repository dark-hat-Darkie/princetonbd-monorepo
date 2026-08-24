import type { Metadata } from 'next';

import { LegalPage } from '@/components/templates/legal-page';
import { accessibilityStatement } from '@/content/legal/accessibility';

export const metadata: Metadata = accessibilityStatement.seo;

export default function AccessibilityStatementPage() {
  return <LegalPage content={accessibilityStatement} />;
}
