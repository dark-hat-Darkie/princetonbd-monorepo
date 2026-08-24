import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { contact, telHref } from '@/content/site/contact';

export const metadata: Metadata = {
  title: 'We couldn’t sign you in',
  description: 'Something went wrong completing your sign-in.',
  robots: { index: false, follow: false },
};

/**
 * Where a failed sign-in lands.
 *
 * AuthKit's default behaviour is to render a raw JSON body — the same opaque
 * "Something went wrong" for every distinct failure — which tells the visitor
 * nothing and tells whoever is debugging it even less. The callback handler
 * passes the specific failure code here instead, so the page can say which of
 * the handful of things actually went wrong and what to do about it.
 *
 * The code is a coarse category, never the underlying error: the detail stays
 * in the server log where it belongs.
 */
const reasons: Record<string, { title: string; body: string; retry: boolean }> = {
  session_expired: {
    title: 'Your sign-in took a little too long.',
    body: 'A sign-in has to be finished within ten minutes of starting it, and this one ran over — usually because a consent screen sat waiting. Starting again is all it takes.',
    retry: true,
  },
  session_unverified: {
    title: 'We couldn’t verify your sign-in session.',
    body: 'The session we handed your browser on the way out no longer checks out on the way back. If the server was restarted with different settings mid-sign-in, that would do it. Please start again.',
    retry: true,
  },
  missing_pkce_cookie: {
    title: 'Your sign-in took a little too long.',
    body: 'A sign-in has to be finished within ten minutes of starting it, and this one ran over — or your browser is blocking cookies for this site. Starting again usually fixes it.',
    retry: true,
  },
  oauth_state_mismatch: {
    title: 'We couldn’t verify that sign-in.',
    body: 'The response didn’t match the request we sent, which is what we would expect if the sign-in was started in another tab or window. Please start again from this one.',
    retry: true,
  },
  missing_auth_params: {
    title: 'That sign-in link was incomplete.',
    body: 'The link is missing information we need. This usually means it was opened a second time, or copied without all of it. Please start again.',
    retry: true,
  },
  missing_tokens: {
    title: 'Your identity provider didn’t return a session.',
    body: 'Your sign-in was accepted but no session came back with it. If this happens again, it is on our side and we would like to know.',
    retry: true,
  },
  exchange_failed: {
    title: 'We couldn’t complete your sign-in.',
    body: 'Your identity provider confirmed who you are, but exchanging that for a session was rejected. A sign-in link only works once, so this is most often a page that was reloaded — try once more, and get in touch if it persists.',
    retry: true,
  },
};

const fallback = {
  title: 'We couldn’t sign you in.',
  body: 'Something went wrong on the way back from your identity provider. Please try again.',
  retry: true,
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.reason;
  const key = Array.isArray(raw) ? (raw[0] ?? '') : (raw ?? '');
  const reason = reasons[key] ?? fallback;

  /* Mirrors the callback handler, which only attaches `detail` outside
     production. Guarded again here so a hand-typed query param cannot render
     arbitrary text on a live site. */
  const rawDetail = params.detail;
  const detail =
    process.env.NODE_ENV === 'production'
      ? undefined
      : Array.isArray(rawDetail)
        ? rawDetail[0]
        : rawDetail;

  return (
    <Container as="section" className="py-24 lg:py-[120px]">
      <Eyebrow className="mb-6">Sign-in</Eyebrow>

      <h1 className="mb-5 max-w-[720px] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.06] font-normal tracking-[-.02em] text-ink-deep">
        {reason.title}
      </h1>
      <p className="mb-9 max-w-[540px] text-[17px] leading-[1.65] text-muted">{reason.body}</p>

      <div className="flex flex-wrap gap-3.5">
        {reason.retry ? <CtaButton href="/sign-in">Try signing in again</CtaButton> : null}
        <CtaButton href="/" variant="outline">
          Back to the home page
        </CtaButton>
      </div>

      {detail ? (
        <div className="mt-12 max-w-[720px] border border-[rgba(27,36,54,.12)] bg-band px-6 py-5">
          <div className="mb-2 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
            Development detail &middot; {key || 'unknown'}
          </div>
          <p className="font-mono text-[13px] leading-[1.6] break-words text-ink-soft">{detail}</p>
          <p className="mt-3 text-[12.5px] text-warm">
            Shown outside production only. The same line is in the server log as
            <span className="font-mono"> [auth] sign-in callback failed</span>.
          </p>
        </div>
      ) : null}

      <p className="mt-12 max-w-[540px] border-l-[3px] border-l-gold bg-cream px-6 py-5 text-[14.5px] leading-[1.65] text-ink-soft">
        Still stuck? Call{' '}
        <a href={telHref(contact.phone)} className="text-ink underline">
          {contact.phone}
        </a>{' '}
        or write to{' '}
        <a href={`mailto:${contact.email}`} className="text-ink underline">
          {contact.email}
        </a>{' '}
        and we will sort it out with you.
      </p>
    </Container>
  );
}
