import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_NEXT } from '@/lib/auth/return-to';

export const metadata: Metadata = {
  title: 'Forgot your password',
  description: 'Get a link to reset your Princeton Review Bangladesh password.',
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  const { user } = await withAuth();
  if (user) redirect(DEFAULT_NEXT);

  return (
    <Container as="section" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[480px]">
        <Eyebrow centered className="mb-5 justify-center">
          Account
        </Eyebrow>
        <h1 className="mb-4 text-center font-display text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
          Reset your password.
        </h1>
        <p className="mb-9 text-center text-[15.5px] leading-[1.6] text-muted">
          Enter the email you signed up with and we will send a link to choose a new one.
        </p>

        <ForgotPasswordForm />
      </div>
    </Container>
  );
}
