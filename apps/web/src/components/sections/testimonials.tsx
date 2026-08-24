import type { Testimonial } from '@/content/types';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';

export function Testimonials({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: readonly Testimonial[];
}) {
  return (
    <Container as="section" className="pt-24 pb-20 lg:pt-[120px] lg:pb-[100px]">
      <div className="mb-[60px] text-center">
        <Eyebrow centered className="mb-5">
          {eyebrow}
        </Eyebrow>
        <h2 className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.1] font-normal text-ink-deep">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col border border-[rgba(27,36,54,.09)] bg-surface px-8 py-9"
          >
            <div aria-hidden className="mb-5 text-[13px] tracking-[.1em] text-gold-light">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <blockquote className="mb-7 flex-1 font-quote text-[19px] leading-[1.55] text-ink-quote italic">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3.5 border-t border-t-[rgba(27,36,54,.09)] pt-[22px]">
              <span
                aria-hidden
                className="flex size-11 flex-none items-center justify-center rounded-full bg-ink font-display text-[17px] text-gold-pale"
              >
                {testimonial.initials}
              </span>
              <div>
                <div className="text-[15px] font-bold text-ink-deep">{testimonial.name}</div>
                <div className="mt-[3px] text-[12.5px] tracking-[.01em] text-warm">
                  {testimonial.result}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  );
}
