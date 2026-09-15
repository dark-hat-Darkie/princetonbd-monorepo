'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowRight, Flame, History, MapPin, RotateCw } from 'lucide-react';
import Link from 'next/link';

import { BatchStatusBadge } from '@/components/ui/batch-status-badge';
import { CtaButton } from '@/components/ui/cta-button';
import { Button } from '@/components/ui/form/button';
import { Field } from '@/components/ui/form/field';
import { Select } from '@/components/ui/form/select';
import { ModeChip } from '@/components/ui/mode-chip';
import { enrolHref, formatDayList, formatTimeRange } from '@/lib/batches';
import { cn } from '@/lib/cn';
import { formatFullDate } from '@/lib/dates';
import { formatPrice } from '@/lib/money';
import {
  forgetSearches,
  getRecentSearches,
  getRecentSearchesServerSnapshot,
  rememberSearch,
  sameSelection,
  subscribeRecentSearches,
} from '@/lib/recent-searches';
import {
  ANY,
  ONLINE_KEY,
  filterBatches,
  scheduleHref,
  type PopularSearch,
  type ScheduleBatch,
  type ScheduleOption,
  type ScheduleSelection,
} from '@/lib/schedule';

/**
 * The batch-schedule finder: campus and course selectors, the batches that
 * fit, and a rail of popular and recent searches.
 *
 * Every upcoming batch arrives as a prop and the filtering happens here, so
 * changing a selector re-renders the list instantly rather than round-
 * tripping to the server. The selection is mirrored into the URL with
 * `history.replaceState` (which Next's router listens to) so a result is
 * shareable, and the selectors sit in a real GET form so the page works
 * before hydration and without JavaScript — the server reads the same two
 * query keys and renders the same list.
 *
 * Recent searches live in the visitor's own browser and are read through an
 * external store, never a setState-in-effect; see `lib/recent-searches.ts`.
 */

interface BatchFinderProps {
  batches: readonly ScheduleBatch[];
  places: readonly ScheduleOption[];
  courses: readonly ScheduleOption[];
  popular: readonly PopularSearch[];
  /** Parsed from the URL on the server, so the first paint already matches it. */
  initial: ScheduleSelection;
}

/* A selector change is remembered after a pause: someone choosing a campus
   and then a course should end up with one recent search, not two. */
const REMEMBER_DELAY = 1500;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function whereLabel(
  selection: ScheduleSelection,
  places: readonly ScheduleOption[],
): string | null {
  if (selection.branch === null) return null;
  if (selection.branch === ONLINE_KEY) return 'live online';
  const place = places.find((entry) => entry.key === selection.branch);
  return place ? `at ${place.label}` : null;
}

