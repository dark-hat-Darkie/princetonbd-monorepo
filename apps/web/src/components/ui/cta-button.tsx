import Link from 'next/link';

import { cn } from '@/lib/cn';

type Size = 'sm' | 'md' | 'lg';

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  /** `sm` header and portal · `md` hero and guarantee band · `lg` closing CTA. */
  size?: Size;
  variant?: 'solid' | 'outline';
  className?: string;
  /** Used by the mobile drawer to close itself on navigation. */
  onClick?: () => void;
}

/* Sizes are transcribed from the design rather than derived from a scale — the
   source uses slightly different paddings and two weights.
 *
 * Size is deliberately independent of variant. The outlined button used to
 * carry its own hard-coded padding and ignore `size` altogether, so a
 * `size="sm"` outline rendered at the large size and stood a good 20px taller
 * than the solid button beside it. */
const sizeClass: Record<Size, string> = {
  sm: 'px-5 py-3 text-[11px] font-bold tracking-[.11em] uppercase',
  md: 'px-[30px] py-4 text-[15px] font-semibold tracking-[.01em]',
  lg: 'px-[34px] py-[17px] text-base font-semibold',
};

/* A property of the fill rather than of the size, but the design gives the
   small button a tighter shadow than the other two. */
const solidShadow: Record<Size, string> = {
  sm: 'shadow-[0_10px_22px_-14px_rgba(27,36,54,.6)]',
  md: 'shadow-[0_16px_30px_-18px_rgba(27,36,54,.7)]',
  lg: 'shadow-[0_16px_30px_-18px_rgba(27,36,54,.7)]',
};

/**
 * The dark call-to-action, which appears throughout, and its outlined sibling.
 *
 * The solid variant carries a transparent border of the same width as the
 * outlined one. Without it the two are never the same height: box-sizing does
 * not help here, because a button sized by its padding has no set height for
 * the border to be drawn inside of, so the outline's 1px top and bottom add
 * two real pixels.
 *
 * Hover states come from the design's `style-hover` attributes. Those are inert
 * in the design runtime — support.js has no hover handling at all — so they
 * never rendered in the canvas, but they are the recorded intent.
 */
export function CtaButton({
  href,
  children,
  size = 'md',
  variant = 'solid',
  className,
  onClick,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-[9px] rounded-[2px] whitespace-nowrap transition-colors duration-200',
        sizeClass[size],
        variant === 'solid'
          ? cn('border border-transparent bg-ink text-on-ink hover:bg-ink-hover', solidShadow[size])
          : 'border border-[rgba(27,36,54,.28)] text-ink hover:border-gold hover:text-gold-deep',
        className,
      )}
    >
      {children}
    </Link>
  );
}
