import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { contact, telHref } from '@/content/site/contact';

/**
 * The closing call to action. Every page ends on this, so the copy is a prop
 * and the secondary "call us" action is assembled here from the shared contact
 * details rather than repeated sixty times.
 *
 * The panel is ink, which is what lets the primary button be yellow: an ink
 * button on an ink panel is invisible, and yellow-on-ink is the loudest
 * accessible pairing the brand has (14.9:1).
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
    <section id="enroll" className="relative overflow-hidden bg-canvas">
      <Container className="relative py-20 lg:py-[110px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-ink px-6 py-16 text-center text-on-ink sm:px-11 lg:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_130%_at_50%_0%,rgba(244,218,34,.14),transparent_62%),radial-gradient(60%_100%_at_12%_100%,rgba(6,167,124,.16),transparent_60%)]"
            />
            <div className="relative mx-auto max-w-[640px]">
              <Eyebrow centered onDark className="mb-6">
                {eyebrow}
              </Eyebrow>
              <h2 className="mb-5 font-display text-[clamp(30px,4.1vw,52px)] leading-[1.04] font-extrabold tracking-[-.035em] text-on-ink">
                {title}
              </h2>
              <p className="mx-auto mb-10 max-w-[520px] text-[17.5px] leading-[1.65] text-on-ink/70">
                {body}
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <CtaButton href={action.href} size="lg" variant="accent" arrow>
                  {action.label}
                </CtaButton>
                <CtaButton
                  href={telHref(contact.phone)}
                  size="lg"
                  variant="outline"
                  className="border-line-invert text-on-ink hover:border-accent hover:text-accent"
                >
                  Call {contact.phone}
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
