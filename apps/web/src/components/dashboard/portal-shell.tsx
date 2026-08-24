import Link from 'next/link';

import { BrandMark } from '@/components/ui/brand-mark';
import { PortalDrawer } from './portal-drawer';
import { PortalLinks } from './portal-links';
import { portalLinks } from './portal-nav';

/**
 * Chrome for every signed-in page.
 *
 * A dark rail against the cream canvas, borrowing the footer's treatment —
 * gold-on-ink, the same monogram — so the portal reads as the same brand while
 * being unmistakably a different surface from the marketing site. The rail is
 * fixed and the content column is inset by its width, so a long page scrolls
 * without moving the navigation.
 */
export function PortalShell({
  account,
  children,
}: {
  /** The account chip and sign-out form; server-rendered and slotted in. */
  account: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Desktop rail */}
      <div className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col bg-ink lg:flex">
        <div className="flex h-[86px] flex-none items-center border-b border-b-[rgba(244,241,232,.12)] px-6">
          <Link href="/" aria-label="Princeton Review Bangladesh — home">
            <BrandMark variant="footer" />
          </Link>
        </div>

        <nav aria-label="Portal" className="flex-1 overflow-y-auto px-4 py-6">
          <PortalLinks links={portalLinks} />
        </nav>

        <div className="flex-none border-t border-t-[rgba(244,241,232,.12)] px-6 py-5">
          {account}
        </div>
      </div>

      {/* Mobile bar */}
      <header className="sticky top-0 z-30 flex h-[64px] items-center justify-between gap-4 border-b border-b-[rgba(27,36,54,.09)] bg-canvas/90 px-5 backdrop-blur-[14px] lg:hidden">
        <PortalDrawer links={portalLinks} footer={account} />
        <Link href="/" aria-label="Princeton Review Bangladesh — home">
          <BrandMark />
        </Link>
      </header>

      <main id="main" className="lg:pl-[264px]">
        <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:px-11 lg:py-14">
          {children}
        </div>
      </main>
    </div>
  );
}

/**
 * The page's own heading. Title and blurb come from the navigation list rather
 * than being retyped per page, so a renamed section renames everywhere.
 */
export function PortalHeader({
  title,
  blurb,
  children,
}: {
  title: string;
  blurb: string;
  /** Optional right-hand actions. */
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-b-[rgba(27,36,54,.1)] pb-7">
      <div>
        <h1 className="font-display text-[clamp(26px,3vw,36px)] leading-[1.1] font-normal tracking-[-.01em] text-ink-deep">
          {title}
        </h1>
        <p className="mt-2.5 max-w-[560px] text-[15.5px] leading-[1.6] text-muted">{blurb}</p>
      </div>
      {children ? <div className="flex flex-wrap items-center gap-3">{children}</div> : null}
    </header>
  );
}
