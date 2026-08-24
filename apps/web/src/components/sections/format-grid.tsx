import type { CourseFormat } from '@/content/types';
import { Container } from '@/components/ui/container';
import { PriceCard } from '@/components/ui/price-card';
import { SectionHeading } from '@/components/ui/section-heading';

/** The course-format options an exam or programme page sells. */
export function FormatGrid({
  eyebrow = 'Ways to prepare',
  title,
  intro,
  formats,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  formats: readonly CourseFormat[];
}) {
  return (
    <Container as="section" id="formats" className="py-24 lg:py-[120px]">
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} className="mb-14" />

      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${
          formats.length >= 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
        }`}
      >
        {formats.map((format) => (
          <PriceCard key={format.name} format={format} />
        ))}
      </div>
    </Container>
  );
}
