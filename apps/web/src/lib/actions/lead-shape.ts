/**
 * The enquiry form's shape and validation rules.
 *
 * Deliberately NOT in `lead.ts`. A `'use server'` module may only export async
 * functions — every other export is rewritten into a server reference, so a
 * client component importing `leadInterests` from there receives a stub rather
 * than the array, and the failure surfaces as `.map is not a function` during
 * prerender. Constants and types live here, where both sides can import them.
 */

export type LeadField = 'name' | 'email' | 'phone' | 'interest' | 'campus' | 'message';

export interface LeadState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Field name → message. Rendered under the field via `aria-describedby`. */
  errors?: Partial<Record<LeadField, string>>;
  /** Echoed back so a rejected form does not lose what the visitor typed. */
  values?: Partial<Record<LeadField, string>>;
}

export const leadInterests = [
  'SAT / ACT',
  'GRE / GMAT',
  'IELTS / TOEFL',
  'Admissions counseling',
  'Study abroad',
  '1-on-1 tutoring',
  'Something else',
] as const;

export const initialLeadState: LeadState = { status: 'idle' };

/* Deliberately permissive: it rejects the shapes that are certainly wrong
   (no @, no dot after it, whitespace) and accepts everything else. A stricter
   pattern rejects valid addresses, and the confirmation email is the real
   check anyway. */
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Bangladeshi mobile numbers are 11 digits starting 01, optionally with the
   +880 country code and any amount of spacing or dashes in between. */
export const PHONE = /^(?:\+?880[\s-]?|0)1[3-9]\d{2}[\s-]?\d{6}$/;
