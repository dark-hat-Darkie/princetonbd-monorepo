import type { Step } from '@/content/types';

/**
 * The numbered process rows from the landing page's study-abroad section,
 * lifted out so every programme page can describe its own sequence.
 */
export function StepList({ steps, columns = 2 }: { steps: readonly Step[]; columns?: 1 | 2 | 4 }) {
  const columnClass = { 1: '', 2: 'sm:grid-cols-2', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];

  return (
    <div className={`grid grid-cols-1 gap-x-10 gap-y-[30px] ${columnClass}`}>
      {steps.map((step) => (
        <div key={step.no} className="flex gap-4">
          <span
            aria-hidden
            className="flex-none font-display text-[22px] leading-none text-gold-deep"
          >
            {step.no}
          </span>
          <div>
            <div className="mb-[5px] text-[15px] font-bold text-ink-deep">{step.title}</div>
            <div className="text-[13.5px] leading-[1.55] text-muted-step">{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
