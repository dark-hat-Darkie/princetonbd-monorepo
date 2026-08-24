import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';

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
    <Container as="section" className="mt-[88px]">
      <div className="relative grid grid-cols-1 overflow-hidden border border-[rgba(27,36,54,.1)] border-t-[3px] border-t-gold bg-cream text-ink shadow-[0_40px_80px_-50px_rgba(27,36,54,.4)] lg:grid-cols-[1.12fr_.88fr]">
        <div className="relative px-8 py-12 sm:px-12 lg:px-[60px] lg:py-16">
          <Eyebrow className="mb-[22px]">{eyebrow}</Eyebrow>
          <h2 className="mb-5 font-display text-[clamp(26px,3vw,40px)] leading-[1.14] font-normal text-ink-deep">
            {title}
          </h2>
          <p className="mb-[34px] max-w-[450px] text-[16px] leading-[1.68] text-muted">{body}</p>
          <CtaButton href={action.href} className="px-7 py-[15px] shadow-none">
            {action.label}
          </CtaButton>
        </div>

        <div className="relative flex flex-col justify-center bg-panel px-8 py-10 sm:px-12 lg:border-l lg:border-l-[rgba(27,36,54,.1)] lg:px-[50px] lg:py-11">
          {features.map((feature, index) => (
            <div key={feature} className="flex gap-4 border-t border-t-[rgba(27,36,54,.1)] py-4">
              {/* The design numbered these from a 0-based index, rendering
                  00–03; corrected here to match every other numbered list. */}
              <span aria-hidden className="mt-0.5 font-display text-[15px] text-gold-deep">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[15px] leading-[1.5] text-ink-soft">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
