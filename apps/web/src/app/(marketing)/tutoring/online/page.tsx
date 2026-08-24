import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { tutoringOnline } from '@/content/programs/tutoring-online';

export const metadata: Metadata = tutoringOnline.seo;

export default function TutoringOnlinePage() {
  return <ProgramPage content={tutoringOnline} />;
}
