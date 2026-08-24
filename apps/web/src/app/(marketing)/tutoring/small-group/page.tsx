import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { tutoringSmallGroup } from '@/content/programs/tutoring-small-group';

export const metadata: Metadata = tutoringSmallGroup.seo;

export default function TutoringSmallGroupPage() {
  return <ProgramPage content={tutoringSmallGroup} />;
}
