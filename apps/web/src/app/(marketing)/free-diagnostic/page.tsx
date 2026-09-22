import type { Metadata } from 'next';

import { LeadPage } from '@/components/templates/lead-page';
import { freeDiagnosticPage } from '@/content/company/lead-pages';
import { getBranches } from '@/lib/cms';

export const metadata: Metadata = freeDiagnosticPage.seo;

export default async function FreeDiagnosticPage() {
  const campuses = await getBranches();
  return <LeadPage content={freeDiagnosticPage} campuses={campuses} />;
}
