import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

import { SignUpForm } from '@/components/auth/sign-up-form';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_NEXT, safeNextPath } from '@/lib/auth/return-to';

export const metadata: Metadata = {
  title: 'Create your account',
  description: 'Create your Princeton Review Bangladesh account.',
  robots: { index: false, follow: false },
};

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const next = safeNextPath(single(params.next));

  const { user } = await withAuth();
  if (user) redirect(next || DEFAULT_NEXT);

  const signInHref = next === DEFAULT_NEXT ? '/sign-in' : `/sign-in?next=${encodeURIComponent(next)}`;

  return (
    <Container as="section" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[520px]">
        <Eyebrow centered className="mb-5 justify-center">
          Account
        </Eyebrow>
        <h1 className="mb-4 text-center font-display text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
          Create your account.
        </h1>
        <p className="mb-9 text-center text-[15.5px] leading-[1.6] text-muted">
          One account for courses, batches, payments, and support — it takes about a minute.
        </p>

        <SignUpForm next={next} signInHref={signInHref} />
      </div>
    </Container>
  );
}
