import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/cn';
import { Eyebrow } from './eyebrow';

/**
 * The kicker + display heading (+ optional trailing link) that opens a section.
 * The landing page repeats this cluster six times with only the alignment and
 * the trailing link varying.
 */
interface SectionHeadingProps {
  eyebrow: string;
  /** ReactNode so a heading can carry a marker-highlighted phrase. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  /** The "View all courses →" affordance, which only left-aligned heads use. */
  action?: { label: string; href: string };
  /** Rendered as this level, so a page keeps one h1 and sections use h2. */
  as?: 'h1' | 'h2' | 'h3';
  /** Inverts the type for use inside a `tone="ink"` section. */
  onDark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  action,
  as: Heading = 'h2',
  onDark = false,
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
        <Eyebrow centered={centered} onDark={onDark} className="mb-5">
          {eyebrow}
        </Eyebrow>
        <Heading
          className={cn(
            'font-display text-[clamp(30px,3.6vw,46px)] leading-[1.08] font-semibold tracking-[-.025em]',
            onDark ? 'text-on-ink' : 'text-ink',
          )}
        >
          {title}
        </Heading>
        {intro ? (
          <p
            className={cn(
              'mt-[18px] text-[16.5px] leading-[1.68]',
              onDark ? 'text-on-ink/70' : 'text-muted',
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
          className={cn(
            'group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap transition-colors duration-200',
            onDark
              ? 'border-line-invert text-on-ink hover:border-accent hover:text-accent'
              : 'border-line-strong text-ink hover:border-brand hover:text-brand-ink',
          )}
        >
          {action.label}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Link>
      ) : null}
    </div>
  );
}
