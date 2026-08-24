import type { FaqItem } from '@/content/types';
import { Container } from '@/components/ui/container';
import { Faq } from '@/components/ui/faq';
import { JsonLd } from '@/components/ui/json-ld';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Questions, plus the FAQPage structured data that lets the same answers show
 * up as rich results. Both read from one array so they cannot disagree.
 */
export function FaqSection({
  eyebrow = 'Questions',
  title = 'Before you enrol.',
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: readonly FaqItem[];
}) {
  return (
    <Container as="section" className="py-24 lg:py-[120px]">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-[70px]">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Faq items={items} />
      </div>
    </Container>
  );
}
