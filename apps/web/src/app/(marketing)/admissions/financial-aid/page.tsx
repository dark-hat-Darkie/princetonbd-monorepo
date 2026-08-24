import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsFinancialAid } from '@/content/programs/admissions-financial-aid';

export const metadata: Metadata = admissionsFinancialAid.seo;

export default function AdmissionsFinancialAidPage() {
  return <ProgramPage content={admissionsFinancialAid} />;
}
