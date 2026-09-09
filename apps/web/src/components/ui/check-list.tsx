import { Check } from 'lucide-react';

import { cn } from '@/lib/cn';

/**
 * A list of promises with the green tick the guarantee band introduced —
 * lifted out so the fee card, the batch cards and the curriculum outcomes
 * all draw the same tick rather than three near-copies of it.
 */
export function CheckList({
  items,
  className,
  dense = false,
}: {
  items: readonly string[];
  className?: string;
  /** Tighter row spacing for a sidebar card. */
  dense?: boolean;
}) {
  return (
    <ul className={cn('flex flex-col', dense ? 'gap-2.5' : 'gap-1', className)}>
      {items.map((item) => (
        <li key={item} className={cn('flex items-start gap-3', dense ? '' : 'py-2')}>
          <span
            aria-hidden
            className="mt-px flex size-5 flex-none items-center justify-center rounded-full bg-brand text-on-brand"
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className="text-[14.5px] leading-[1.5] text-ink-soft">{item}</span>
        </li>
      ))}
    </ul>
  );
}
