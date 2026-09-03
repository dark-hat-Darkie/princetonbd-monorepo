import { Star } from 'lucide-react';

import type { Testimonial } from '@/content/types';
import { Reveal } from '@/components/motion/reveal';
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
      <div className="mb-14 text-center">
        <Eyebrow centered className="mb-5">
          {eyebrow}
        </Eyebrow>
        <h2 className="font-display text-[clamp(30px,3.6vw,46px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.09} className="flex">
            <figure className="flex flex-1 flex-col rounded-md border border-line bg-surface px-7 py-8 shadow-card">
              <div aria-hidden className="mb-5 flex items-center gap-0.5 text-accent">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current stroke-none" />
                ))}
              </div>
              <blockquote className="mb-7 flex-1 font-quote text-[18px] leading-[1.5] font-medium tracking-[-.015em] text-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3.5 border-t border-t-line pt-5">
                {/* Monogram, not a portrait — see public/images/README.md; the
                    policy is deliberate and predates this retheme. */}
                <span
                  aria-hidden
                  className="flex size-11 flex-none items-center justify-center rounded-full bg-brand-soft font-display text-[16px] font-bold text-brand-ink"
                >
                  {testimonial.initials}
                </span>
                <div>
                  <div className="text-[15px] font-bold text-ink">{testimonial.name}</div>
                  <div className="mt-0.5 text-[12.5px] tracking-[.01em] text-muted-2">
                    {testimonial.result}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
