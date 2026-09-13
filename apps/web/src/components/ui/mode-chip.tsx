import { cn } from '@/lib/cn';
import { deliveryModeLabels, type DeliveryMode } from '@/lib/cms-enums';

/**
 * "Classroom" / "Live online", as a small outlined chip. Takes the API's
 * mode value so the batch table and the fee card need no mapping step.
 */
export function ModeChip({ mode, className }: { mode: DeliveryMode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-[.1em] whitespace-nowrap uppercase',
        mode === 'classroom'
          ? 'border-line-strong text-ink-soft'
          : 'border-brand/40 bg-brand-soft text-brand-ink',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('size-1.5 rounded-full', mode === 'classroom' ? 'bg-ink-soft' : 'bg-brand')}
      />
      {deliveryModeLabels[mode]}
    </span>
  );
}
