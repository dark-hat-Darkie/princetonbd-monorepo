import Link from 'next/link';

import { navGroups } from '@/content/site/nav';
import { MobileNav } from './mobile-nav';
import { PrimaryNav } from './primary-nav';
import { BrandMark } from '@/components/ui/brand-mark';
import { CtaButton } from '@/components/ui/cta-button';

/**
 * Sticky header.
 *
 * The horizontal padding here is 36px, narrower than the 44px every other
 * section uses — carried from the design, and it is what keeps the brand mark
 * and the CTA from crowding the bar's own edges.
 *
 * The bar is translucent with a backdrop blur, so the page ground shows through
 * as it scrolls.
 *
 * The bar is 92px, not the 76px it was: the logo is a four-line stacked
 * lockup and stops being readable below ~60px of height. `scroll-pt` on the
 * <html> element is sized to match — see the note in app/layout.tsx.
 *
 * The brand link is `flex-none`. Without it the logo is the only flex item that
 * can shrink, so when the seven-item nav runs long the logo silently collapses
 * — it was measured at 36px of its 95px before this was added — instead of the
 * layout admitting it does not fit.
 *
 * The nav collapses to a drawer at exactly 1080px — the design's own
 * breakpoint, declared as `--breakpoint-nav` so it is not approximated by a
 * nearby Tailwind default.
 *
 * The header stays a Server Component: only the mega-menu and the drawer are
 * interactive, and both take the nav tree as a plain prop.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[60] border-b border-b-line bg-canvas/85 backdrop-blur-[14px] backdrop-saturate-150">
      <div className="mx-auto flex h-[92px] max-w-page items-center justify-between gap-[22px] px-5 sm:px-6 lg:px-9">
        <Link
          href="/"
          aria-label="Princeton Review Bangladesh — home"
          className="flex-none rounded-sm"
        >
          <BrandMark />
        </Link>

        <PrimaryNav groups={navGroups} />

        <div className="flex flex-none items-center gap-[18px]">
          <MobileNav groups={navGroups} />
          <Link
            href="/sign-in"
            className="hidden rounded-full px-1 text-[11px] font-bold tracking-[.11em] whitespace-nowrap text-ink-soft uppercase transition-colors duration-200 hover:text-brand-ink nav:inline"
          >
            Log in
          </Link>
          {/* Below `sm` the brand, burger and CTA cannot share 390px without
              the button being clipped. The drawer carries the same action, so
              it drops out here rather than overflowing. */}
          <CtaButton href="/contact" size="sm" className="hidden sm:inline-flex">
            Book a consultation
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
