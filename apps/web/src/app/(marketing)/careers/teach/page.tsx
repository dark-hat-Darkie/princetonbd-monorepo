import type { Metadata } from 'next';

import { CompanyPage } from '@/components/templates/company-page';
import { teachPage } from '@/content/company/teach';

export const metadata: Metadata = teachPage.seo;

export default function TeachPage() {
  return <CompanyPage content={teachPage} />;
}
