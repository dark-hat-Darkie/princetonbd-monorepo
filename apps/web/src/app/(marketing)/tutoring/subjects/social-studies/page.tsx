import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { subjectSocialStudies } from '@/content/programs/subject-social-studies';

export const metadata: Metadata = subjectSocialStudies.seo;

export default function SubjectSocialStudiesPage() {
  return <ProgramPage content={subjectSocialStudies} />;
}
