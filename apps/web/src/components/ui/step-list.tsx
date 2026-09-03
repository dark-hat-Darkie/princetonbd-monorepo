import type { Step } from '@/content/types';

/**
 * The numbered process rows from the landing page's study-abroad section,
 * lifted out so every programme page can describe its own sequence.
 *
 * The numerals sit in yellow tiles rather than being set in gold text — the
 * repalette left no legible way to write a number in the accent colour, and a
 * filled tile is the form that colour is actually good at.
 */
export function StepList({ steps, columns = 2 }: { steps: readonly Step[]; columns?: 1 | 2 | 4 }) {
  const columnClass = { 1: '', 2: 'sm:grid-cols-2', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];

  return (
    <div className={`grid grid-cols-1 gap-x-10 gap-y-7 ${columnClass}`}>
      {steps.map((step) => (
        <div key={step.no} className="flex gap-4">
          <span
            aria-hidden
            className="flex size-8 flex-none items-center justify-center rounded-sm bg-accent font-display text-[14px] font-extrabold text-on-accent tabular-nums"
          >
            {step.no}
          </span>
          <div>
            <div className="mb-1 text-[15px] font-bold text-ink">{step.title}</div>
            <div className="text-[13.5px] leading-[1.55] text-muted">{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
