import type { Metadata } from 'next';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

import { SignInForm } from '@/components/auth/sign-in-form';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_NEXT, safeNextPath } from '@/lib/auth/return-to';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Princeton Review Bangladesh account.',
  robots: { index: false, follow: false },
};

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/* One-shot notices from other auth steps. Unknown keys render nothing — the
   query string is not a billboard. */
const notices: Record<string, string> = {
  'password-updated': 'Your password is updated. Sign in with it below.',
  'check-email': 'Your account is ready. Sign in below to continue.',
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const next = safeNextPath(single(params.next));

  /* Signed-in visitors have no business with the form: bounce them to where
     they were headed (the portal layout role-routes admins from there). */
  const { user } = await withAuth();
  if (user) redirect(next || DEFAULT_NEXT);

  const noticeKey = single(params.notice);
  const notice = noticeKey && notices[noticeKey] ? notices[noticeKey] : undefined;

  const signUpHref =
    next === DEFAULT_NEXT ? '/sign-up' : `/sign-up?next=${encodeURIComponent(next)}`;

  return (
    <Container as="section" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[480px]">
        <Eyebrow centered className="mb-5 justify-center">
          Account
        </Eyebrow>
        <h1 className="mb-4 text-center font-display text-[clamp(30px,4.4vw,44px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
          Welcome back.
        </h1>
        <p className="mb-9 text-center text-[15.5px] leading-[1.6] text-muted">
          Sign in to pick up your courses, schedule, and applications.
        </p>

        {notice ? (
          <p
            role="status"
            className="mb-6 rounded-sm border border-brand/25 bg-brand-soft px-5 py-4 text-[14px] leading-[1.55] text-ink-soft"
          >
            {notice}
          </p>
        ) : null}

        <SignInForm next={next} signUpHref={signUpHref} />
      </div>
    </Container>
  );
}
