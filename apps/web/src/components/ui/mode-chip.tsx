import type { DeliveryMode } from '@/content/types';
import { cn } from '@/lib/cn';

const label: Record<DeliveryMode, string> = {
  Classroom: 'Classroom',
  LiveOnline: 'Live online',
};

/**
 * The small delivery-mode badge — "Classroom" / "Live online" — in the same
 * pill vocabulary as the card grid's tag, so a mode reads as a category and
 * not as a button.
 */
export function ModeChip({ mode, className }: { mode: DeliveryMode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-brand-soft px-3 py-1.5 text-[10.5px] font-bold tracking-[.12em] text-brand-ink uppercase',
        className,
      )}
    >
      {label[mode]}
    </span>
  );
}
