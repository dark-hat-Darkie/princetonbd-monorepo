import type { Metadata } from 'next';

import { LegalPage } from '@/components/templates/legal-page';
import { enrollmentTerms } from '@/content/legal/enrollment-terms';

export const metadata: Metadata = enrollmentTerms.seo;

export default function EnrollmentTermsPage() {
  return <LegalPage content={enrollmentTerms} />;
}
