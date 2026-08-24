import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { allExams, examFamilies, startingPrice } from '@/content/exams';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing } from '@/content/shared';
import { formatPrice } from '@/lib/money';

export const metadata: Metadata = {
  title: 'Compare every test prep course — formats, prices and what each exam is for',
  description:
    'Side by side: all twelve admissions tests we prepare students for, what each is used for, how it is scored, and what our courses cost in Bangladeshi taka.',
};

/**
 * The comparison table, built from the exam records themselves rather than
 * from a hand-written duplicate of them. A price change on one exam page shows
 * up here on the next build; there is no second copy to forget.
 */
export default function ComparePage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/test-prep/compare')}
        eyebrow="Compare courses"
        title="Twelve exams, side by side."
        intro="What each test is actually for, how it is scored, and what preparing for it costs here. Prices shown are the lowest format on each course page."
        facts={[
          { label: 'Exams', value: String(allExams.length) },
          { label: 'Formats', value: 'Self-paced · LiveOnline · Classroom · 1-on-1' },
          { label: 'Diagnostic', value: 'Free, every Saturday' },
          { label: 'Guarantee', value: 'Written, on every course' },
        ]}
      />

      <Container as="section" className="py-20 lg:py-24">
        {examFamilies.map((family) => (
          <div key={family.title} className="mb-16 last:mb-0">
            <h2 className="mb-6 font-display text-[26px] font-normal text-ink-deep">
              {family.title}
            </h2>

            {/* Wide table scrolls inside its own box — the page body never
                scrolls sideways. */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr>
                    {['Exam', 'Used for', 'Format', 'Scored', 'Formats we run', 'From'].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="border-b border-b-gold px-4 py-3 text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {family.exams.map((exam) => {
                    const facts = exam.hero.facts ?? [];

                    return (
                      <tr key={exam.path} className="align-top">
                        <th
                          scope="row"
                          className="border-b border-b-[rgba(27,36,54,.09)] px-4 py-4 font-display text-[19px] font-normal text-ink-deep"
                        >
                          <Link
                            href={exam.path}
                            className="transition-colors duration-200 hover:text-gold-deep"
                          >
                            {exam.name}
                          </Link>
                        </th>
                        <td className="border-b border-b-[rgba(27,36,54,.09)] px-4 py-4 text-[14px] leading-[1.5] text-muted">
                          {exam.hero.eyebrow}
                        </td>
                        <td className="border-b border-b-[rgba(27,36,54,.09)] px-4 py-4 text-[14px] leading-[1.5] text-ink-soft">
                          {facts[0]?.value ?? '—'}
                        </td>
                        <td className="border-b border-b-[rgba(27,36,54,.09)] px-4 py-4 text-[14px] leading-[1.5] text-ink-soft">
                          {facts.find((fact) => /scor/i.test(fact.label))?.value ?? '—'}
                        </td>
                        <td className="border-b border-b-[rgba(27,36,54,.09)] px-4 py-4 text-[14px] leading-[1.5] text-ink-soft">
                          {exam.formats.map((format) => format.name).join(' · ')}
                        </td>
                        <td className="border-b border-b-[rgba(27,36,54,.09)] px-4 py-4 font-display text-[17px] whitespace-nowrap text-gold-deep">
                          {formatPrice({ amount: startingPrice(exam), currency: 'BDT' })}
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
