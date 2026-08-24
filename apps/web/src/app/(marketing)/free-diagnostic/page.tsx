import type { Metadata } from 'next';

import { LeadPage } from '@/components/templates/lead-page';
import { freeDiagnosticPage } from '@/content/company/lead-pages';

export const metadata: Metadata = freeDiagnosticPage.seo;

export default function FreeDiagnosticPage() {
  return <LeadPage content={freeDiagnosticPage} />;
}
