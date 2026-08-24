import type { HubContent } from '@/content/types';
import { CardSection } from '@/components/sections/card-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { GuaranteeBand } from '@/components/sections/guarantee-band';
import { StatsBand } from '@/components/sections/stats-band';
import { Testimonials } from '@/components/sections/testimonials';
import { WordmarkStrip } from '@/components/sections/wordmark-strip';
import { PageHero } from '@/components/ui/page-hero';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing, guaranteeBand, testimonialsFor } from '@/content/shared';

/**
 * A section landing page: Test Prep, Tutoring, Admissions, Study Abroad,
 * Online Courses, Partnerships.
 *
 * Every block below the hero is optional. A hub with no `stats` renders no
 * stats band rather than an empty one, so the six hubs can differ in shape
 * without six different templates.
 */
export function HubPage({ content }: { content: HubContent }) {
  const closing = content.closing ?? defaultClosing;
  const quotes = testimonialsFor(content.testimonials ?? []);

  return (
    <>
      <PageHero breadcrumb={breadcrumbFor(content.path)} {...content.hero} />

      {content.strip ? <WordmarkStrip {...content.strip} /> : null}

      <CardSection
        eyebrow={content.cards.eyebrow}
        title={content.cards.title}
        intro={content.cards.intro}
        action={content.cards.action}
        cards={content.cards.items}
        columns={content.cards.columns}
      />

      {content.features ? (
        <FeatureGrid
          eyebrow={content.features.eyebrow}
          title={content.features.title}
          intro={content.features.intro}
          features={content.features.items}
        />
      ) : null}

      {content.guarantee ? (
        <GuaranteeBand
          eyebrow={guaranteeBand.eyebrow}
          title={guaranteeBand.title}
          body={guaranteeBand.body}
          action={guaranteeBand.action}
          features={guaranteeBand.features}
        />
      ) : null}

      {content.stats?.length ? <StatsBand stats={content.stats} /> : null}

      {quotes.length ? (
        <Testimonials
          eyebrow="Student outcomes"
          title="Where our students are headed."
          items={quotes}
        />
      ) : null}

      {content.faq?.length ? <FaqSection items={content.faq} /> : null}

      <CtaSection
        eyebrow={closing.eyebrow}
        title={closing.title}
        body={closing.body}
        action={closing.action}
      />
    </>
  );
}
