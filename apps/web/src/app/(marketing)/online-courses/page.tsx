import type { Metadata } from 'next';

import { HubPage } from '@/components/templates/hub-page';
import { onlineCoursesHub } from '@/content/hubs/online-courses';

export const metadata: Metadata = onlineCoursesHub.seo;

export default function OnlineCoursesPage() {
  return <HubPage content={onlineCoursesHub} />;
}
