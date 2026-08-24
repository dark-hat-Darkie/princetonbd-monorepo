import type { Metadata } from 'next';

import { CompanyPage } from '@/components/templates/company-page';
import { careersPage } from '@/content/company/careers';

export const metadata: Metadata = careersPage.seo;

export default function CareersPage() {
  return <CompanyPage content={careersPage} />;
}
