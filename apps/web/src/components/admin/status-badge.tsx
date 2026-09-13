import { cn } from '@/lib/cn';
import {
  batchStatusLabels,
  courseStatusLabels,
  type BatchStatus,
  type CourseStatus,
} from '@/lib/cms-enums';

type Status = CourseStatus | BatchStatus | 'active' | 'inactive';

const tone: Record<Status, string> = {
  published: 'bg-brand-soft text-brand-ink',
  open: 'bg-brand-soft text-brand-ink',
  active: 'bg-brand-soft text-brand-ink',
  filling: 'bg-accent-soft text-on-accent',
  draft: 'bg-panel text-muted',
  waitlist: 'bg-panel text-muted',
  inactive: 'bg-panel text-muted',
  archived: 'bg-danger-soft text-danger',
  closed: 'bg-danger-soft text-danger',
};

const labels: Record<Status, string> = {
  ...courseStatusLabels,
  ...batchStatusLabels,
  active: 'Active',
  inactive: 'Inactive',
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
