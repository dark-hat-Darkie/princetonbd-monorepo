import { weekdayLabels, weekdays, type DeliveryMode, type Weekday } from '@/lib/cms-enums';
import { formatDayMonth } from '@/lib/dates';

/**
 * Pure helpers over what the API says about a batch — the successors of the
 * functions `content/batches.ts` used to export beside its static rows.
 *
 * Typed structurally rather than against the generated client so the
 * components and their tests do not depend on the SDK's exact DTO names; any
 * object with these fields will do.
 */

export interface BatchPlaceLike {
  mode: DeliveryMode;
  branch: { name: string } | null;
}

export interface BatchScheduleLike extends BatchPlaceLike {
  id: string;
  startsOn: string;
  days: readonly Weekday[];
  startTime: string;
  endTime: string;
}

/** Where a live-online run "is", for every place a campus name would otherwise go. */
export const ONLINE_LABEL = 'Live online';

export function batchPlace(batch: BatchPlaceLike): string {
  return batch.branch?.name ?? ONLINE_LABEL;
}

const dayOrder = new Map<Weekday, number>(weekdays.map((day, index) => [day, index]));

/** Days in working-week order, Saturday first — for controls that list them. */
export function sortDays(days: readonly Weekday[]): Weekday[] {
  return [...days].sort((a, b) => (dayOrder.get(a) ?? 0) - (dayOrder.get(b) ?? 0));
}

/** '18:30' → '6:30 pm' · '10:00' → '10:00 am' · '00:15' → '12:15 am'. */
export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const hour = h ?? 0;
  const minute = m ?? 0;
  const meridiem = hour < 12 ? 'am' : 'pm';
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(twelve)}:${String(minute).padStart(2, '0')} ${meridiem}`;
}

/** "Sat · Mon · Wed" — days as stored (see `formatSchedule` on why not sorted). */
export function formatDayList(days: readonly Weekday[]): string {
  return days.map((day) => weekdayLabels[day].short).join(' · ');
}

/**
 * "6:30–8:30 pm" · "10:00 am–1:00 pm". The meridiem is written once when
 * both ends share it and on each end when they do not.
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  const start = formatClock(startTime);
  const end = formatClock(endTime);
  const [startClock, startMeridiem] = start.split(' ');
  return startMeridiem === end.split(' ')[1] ? `${startClock ?? start}–${end}` : `${start}–${end}`;
}

/**
 * "Sat · Mon · Wed, 6:30–8:30 pm" — the line the batch table shows.
 *
 * Days render in the order they are stored, not re-sorted: the weekend slot
 * has always read "Fri · Sat" while the weekday one reads "Sat · Mon · Wed",
 * and no single ordering produces both. The admin form submits days in
 * working-week order, and the seed kept the hand-written order, so stored
 * order is the intended one.
 */
export function formatSchedule(
  days: readonly Weekday[],
  startTime: string,
  endTime: string,
): string {
  return `${formatDayList(days)}, ${formatTimeRange(startTime, endTime)}`;
}

/** "IELTS · Dhaka — Gulshan · starts 14 Oct" — the line the enquiry form echoes back. */
export function batchLabel(courseName: string, batch: BatchScheduleLike): string {
  return `${courseName} · ${batchPlace(batch)} · starts ${formatDayMonth(batch.startsOn)}`;
}

/**
 * The enquiry-form link for a course, or for one run of it.
 *
 * Built with URLSearchParams so a campus name with an em dash survives the
 * trip; /contact reads the same three keys back and validates each against
 * the API before trusting it.
 */
export function enrolHref({
  interest,
  batch,
}: {
  interest: string;
  batch?: BatchScheduleLike;
}): string {
  const params = new URLSearchParams({ interest });
  if (batch?.branch) params.set('campus', batch.branch.name);
  if (batch) params.set('batch', batch.id);
  return `/contact?${params.toString()}`;
}
