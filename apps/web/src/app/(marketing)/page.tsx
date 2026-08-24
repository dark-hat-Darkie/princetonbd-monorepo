import { Hero } from '@/components/landing/hero';
import { CardSection } from '@/components/sections/card-section';
import { CtaSection } from '@/components/sections/cta-section';
import { GuaranteeBand } from '@/components/sections/guarantee-band';
import { LogoMarquee } from '@/components/sections/logo-marquee';
import { SplitFeature } from '@/components/sections/split-feature';
import { StatsBand } from '@/components/sections/stats-band';
import { Testimonials } from '@/components/sections/testimonials';
import { WordmarkStrip } from '@/components/sections/wordmark-strip';
import {
  admits,
  admitsKicker,
  closing,
  examStripKicker,
  exams,
  features,
  guarantee,
  programs,
  programsSection,
  stats,
  steps,
  studyAbroadSection,
  testimonials,
  testimonialsSection,
} from '@/content/home';

/**
 * The two values below are editor props the design declares (`heroMedia`,
 * `showGuaranteeBadge`), pinned to their design defaults. `heroMedia="stats"`
 * swaps the hero photo for the "By the numbers" panel the design defines but
 * never shows.
 *
 * The design's third prop, `showAnnouncement`, moved to the marketing layout
 * along with the bar it gates.
 */
const heroMedia = 'photo' as const;
const showGuaranteeBadge = true;

export default function HomePage() {
  return (
    <>
      <Hero heroMedia={heroMedia} showGuaranteeBadge={showGuaranteeBadge} />
      <WordmarkStrip kicker={examStripKicker} items={exams} />
      <CardSection
        id="programs"
        eyebrow={programsSection.eyebrow}
        title={programsSection.title}
        action={programsSection.action}
        cards={programs}
      />
      <GuaranteeBand
        eyebrow={guarantee.eyebrow}
        title={guarantee.title}
        body={guarantee.body}
        action={guarantee.action}
        features={features}
      />
      <SplitFeature {...studyAbroadSection} steps={steps} />
      <StatsBand stats={stats} />
      <Testimonials
        eyebrow={testimonialsSection.eyebrow}
        title={testimonialsSection.title}
        items={testimonials}
      />
      <LogoMarquee kicker={admitsKicker} items={admits} />
      <CtaSection
        eyebrow={closing.eyebrow}
        title={closing.title}
        body={closing.body}
        action={closing.action}
      />
    </>
  );
}
