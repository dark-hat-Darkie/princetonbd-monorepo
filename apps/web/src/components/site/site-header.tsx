import Link from 'next/link';

import { navGroups } from '@/content/site/nav';
import { MobileNav } from './mobile-nav';
import { PrimaryNav } from './primary-nav';
import { BrandMark } from '@/components/ui/brand-mark';
import { CtaButton } from '@/components/ui/cta-button';

/**
 * Sticky header.
 *
 * Two details carried from the design that look like mistakes but are not:
 * the horizontal padding here is 36px, narrower than the 44px every other
 * section uses; and the bar is translucent with a backdrop blur, so the gold
 * top rule and page ground show through as it scrolls.
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
    <header className="sticky top-0 z-[60] border-b border-b-[rgba(27,36,54,.09)] bg-canvas/85 backdrop-blur-[14px] backdrop-saturate-150">
      <div className="mx-auto flex h-[86px] max-w-page items-center justify-between gap-[22px] px-5 sm:px-6 lg:px-9">
        <Link href="/" aria-label="Princeton Review Bangladesh — home">
          <BrandMark />
        </Link>

        <PrimaryNav groups={navGroups} />

        <div className="flex flex-none items-center gap-[18px]">
          <MobileNav groups={navGroups} />
          <Link
            href="/sign-in"
            className="hidden text-[11px] font-bold tracking-[.11em] whitespace-nowrap text-ink uppercase nav:inline"
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
