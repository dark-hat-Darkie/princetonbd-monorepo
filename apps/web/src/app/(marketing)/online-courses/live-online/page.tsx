import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { onlineLive } from '@/content/programs/online-live';

export const metadata: Metadata = onlineLive.seo;

export default function OnlineLivePage() {
  return <ProgramPage content={onlineLive} />;
}
