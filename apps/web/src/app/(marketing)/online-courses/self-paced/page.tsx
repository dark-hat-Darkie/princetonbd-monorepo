import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { onlineSelfPaced } from '@/content/programs/online-self-paced';

export const metadata: Metadata = onlineSelfPaced.seo;

export default function OnlineSelfPacedPage() {
  return <ProgramPage content={onlineSelfPaced} />;
}
