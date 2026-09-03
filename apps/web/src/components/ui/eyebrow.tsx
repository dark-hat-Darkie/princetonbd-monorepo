import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: React.ReactNode;
  /** Adds a matching dot on the trailing side, as used by centred sections. */
  centered?: boolean;
  /** For use on the dark bands, where the green dims and the ink text vanishes. */
  onDark?: boolean;
  className?: string;
}

/**
 * The kicker that opens every section.
 *
 * Was a gold hairline plus uppercase gold text. The rule is now a green dot —
 * at 11px the old 1px rule read as dirt on the screen, and a dot survives the
 * move to a white ground where a hairline does not.
 */
export function Eyebrow({ children, centered = false, onDark = false, className }: EyebrowProps) {
  const dot = (
    <span
      aria-hidden
      className={cn('size-[7px] flex-none rounded-full', onDark ? 'bg-accent' : 'bg-brand')}
    />
  );

  return (
    <div className={cn('items-center gap-2.5', centered ? 'inline-flex' : 'flex', className)}>
      {dot}
      <span
        className={cn(
          'text-[11.5px] font-bold tracking-[.16em] uppercase',
          onDark ? 'text-on-ink/75' : 'text-brand-ink',
        )}
      >
        {children}
      </span>
      {centered ? dot : null}
    </div>
  );
}
