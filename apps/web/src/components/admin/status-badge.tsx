import { cn } from '@/lib/cn';
import {
  batchStatusLabels,
  courseStatusLabels,
  type BatchStatus,
  type CourseStatus,
} from '@/lib/cms-enums';

type Status =
  | CourseStatus
  | BatchStatus
  | 'active'
  | 'inactive'
  | 'pending'
  | 'pending_payment'
  | 'processing'
  | 'success'
  | 'failed'
  | 'cancelled'
  | 'expired';

const tone: Record<Status, string> = {
  published: 'bg-brand-soft text-brand-ink',
  open: 'bg-brand-soft text-brand-ink',
  active: 'bg-brand-soft text-brand-ink',
  success: 'bg-brand-soft text-brand-ink',
  filling: 'bg-accent-soft text-on-accent',
  processing: 'bg-accent-soft text-on-accent',
  pending: 'bg-panel text-muted',
  pending_payment: 'bg-panel text-muted',
  draft: 'bg-panel text-muted',
  waitlist: 'bg-panel text-muted',
  inactive: 'bg-panel text-muted',
  expired: 'bg-panel text-muted',
  archived: 'bg-danger-soft text-danger',
  closed: 'bg-danger-soft text-danger',
  failed: 'bg-danger-soft text-danger',
  cancelled: 'bg-danger-soft text-danger',
};

const labels: Record<Status, string> = {
  ...courseStatusLabels,
  ...batchStatusLabels,
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  pending_payment: 'Pending payment',
  processing: 'Processing',
  success: 'Success',
  failed: 'Failed',
  cancelled: 'Cancelled',
  expired: 'Expired',
};

/** The small uppercase pill that says what state a row is in. */
export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1.5 text-[10.5px] font-bold tracking-[.12em] whitespace-nowrap uppercase',
        tone[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}
