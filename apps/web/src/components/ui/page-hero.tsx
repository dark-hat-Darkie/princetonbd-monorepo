import { Breadcrumb, type Crumb } from './breadcrumb';
import { Container } from './container';
import { CtaButton } from './cta-button';
import { Eyebrow } from './eyebrow';

export interface HeroAction {
  label: string;
  href: string;
  variant?: 'solid' | 'outline';
}

export interface HeroFact {
  label: string;
  value: string;
}

interface PageHeroProps {
  breadcrumb?: readonly Crumb[];
  eyebrow: string;
  /** ReactNode so a title can carry the design's gold italic emphasis. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: readonly HeroAction[];
  /** The "at a glance" row an exam page carries under its intro. */
  facts?: readonly HeroFact[];
  /** Optional right-hand panel — a photo frame, a price card, a stat block. */
  aside?: React.ReactNode;
}

/**
 * The opening of every page that is not the landing page.
 *
 * Deliberately quieter than the landing hero: no arched photo frame, no
 * floating badge, no radial wash strong enough to compete with the h1. It
 * keeps the same vocabulary — gold kicker, Libre Caslon display face, clamped
 * sizing, hairline rules — at a scale that reads as an inner page rather than
 * a second front door.
 */
export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  intro,
  actions,
  facts,
  aside,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-b-[rgba(27,36,54,.08)] bg-canvas text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_92%_0%,rgba(198,163,95,.1),transparent_55%)]"
      />

      <Container className="relative py-14 lg:py-[76px]">
        {breadcrumb ? <Breadcrumb items={breadcrumb} className="mb-8" /> : null}

        <div
          className={
            aside
              ? 'grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-[64px]'
              : ''
          }
        >
          <div className="animate-rise motion-reduce:animate-none">
            <Eyebrow className="mb-[22px]">{eyebrow}</Eyebrow>

            <h1 className="max-w-[780px] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.06] font-normal tracking-[-.02em] text-ink-deep">
              {title}
            </h1>

            {intro ? (
              <p className="mt-[22px] max-w-[560px] text-[17px] leading-[1.65] text-muted">
                {intro}
              </p>
            ) : null}

            {actions?.length ? (
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                {actions.map((action) => (
                  <CtaButton key={action.label} href={action.href} variant={action.variant}>
                    {action.label}
                  </CtaButton>
                ))}
              </div>
            ) : null}
          </div>

          {aside ? <div className="relative">{aside}</div> : null}
        </div>

        {facts?.length ? (
          /* Every cell carries the left rule, matching the stats band. */
          <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-t-[rgba(27,36,54,.1)] pt-10 lg:grid-cols-4 lg:gap-y-0">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l border-l-[rgba(27,36,54,.12)] px-5">
                <dt className="mb-2 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                  {fact.label}
                </dt>
                <dd className="font-display text-[19px] leading-[1.3] text-ink-deep">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  );
}
