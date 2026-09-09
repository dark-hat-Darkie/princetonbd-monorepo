import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/ui/container';
import { CtaButton } from '@/components/ui/cta-button';
import { PageHero } from '@/components/ui/page-hero';
import { Pill } from '@/components/ui/pill';
import { breadcrumbFor } from '@/content/site/routes';
import { defaultClosing } from '@/content/shared';
import {
  acceptedTests,
  countries,
  levels,
  tuitionBands,
  universities,
  type University,
} from '@/content/universities';

export const metadata: Metadata = {
  title: 'University finder — shortlist by country, level, intake and budget',
  description:
    'Filter universities in the US, UK, Canada, Australia and Europe by degree level, intake, indicative tuition band and which English or admissions test they accept.',
};

/**
 * The shortlisting tool.
 *
 * Filters are a plain `<form method="get">` and the results are computed on the
 * server. That is a deliberate choice over a client-side filter widget: there
 * is no JavaScript to ship, every filtered view has its own URL a student can
 * bookmark or send to a parent, and the page works with scripting disabled.
 * The cost is a round trip per change, which for a list this size is cheaper
 * than the bundle would have been.
 *
 * Reading `searchParams` opts this route into dynamic rendering — the only
 * marketing page that is not statically prerendered, and correctly so.
 */
export default async function UniversityFinderPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const selected = {
    country: single(params.country),
    level: single(params.level),
    tuition: single(params.tuition),
    test: single(params.test),
  };

  const results = universities.filter((university) => matches(university, selected));
  const filtered = Object.values(selected).some(Boolean);

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/study-abroad/university-finder')}
        eyebrow="University finder"
        title="Build a shortlist you can actually afford."
        intro="Filter by where you want to go, what you want to study and what you can spend. Every entry names the tests that university accepts, so you know which exam to prepare for."
      />

      <Container as="section" className="py-16 lg:py-20">
        <form
          method="get"
          className="mb-12 rounded-lg border border-line border-t-[3px] border-t-brand bg-subtle px-6 py-7 sm:px-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Select name="country" label="Country" options={countries} value={selected.country} />
            <Select name="level" label="Level" options={levels} value={selected.level} />
            <Select
              name="tuition"
              label="Indicative tuition"
              options={tuitionBands}
              value={selected.tuition}
            />
            <Select name="test" label="Accepts" options={acceptedTests} value={selected.test} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-on-ink shadow-cta transition-colors duration-200 hover:bg-ink-soft"
            >
              Show matches
            </button>
            {filtered ? (
              <Link
                href="/study-abroad/university-finder"
                className="text-[13px] font-bold tracking-[.08em] text-ink-soft uppercase transition-colors duration-200 hover:text-brand-ink"
              >
                Clear filters
              </Link>
            ) : null}
            <span aria-live="polite" className="text-[14px] text-muted">
              {results.length} of {universities.length} shown
            </span>
          </div>
        </form>

        {results.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line-strong bg-subtle px-8 py-14 text-center">
            <h2 className="mb-3 font-display text-[26px] font-semibold tracking-[-.02em] text-ink">
              Nothing matches all four filters.
            </h2>
            <p className="mx-auto mb-7 max-w-[460px] text-[15.5px] leading-[1.6] text-muted">
              Try relaxing one — usually the tuition band. Or talk to a counselor: our list is a
              starting point, not the whole world.
            </p>
            <CtaButton href="/contact" variant="outline">
              Ask a counselor
            </CtaButton>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {results.map((university) => (
              <li
                key={university.name}
                className="flex flex-col rounded-md border border-line bg-surface p-7 shadow-card"
              >
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <span className="text-[10.5px] font-bold tracking-[.14em] text-brand-ink uppercase">
                    {university.country} &middot; {university.city}
                  </span>
                  <span className="font-display text-[14px] font-semibold whitespace-nowrap text-muted-2 tabular-nums">
                    {university.tuition}
                  </span>
                </div>

                <h2 className="mb-3 font-display text-[23px] leading-[1.15] font-semibold tracking-[-.02em] text-ink">
                  {university.name}
                </h2>
                <p className="mb-5 flex-1 text-[14.5px] leading-[1.6] text-muted">
                  {university.note}
                </p>

                <dl className="flex flex-wrap gap-x-6 gap-y-2 border-t border-t-line pt-4 text-[12.5px] text-muted-2">
                  <div>
                    <dt className="sr-only">Levels</dt>
                    <dd>{university.levels.join(' · ')}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Intakes</dt>
                    <dd>{university.intakes.join(' · ')}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  {university.tests.map((test) => (
                    <Pill key={test}>{test}</Pill>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 max-w-[720px] rounded-sm border-l-[3px] border-l-brand bg-subtle px-6 py-5 text-[14.5px] leading-[1.65] text-ink-soft">
          <strong className="font-bold">These figures are indicative.</strong> Tuition bands,
          intakes and accepted tests change every cycle. Confirm against the university&rsquo;s own
          admissions pages before you build an application around them &mdash; or let a counselor do
          it with you.
        </p>
      </Container>

      <CtaSection
        eyebrow="Shortlist"
        title="A counselor turns a long list into a real plan."
        body={defaultClosing.body}
        action={defaultClosing.action}
      />
    </>
  );
}

/** Query strings can repeat a key; the filters are single-valued. */
function single(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

function matches(
  university: University,
  selected: { country: string; level: string; tuition: string; test: string },
): boolean {
  if (selected.country && university.country !== selected.country) return false;
  if (selected.level && !university.levels.some((level) => level === selected.level)) return false;
  if (selected.tuition && university.tuition !== selected.tuition) return false;
  if (selected.test && !university.tests.includes(selected.test)) return false;
  return true;
}

function Select({
  name,
  label,
  options,
  value,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
}) {
  return (
    <label
      htmlFor={`finder-${name}`}
      className="flex flex-col gap-2 text-[11px] font-bold tracking-[.12em] text-ink-soft uppercase"
    >
      {label}
      <select
        id={`finder-${name}`}
        name={name}
        defaultValue={value}
        className="w-full rounded-sm border bg-canvas px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand border-line-strong"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
