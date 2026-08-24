import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/ui/container';
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
          className="mb-12 border border-[rgba(27,36,54,.1)] border-t-[3px] border-t-gold bg-cream px-6 py-7 sm:px-8"
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
              className="inline-flex cursor-pointer items-center justify-center rounded-[2px] bg-ink px-7 py-3.5 text-[14px] font-semibold text-on-ink transition-colors duration-200 hover:bg-ink-hover"
            >
              Show matches
            </button>
            {filtered ? (
              <Link
                href="/study-abroad/university-finder"
                className="text-[13px] font-bold tracking-[.08em] text-ink-nav uppercase transition-colors duration-200 hover:text-gold-deep"
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
          <div className="border border-[rgba(27,36,54,.1)] bg-surface px-8 py-14 text-center">
            <h2 className="mb-3 font-display text-[26px] font-normal text-ink-deep">
              Nothing matches all four filters.
            </h2>
            <p className="mx-auto mb-7 max-w-[460px] text-[15.5px] leading-[1.6] text-muted">
              Try relaxing one — usually the tuition band. Or talk to a counselor: our list is a
              starting point, not the whole world.
            </p>
            <Link
              href="/contact"
              className="text-[13px] font-bold tracking-[.08em] text-ink uppercase underline decoration-gold underline-offset-4"
            >
              Ask a counselor
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)] md:grid-cols-2">
            {results.map((university) => (
              <li key={university.name} className="flex flex-col bg-surface px-7 py-7">
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <span className="text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase">
                    {university.country} &middot; {university.city}
                  </span>
                  <span className="font-display text-[14px] whitespace-nowrap text-warm">
                    {university.tuition}
                  </span>
                </div>

                <h2 className="mb-3 font-display text-[23px] font-normal text-ink-deep">
                  {university.name}
                </h2>
                <p className="mb-5 flex-1 text-[14.5px] leading-[1.6] text-muted">
                  {university.note}
                </p>

                <dl className="flex flex-wrap gap-x-6 gap-y-2 border-t border-t-[rgba(27,36,54,.09)] pt-4 text-[12.5px] text-warm">
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

        <p className="mt-10 max-w-[720px] border-l-[3px] border-l-gold bg-cream px-6 py-5 text-[14.5px] leading-[1.65] text-ink-soft">
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
      className="flex flex-col gap-2 text-[11px] font-bold tracking-[.12em] text-ink-nav uppercase"
    >
      {label}
      <select
        id={`finder-${name}`}
        name={name}
        defaultValue={value}
        className="w-full rounded-[2px] border border-[rgba(27,36,54,.18)] bg-canvas px-4 py-3 text-[15px] text-ink outline-none focus:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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
