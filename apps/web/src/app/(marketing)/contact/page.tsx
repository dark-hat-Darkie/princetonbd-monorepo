import type { Metadata } from 'next';

import { LeadPage } from '@/components/templates/lead-page';
import { contactPage } from '@/content/company/lead-pages';
import { editorialFor } from '@/content/exams';
import { leadInterests, type LeadPrefill } from '@/lib/actions/lead-shape';
import { batchLabel } from '@/lib/batches';
import { getBatch, getBranches } from '@/lib/cms';

export const metadata: Metadata = contactPage.seo;

/** The first value of a repeated query key, or nothing. */
function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * The contact page reads `?interest=`, `?campus=` and `?batch=` — what a
 * course page's "Reserve a seat" button sets — and seeds the form with them.
 *
 * Every value is checked against its source before it is trusted: the
 * interest against the form's own list, the campus and batch against the
 * CMS. A hand-edited URL produces an empty field, never an injected label.
 * Reading `searchParams` makes this a dynamically rendered page, which is
 * the right trade: the form is a client component anyway.
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

  const [branches, batch] = await Promise.all([
    getBranches(),
    /* A batch that cannot be checked is treated as absent: the visitor can
       still enquire, they just will not see the echo line. */
    batchId ? getBatch(batchId).catch(() => null) : Promise.resolve(null),
  ]);
  const editorial = batch ? editorialFor(batch.courseSlug) : undefined;

  const prefill: LeadPrefill = {
    interest:
      interest && (leadInterests as readonly string[]).includes(interest)
        ? interest
        : (editorial?.interest ?? contactPage.interestDefault),
    campus:
      campus && branches.some((entry) => entry.name === campus)
        ? campus
        : (batch?.branch?.name ?? undefined),
    batch: batch ? { id: batch.id, label: batchLabel(batch.courseName, batch) } : undefined,
  };

  return <LeadPage content={contactPage} prefill={prefill} campuses={branches} />;
}