export function BatchFinder({ batches, places, courses, popular, initial }: BatchFinderProps) {
  const [selection, setSelection] = useState<ScheduleSelection>(initial);
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const rememberTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recent = useSyncExternalStore(
    subscribeRecentSearches,
    getRecentSearches,
    getRecentSearchesServerSnapshot,
  );

  useEffect(
    () => () => {
      if (rememberTimer.current) clearTimeout(rememberTimer.current);
    },
    [],
  );

  const apply = useCallback((next: ScheduleSelection, { settled }: { settled: boolean }) => {
    setSelection(next);
    window.history.replaceState(null, '', scheduleHref(next));

    if (rememberTimer.current) clearTimeout(rememberTimer.current);
    if (settled) {
      rememberSearch(next);
    } else {
      rememberTimer.current = setTimeout(() => {
        rememberSearch(next);
      }, REMEMBER_DELAY);
    }
  }, []);

  /* From the rail — which sits below the list on a phone — the results are
     off-screen, so a pick brings them back into view and hands them focus. */
  const showResults = () => {
    const heading = resultsRef.current;
    if (!heading) return;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const results = filterBatches(batches, selection);
  const filtered = selection.branch !== null || selection.course !== null;
  const courseLabel = courses.find((entry) => entry.key === selection.course)?.label ?? null;
  const where = whereLabel(selection, places);
  const selectedInterest =
    batches.find((batch) => batch.course.slug === selection.course)?.course.interest ??
    'Something else';

  const summary = [
    `${String(results.length)}${courseLabel ? ` ${courseLabel}` : ''}`,
    results.length === 1 ? 'batch' : 'batches',
    where,
    results.length === 0 ? 'yet' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const countFor = (next: ScheduleSelection) => filterBatches(batches, next).length;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
      <div>
        <form
          method="get"
          action="/batch-schedule"
          aria-label="Find a batch"
          onSubmit={(event) => {
            event.preventDefault();
            apply(selection, { settled: true });
            showResults();
          }}
          className="rounded-lg border border-line bg-surface p-5 shadow-card sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <Field id="branch" label="Campus">
              <Select
                id="branch"
                name="branch"
                value={selection.branch ?? ''}
                onChange={(event) => {
                  apply({ ...selection, branch: event.target.value || null }, { settled: false });
                }}
              >
                <option value="">Any campus</option>
                {places.map((place) => (
                  <option key={place.key} value={place.key}>
                    {place.label} ({String(countFor({ ...selection, branch: place.key }))})
                  </option>
                ))}
              </Select>
            </Field>

            <Field id="course" label="Course">
              <Select
                id="course"
                name="course"
                value={selection.course ?? ''}
                onChange={(event) => {
                  apply({ ...selection, course: event.target.value || null }, { settled: false });
                }}
              >
                <option value="">Any course</option>
                {courses.map((course) => (
                  <option key={course.key} value={course.key}>
                    {course.label} ({String(countFor({ ...selection, course: course.key }))})
                  </option>
                ))}
              </Select>
            </Field>

            {/* Lifted by the Field's empty error slot on the other two columns. */}
            <Button type="submit" size="md" className="sm:mb-2">
              Show batches
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </div>
        </form>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2
              ref={resultsRef}
              tabIndex={-1}
              className="scroll-mt-[112px] font-display text-[26px] font-semibold tracking-[-.025em] text-ink outline-none"
            >
              Available batches
            </h2>
            <p role="status" aria-live="polite" className="mt-1 text-[14.5px] text-muted">
              {summary}
            </p>
          </div>
          {filtered ? (
            <button
              type="button"
              onClick={() => {
                apply(ANY, { settled: false });
              }}
              className="cursor-pointer rounded-sm text-[11px] font-bold tracking-[.11em] text-ink-soft uppercase transition-colors duration-200 hover:text-brand-ink"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {results.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-line-strong bg-subtle px-6 py-12 text-center">
            <p className="font-display text-[22px] font-semibold text-ink">
              {batches.length === 0
                ? 'No dates published yet.'
                : `Nothing scheduled ${where ?? 'here'} for ${courseLabel ?? 'that'} yet.`}
            </p>
            <p className="mx-auto mt-2 max-w-[440px] text-[15px] leading-[1.6] text-muted">
              Register your interest and an enrolment advisor will call you before the next dates go
              public.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <CtaButton href={enrolHref({ interest: selectedInterest })}>
                Register interest
              </CtaButton>
              {filtered ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    apply(ANY, { settled: false });
                  }}
                >
                  Show every batch
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <ol className="mt-6 flex flex-col gap-4">
            {results.map((batch, index) => {
              const fee = batch.fee ?? batch.course.price;
              const overridden =
                batch.fee !== null && batch.fee.amount !== batch.course.price.amount;
              const waitlist = batch.status === 'waitlist';

              return (
                <li
                  key={batch.id}
                  className="rounded-md border border-line bg-surface p-5 shadow-card sm:p-6"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-[56px_minmax(0,1fr)] lg:grid-cols-[56px_minmax(0,1fr)_auto]">
                    <span
                      aria-hidden
                      className="font-display text-[40px] leading-none font-extrabold tracking-[-.04em] text-line-strong tabular-nums"
                    >
                      {pad(index + 1)}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <Link
                          href={batch.course.path}
                          className="rounded-sm font-display text-[21px] leading-[1.2] font-semibold tracking-[-.02em] text-ink transition-colors duration-200 hover:text-brand-ink"
                        >
                          {batch.course.name}
                        </Link>
                        <ModeChip mode={batch.mode} />
                        <BatchStatusBadge batch={batch} />
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 text-[13.5px] text-muted">
                        <MapPin aria-hidden className="size-3.5 flex-none text-brand" />
                        <span>
                          {batch.place}
                          {batch.teacherName ? ` · with ${batch.teacherName}` : null}
                        </span>
                      </p>

                      <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 text-[14.5px] leading-[1.4] sm:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
                        <dt className="text-muted-2">Starts</dt>
                        <dd className="font-semibold text-ink">
                          <time dateTime={batch.startsOn}>{formatFullDate(batch.startsOn)}</time>
                        </dd>
                        <dt className="text-muted-2">Class time</dt>
                        <dd className="text-ink-soft">
                          {formatTimeRange(batch.startTime, batch.endTime)}
                        </dd>
                        <dt className="text-muted-2">Class days</dt>
                        <dd className="text-ink-soft">{formatDayList(batch.days)}</dd>
                        <dt className="text-muted-2">Ends</dt>
                        <dd className="text-ink-soft">
                          <time dateTime={batch.endsOn}>{formatFullDate(batch.endsOn)}</time>
                        </dd>
                      </dl>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-t-line pt-4 sm:col-start-2 lg:col-start-3 lg:flex-col lg:items-end lg:justify-start lg:border-t-0 lg:pt-0 lg:text-right">
                      <div>
                        <span className="font-display text-[19px] font-semibold text-ink tabular-nums">
                          {formatPrice(fee)}
                        </span>
                        <span className="block text-[12px] text-muted-2">
                          {overridden
                            ? batch.mode === 'live_online'
                              ? 'online rate'
                              : 'this batch'
                            : 'per course'}
                        </span>
                      </div>
                      <CtaButton
                        href={enrolHref({ interest: batch.course.interest, batch })}
                        size="sm"
                        variant={waitlist ? 'outline' : 'solid'}
                        arrow
                      >
                        {waitlist ? 'Join waitlist' : 'Enrol'}
                      </CtaButton>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <aside className="flex flex-col gap-12">
        {popular.length > 0 ? (
          <section aria-labelledby="popular-searches">
            <h2
              id="popular-searches"
              className="mb-4 flex items-center gap-2.5 font-display text-[21px] font-semibold tracking-[-.02em] text-ink"
            >
              <Flame aria-hidden className="size-[19px] text-brand" />
              Popular searches
            </h2>
            <ul className="flex flex-col gap-3">
              {popular.map((entry) => {
                const active = sameSelection(entry.selection, selection);

                return (
                  <li key={`${entry.course.slug} ${entry.placeKey}`}>
                    <Link
                      href={scheduleHref(entry.selection)}
                      aria-current={active ? 'true' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        apply(entry.selection, { settled: true });
                        showResults();
                      }}
                      className={cn(
                        'flex items-center justify-between gap-4 rounded-md border bg-surface px-5 py-4 shadow-card transition-colors duration-200 hover:border-brand',
                        active ? 'border-brand bg-brand-soft/40' : 'border-line',
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-display text-[16.5px] font-semibold tracking-[-.01em] text-ink">
                          {entry.course.name}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
                          <MapPin aria-hidden className="size-3.5 flex-none text-brand" />
                          {entry.place}
                        </span>
                      </span>
                      <span className="flex-none text-right">
                        <span className="block font-display text-[26px] leading-none font-extrabold tracking-[-.03em] text-brand-ink tabular-nums">
                          {pad(entry.count)}
                        </span>
                        <span className="mt-1.5 block text-[10px] font-bold tracking-[.12em] text-muted-2 uppercase">
                          {entry.count === 1 ? 'batch' : 'batches'}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {recent.length > 0 ? (
          <section aria-labelledby="recent-searches">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2
                id="recent-searches"
                className="flex items-center gap-2.5 font-display text-[21px] font-semibold tracking-[-.02em] text-ink"
              >
                <History aria-hidden className="size-[19px] text-brand" />
                Recently searched
              </h2>
              <button
                type="button"
                onClick={forgetSearches}
                className="cursor-pointer rounded-sm text-[11px] font-bold tracking-[.11em] text-muted-2 uppercase transition-colors duration-200 hover:text-brand-ink"
              >
                Clear
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {recent.map((entry) => {
                const course = entry.course
                  ? courses.find((option) => option.key === entry.course)
                  : { key: '', label: 'Any course' };
                const place = entry.branch
                  ? places.find((option) => option.key === entry.branch)
                  : { key: '', label: 'Any campus' };
                /* A slug that no longer resolves — a course since unpublished,
                   a campus closed — is skipped rather than shown as a blank. */
                if (!course || !place) return null;

                return (
                  <li key={`${entry.course ?? ''} ${entry.branch ?? ''}`}>
                    <Link
                      href={scheduleHref(entry)}
                      onClick={(event) => {
                        event.preventDefault();
                        apply(entry, { settled: true });
                        showResults();
                      }}
                      className="group grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-line bg-surface px-5 py-3.5 shadow-card transition-colors duration-200 hover:border-brand"
                    >
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold tracking-[.12em] text-muted-2 uppercase">
                          Course
                        </span>
                        <span className="mt-0.5 block truncate text-[15px] font-semibold text-ink">
                          {course.label}
                        </span>
                      </span>
                      <span className="min-w-0 border-l border-l-line pl-4">
                        <span className="block text-[10px] font-bold tracking-[.12em] text-muted-2 uppercase">
                          Campus
                        </span>
                        <span className="mt-0.5 block truncate text-[15px] font-semibold text-ink">
                          {place.label}
                        </span>
                      </span>
                      <RotateCw
                        aria-hidden
                        className="size-4 flex-none text-brand-ink transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </aside>
    </div>
  );
}
