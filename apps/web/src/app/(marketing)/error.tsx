'use client';

import { useEffect } from 'react';

import { CtaButton } from '@/components/ui/cta-button';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { contact, telHref } from '@/content/site/contact';

/**
 * Error boundary for the marketing tree. Must be a Client Component — Next
 * hands it the error and a `reset` callback, and both need to run in the
 * browser.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    /* The digest is the only safe handle on a production error: the message is
       redacted before it reaches the browser, so this is what ties what the
       visitor saw to the server log. */
    console.error('[marketing] render failed', error.digest ?? error.message);
  }, [error]);

  return (
    <Container as="section" className="py-24 lg:py-[120px]">
      <Eyebrow className="mb-6">Something went wrong</Eyebrow>
      <h1 className="mb-5 max-w-[720px] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.06] font-normal tracking-[-.02em] text-ink-deep">
        This page didn&rsquo;t load.
      </h1>
      <p className="mb-9 max-w-[520px] text-[17px] leading-[1.65] text-muted">
        The fault is ours, not yours. Try again &mdash; and if it keeps happening, call us on{' '}
        <a href={telHref(contact.phone)} className="text-ink underline">
          {contact.phone}
        </a>{' '}
        and we will sort it out directly.
      </p>

      <div className="flex flex-wrap gap-3.5">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center justify-center rounded-[2px] bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-ink shadow-[0_16px_30px_-18px_rgba(27,36,54,.7)] transition-colors duration-200 hover:bg-ink-hover"
        >
          Try again
        </button>
        <CtaButton href="/" variant="outline">
          Back to the home page
        </CtaButton>
      </div>
    </Container>
  );
}
