import Image from 'next/image';

import type { Step } from '@/content/types';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StepList } from '@/components/ui/step-list';
import { cn } from '@/lib/cn';

/**
 * Image on one side, copy and a numbered process on the other.
 *
 * The offset yellow block behind the image is a second absolutely-positioned
 * box, not a border on the image itself — that is what lets it sit proud of the
 * picture on two sides. Same construction as `ui/arch-image.tsx`; this section
 * predates that component and keeps its own copy because its aspect ratio and
 * offsets differ.
 */
export function SplitFeature({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
  steps,
  /** Puts the image on the right, mirroring the offset block with it. */
  reverse = false,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  body: string;
  steps?: readonly Step[];
  reverse?: boolean;
}) {
  return (
    <Container as="section" className="py-24 lg:py-[120px]">
      <div
        className={cn(
          'grid grid-cols-1 items-center gap-14 lg:gap-[66px]',
          reverse ? 'lg:grid-cols-[1.12fr_.88fr]' : 'lg:grid-cols-[.88fr_1.12fr]',
        )}
      >
        <Reveal className={cn('relative', reverse && 'lg:order-2')} y={24}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-7 bottom-[-16px] rounded-lg bg-accent',
              reverse ? 'right-[-16px] left-8' : 'right-8 left-[-16px]',
            )}
          />
          <div className="relative overflow-hidden rounded-lg shadow-lift">
            <div className="relative aspect-[4/5]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1080px) 36vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className={cn(reverse && 'lg:order-1')} delay={0.1}>
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h2 className="mb-5 font-display text-[clamp(28px,3.3vw,42px)] leading-[1.08] font-semibold tracking-[-.03em] text-ink">
            {title}
          </h2>
          <p className="mb-10 max-w-[520px] text-[16.5px] leading-[1.68] text-muted">{body}</p>

          {steps?.length ? (
            <div className="max-w-[540px]">
              <StepList steps={steps} />
            </div>
          ) : null}
        </Reveal>
      </div>
    </Container>
  );
}
