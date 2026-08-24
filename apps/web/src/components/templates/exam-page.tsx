import type { ExamContent } from '@/content/types';
import { CtaSection } from '@/components/sections/cta-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { FormatGrid } from '@/components/sections/format-grid';
import { GuaranteeBand } from '@/components/sections/guarantee-band';
import { StatsBand } from '@/components/sections/stats-band';
import { Testimonials } from '@/components/sections/testimonials';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHero } from '@/components/ui/page-hero';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing, guaranteeBand, testimonialsFor } from '@/content/shared';

/**
 * A single exam's course page — the site's highest-intent template, and the
 * one repeated most often (twelve exams).
 *
 * The hero's `facts` row carries the exam's own shape (length, sections,
 * scoring, how often it runs) so a student can confirm they are on the right
 * page before reading a word of marketing.
 */
export function ExamPage({ content }: { content: ExamContent }) {
  const closing = content.closing ?? defaultClosing;
  const quotes = testimonialsFor(content.testimonials ?? []);

  return (
    <>
      {/* One Course entity per format, so a search result can show the actual
          options and their prices rather than a single vague listing. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${content.name} preparation`,
          description: content.seo.description,
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Princeton Review Bangladesh',
          },
          hasCourseInstance: content.formats.map((format) => ({
            '@type': 'CourseInstance',
            name: format.name,
            courseMode: 'blended',
            offers: {
              '@type': 'Offer',
              price: format.price.amount,
              priceCurrency: format.price.currency,
            },
          })),
        }}
      />

      <PageHero breadcrumb={breadcrumbFor(content.path)} {...content.hero} />

      <FormatGrid
        title={`Ways to prepare for the ${content.name}.`}
        intro="Every format runs to the same syllabus and carries the same score guarantee — they differ in pace, class size and how much of your instructor's attention is yours alone."
        formats={content.formats}
      />

      <FeatureGrid
        eyebrow={content.includes.eyebrow}
        title={content.includes.title}
        intro={content.includes.intro}
        features={content.includes.items}
      />

      <GuaranteeBand
        eyebrow={guaranteeBand.eyebrow}
        title={guaranteeBand.title}
        body={guaranteeBand.body}
        action={guaranteeBand.action}
        features={guaranteeBand.features}
      />

      {content.stats?.length ? <StatsBand stats={content.stats} /> : null}

      {quotes.length ? (
        <Testimonials
          eyebrow="Student outcomes"
          title={`What ${content.name} students did next.`}
          items={quotes}
        />
      ) : null}

      <FaqSection title={`${content.name} questions, answered.`} items={content.faq} />

      <CtaSection
        eyebrow={closing.eyebrow}
        title={closing.title}
        body={closing.body}
        action={closing.action}
      />
    </>
  );
}
