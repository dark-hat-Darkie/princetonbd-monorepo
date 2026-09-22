import type { BatchDto } from '@repo/api-client';

import type { LeadInterest } from '@/lib/actions/lead-shape';
import { ONLINE_LABEL } from '@/lib/batches';
import { toBatchView, type BatchView } from '@/lib/course-view';
import type { Price } from '@/lib/money';

/**
 * The batch-schedule page's model: every upcoming batch across every
 * course, and the two-way filter (campus × course) a visitor narrows it
 * with.
 *
 * Pure and dependency-free so the filtering, counting and "popular
 * searches" ranking are unit-tested, and so the same functions run on the
 * server (to seed the page from the URL) and in the browser (to re-filter
 * on every change without a round trip).
 */

/** The `?branch=` value that means "live online" rather than a campus. */
export const ONLINE_KEY = 'online';

/** What the finder needs to know about a batch's course. */
export interface ScheduleCourse {
  slug: string;
  name: string;
  /** Site-relative course page. */
  path: string;
  /** Seeds the enquiry form's "interested in" field. */
  interest: LeadInterest;
  /** The course price, which applies unless the batch overrides it. */
  price: Price;
}

export interface ScheduleBatch extends BatchView {
  course: ScheduleCourse;
  /** `ONLINE_KEY` for a live-online run, else the branch slug. */
  placeKey: string;
}

export interface ScheduleOption {
  key: string;
  label: string;
}

/** `null` means "any". Values are slugs (or `ONLINE_KEY`), never labels. */
export interface ScheduleSelection {
  branch: string | null;
  course: string | null;
}

export const ANY: ScheduleSelection = { branch: null, course: null };

export function toScheduleBatch(batch: BatchDto, course: ScheduleCourse): ScheduleBatch {
  return {
    ...toBatchView(batch),
    course,
    placeKey: batch.branch?.slug ?? ONLINE_KEY,
  };
}

/**
 * The campus dropdown: every active branch, then "Live online" — the online
 * entry is last because it is the odd one out, not a place.
 */
export function placeOptions(
  branches: readonly { slug: string; name: string }[],
): readonly ScheduleOption[] {
  return [
    ...branches.map((branch) => ({ key: branch.slug, label: branch.name })),
    { key: ONLINE_KEY, label: ONLINE_LABEL },
  ];
}

/**
 * Read a selection out of query params, keeping only values that name a
 * real option. A hand-edited URL therefore widens the search to "any"
 * rather than producing an empty page for a campus that does not exist.
 */
export function parseSelection(
  params: { branch?: string | string[] | undefined; course?: string | string[] | undefined },
  options: { places: readonly ScheduleOption[]; courses: readonly ScheduleOption[] },
): ScheduleSelection {
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
  const branch = first(params.branch);
  const course = first(params.course);

  return {
    branch: branch && options.places.some((place) => place.key === branch) ? branch : null,
    course: course && options.courses.some((entry) => entry.key === course) ? course : null,
  };
}

export function matches(batch: ScheduleBatch, selection: ScheduleSelection): boolean {
  return (
    (selection.branch === null || batch.placeKey === selection.branch) &&
    (selection.course === null || batch.course.slug === selection.course)
  );
}

/** Batches in their stored order (soonest first) that fit the selection. */
export function filterBatches(
  batches: readonly ScheduleBatch[],
  selection: ScheduleSelection,
): ScheduleBatch[] {
  return batches.filter((batch) => matches(batch, selection));
}

/** The query string the finder writes, and that popular searches link to. */
export function scheduleHref(selection: ScheduleSelection): string {
  const params = new URLSearchParams();
  if (selection.branch) params.set('branch', selection.branch);
  if (selection.course) params.set('course', selection.course);
  const query = params.toString();
  return query ? `/batch-schedule?${query}` : '/batch-schedule';
}

export interface PopularSearch {
  selection: ScheduleSelection;
  course: ScheduleCourse;
  placeKey: string;
  /** The branch name, or the live-online label. */
  place: string;
  count: number;
}

/**
 * The (course, place) pairs with the most upcoming batches — what the
 * "popular searches" rail shows. Ranked by how many batches are running,
 * which is the best signal the site has for demand without tracking
 * anyone; ties break towards the pair whose next batch starts sooner,
 * which the stored order already encodes.
 */
export function popularSearches(batches: readonly ScheduleBatch[], limit = 5): PopularSearch[] {
  const groups = new Map<string, PopularSearch>();

  for (const batch of batches) {
    const key = `${batch.course.slug} ${batch.placeKey}`;
    const existing = groups.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      groups.set(key, {
        selection: { branch: batch.placeKey, course: batch.course.slug },
        course: batch.course,
        placeKey: batch.placeKey,
        place: batch.place,
        count: 1,
      });
    }
  }

  /* Map preserves insertion order, and batches arrive soonest-first, so a
     stable sort by count alone leaves ties in "next starts sooner" order. */
  return [...groups.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}
