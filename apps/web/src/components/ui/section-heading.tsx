import Link from 'next/link';

import { cn } from '@/lib/cn';
import { Eyebrow } from './eyebrow';

/**
 * The gold kicker + display heading (+ optional trailing link) that opens a
 * section. The landing page repeats this cluster six times with only the
 * alignment and the trailing link varying.
 */
interface SectionHeadingProps {
  eyebrow: string;
  /** ReactNode so a heading can carry the design's gold italic emphasis. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  /** The "View all courses →" affordance, which only left-aligned heads use. */
  action?: { label: string; href: string };
  /** Rendered as this level, so a page keeps one h1 and sections use h2. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  action,
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        centered ? 'text-center' : 'flex flex-wrap items-end justify-between gap-6',
        className,
      )}
    >
      <div className={cn(centered ? 'mx-auto max-w-[680px]' : 'max-w-[660px]')}>
        <Eyebrow centered={centered} className="mb-5">
          {eyebrow}
        </Eyebrow>
        <Heading className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.1] font-normal tracking-[-.01em] text-ink-deep">
          {title}
        </Heading>
        {intro ? (
          <p
            className={cn(
              'mt-[18px] text-[16.5px] leading-[1.68] text-muted',
              centered ? 'mx-auto max-w-[560px]' : 'max-w-[560px]',
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>

      {action && !centered ? (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-2 border-b-[1.5px] border-b-gold pb-[5px] text-[14px] font-semibold whitespace-nowrap text-ink transition-[gap] duration-200 hover:gap-3"
        >
          {action.label} <span aria-hidden>&rarr;</span>
        </Link>
      ) : null}
    </div>
  );
}
