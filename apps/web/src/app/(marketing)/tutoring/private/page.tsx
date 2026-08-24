import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { tutoringPrivate } from '@/content/programs/tutoring-private';

export const metadata: Metadata = tutoringPrivate.seo;

export default function TutoringPrivatePage() {
  return <ProgramPage content={tutoringPrivate} />;
}
