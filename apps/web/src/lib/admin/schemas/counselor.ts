import { z } from 'zod';

import { nullableText } from './shared';

/**
 * The per-student counselor assignment.
 *
 * Every box is optional: filled boxes patch their own column, and clearing
 * the name clears the whole assignment on the server. The check-in arrives
 * from a `datetime-local` box as Dhaka wall time (`YYYY-MM-DDTHH:MM`) and
 * leaves here as an ISO string with the offset attached, so the API stores
 * the moment the admin meant rather than one shifted by timezones.
 */
export const counselorSchema = z.object({
  name: nullableText(120),
  role: nullableText(120),
  email: z
    .string()
    .max(254)
    .transform((v) => v || null)
    .pipe(z.email('Must be a valid email').nullable()),
  phone: nullableText(40),
  nextCheckIn: z
    .string()
    .max(32)
    .transform((v) => (v ? `${v}:00+06:00` : null))
    .pipe(z.string().nullable()),
});

export type CounselorInput = z.infer<typeof counselorSchema>;

export const counselorFormOptions = {} as const;

/** Stored ISO check-in → the `datetime-local` value an admin edits. */
export function checkInToInput(value: string | null | undefined): string {
  if (!value) {
    return '';
  }
  const at = new Date(value);
  if (Number.isNaN(at.getTime())) {
    return '';
  }
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(at);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
}
