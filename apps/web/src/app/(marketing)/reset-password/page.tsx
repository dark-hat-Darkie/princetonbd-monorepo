import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_NEXT } from '@/lib/auth/return-to';

export const metadata: Metadata = {
  title: 'Choose a new password',
  description: 'Set a new password for your Princeton Review Bangladesh account.',
  robots: { index: false, follow: false },
};

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { user } = await withAuth();
  if (user) redirect(DEFAULT_NEXT);

  /* The token comes from the emailed link. Without one there is nothing to
     redeem — show the way to a fresh link instead of an empty form. */
  const token = single((await searchParams).token);
  if (!token) {
    return (
      <Container as="section" className="py-20 lg:py-24">
        <div className="mx-auto max-w-[480px] text-center">
          <Eyebrow centered className="mb-5 justify-center">
            Account
          </Eyebrow>
          <h1 className="mb-4 font-display text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
            That link is incomplete.
          </h1>
          <p className="mb-9 text-[15.5px] leading-[1.6] text-muted">
            A reset link carries everything it needs with it, and this one arrived without it.
            Request a fresh link and it will work.
          </p>
          <CtaButton href="/forgot-password" arrow>
            Request a fresh link
          </CtaButton>
        </div>
      </Container>
    );
  }

  return (
    <Container as="section" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[480px]">
        <Eyebrow centered className="mb-5 justify-center">
          Account
        </Eyebrow>
        <h1 className="mb-4 text-center font-display text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
          Choose a new password.
        </h1>
        <p className="mb-9 text-center text-[15.5px] leading-[1.6] text-muted">
          Pick something long you have not used elsewhere.
        </p>

        <ResetPasswordForm token={token} />
      </div>
    </Container>
  );
}
