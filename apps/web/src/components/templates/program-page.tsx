import type { ProgramContent } from '@/content/types';
import { CardSection } from '@/components/sections/card-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { FormatGrid } from '@/components/sections/format-grid';
import { StatsBand } from '@/components/sections/stats-band';
import { Testimonials } from '@/components/sections/testimonials';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { StepList } from '@/components/ui/step-list';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing, testimonialsFor } from '@/content/shared';

/**
 * A single service: a tutoring format, a subject, an admissions offering, an
 * online-course format, a partnership programme.
 *
 * Where `ExamPage` sells one product in depth, this sells a way of working —
 * so the numbered process is the section that carries the weight, and pricing
 * is optional (several of these are quoted per engagement, not per package).
 */
export function ProgramPage({ content }: { content: ProgramContent }) {
  const closing = content.closing ?? defaultClosing;
  const quotes = testimonialsFor(content.testimonials ?? []);

  return (
    <>
      <PageHero breadcrumb={breadcrumbFor(content.path)} {...content.hero} />

      <FeatureGrid
        eyebrow={content.features.eyebrow}
        title={content.features.title}
        intro={content.features.intro}
        features={content.features.items}
      />

      {content.process ? (
        <section className="border-y border-y-[rgba(27,36,54,.08)] bg-band">
          <Container className="py-24 lg:py-[120px]">
            <SectionHeading
              eyebrow={content.process.eyebrow}
              title={content.process.title}
              intro={content.process.intro}
              className="mb-14"
            />
            <StepList steps={content.process.steps} columns={4} />
          </Container>
        </section>
      ) : null}

      {content.formats?.length ? (
        <FormatGrid title="What it costs." formats={content.formats} />
      ) : null}

      {content.cards ? (
        <CardSection
          eyebrow={content.cards.eyebrow}
          title={content.cards.title}
          intro={content.cards.intro}
          action={content.cards.action}
          cards={content.cards.items}
          columns={content.cards.columns}
        />
      ) : null}

      {content.stats?.length ? <StatsBand stats={content.stats} /> : null}

      {quotes.length ? (
        <Testimonials eyebrow="Student outcomes" title="In their words." items={quotes} />
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
