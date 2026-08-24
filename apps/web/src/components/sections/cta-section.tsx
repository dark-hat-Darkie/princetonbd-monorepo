import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { contact, telHref } from '@/content/site/contact';

/**
 * The closing call to action. Every page ends on this, so the copy is a prop
 * and the secondary "call us" action is assembled here from the shared contact
 * details rather than repeated sixty times.
 */
export function CtaSection({
  eyebrow = 'Begin',
  title,
  body,
  action,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  action: { label: string; href: string };
}) {
  return (
    <section id="enroll" className="relative overflow-hidden bg-canvas text-ink">
      <Container className="relative py-20 lg:py-[110px]">
        <div className="relative overflow-hidden border border-[rgba(27,36,54,.1)] border-t-[3px] border-t-gold bg-cream px-6 py-16 text-center shadow-[0_40px_90px_-55px_rgba(27,36,54,.45)] sm:px-11 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(198,163,95,.12),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-[640px]">
            <Eyebrow centered className="mb-[26px]">
              {eyebrow}
            </Eyebrow>
            <h2 className="mb-[22px] font-display text-[clamp(28px,4vw,50px)] leading-[1.08] font-normal text-ink-deep">
              {title}
            </h2>
            <p className="mx-auto mb-10 max-w-[520px] text-[17.5px] leading-[1.65] text-muted">
              {body}
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <CtaButton href={action.href} size="lg">
                {action.label}
              </CtaButton>
              <CtaButton href={telHref(contact.phone)} size="lg" variant="outline">
                Call {contact.phone}
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
