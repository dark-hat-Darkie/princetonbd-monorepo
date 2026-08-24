import type { Metadata } from 'next';

import { CompanyPage } from '@/components/templates/company-page';
import { eventsPage } from '@/content/company/events';

export const metadata: Metadata = eventsPage.seo;

export default function EventsPage() {
  return <CompanyPage content={eventsPage} />;
}
