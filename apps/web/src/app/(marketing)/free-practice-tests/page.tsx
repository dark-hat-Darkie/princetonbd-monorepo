import type { Metadata } from 'next';

import { LeadPage } from '@/components/templates/lead-page';
import { freePracticeTestsPage } from '@/content/company/lead-pages';

export const metadata: Metadata = freePracticeTestsPage.seo;

export default function FreePracticeTestsPage() {
  return <LeadPage content={freePracticeTestsPage} />;
}
