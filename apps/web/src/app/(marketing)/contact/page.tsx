import type { Metadata } from 'next';

import { LeadPage } from '@/components/templates/lead-page';
import { contactPage } from '@/content/company/lead-pages';

export const metadata: Metadata = contactPage.seo;

export default function ContactPage() {
  return <LeadPage content={contactPage} />;
}
