const dhakaDay = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Dhaka',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * Today's calendar date in Dhaka as 'YYYY-MM-DD'.
 *
 * Batch dates are Dhaka days, and "has this batch ended" must be decided on
 * the same calendar — a server in UTC would otherwise drop a batch six hours
 * early. `en-CA` is the locale whose default numeric format is ISO order.
 */
export function dhakaToday(now: Date = new Date()): string {
  return dhakaDay.format(now);
}

/** Every value must be 'YYYY-MM-DD'. */
export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
/** 24-hour wall-clock time, 'HH:MM'. */
export const HHMM_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
