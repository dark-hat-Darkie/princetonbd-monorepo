import { CtaButton } from '@/components/ui/cta-button';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { navGroups } from '@/content/site/nav';
import Link from 'next/link';

/**
 * Inside `(marketing)`, so a wrong URL still arrives with the header, the
 * footer and a way back in — rather than on a bare page with nothing on it.
 */
export default function NotFound() {
  return (
    <Container as="section" className="py-24 lg:py-[120px]">
      <Eyebrow className="mb-6">404</Eyebrow>
      <h1 className="mb-5 max-w-[720px] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.06] font-normal tracking-[-.02em] text-ink-deep">
        That page isn&rsquo;t here.
      </h1>
      <p className="mb-9 max-w-[520px] text-[17px] leading-[1.65] text-muted">
        It may have moved, or the link may be mistyped. Everything the site holds is one of these
        six sections &mdash; or on the site map.
      </p>

      <div className="mb-14 flex flex-wrap gap-3.5">
        <CtaButton href="/">Back to the home page</CtaButton>
        <CtaButton href="/site-map" variant="outline">
          Browse the site map
        </CtaButton>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)] sm:grid-cols-2 lg:grid-cols-3">
        {navGroups.map((group) => (
          <Link
            key={group.href}
            href={group.href}
            className="group flex flex-col bg-surface px-7 py-6 transition-colors duration-200 hover:bg-canvas"
          >
            <span className="mb-2 font-display text-[21px] text-ink-deep">{group.label}</span>
            <span className="text-[14px] leading-[1.5] text-muted">{group.hubLabel}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
