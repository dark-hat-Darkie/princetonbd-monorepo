import type { Metadata } from 'next';

import { CompanyPage } from '@/components/templates/company-page';
import { guaranteePage } from '@/content/company/guarantee';

export const metadata: Metadata = guaranteePage.seo;

export default function GuaranteePage() {
  return <CompanyPage content={guaranteePage} />;
}
