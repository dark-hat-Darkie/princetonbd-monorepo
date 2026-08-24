import type { Metadata } from 'next';

import { GuidePage } from '@/components/templates/guide-page';
import { majorsAndCareers } from '@/content/guides/majors-and-careers';

export const metadata: Metadata = majorsAndCareers.seo;

export default function MajorsAndCareersPage() {
  return <GuidePage content={majorsAndCareers} />;
}
