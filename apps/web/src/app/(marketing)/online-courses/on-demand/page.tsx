import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { onlineOnDemand } from '@/content/programs/online-on-demand';

export const metadata: Metadata = onlineOnDemand.seo;

export default function OnlineOnDemandPage() {
  return <ProgramPage content={onlineOnDemand} />;
}
