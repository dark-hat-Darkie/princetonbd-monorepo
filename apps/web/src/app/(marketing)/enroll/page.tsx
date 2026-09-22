import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { withAuth } from '@workos-inc/authkit-nextjs';

import { EnrollForm } from '@/components/enroll/enroll-form';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { PageHero } from '@/components/ui/page-hero';
import { breadcrumbFor } from '@/content/site/routes';
import { contact, telHref } from '@/content/site/contact';
import { getBatch, getCourse } from '@/lib/cms';
import { enrollHref, resolveEnrollTarget } from '@/lib/enroll';
import { signInHref } from '@/lib/auth/return-to';

export const metadata: Metadata = {
  title: 'Enroll',
  robots: { index: false, follow: false },
};

/** The first value of a repeated query key, or nothing. */
function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const steps = [
  {
    title: 'Tell us about the student',
    desc: 'Name, date of birth, education and address — it takes about a minute.',
  },
  {
    title: 'Pay securely',
    desc: 'You move to our SSLCommerz checkout. The amount is fixed from our fee card.',
  },
  {
    title: 'Seat confirmed on verification',
    desc: 'We confirm the payment with the gateway before the seat is granted — never on the redirect alone.',
  },
];

/**
 * Checkout entry: `/enroll?course=<slug>&batch=<id>`.
 *
 * Both params are validated against the API before anything renders — a
 * hand-edited URL gets the "no longer available" panel, never a mismatched
 * fee. Reading `searchParams` makes this dynamically rendered, which is the
 * right trade for the same reason as `/contact`: the form is interactive
 * anyway, and the fee echo must reflect the rows as they are now.
 */
export default async function EnrollPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const slug = single(params.course);
  const batchId = single(params.batch);

  if (!slug) notFound();

  const [course, batch] = await Promise.all([
    getCourse(slug),
    batchId ? getBatch(batchId).catch(() => null) : Promise.resolve(null),
  ]);
  if (!course) notFound();

  const target = resolveEnrollTarget(course, batch ?? null);
  if (!target) {
    return (
      <>
        <PageHero
          breadcrumb={breadcrumbFor('/enroll')}
          eyebrow="Enrollment"
          title="That batch is no longer available."
          intro="It may have filled, closed, or moved. Pick a current batch and your details carry straight into checkout."
        />
        <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
          <div className="flex flex-wrap gap-3">
            <CtaButton href="/test-prep">Browse courses</CtaButton>
            <CtaButton href="/contact" variant="outline">
              Ask an advisor
            </CtaButton>
          </div>
        </Container>
      </>
    );
  }

  const { user } = await withAuth();
  if (!user) {
    /* Reached when an anonymous visitor opens a checkout link directly: the
       proxy refreshes the session but no longer gates (it can only redirect
       to WorkOS hosted), so the page renders this prompt and the button
       carries the full checkout URL back after sign-in. */
    const backToCheckout = enrollHref({ courseSlug: slug, batchId });
    return (
      <>
        <PageHero
          breadcrumb={breadcrumbFor('/enroll')}
          eyebrow="Enrollment"
          title={`Enroll in ${course.name}.`}
          intro="Sign in first so your payment and seat stay linked to your account — it keeps receipts, retries, and support simple."
        />
        <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
          <div className="max-w-[560px] rounded-lg border border-line bg-surface px-7 py-8 shadow-card sm:px-9">
            <Eyebrow className="mb-3">One step first</Eyebrow>
            <p className="mb-7 text-[15px] leading-[1.6] text-muted">
              Your enrollment, payment, and seat live on your account. Sign in (or create one — it
              takes a minute) and you will land straight back at this checkout.
            </p>
            <CtaButton href={signInHref(backToCheckout)} arrow>
              Sign in to continue
            </CtaButton>
          </div>
        </Container>
      </>
    );
  }

  const defaultName = [user.firstName, user.lastName].filter(Boolean).join(' ') || undefined;

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/enroll')}
        eyebrow="Enrollment"
        title={`Enroll in ${course.name}.`}
        intro="Fill in the student details, pay securely, and the seat is yours once the payment verifies."
        facts={[
          { label: 'Fee', value: `${String(target.feeAmount)} BDT` },
          ...(target.batch
            ? [{ label: 'Starts', value: target.batch.startsOn }]
            : [{ label: 'Schedule', value: 'To be announced' }]),
        ]}
      />

      <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-[70px]">
          <EnrollForm target={target} defaultName={defaultName} />

          <div>
            <div className="mb-9 border-t border-t-line">
              {steps.map((item, index) => (
                <div key={item.title} className="flex gap-4 border-b border-b-line py-5">
                  <span
                    aria-hidden
                    className="flex size-7 flex-none items-center justify-center rounded-sm bg-accent font-display text-[12.5px] font-extrabold text-on-accent tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="mb-1 text-[15px] font-bold text-ink">{item.title}</div>
                    <p className="text-[14.5px] leading-[1.6] text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <Eyebrow className="mb-4">Prefer to talk now</Eyebrow>
              <a
                href={telHref(contact.phone)}
                className="font-display text-[28px] font-semibold tracking-[-.02em] text-ink transition-colors duration-200 hover:text-brand-ink"
              >
                {contact.phone}
              </a>
              <div className="mt-1.5 text-[13.5px] text-muted">
                Enrolment advisors, 9am&ndash;8pm, seven days a week.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
