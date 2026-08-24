import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsInterviews } from '@/content/programs/admissions-interviews';

export const metadata: Metadata = admissionsInterviews.seo;

export default function AdmissionsInterviewsPage() {
  return <ProgramPage content={admissionsInterviews} />;
}
