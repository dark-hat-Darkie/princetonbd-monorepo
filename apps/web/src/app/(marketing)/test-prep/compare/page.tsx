import type { Metadata } from 'next';
import type { CourseSummaryDto } from '@repo/api-client';
import Link from 'next/link';

import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { courseFamilies, editorialFor } from '@/content/exams';
import { defaultClosing } from '@/content/shared';
import { breadcrumbFor } from '@/content/site/routes';
import { getCourse, getPublishedCourses } from '@/lib/cms';
import { deliveryModeLabels } from '@/lib/cms-enums';
import { coursePath } from '@/lib/course-view';
import { formatDayMonth } from '@/lib/dates';
import { formatPrice } from '@/lib/money';

export const metadata: Metadata = {
  title: 'Compare every test prep course — length, modes, next batch and fees',
  description:
    'Side by side: every admissions test we prepare students for, what each is used for, how it is scored, how long the course runs, when the next batch starts and what it costs in Bangladeshi taka.',
};

/* Statically built, re-rendered daily so the "next batch" column moves on
   without a deploy; an admin save refreshes it sooner. */
export const revalidate = 86400;

const headings = ['Exam', 'Used for', 'Scored', 'Length', 'Modes', 'Next batch', 'Fee'];

/**
 * The comparison table, built from the CMS records themselves rather than
 * from a hand-written duplicate of them. A fee change in the admin panel
 * shows up here on the next visit; there is no second copy to forget.
 *
 * Courses are grouped by the editorial families; anything published that no
 * family claims goes under "Other courses" rather than disappearing.
 */
export default async function ComparePage() {
  const summaries = await getPublishedCourses();
  const details = await Promise.all(summaries.map((course) => getCourse(course.slug)));
  const cheapestOnlineBySlug = new Map(
    details.flatMap((course) =>
      course
        ? [
            [
              course.slug,
              course.batches
                .map((batch) => batch.feeAmount)
                .filter((fee): fee is number => fee !== null && fee < course.priceAmount)
                .sort((a, b) => a - b)[0],
            ] as const,
          ]
        : [],
    ),
  );

  const bySlug = new Map(summaries.map((course) => [course.slug, course]));
  const claimed = new Set(courseFamilies.flatMap((family) => family.slugs));
  const groups: { title: string; courses: CourseSummaryDto[] }[] = [
    ...courseFamilies.map((family) => ({
      title: family.title,
      courses: family.slugs.flatMap((slug) => bySlug.get(slug) ?? []),
    })),
    { title: 'Other courses', courses: summaries.filter((course) => !claimed.has(course.slug)) },
  ].filter((group) => group.courses.length > 0);

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/test-prep/compare')}
        eyebrow="Compare courses"
        title="Every exam, side by side."
        intro="What each test is actually for, how it is scored, how long our course runs, when the next batch starts and what it costs. Every fee includes materials and mock tests."
        facts={[
          { label: 'Exams', value: String(summaries.length) },
          { label: 'Modes', value: 'Classroom · Live online' },
          { label: 'Diagnostic', value: 'Free, every Saturday' },
          { label: 'Guarantee', value: 'Written, on every course' },
        ]}
      />

      <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
        {groups.length === 0 ? (
          <p className="text-[15px] leading-[1.6] text-muted">
            Course details are being updated. Check back shortly, or book a free diagnostic and we
            will walk you through the options.
          </p>
        ) : null}

        {groups.map((group) => (
          <div key={group.title} className="mb-16 last:mb-0">
            <h2 className="mb-6 font-display text-[26px] font-semibold tracking-[-.02em] text-ink">
              {group.title}
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
                  {group.courses.map((course) => {
                    const editorial = editorialFor(course.slug);
                    const facts = editorial?.hero.facts ?? [];
                    const next = course.nextBatch;
                    const cheapestOnline = cheapestOnlineBySlug.get(course.slug);
                    const length = [
                      course.durationWeeks !== null
                        ? `${String(course.durationWeeks)} weeks`
                        : null,
                      course.taughtHours !== null ? `${String(course.taughtHours)} h` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ');
                    const cell = 'border-b border-b-line px-4 py-4 text-[14px] leading-[1.5]';

                    return (
                      <tr key={course.id} className="align-top last:[&>*]:border-b-0">
                        <th
                          scope="row"
                          className={`${cell} pl-5 font-display text-[18px] font-semibold text-ink`}
                        >
                          <Link
                            href={coursePath(course.slug)}
                            className="transition-colors duration-200 hover:text-brand-ink"
                          >
                            {course.name}
                          </Link>
                        </th>
                        <td className={`${cell} text-muted`}>{editorial?.hero.eyebrow ?? '—'}</td>
                        <td className={`${cell} text-ink-soft`}>
                          {facts.find((fact) => /scor/i.test(fact.label))?.value ?? '—'}
                        </td>
                        <td className={`${cell} text-ink-soft whitespace-nowrap`}>
                          {length || '—'}
                        </td>
                        <td className={`${cell} text-ink-soft`}>
                          {course.modes.map((mode) => deliveryModeLabels[mode]).join(' · ')}
                        </td>
                        <td className={`${cell} text-ink-soft whitespace-nowrap`}>
                          {next ? (
                            <>
                              <time dateTime={next.startsOn} className="font-semibold text-ink">
                                {formatDayMonth(next.startsOn)}
                              </time>
                              <span className="block text-[12.5px] text-muted-2">
                                {next.branch?.name ?? 'Live online'}
                              </span>
                            </>
                          ) : (
                            'Dates soon'
                          )}
                        </td>
                        <td className={`${cell} pr-5 whitespace-nowrap`}>
                          <span className="font-display text-[17px] font-semibold text-ink tabular-nums">
                            {formatPrice({ amount: course.priceAmount, currency: 'BDT' })}
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
