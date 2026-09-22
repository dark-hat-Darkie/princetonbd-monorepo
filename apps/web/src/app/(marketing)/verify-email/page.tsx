import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { VerifyEmailForm } from '@/components/auth/verify-email-form';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { peekPendingAuth } from '@/lib/auth/pending';
import { DEFAULT_NEXT, safeNextPath, signInHref } from '@/lib/auth/return-to';

export const metadata: Metadata = {
  title: 'Check your email',
  description: 'Enter the verification code to finish signing in.',
  robots: { index: false, follow: false },
};

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const next = safeNextPath(single(params.next));

  const { user } = await withAuth();
  if (user) redirect(next || DEFAULT_NEXT);

  /* No pending token — expired cookie, fresh visit, or a second tab that
     already finished. The form would only fail, so show the way back. */
  const pending = await peekPendingAuth();
  if (!pending) {
    return (
      <Container as="section" className="py-20 lg:py-24">
        <div className="mx-auto max-w-[480px] text-center">
          <Eyebrow centered className="mb-5 justify-center">
            Verification
          </Eyebrow>
          <h1 className="mb-4 font-display text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
            That step expired.
          </h1>
          <p className="mb-9 text-[15.5px] leading-[1.6] text-muted">
            Verification codes only last a short while. Sign in again and a fresh one will be on
            its way.
          </p>
          <CtaButton href={signInHref(next === DEFAULT_NEXT ? null : next)} arrow>
            Back to sign in
          </CtaButton>
        </div>
      </Container>
    );
  }

  return (
    <Container as="section" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[480px]">
        <Eyebrow centered className="mb-5 justify-center">
          Verification
        </Eyebrow>
        <h1 className="mb-4 text-center font-display text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
          Check your email.
        </h1>
        <p className="mb-9 text-center text-[15.5px] leading-[1.6] text-muted">
          We sent a 6-digit code to your inbox. Enter it below to finish signing in — it expires
          after a few minutes, so sooner is better. Wrong address?{' '}
          <Link
            href={signInHref(next === DEFAULT_NEXT ? null : next)}
            className="rounded-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
          >
            Start over
          </Link>
          .
        </p>

        <VerifyEmailForm next={next} canResend={Boolean(pending.userId)} />
      </div>
    </Container>
  );
}
