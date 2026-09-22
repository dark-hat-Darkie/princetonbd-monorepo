import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { PageHero } from '@/components/ui/page-hero';
import { breadcrumbFor } from '@/content/site/routes';
import { formatFee } from '@/lib/enroll';
import { resolveReturn } from '@/lib/enroll/return';
import { signInHref } from '@/lib/auth/return-to';
import { formatFullDate } from '@/lib/dates';

export const metadata: Metadata = {
  title: 'Payment successful',
  robots: { index: false, follow: false },
};

/**
 * Where the provider sends the browser after settlement — and the page that
 * proves the redirect alone grants nothing. Every state below comes from a
 * live server-side verification of the enrollment; an unpaid reference
 * renders pending or failed here, never success.
 */
export default async function EnrollSuccessPage() {
  const model = await resolveReturn();

  if (model.kind === 'unknown') notFound();

  if (model.kind === 'anonymous') {
    return (
      <Shell
        eyebrow="Payment return"
        title="Sign in to see your result."
        intro="Your payment may well have gone through — sign in and we will verify it against your account."
      >
        <CtaButton href={signInHref('/enroll/success')} arrow>
          Sign in
        </CtaButton>
      </Shell>
    );
  }

  if (model.kind === 'missing') {
    return (
      <Shell
        eyebrow="Payment return"
        title="No checkout to confirm."
        intro="This page confirms a payment you just made. If you paid and landed here in another browser, your receipt is on your account."
      >
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/dashboard/courses">My courses</CtaButton>
          <CtaButton href="/test-prep" variant="outline">
            Browse courses
          </CtaButton>
        </div>
      </Shell>
    );
  }

  if (model.kind === 'unreachable') {
    return (
      <Shell
        eyebrow="Payment return"
        title="We could not confirm just now."
        intro="The verification check did not complete. Nothing was granted or lost — check again in a moment."
      >
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/enroll/success">Check again</CtaButton>
          <CtaButton href="/contact" variant="outline">
            Talk to support
          </CtaButton>
        </div>
      </Shell>
    );
  }

  const { status, retryHref } = model;

  if (status.enrollmentStatus === 'active') {
    return (
      <Shell
        eyebrow="Payment verified"
        title="You are enrolled."
        intro="The gateway confirmed your payment and your seat is granted. A receipt lives on your account."
      >
        <div className="mb-7 rounded-lg border border-brand/25 bg-brand-soft px-6 py-5 text-[14.5px] leading-[1.6] text-ink-soft">
          <div className="mb-1 text-[11px] font-bold tracking-[.12em] text-brand-ink uppercase">
            Receipt
          </div>
          <div>
            Paid <strong className="text-ink">{formatFee(status.amount)}</strong>
            {' · '}reference <strong className="text-ink">{status.providerReference}</strong>
            {status.paidAt ? (
              <>
                {' · '}
                <time dateTime={status.paidAt}>{formatFullDate(status.paidAt)}</time>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/dashboard/courses" arrow>
            Go to my courses
          </CtaButton>
          <CtaButton href="/test-prep" variant="outline">
            Browse more courses
          </CtaButton>
        </div>
      </Shell>
    );
  }

  if (status.attemptStatus === 'pending' || status.attemptStatus === 'processing') {
    return (
      <Shell
        eyebrow="Payment return"
        title="Payment is still confirming."
        intro="The gateway has not settled this payment yet — settlement can lag the redirect by a minute or two. Check again; nothing is granted until verification passes."
      >
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/enroll/success">Check again</CtaButton>
          <CtaButton href="/contact" variant="outline">
            Talk to support
          </CtaButton>
        </div>
        <p className="mt-5 text-[13px] leading-[1.6] text-muted-2">
          Reference <span className="text-ink-soft">{status.providerReference ?? '—'}</span> · keep
          this page open while you wait.
        </p>
      </Shell>
    );
  }

  return (
    <Shell
      eyebrow="Payment return"
      title="That payment did not go through."
      intro="No seat was granted and this reference cannot be reused. Start checkout again — your details are still on the enrollment."
    >
      <div className="flex flex-wrap gap-3">
        <CtaButton href={retryHref} arrow>
          Try again
        </CtaButton>
        <CtaButton href="/contact" variant="outline">
          Talk to support
        </CtaButton>
      </div>
    </Shell>
  );
}

function Shell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/enroll')}
        eyebrow={eyebrow}
        title={title}
        intro={intro}
      />
      <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
        <div className="max-w-[640px]">
          {children}
          <p className="mt-8 text-[13px] leading-[1.6] text-muted-2">
            Paid but seeing the wrong state? Write to us from{' '}
            <Link href="/contact" className="text-ink underline">
              the contact page
            </Link>{' '}
            with your payment reference.
          </p>
        </div>
      </Container>
    </>
  );
}
