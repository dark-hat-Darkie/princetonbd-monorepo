import { Check } from 'lucide-react';

import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';

/**
 * The score-guarantee panel — the one section that is green-led rather than
 * ink-led. The guarantee is the page's trust claim, and green is the colour
 * carrying trust in this palette, so it gets the tinted ground and the ticks
 * while everything around it stays white.
 */
export function GuaranteeBand({
  eyebrow,
  title,
  body,
  action,
  features,
}: {
  eyebrow: string;
  title: string;
  body: string;
  action: { label: string; href: string };
  features: readonly string[];
}) {
  return (
    <Container as="section" className="mt-24">
      <Reveal>
        <div className="relative grid grid-cols-1 overflow-hidden rounded-lg border border-brand/25 bg-brand-soft text-ink lg:grid-cols-[1.12fr_.88fr]">
          <div className="relative px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h2 className="mb-5 font-display text-[clamp(27px,3.1vw,40px)] leading-[1.1] font-semibold tracking-[-.025em] text-ink">
              {title}
            </h2>
            <p className="mb-9 max-w-[450px] text-[16px] leading-[1.68] text-muted">{body}</p>
            <CtaButton href={action.href} arrow>
              {action.label}
            </CtaButton>
          </div>

          <div className="relative flex flex-col justify-center gap-1 border-t border-t-brand/20 px-8 py-10 sm:px-12 lg:border-t-0 lg:border-l lg:border-l-brand/20 lg:px-12 lg:py-11">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3.5 py-3">
                <span
                  aria-hidden
                  className="mt-px flex size-6 flex-none items-center justify-center rounded-full bg-brand text-on-brand"
                >
                  <Check className="size-[15px]" strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-[1.5] text-ink-soft">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
