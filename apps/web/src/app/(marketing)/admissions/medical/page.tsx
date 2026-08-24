import type { Metadata } from 'next';

import { ProgramPage } from '@/components/templates/program-page';
import { admissionsMedical } from '@/content/programs/admissions-medical';

export const metadata: Metadata = admissionsMedical.seo;

export default function AdmissionsMedicalPage() {
  return <ProgramPage content={admissionsMedical} />;
}
