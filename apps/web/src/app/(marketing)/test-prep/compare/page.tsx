import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { batchPlace, batchesFor } from '@/content/batches';
import { allExams, examFamilies } from '@/content/exams';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing } from '@/content/shared';
import { formatDayMonth } from '@/lib/dates';
import { formatPrice } from '@/lib/money';

export const metadata: Metadata = {
  title: 'Compare every test prep course — length, modes, next batch and fees',
  description:
    'Side by side: all twelve admissions tests we prepare students for, what each is used for, how it is scored, how long the course runs, when the next batch starts and what it costs in Bangladeshi taka.',
};

/* Statically built, re-rendered daily so the "next batch" column moves on
   without a deploy. */
export const revalidate = 86400;

const modeLabel = { Classroom: 'Classroom', LiveOnline: 'Live online' } as const;

const headings = ['Exam', 'Used for', 'Scored', 'Length', 'Modes', 'Next batch', 'Fee'];

/**
 * The comparison table, built from the exam and batch records themselves
 * rather than from a hand-written duplicate of them. A fee change on one exam
 * page shows up here on the next build; there is no second copy to forget.
 */
export default function ComparePage() {
  const now = new Date();

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/test-prep/compare')}
        eyebrow="Compare courses"
        title="Twelve exams, side by side."
        intro="What each test is actually for, how it is scored, how long our course runs, when the next batch starts and what it costs. Every fee includes materials and mock tests."
        facts={[
          { label: 'Exams', value: String(allExams.length) },
          { label: 'Modes', value: 'Classroom · Live online' },
          { label: 'Diagnostic', value: 'Free, every Saturday' },
          { label: 'Guarantee', value: 'Written, on every course' },
        ]}
      />

      <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
        {examFamilies.map((family) => (
          <div key={family.title} className="mb-16 last:mb-0">
            <h2 className="mb-6 font-display text-[26px] font-semibold tracking-[-.02em] text-ink">
              {family.title}
            </h2>

            {/* Wide table scrolls inside its own box — the page body never
                scrolls sideways. */}
            <div className="overflow-x-auto rounded-lg border border-line bg-surface">
              <table className="w-full min-w-[860px] border-collapse text-left">
                <thead>
                  <tr className="bg-subtle">
                    {headings.map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="border-b border-b-line-strong px-4 py-3.5 text-[10.5px] font-bold tracking-[.14em] text-muted-2 uppercase first:pl-5 last:pr-5"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {family.exams.map((exam) => {
                    const facts = exam.hero.facts ?? [];
                    const upcoming = batchesFor(exam.slug, now);
                    const next = upcoming[0];
                    const cheapestOnline = upcoming
                      .filter((batch) => batch.fee && batch.fee.amount < exam.fee.price.amount)
                      .map((batch) => batch.fee?.amount ?? exam.fee.price.amount)
                      .sort((a, b) => a - b)[0];
                    const cell = 'border-b border-b-line px-4 py-4 text-[14px] leading-[1.5]';

                    return (
                      <tr key={exam.path} className="align-top last:[&>*]:border-b-0">
                        <th
                          scope="row"
                          className={`${cell} pl-5 font-display text-[18px] font-semibold text-ink`}
                        >
                          <Link
                            href={exam.path}
                            className="transition-colors duration-200 hover:text-brand-ink"
                          >
                            {exam.name}
                          </Link>
                        </th>
                        <td className={`${cell} text-muted`}>{exam.hero.eyebrow}</td>
                        <td className={`${cell} text-ink-soft`}>
                          {facts.find((fact) => /scor/i.test(fact.label))?.value ?? '—'}
                        </td>
                        <td className={`${cell} text-ink-soft whitespace-nowrap`}>
                          {String(exam.curriculum.totals.weeks)} weeks ·{' '}
                          {String(exam.curriculum.totals.taughtHours)} h
                        </td>
                        <td className={`${cell} text-ink-soft`}>
                          {exam.modes.map((mode) => modeLabel[mode]).join(' · ')}
                        </td>
                        <td className={`${cell} text-ink-soft whitespace-nowrap`}>
                          {next ? (
                            <>
                              <time dateTime={next.startsOn} className="font-semibold text-ink">
                                {formatDayMonth(next.startsOn)}
                              </time>
                              <span className="block text-[12.5px] text-muted-2">
                                {batchPlace(next)}
                              </span>
                            </>
                          ) : (
                            'Dates soon'
                          )}
                        </td>
                        <td className={`${cell} pr-5 whitespace-nowrap`}>
                          <span className="font-display text-[17px] font-semibold text-ink tabular-nums">
                            {formatPrice(exam.fee.price)}
                          </span>
                          {cheapestOnline !== undefined ? (
                            <span className="block text-[12.5px] text-muted-2">
                              from {formatPrice({ amount: cheapestOnline, currency: 'BDT' })} online
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <p className="mt-10 max-w-[680px] text-[14.5px] leading-[1.6] text-muted">
          Not sure which column you belong in? Sit a free diagnostic for two of them &mdash; we run
          them every Saturday &mdash; and choose on the strength of your actual scores rather than a
          guess.
        </p>
      </Container>

      <CtaSection
        eyebrow={defaultClosing.eyebrow}
        title={defaultClosing.title}
        body={defaultClosing.body}
        action={defaultClosing.action}
      />
    </>
  );
}
