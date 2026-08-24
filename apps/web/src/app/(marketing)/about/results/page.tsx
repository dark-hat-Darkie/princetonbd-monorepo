import type { Metadata } from 'next';

import { CompanyPage } from '@/components/templates/company-page';
import { resultsPage } from '@/content/company/results';

export const metadata: Metadata = resultsPage.seo;

export default function ResultsPage() {
  return <CompanyPage content={resultsPage} />;
}
