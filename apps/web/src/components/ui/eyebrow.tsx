import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: React.ReactNode;
  /** Adds a matching rule on the trailing side, as used by centred sections. */
  centered?: boolean;
  className?: string;
}

/**
 * The gold rule + uppercase kicker that opens every section — six occurrences
 * in the design, identical except for the trailing rule on centred variants
 * and the bottom margin, which the caller controls.
 */
export function Eyebrow({ children, centered = false, className }: EyebrowProps) {
  const rule = <span aria-hidden className="h-px w-[26px] flex-none bg-gold" />;

  return (
    <div className={cn('items-center gap-3', centered ? 'inline-flex' : 'flex', className)}>
      {rule}
      <span className="text-[11.5px] font-semibold tracking-[.22em] text-gold-deep uppercase">
        {children}
      </span>
      {centered ? rule : null}
    </div>
  );
}
