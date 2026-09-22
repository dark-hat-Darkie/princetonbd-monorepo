'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * The session-aware half of the site header.
 *
 * The header itself is a static Server Component (marketing pages must stay
 * statically renderable), so it always renders the logged-out default and
 * this island upgrades it once `/auth/session` answers. Rendered output is
 * identical to the old hardcoded link for signed-out visitors, so there is
 * no flicker on that path; signed-in visitors see the swap one fetch later.
 *
 * Fail-closed towards the old behaviour: any fetch failure keeps the Log in
 * link, which is exactly what an anonymous visitor should see — and a
 * signed-in visitor who clicks it lands on `/sign-in`, which bounces them
 * straight to their dashboard.
 *
 * `pageshow` re-probes after back/forward-cache restores: a page restored
 * from bfcache skips `useEffect` re-runs in some browsers, and the session
 * may have changed (sign-out in another tab) while it sat there.
 */

type Status = 'pending' | 'signed-out' | 'signed-in';

async function probe(signal: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch('/auth/session', { cache: 'no-store', signal });
    if (!response.ok) return false;
    const body = (await response.json()) as { signedIn?: unknown };
    return body.signedIn === true;
  } catch {
    return false;
  }
}

function useSessionStatus(): Status {
  const [status, setStatus] = useState<Status>('pending');

  useEffect(() => {
    const controller = new AbortController();

    const refresh = async () => {
      setStatus((await probe(controller.signal)) ? 'signed-in' : 'signed-out');
    };
    const onPageShow = () => {
      void refresh();
    };

    void refresh();
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
      controller.abort();
    };
  }, []);

  return status;
}

const headerLinkClass =
  'hidden rounded-full px-1 text-[11px] font-bold tracking-[.11em] whitespace-nowrap text-ink-soft uppercase transition-colors duration-200 hover:text-brand-ink nav:inline';

/** Desktop header slot: `Log in` for visitors, `Dashboard` for members. */
export function HeaderAuthSlot() {
  const status = useSessionStatus();

  if (status === 'signed-in') {
    return (
      <Link href="/dashboard" className={headerLinkClass}>
        Dashboard
      </Link>
    );
  }

  return (
    <Link href="/sign-in" className={headerLinkClass}>
      Log in
    </Link>
  );
}

/** Mobile drawer footer slot: same swap, drawer type scale. */
export function DrawerAuthSlot({ onNavigate }: { onNavigate: () => void }) {
  const status = useSessionStatus();

  if (status === 'signed-in') {
    return (
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="rounded-sm text-[11px] font-bold tracking-[.11em] text-ink uppercase"
      >
        Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/sign-in"
      onClick={onNavigate}
      className="rounded-sm text-[11px] font-bold tracking-[.11em] text-ink uppercase"
    >
      Log in
    </Link>
  );
}
