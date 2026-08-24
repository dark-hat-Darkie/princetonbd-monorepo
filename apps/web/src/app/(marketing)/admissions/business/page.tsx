import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsBusiness } from '@/content/programs/admissions-business';

export const metadata: Metadata = admissionsBusiness.seo;

export default function AdmissionsBusinessPage() {
  return <ProgramPage content={admissionsBusiness} />;
}
