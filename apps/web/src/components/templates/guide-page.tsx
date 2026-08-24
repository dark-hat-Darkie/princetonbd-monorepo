import type { GuideContent } from '@/content/types';
import { CardSection } from '@/components/sections/card-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ArchImage } from '@/components/ui/arch-image';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Prose } from '@/components/ui/prose';
import { Toc } from '@/components/ui/toc';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing } from '@/content/shared';

/**
 * Editorial long-form: a destination guide, a funding explainer, a rankings
 * commentary.
 *
 * The contents rail is derived from the body's own headings rather than
 * maintained beside them, so it cannot fall out of step with the page.
 */
export function GuidePage({ content }: { content: GuideContent }) {
  const closing = content.closing ?? defaultClosing;

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor(content.path)}
        {...content.hero}
        aside={
          content.image ? (
            <ArchImage src={content.image.src} alt={content.image.alt} side="right" priority />
          ) : undefined
        }
      />

      <Container as="section" className="py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-[70px]">
          <Toc blocks={content.body} />
          <Prose blocks={content.body} />
        </div>
      </Container>

      {content.related?.length ? (
        <CardSection
          eyebrow="Keep reading"
          title="Related guides."
          cards={content.related}
          className="pt-0"
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
