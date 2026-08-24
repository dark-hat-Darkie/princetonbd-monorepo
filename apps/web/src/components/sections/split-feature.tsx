import Image from 'next/image';

import type { Step } from '@/content/types';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { StepList } from '@/components/ui/step-list';
import { cn } from '@/lib/cn';

/**
 * Arched image on one side, copy and a numbered process on the other.
 *
 * The offset gold frame behind the image is a second absolutely-positioned box
 * echoing the arch, not a border on the image itself — that is what lets it sit
 * proud of the picture on two sides.
 */
export function SplitFeature({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
  steps,
  /** Puts the image on the right, mirroring the offset frame with it. */
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
          'grid grid-cols-1 items-center gap-12 lg:gap-[66px]',
          reverse ? 'lg:grid-cols-[1.12fr_.88fr]' : 'lg:grid-cols-[.88fr_1.12fr]',
        )}
      >
        <div className={cn('relative', reverse && 'lg:order-2')}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-[-20px] bottom-5 rounded-t-[180px] rounded-b-[4px] border border-[rgba(184,147,78,.45)]',
              reverse ? 'right-[-20px] left-5' : 'right-5 left-[-20px]',
            )}
          />
          <div className="relative overflow-hidden rounded-t-[180px] rounded-b-[4px] border border-[rgba(27,36,54,.14)] shadow-[0_50px_90px_-55px_rgba(27,36,54,.5)]">
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
        </div>

        <div className={cn(reverse && 'lg:order-1')}>
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          <h2 className="mb-[22px] font-display text-[clamp(26px,3.2vw,42px)] leading-[1.1] font-normal text-ink-deep">
            {title}
          </h2>
          <p className="mb-10 max-w-[520px] text-[16.5px] leading-[1.68] text-muted">{body}</p>

          {steps?.length ? (
            <div className="max-w-[540px]">
              <StepList steps={steps} />
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
