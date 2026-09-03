import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/cn';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'solid' | 'outline' | 'accent' | 'brand';

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  /** `sm` header and portal · `md` hero and guarantee band · `lg` closing CTA. */
  size?: Size;
  /**
   * `solid` ink — the primary action everywhere on a light ground.
   * `outline` — its quieter sibling.
   * `accent` yellow — the primary action ON a dark band, where ink would vanish.
   * `brand` green — the supporting action; note this is `brand-ink`, not the
   * raw brand green, because white on #06a77c is only 3.08:1.
   */
  variant?: Variant;
  /** Trailing arrow that slides on hover. Off by default. */
  arrow?: boolean;
  className?: string;
  /** Used by the mobile drawer to close itself on navigation. */
  onClick?: () => void;
}

/* Sizes carry slightly different paddings and two weights.
 *
 * Size is deliberately independent of variant. The outlined button used to
 * carry its own hard-coded padding and ignore `size` altogether, so a
 * `size="sm"` outline rendered at the large size and stood a good 20px taller
 * than the solid button beside it. */
const sizeClass: Record<Size, string> = {
  sm: 'px-5 py-3 text-[11px] font-bold tracking-[.11em] uppercase',
  md: 'px-[26px] py-[15px] text-[15px] font-semibold tracking-[-.005em]',
  lg: 'px-8 py-[18px] text-base font-semibold tracking-[-.005em]',
};

/* A property of the fill rather than of the size, but a 22px-tall header button
   under the full CTA shadow looks like it is falling off the bar. */
const fillShadow: Record<Size, string> = {
  sm: 'shadow-[0_4px_12px_-6px_rgba(14,18,17,.4)]',
  md: 'shadow-cta',
  lg: 'shadow-cta',
};

const variantClass: Record<Variant, (size: Size) => string> = {
  solid: (size) => cn('border-transparent bg-ink text-on-ink hover:bg-ink-soft', fillShadow[size]),
  outline: () => 'border-line-strong text-ink hover:border-brand hover:text-brand-ink',
  accent: (size) =>
    cn('border-transparent bg-accent text-on-accent hover:bg-accent-deep', fillShadow[size]),
  brand: (size) =>
    cn('border-transparent bg-brand-ink text-on-brand hover:bg-brand-deep', fillShadow[size]),
};

/**
 * The call-to-action that appears throughout, in four fills.
 *
 * Every variant carries a 1px border — a real one on `outline`, a transparent
 * one on the fills. Without it the two are never the same height: box-sizing
 * does not help here, because a button sized by its padding has no set height
 * for the border to be drawn inside of, so the outline's 1px top and bottom add
 * two real pixels. `cta-button.test.tsx` guards this.
 *
 * The hover lift transitions `translate`, NOT `transform`. Tailwind v4 compiles
 * `-translate-y-*` to the standalone `translate` property, so transitioning
 * `transform` animates nothing and the lift snaps instantly while the colour
 * still fades. Same trap as `card-grid.tsx`.
 */
export function CtaButton({
  href,
  children,
  size = 'md',
  variant = 'solid',
  arrow = false,
  className,
  onClick,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group inline-flex translate-y-0 items-center justify-center gap-2 rounded-full border whitespace-nowrap transition-[translate,background-color,border-color,color,box-shadow] duration-200 hover:-translate-y-px motion-reduce:hover:translate-y-0',
        sizeClass[size],
        variantClass[variant](size),
        className,
      )}
    >
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="size-[1.05em] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      ) : null}
    </Link>
  );
}
