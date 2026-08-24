import type { CompanyContent } from '@/content/types';
import { CardSection } from '@/components/sections/card-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { StatsBand } from '@/components/sections/stats-band';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Prose } from '@/components/ui/prose';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing } from '@/content/shared';

/**
 * About, careers, press, events, campuses — pages that explain the company
 * rather than sell a course. Prose first, then whatever grid the page needs.
 */
export function CompanyPage({
  content,
  children,
}: {
  content: CompanyContent;
  /** Slot for a page-specific block: the instructor grid, the campus list. */
  children?: React.ReactNode;
}) {
  const closing = content.closing ?? defaultClosing;

  return (
    <>
      <PageHero breadcrumb={breadcrumbFor(content.path)} {...content.hero} />

      {content.body?.length ? (
        <Container as="section" className="py-20 lg:py-24">
          <Prose blocks={content.body} />
        </Container>
      ) : null}

      {children}

      {content.features ? (
        <FeatureGrid
          eyebrow={content.features.eyebrow}
          title={content.features.title}
          intro={content.features.intro}
          features={content.features.items}
        />
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

      <CtaSection
        eyebrow={closing.eyebrow}
        title={closing.title}
        body={closing.body}
        action={closing.action}
      />
    </>
  );
}
