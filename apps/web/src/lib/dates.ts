/**
 * Date formatting for the portal.
 *
 * Every timestamp in the student record is written with an explicit +06:00
 * offset, and every formatter below pins `Asia/Dhaka`. Without that, a class at
 * 6pm in Dhaka renders as noon for a server in UTC — and the server and the
 * browser would disagree, which React reports as a hydration mismatch.
 */

const TIME_ZONE = 'Asia/Dhaka';

/* Formatters are built once: constructing an Intl formatter is the expensive
   part, and a schedule page builds one per row otherwise. */
const dayMonth = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: TIME_ZONE,
});

const fullDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: TIME_ZONE,
});

const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long', timeZone: TIME_ZONE });

const clock = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: TIME_ZONE,
});

export function formatDayMonth(iso: string): string {
  return dayMonth.format(new Date(iso));
}

export function formatFullDate(iso: string): string {
  return fullDate.format(new Date(iso));
}

export function formatWeekday(iso: string): string {
  return weekday.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return clock.format(new Date(iso));
}

/* en-CA formats as YYYY-MM-DD, which is what makes the calendar day cheap to
   read back out of a zoned timestamp. */
const dhakaDay = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: TIME_ZONE,
});

/** The date's calendar day in Dhaka, as a day number. */
function dhakaDayNumber(date: Date): number {
  const [year, month, day] = dhakaDay.format(date).split('-').map(Number);
  return Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1) / 86_400_000;
}

/**
 * Whole days from `from` to `iso`, negative once past.
 *
 * Counted in Dhaka calendar days, not UTC ones. Flooring to UTC midnight looks
 * equivalent and is not: a class at 1am Dhaka is still the previous day in UTC,
 * so "tomorrow" would render as "today" for every early-morning entry.
 */
export function daysUntil(iso: string, from: Date = new Date()): number {
  return dhakaDayNumber(new Date(iso)) - dhakaDayNumber(from);
}

/** "in 3 days" / "tomorrow" / "today" / "5 days ago". */
export function relativeDay(iso: string, from: Date = new Date()): string {
  const days = daysUntil(iso, from);

  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  return days > 0 ? `in ${String(days)} days` : `${String(Math.abs(days))} days ago`;
}
