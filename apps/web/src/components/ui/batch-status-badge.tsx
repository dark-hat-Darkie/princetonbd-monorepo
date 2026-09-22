import { cn } from '@/lib/cn';
import type { BatchStatus } from '@/lib/cms-enums';

interface StatusLike {
  status: BatchStatus;
  seatsLeft: number | null;
}

const statusBadge: Record<
  Exclude<BatchStatus, 'closed'>,
  { label: (batch: StatusLike) => string; className: string }
> = {
  open: { label: () => 'Seats open', className: 'bg-brand-soft text-brand-ink' },
  filling: {
    label: (batch) =>
      batch.seatsLeft !== null ? `Filling fast · ${String(batch.seatsLeft)} left` : 'Filling fast',
    className: 'bg-accent-soft text-on-accent',
  },
  waitlist: { label: () => 'Waitlist', className: 'bg-panel text-muted' },
};

/**
 * "Seats open" / "Filling fast · 4 left" / "Waitlist", as a small pill.
 * Shared by the course page's batch table and the batch-schedule finder so
 * a status can only ever be worded one way. Renders nothing for a closed
 * batch: the public API never returns one, and if it did the row should
 * carry no call to action rather than a "Closed" tag beside an Enrol button.
 */
export function BatchStatusBadge({ batch, className }: { batch: StatusLike; className?: string }) {
  if (batch.status === 'closed') return null;
  const badge = statusBadge[batch.status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1.5 text-[10.5px] font-bold tracking-[.12em] whitespace-nowrap uppercase',
        badge.className,
        className,
      )}
    >
      {badge.label(batch)}
    </span>
  );
}
