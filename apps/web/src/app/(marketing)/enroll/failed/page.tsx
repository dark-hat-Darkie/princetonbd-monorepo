import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { PageHero } from '@/components/ui/page-hero';
import { breadcrumbFor } from '@/content/site/routes';
import { resolveReturn } from '@/lib/enroll/return';
import { signInHref } from '@/lib/auth/return-to';

export const metadata: Metadata = {
  title: 'Payment not completed',
  robots: { index: false, follow: false },
};

/**
 * Where the provider sends the browser after a cancel, failure, or expiry.
 * Like its sibling, this page verifies first: an enrollment that actually
 * settled says so here too, instead of stranding a paid learner on a dead
 * end.
 */
export default async function EnrollFailedPage() {
  const model = await resolveReturn();

  if (model.kind === 'unknown') notFound();

  if (model.kind === 'anonymous') {
    return (
      <Shell
        title="Sign in to see your result."
        intro="Sign in and we will verify what happened against your account."
      >
        <CtaButton href={signInHref('/enroll/failed')} arrow>
          Sign in
        </CtaButton>
      </Shell>
    );
  }

  if (model.kind === 'missing' || model.kind === 'unreachable') {
    return (
      <Shell
        title={
          model.kind === 'missing' ? 'No checkout to retry.' : 'We could not confirm just now.'
        }
        intro={
          model.kind === 'missing'
            ? 'Start from a course and your details flow straight into checkout.'
            : 'The verification check did not complete. Check again in a moment — nothing was granted or lost.'
        }
      >
        <div className="flex flex-wrap gap-3">
          <CtaButton href={model.kind === 'missing' ? '/test-prep' : '/enroll/failed'}>
            {model.kind === 'missing' ? 'Browse courses' : 'Check again'}
          </CtaButton>
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
        title="Good news — you are enrolled."
        intro="This payment actually settled. Your seat is granted; continue to your courses."
      >
        <CtaButton href="/dashboard/courses" arrow>
          Go to my courses
        </CtaButton>
      </Shell>
    );
  }

  if (status.attemptStatus === 'pending' || status.attemptStatus === 'processing') {
    return (
      <Shell
        title="Payment is still confirming."
        intro="Settlement can lag the redirect. Recheck — the success page will flip the moment verification passes."
      >
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/enroll/success">Check status</CtaButton>
          <CtaButton href={retryHref} variant="outline">
            Start over
          </CtaButton>
        </div>
      </Shell>
    );
  }

  const cancelled = status.attemptStatus === 'cancelled';
  return (
    <Shell
      title={cancelled ? 'Payment was cancelled.' : 'That payment did not go through.'}
      intro={
        cancelled
          ? 'No money moved and no seat was granted. Pick up checkout again whenever you are ready.'
          : 'No seat was granted and this reference cannot be reused. Your details are kept — retrying takes seconds.'
      }
    >
      <div className="flex flex-wrap gap-3">
        <CtaButton href={retryHref} arrow>
          Try again
        </CtaButton>
        <CtaButton href="/contact" variant="outline">
          Talk to support
        </CtaButton>
      </div>
      {status.providerReference ? (
        <p className="mt-5 text-[13px] leading-[1.6] text-muted-2">
          Reference <span className="font-mono text-ink-soft">{status.providerReference}</span> —
          quote it if you contact support.
        </p>
      ) : null}
    </Shell>
  );
}

function Shell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/enroll')}
        eyebrow="Payment return"
        title={title}
        intro={intro}
      />
      <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
        <div className="max-w-[640px]">
          {children}
          <p className="mt-8 text-[13px] leading-[1.6] text-muted-2">
            Charged but seeing this? Write to us from{' '}
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
