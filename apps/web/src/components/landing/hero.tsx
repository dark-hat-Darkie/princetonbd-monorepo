import { ShieldCheck, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { stats } from '@/content/home';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';

export interface HeroProps {
  /** `photo` is the design default; `stats` swaps in the "By the numbers" panel. */
  heroMedia?: 'photo' | 'stats';
  showGuaranteeBadge?: boolean;
}

export function Hero({ heroMedia = 'photo', showGuaranteeBadge = true }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-canvas text-ink">
      {/* Two soft washes rather than the old single gold corner glow: a green
          one behind the copy and a yellow one behind the photo, so both brand
          colours are present before any element declares them. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_92%_-5%,rgba(244,218,34,.16),transparent_58%),radial-gradient(70%_55%_at_-5%_10%,rgba(6,167,124,.08),transparent_60%)]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-[64px]">
        <Reveal className="py-16 lg:py-24" y={22}>
          <Eyebrow className="mb-7">Bangladesh&rsquo;s premier academy</Eyebrow>

          <h1 className="mb-6 max-w-[600px] font-display text-[clamp(34px,4.6vw,58px)] leading-[1.04] font-extrabold tracking-[-.035em] text-ink">
            A world-class
            <br className="hidden lg:inline" /> education,{' '}
            {/* The marker highlight. `box-decoration-break: clone` is what keeps
                the block intact when the phrase wraps — without it the second
                line loses its padding and the highlight looks torn. */}
            <span className="box-decoration-clone bg-accent px-[.18em] py-[.04em] text-on-accent">
              within reach
            </span>{' '}
            &mdash; from home.
          </h1>

          <p className="mb-9 max-w-[500px] text-[17.5px] leading-[1.65] text-muted">
            SAT, GRE, IELTS and admissions coaching taught by top-tier faculty and localized for
            Bangladeshi students &mdash; one roadmap from first diagnostic to acceptance letter.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-3.5">
            <CtaButton href="#enroll" arrow>
              Book a free consultation
            </CtaButton>
            <Link
              href="#programs"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-[15px] text-[15px] font-semibold text-ink transition-colors duration-200 hover:text-brand-ink"
            >
              Explore programs
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >
                &rarr;
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[13.5px] text-muted">
            <span aria-hidden className="flex items-center gap-0.5 text-accent">
              {/* Yellow stars are a graphic, not text — the 1.41:1 rule does not
                  apply, and the rating is stated in the sentence beside them. */}
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-[15px] fill-current stroke-none" />
              ))}
            </span>
            <span className="border-l border-l-line-strong pl-3">
              Rated <strong className="font-bold text-ink">4.9 / 5</strong> by 12,000+ students
              across Bangladesh
            </span>
          </div>
        </Reveal>

        <div className="relative pb-20 lg:py-[74px]">
          <Reveal delay={0.12} y={26}>
            {heroMedia === 'stats' ? <HeroStats /> : <HeroPhoto />}
          </Reveal>

          {showGuaranteeBadge ? (
            <div className="absolute right-0 bottom-[132px] hidden max-w-[206px] animate-float rounded-md border border-line bg-surface p-5 text-ink shadow-lift motion-reduce:animate-none md:block lg:-right-[34px] lg:bottom-[150px]">
              <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                <ShieldCheck className="size-[18px]" aria-hidden />
              </div>
              <div className="mb-1.5 font-display text-[17px] leading-[1.2] font-semibold tracking-[-.02em]">
                Score guarantee
              </div>
              <div className="text-[12.5px] leading-[1.45] text-muted">
                Hit your target or study with us again &mdash; free.
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function HeroPhoto() {
  return (
    <div className="relative">
      {/* The offset yellow block that replaced the arched gold outline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-8 right-[-18px] bottom-[-18px] left-10 rounded-lg bg-accent"
      />

      <div className="relative overflow-hidden rounded-lg shadow-lift">
        <div className="relative aspect-[3/4]">
          <Image
            src="/images/hero-students.jpg"
            alt="A student working at a laptop in a university library"
            fill
            /* LCP element — loaded eagerly rather than lazily. */
            priority
            sizes="(min-width: 1080px) 40vw, 100vw"
            className="object-cover object-[center_28%]"
          />
        </div>
      </div>

      <div className="absolute right-6 bottom-[-24px] left-6 flex justify-center">
        <div className="flex items-center gap-3.5 rounded-full border border-line bg-surface py-2.5 pr-5 pl-4 shadow-lift">
          <span className="rounded-full bg-ink px-2.5 py-1 text-[9.5px] font-bold tracking-[.14em] whitespace-nowrap text-on-ink uppercase">
            Class of 2026
          </span>
          <span className="font-display text-[14.5px] font-semibold tracking-[-.015em] text-ink">
            Coached in Dhaka. Admitted worldwide.
          </span>
        </div>
      </div>

      <div className="absolute bottom-[68px] left-0 hidden rounded-md border border-line bg-surface px-5 py-4 shadow-lift md:block lg:-left-[34px] lg:bottom-[64px]">
        <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-accent text-on-accent">
          <TrendingUp className="size-[17px]" aria-hidden />
        </div>
        <div className="font-display text-[27px] leading-none font-extrabold tracking-[-.03em] text-ink">
          +210
        </div>
        <div className="mt-1.5 text-[10.5px] tracking-[.04em] text-muted-2">avg. SAT gain</div>
      </div>
    </div>
  );
}

/** The `heroMedia="stats"` alternative the design defines but does not show by default. */
function HeroStats() {
  return (
    <div className="rounded-lg border border-line bg-surface px-8 py-7 shadow-card">
      <div className="mb-5 font-display text-[21px] font-semibold tracking-[-.02em] text-ink">
        By the numbers
      </div>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-baseline justify-between gap-4 border-t border-t-line py-3.5"
        >
          <span className="text-[14px] text-muted">{stat.label}</span>
          <span className="font-display text-[26px] font-extrabold tracking-[-.03em] whitespace-nowrap text-ink">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
