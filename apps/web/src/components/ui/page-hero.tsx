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
  /** ReactNode so a title can carry a marker-highlighted phrase. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: readonly HeroAction[];
  /** The "at a glance" row an exam page carries under its intro. */
  facts?: readonly HeroFact[];
  /** One quiet line under the actions — the course's shape, a trust claim. */
  note?: React.ReactNode;
  /** Optional right-hand panel — a photo frame, a fee card, a stat block. */
  aside?: React.ReactNode;
}

/**
 * The opening of every page that is not the landing page.
 *
 * Deliberately quieter than the landing hero: no arched photo frame, no
 * floating badge, no wash strong enough to compete with the h1. It keeps the
 * same vocabulary — green-dot kicker, Bricolage display face, clamped sizing,
 * rounded fact cells — at a scale that reads as an inner page rather than a
 * second front door.
 *
 * With an `aside`, the facts move into the left column so the two halves
 * weigh the same: a tall fee card against a title and two buttons left the
 * hero lopsided, with the facts stranded a screen below.
 */
export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  intro,
  actions,
  facts,
  note,
  aside,
}: PageHeroProps) {
  const factList = facts?.length ? (
    <dl
      className={
        aside ? 'mt-10 grid grid-cols-2 gap-3' : 'mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4'
      }
    >
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-md border border-line bg-surface px-5 py-4">
          <dt className="mb-1.5 text-[10.5px] font-bold tracking-[.16em] text-muted-2 uppercase">
            {fact.label}
          </dt>
          <dd className="font-display text-[17px] leading-[1.3] font-semibold text-ink">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  ) : null;

  return (
    <section className="relative overflow-hidden border-b border-b-line bg-canvas text-ink">
      {/* Two faint washes, brand top-right and accent bottom-left — the same
          pairing as the landing hero, at a fraction of the strength. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_95%_0%,var(--color-brand-soft),transparent_60%),radial-gradient(40%_45%_at_0%_100%,var(--color-accent-soft),transparent_65%)]"
      />

      <Container className="relative py-12 lg:py-16">
        {breadcrumb ? <Breadcrumb items={breadcrumb} className="mb-8" /> : null}

        <div
          className={
            aside
              ? 'grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-[72px]'
              : ''
          }
        >
          <div className="animate-rise motion-reduce:animate-none">
            <Eyebrow className="mb-[22px]">{eyebrow}</Eyebrow>

            <h1 className="max-w-[780px] font-display text-[clamp(32px,4.4vw,56px)] leading-[1.04] font-semibold tracking-[-.03em] text-ink">
              {title}
            </h1>

            {intro ? (
              <p className="mt-[22px] max-w-[560px] text-[17px] leading-[1.65] text-muted">
                {intro}
              </p>
            ) : null}

            {actions?.length ? (
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                {actions.map((action) => (
                  <CtaButton key={action.label} href={action.href} variant={action.variant}>
                    {action.label}
                  </CtaButton>
                ))}
              </div>
            ) : null}

            {note ? (
              <div className="mt-6 text-[13.5px] leading-[1.6] text-muted-2">{note}</div>
            ) : null}

            {aside ? factList : null}
          </div>

          {aside ? (
            <div className="relative animate-rise [animation-delay:120ms] motion-reduce:animate-none">
              {aside}
            </div>
          ) : null}
        </div>

        {aside ? null : factList}
      </Container>
    </section>
  );
}
