import type { Metadata } from 'next';

import { LeadPage } from '@/components/templates/lead-page';
import { batchById, batchLabel } from '@/content/batches';
import { contactPage } from '@/content/company/lead-pages';
import { examBySlug } from '@/content/exams';
import { campuses } from '@/content/site/contact';
import { leadInterests, type LeadPrefill } from '@/lib/actions/lead-shape';

export const metadata: Metadata = contactPage.seo;

/** The first value of a repeated query key, or nothing. */
function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * The contact page reads `?interest=`, `?campus=` and `?batch=` — what an exam
 * page's "Reserve a seat" button sets — and seeds the form with them.
 *
 * Every value is checked against its source list before it is trusted, so a
 * hand-edited URL produces an empty field, never an injected label. Reading
 * `searchParams` makes this the second dynamically rendered marketing page
 * (after the university finder), which is the right trade: the form is a
 * client component anyway, and the alternative is shipping the batch list to
 * the browser to resolve a label.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const interest = single(params.interest);
  const campus = single(params.campus);
  const batchId = single(params.batch);

  const batch = batchId ? batchById(batchId) : undefined;
  const exam = batch ? examBySlug(batch.examSlug) : undefined;

  const prefill: LeadPrefill = {
    interest:
      interest && (leadInterests as readonly string[]).includes(interest)
        ? interest
        : (exam?.interest ?? contactPage.interestDefault),
    campus:
      campus && campuses.some((entry) => entry.name === campus)
        ? campus
        : (batch?.campus ?? undefined),
    batch: batch && exam ? { id: batch.id, label: batchLabel(exam, batch) } : undefined,
  };

  return <LeadPage content={contactPage} prefill={prefill} />;
}
