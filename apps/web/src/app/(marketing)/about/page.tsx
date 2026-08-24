import type { Metadata } from 'next';

import { CompanyPage } from '@/components/templates/company-page';
import { aboutPage } from '@/content/company/about';

export const metadata: Metadata = aboutPage.seo;

export default function AboutPage() {
  return <CompanyPage content={aboutPage} />;
}
