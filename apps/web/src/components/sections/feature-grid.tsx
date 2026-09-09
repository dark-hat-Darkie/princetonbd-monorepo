import type { Feature } from '@/content/types';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Plain value cards — no number, no trailing meta row.
 *
 * Distinct from `CardSection` on purpose: that grid is a menu of destinations
 * and its cards are links, this one is an argument and its cards are prose.
 */
export function FeatureGrid({
  eyebrow,
  title,
  intro,
  features,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  features: readonly Feature[];
}) {
  return (
    <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        align="center"
        className="mb-[60px]"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col rounded-md border border-line bg-surface px-7 py-8 shadow-card"
          >
            {/* Yellow as a fill, never a rule: a 3px block reads as decoration
                where a 1px yellow line would vanish against white. */}
            <div aria-hidden className="mb-5 h-[3px] w-7 rounded-full bg-accent" />
            <h3 className="mb-2.5 font-display text-[21px] leading-[1.2] font-semibold tracking-[-.02em] text-ink">
              {feature.title}
            </h3>
            <p className="text-[14.5px] leading-[1.6] text-muted">{feature.desc}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
