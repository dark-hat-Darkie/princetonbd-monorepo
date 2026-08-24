import { cn } from '@/lib/cn';

/**
 * A labelled progress bar.
 *
 * `<progress>` rather than two divs: it carries the value, the max and the role
 * without any ARIA of our own, and a screen reader announces "60%" from the
 * element itself. The native bar is hidden and repainted to match the theme.
 */
export function ProgressMeter({
  label,
  value,
  max,
  caption,
  className,
}: {
  label: string;
  value: number;
  max: number;
  caption?: string;
  className?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[13.5px] font-medium text-ink-soft">{label}</span>
        <span className="text-[12.5px] whitespace-nowrap text-warm">
          {caption ?? `${String(value)} / ${String(max)}`}
        </span>
      </div>

      <progress
        value={value}
        max={max}
        className={cn(
          'block h-1.5 w-full appearance-none overflow-hidden rounded-full',
          '[&::-webkit-progress-bar]:bg-[rgba(27,36,54,.1)]',
          '[&::-webkit-progress-value]:bg-chart',
          '[&::-moz-progress-bar]:bg-chart',
        )}
      >
        {pct}%
      </progress>
    </div>
  );
}
