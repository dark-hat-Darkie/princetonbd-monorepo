import { cn } from '@/lib/cn';

interface BrandMarkProps {
  /** `header` is dark-on-light with a divider; `footer` is gold-on-ink. */
  variant?: 'header' | 'footer';
  className?: string;
}

/**
 * The circled "P" monogram and Princeton Review / BANGLADESH lockup.
 *
 * The two variants differ by more than colour — the header locks the wordmark
 * up in small caps behind a divider rule, the footer sets it larger and
 * unspaced — so both are spelled out rather than derived from one another.
 */
export function BrandMark({ variant = 'header', className }: BrandMarkProps) {
  const isHeader = variant === 'header';

  return (
    <span className={cn('flex items-center', isHeader ? 'gap-3.5' : 'gap-3', className)}>
      <span
        aria-hidden
        className={cn(
          'flex flex-none items-center justify-center rounded-full font-display font-bold',
          isHeader
            ? 'size-[42px] border border-gold text-[19px] text-ink shadow-[inset_0_0_0_3px_rgba(184,147,78,.14)]'
            : 'size-9 border border-gold-light text-[17px] text-gold-pale',
        )}
      >
        P
      </span>

      <span
        className={cn(
          'flex flex-col leading-none',
          isHeader && 'border-l border-l-[rgba(27,36,54,.14)] pl-3.5',
        )}
      >
        <span
          className={cn(
            'font-display',
            isHeader
              ? 'text-[15px] tracking-[.14em] text-ink uppercase'
              : 'text-[18px] text-foot-bright',
          )}
        >
          Princeton Review
        </span>
        <span
          className={cn(
            'font-bold',
            isHeader
              ? 'mt-[5px] text-[9px] tracking-[.46em] text-gold-mid'
              : 'mt-1 text-[9.5px] tracking-[.4em] text-gold-light',
          )}
        >
          BANGLADESH
        </span>
      </span>
    </span>
  );
}
