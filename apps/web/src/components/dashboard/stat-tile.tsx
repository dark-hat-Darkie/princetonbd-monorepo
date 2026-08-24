import { cn } from '@/lib/cn';

/**
 * A single number with its label.
 *
 * Deliberately not a chart: one value over one period has no shape to show, and
 * a sparkline beside a two-digit number is decoration. The delta line carries
 * direction in a word as well as a colour, so it does not depend on hue alone.
 */
export function StatTile({
  label,
  value,
  unit,
  delta,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  /** e.g. `{ direction: 'up', text: '+70 since mock #2' }`. */
  delta?: { direction: 'up' | 'down' | 'flat'; text: string };
  className?: string;
}) {
  return (
    <div className={cn('border border-[rgba(27,36,54,.1)] bg-surface px-6 py-5', className)}>
      <div className="mb-3 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
        {label}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-[34px] leading-none text-ink-deep">{value}</span>
        {unit ? <span className="text-[14px] text-warm">{unit}</span> : null}
      </div>

      {delta ? (
        <div className="mt-2.5 flex items-center gap-1.5 text-[13px] text-muted">
          <span
            aria-hidden
            className={delta.direction === 'down' ? 'text-[#a8452f]' : 'text-chart'}
          >
            {delta.direction === 'up' ? '↑' : delta.direction === 'down' ? '↓' : '→'}
          </span>
          {delta.text}
        </div>
      ) : null}
    </div>
  );
}
