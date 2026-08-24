import type { Metadata } from 'next';

import { CompanyPage } from '@/components/templates/company-page';
import { mediaPage } from '@/content/company/media';

export const metadata: Metadata = mediaPage.seo;

export default function MediaPage() {
  return <CompanyPage content={mediaPage} />;
}
