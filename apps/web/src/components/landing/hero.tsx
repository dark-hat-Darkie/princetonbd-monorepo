import Image from 'next/image';
import Link from 'next/link';

import { stats } from '@/content/home';
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
      {/* Warm gold wash falling from the top-right corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_88%_0%,rgba(198,163,95,.12),transparent_52%)]"
      />

      <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-[70px]">
        <div className="animate-rise py-16 motion-reduce:animate-none lg:py-24">
          <Eyebrow className="mb-[30px]">Bangladesh&rsquo;s premier academy</Eyebrow>

          <h1 className="mb-[26px] font-display text-[clamp(34px,5.2vw,66px)] leading-[1.04] font-normal tracking-[-.02em] text-ink-deep">
            A world-class
            <br className="hidden lg:inline" /> education,{' '}
            <span className="text-gold-deep italic">
              within
              <br className="hidden lg:inline" /> reach
            </span>{' '}
            &mdash; from home.
          </h1>

          <p className="mb-[38px] max-w-[500px] text-[17.5px] leading-[1.65] text-muted">
            SAT, GRE, IELTS and admissions coaching taught by top-tier faculty and localized for
            Bangladeshi students &mdash; one roadmap from first diagnostic to acceptance letter.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-3.5">
            <CtaButton href="#enroll">Book a free consultation</CtaButton>
            <Link
              href="#programs"
              className="inline-flex items-center gap-[9px] px-1.5 py-4 text-[15px] font-semibold text-ink transition-colors duration-200 hover:text-gold-deep"
            >
              Explore programs{' '}
              <span aria-hidden className="text-[17px]">
                &rarr;
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[13.5px] text-muted-rate">
            <span aria-hidden className="tracking-[.04em] text-gold-light">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>
            <span className="border-l border-l-[rgba(27,36,54,.16)] pl-3">
              Rated <strong className="font-bold text-ink">4.9 / 5</strong> by 12,000+ students
              across Bangladesh
            </span>
          </div>
        </div>

        <div className="relative pb-16 lg:py-[74px]">
          {heroMedia === 'stats' ? <HeroStats /> : <HeroPhoto />}

          {showGuaranteeBadge ? (
            <div className="absolute right-0 bottom-10 hidden max-w-[210px] animate-float border-t-2 border-t-gold bg-cream px-[21px] py-[17px] text-ink shadow-[0_30px_60px_-24px_rgba(27,36,54,.4)] motion-reduce:animate-none md:block lg:-right-[30px] lg:bottom-[60px]">
              <div className="mb-[7px] text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                Our promise
              </div>
              <div className="mb-[5px] font-display text-[19px] leading-[1.2]">Score guarantee</div>
              <div className="text-[12.5px] leading-[1.45] text-muted-badge">
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
      {/* Offset frame, echoing the arch of the photo behind it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-5 right-[-20px] bottom-[-20px] left-5 rounded-t-[220px] rounded-b-[4px] border border-[rgba(184,147,78,.45)]"
      />

      <div className="relative overflow-hidden rounded-t-[220px] rounded-b-[4px] border border-[rgba(184,147,78,.3)] shadow-[0_60px_100px_-55px_rgba(27,36,54,.5)]">
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

      <div className="absolute right-0 bottom-[-26px] left-0 flex justify-center px-2">
        <div className="flex items-center gap-3.5 border border-[rgba(27,36,54,.1)] border-t-2 border-t-gold bg-surface px-[22px] py-3 shadow-[0_26px_50px_-28px_rgba(27,36,54,.4)]">
          <span className="text-[10px] font-bold tracking-[.2em] whitespace-nowrap text-gold-deep uppercase">
            Class of 2026
          </span>
          <span aria-hidden className="h-3.5 w-px flex-none bg-[rgba(27,36,54,.18)]" />
          <span className="font-display text-[15px] text-ink">
            Coached in Dhaka. Admitted worldwide.
          </span>
        </div>
      </div>

      <div className="absolute bottom-[150px] left-0 hidden border border-[rgba(27,36,54,.08)] border-t-2 border-t-gold bg-surface px-[19px] py-[15px] text-center shadow-[0_30px_60px_-26px_rgba(27,36,54,.4)] md:block lg:-left-[30px]">
        <div className="font-display text-[29px] leading-none text-gold-deep">+210</div>
        <div className="mt-1 text-[10px] tracking-[.06em] text-muted">avg. SAT gain</div>
      </div>
    </div>
  );
}

/** The `heroMedia="stats"` alternative the design defines but does not show by default. */
function HeroStats() {
  return (
    <div className="rounded-[2px] border border-[rgba(184,147,78,.32)] bg-cream px-[34px] py-8 shadow-[0_30px_60px_-34px_rgba(27,36,54,.4)]">
      <div className="mb-5 font-display text-[22px] text-ink">By the numbers</div>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-baseline justify-between gap-4 border-t border-t-[rgba(27,36,54,.1)] py-3.5"
        >
          <span className="text-[14px] text-muted">{stat.label}</span>
          <span className="font-display text-[26px] whitespace-nowrap text-gold-deep">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
