import type { Curriculum } from '@/content/types';
import { CheckList } from '@/components/ui/check-list';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * What the course teaches, module by module.
 *
 * Native `<details>` for the accordion, as in `ui/faq.tsx`: it stays a Server
 * Component, opens without hydration and works with scripting off. The first
 * module starts open so the section never reads as a list of closed doors.
 */
export function CurriculumSection({ name, curriculum }: { name: string; curriculum: Curriculum }) {
  const { totals } = curriculum;
  const summary = [
    { value: String(totals.weeks), label: 'Weeks' },
    { value: String(totals.taughtHours), label: 'Taught hours' },
    { value: String(totals.mocks), label: 'Full-length mocks' },
    { value: totals.classSize, label: 'Class size' },
  ];

  return (
    <Section id="curriculum" tone="subtle" bordered className="scroll-mt-[104px]">
      <SectionHeading
        eyebrow={curriculum.eyebrow}
        title={curriculum.title}
        intro={curriculum.intro}
        className="mb-12"
      />

      <dl className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-md border border-line bg-surface px-5 py-4">
            <dd className="font-display text-[26px] leading-none font-extrabold tracking-[-.02em] text-ink">
              {item.value}
            </dd>
            <dt className="mt-2 text-[11px] font-bold tracking-[.14em] text-muted-2 uppercase">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>

      <ol className="flex flex-col gap-3" aria-label={`${name} curriculum`}>
        {curriculum.modules.map((module, index) => (
          <li key={module.no}>
            <details
              open={index === 0}
              className="group rounded-md border border-line bg-surface shadow-card open:border-line-strong [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 px-6 py-5 marker:content-[''] sm:px-7">
                <span
                  aria-hidden
                  className="mt-0.5 flex size-8 flex-none items-center justify-center rounded-sm bg-accent font-display text-[14px] font-extrabold text-on-accent tabular-nums"
                >
                  {module.no}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[19px] leading-[1.3] font-semibold tracking-[-.01em] text-ink">
                    {module.title}
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-[1.55] text-muted">
                    {module.summary}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="relative mt-2.5 size-3.5 flex-none text-brand-ink before:absolute before:top-1/2 before:left-0 before:h-[1.5px] before:w-full before:-translate-y-1/2 before:bg-current before:content-[''] after:absolute after:top-1/2 after:left-0 after:h-[1.5px] after:w-full after:-translate-y-1/2 after:rotate-90 after:bg-current after:transition-transform after:duration-200 after:content-[''] group-open:after:rotate-0"
                />
              </summary>

              <div className="border-t border-t-line px-6 pt-5 pb-6 sm:px-7 sm:pl-[76px]">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {module.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex gap-3 text-[14.5px] leading-[1.5] text-ink-soft"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] size-1.5 flex-none rounded-full bg-brand"
                      />
                      {topic}
                    </li>
                  ))}
                </ul>

                {module.hours !== undefined || module.outcome ? (
                  <div className="mt-5 flex flex-col gap-2 border-t border-t-line pt-4 text-[13.5px] leading-[1.5] sm:flex-row sm:items-start sm:gap-6">
                    {module.hours !== undefined ? (
                      <span className="flex-none font-semibold text-ink tabular-nums">
                        {String(module.hours)} taught hours
                      </span>
                    ) : null}
                    {module.outcome ? (
                      <span className="text-muted">
                        <span className="font-semibold text-brand-ink">Outcome · </span>
                        {module.outcome}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </details>
          </li>
        ))}
      </ol>

      {curriculum.outcomes?.length ? (
        <div className="mt-10 rounded-lg border border-brand/25 bg-brand-soft px-7 py-8 sm:px-9">
          <h3 className="mb-4 font-display text-[22px] leading-[1.2] font-semibold tracking-[-.02em] text-ink">
            By the end of the course you will
          </h3>
          <CheckList items={curriculum.outcomes} className="sm:grid sm:grid-cols-2 sm:gap-x-8" />
        </div>
      ) : null}
    </Section>
  );
}
