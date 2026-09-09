/**
 * Every scheduled run of an exam course, and the helpers the exam pages, the
 * comparison table and the enquiry form use to read it.
 *
 * A batch is what a learner actually enrols in: one exam, one mode, one campus
 * (or none, for a LiveOnline run), a start and an end date, a weekly slot. The
 * exam record carries the course itself — fee, curriculum, what is included —
 * and a batch only says when and where that course runs, overriding the fee
 * when a run is priced differently.
 *
 * Static for now. `batches.test.ts` keeps every row honest against the exam
 * list, the campus list and the faculty roster, which is the validation an
 * admin form would otherwise do. When `/api/v1/batches` exists, this module
 * becomes a fetch and nothing downstream changes.
 *
 * Dates are calendar days, YYYY-MM-DD, read as Dhaka days: `new Date('2026-10-14')`
 * is UTC midnight, which is 06:00 the same morning in Dhaka, so every formatter
 * in lib/dates.ts — all pinned to Asia/Dhaka — renders the intended day.
 */

import type { Batch, ExamContent, Price } from './types';
import { daysUntil, formatDayMonth } from '@/lib/dates';
import { bdtPrice } from '@/lib/money';

const GULSHAN = 'Dhaka — Gulshan';
const DHANMONDI = 'Dhaka — Dhanmondi';
const CHATTOGRAM = 'Chattogram';

const EVENING = 'Sat · Mon · Wed, 6:30–8:30 pm';
const WEEKEND = 'Fri · Sat, 10:00 am–1:00 pm';
const LATE = 'Tue · Thu, 7:00–9:00 pm';

export const batches: readonly Batch[] = [
  /* — SAT ————————————————————————————————————————————————————————————— */
  {
    id: 'sat-2026-10-gulshan',
    examSlug: 'sat',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-12',
    endsOn: '2026-12-18',
    schedule: EVENING,
    status: 'filling',
    seatsLeft: 3,
    instructor: 'Dr. Imran Chowdhury',
  },
  {
    id: 'sat-2026-11-online',
    examSlug: 'sat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-06',
    endsOn: '2027-01-15',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 9,
    instructor: 'Farzana Haque',
    fee: bdtPrice(32000),
  },
  {
    id: 'sat-2027-01-chattogram',
    examSlug: 'sat',
    mode: 'Classroom',
    campus: CHATTOGRAM,
    startsOn: '2027-01-11',
    endsOn: '2027-03-19',
    schedule: EVENING,
    status: 'open',
    seatsLeft: 10,
    instructor: 'Zahid Hasan',
  },

  /* — ACT ————————————————————————————————————————————————————————————— */
  {
    id: 'act-2026-10-gulshan',
    examSlug: 'act',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-13',
    endsOn: '2026-12-19',
    schedule: LATE,
    status: 'filling',
    seatsLeft: 3,
    instructor: 'Dr. Imran Chowdhury',
  },
  {
    id: 'act-2026-11-online',
    examSlug: 'act',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-07',
    endsOn: '2027-01-16',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 8,
    fee: bdtPrice(30000),
  },
  {
    id: 'act-2027-01-dhanmondi',
    examSlug: 'act',
    mode: 'Classroom',
    campus: DHANMONDI,
    startsOn: '2027-01-12',
    endsOn: '2027-03-20',
    schedule: EVENING,
    status: 'open',
    seatsLeft: 10,
  },

  /* — AP —————————————————————————————————————————————————————————————— */
  {
    id: 'ap-2026-10-gulshan',
    examSlug: 'ap',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-17',
    endsOn: '2026-12-23',
    schedule: WEEKEND,
    status: 'filling',
    seatsLeft: 2,
    instructor: 'Arif Mahmud',
  },
  {
    id: 'ap-2026-11-online',
    examSlug: 'ap',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-03',
    endsOn: '2027-01-12',
    schedule: LATE,
    status: 'open',
    seatsLeft: 6,
    instructor: 'Arif Mahmud',
    fee: bdtPrice(32000),
  },
  {
    id: 'ap-2027-01-chattogram',
    examSlug: 'ap',
    mode: 'Classroom',
    campus: CHATTOGRAM,
    startsOn: '2027-01-16',
    endsOn: '2027-03-24',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 8,
    instructor: 'Arif Mahmud',
  },

  /* — PSAT ———————————————————————————————————————————————————————————— */
  {
    id: 'psat-2026-10-gulshan',
    examSlug: 'psat',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-10',
    endsOn: '2026-12-05',
    schedule: WEEKEND,
    status: 'filling',
    seatsLeft: 4,
  },
  {
    id: 'psat-2026-11-online',
    examSlug: 'psat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-02',
    endsOn: '2026-12-28',
    schedule: LATE,
    status: 'open',
    seatsLeft: 10,
    fee: bdtPrice(28000),
  },
  {
    id: 'psat-2027-01-dhanmondi',
    examSlug: 'psat',
    mode: 'Classroom',
    campus: DHANMONDI,
    startsOn: '2027-01-09',
    endsOn: '2027-03-06',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 10,
  },

  /* — GRE ————————————————————————————————————————————————————————————— */
  {
    id: 'gre-2026-10-gulshan',
    examSlug: 'gre',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-14',
    endsOn: '2026-12-20',
    schedule: EVENING,
    status: 'filling',
    seatsLeft: 3,
    instructor: 'Farzana Haque',
  },
  {
    id: 'gre-2026-11-online',
    examSlug: 'gre',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-08',
    endsOn: '2027-01-17',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 7,
    instructor: 'Nabeel Ahsan',
    fee: bdtPrice(38000),
  },
  {
    id: 'gre-2027-01-chattogram',
    examSlug: 'gre',
    mode: 'Classroom',
    campus: CHATTOGRAM,
    startsOn: '2027-01-13',
    endsOn: '2027-03-21',
    schedule: EVENING,
    status: 'open',
    seatsLeft: 8,
  },

  /* — GMAT ———————————————————————————————————————————————————————————— */
  {
    id: 'gmat-2026-10-gulshan',
    examSlug: 'gmat',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-15',
    endsOn: '2026-12-10',
    schedule: LATE,
    status: 'filling',
    seatsLeft: 2,
    instructor: 'Lubna Karim',
  },
  {
    id: 'gmat-2026-11-online',
    examSlug: 'gmat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-05',
    endsOn: '2026-12-31',
    schedule: LATE,
    status: 'open',
    seatsLeft: 8,
    instructor: 'Lubna Karim',
    fee: bdtPrice(38000),
  },
  {
    id: 'gmat-2027-01-dhanmondi',
    examSlug: 'gmat',
    mode: 'Classroom',
    campus: DHANMONDI,
    startsOn: '2027-01-14',
    endsOn: '2027-03-11',
    schedule: EVENING,
    status: 'open',
    seatsLeft: 8,
  },

  /* — LSAT (LiveOnline only) —————————————————————————————————————————— */
  {
    id: 'lsat-2026-10-online',
    examSlug: 'lsat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-10-11',
    endsOn: '2027-01-03',
    schedule: WEEKEND,
    status: 'filling',
    seatsLeft: 1,
    instructor: 'Nabeel Ahsan',
  },
  {
    id: 'lsat-2026-11-online',
    examSlug: 'lsat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-10',
    endsOn: '2027-02-02',
    schedule: LATE,
    status: 'open',
    seatsLeft: 4,
    instructor: 'Nabeel Ahsan',
  },
  {
    id: 'lsat-2027-01-online',
    examSlug: 'lsat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2027-01-17',
    endsOn: '2027-04-11',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 4,
  },

  /* — MCAT (LiveOnline only) —————————————————————————————————————————— */
  {
    id: 'mcat-2026-10-online',
    examSlug: 'mcat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-10-04',
    endsOn: '2027-03-21',
    schedule: WEEKEND,
    status: 'filling',
    seatsLeft: 1,
    instructor: 'Arif Mahmud',
  },
  {
    id: 'mcat-2026-11-online',
    examSlug: 'mcat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-01',
    endsOn: '2027-04-18',
    schedule: LATE,
    status: 'open',
    seatsLeft: 3,
    instructor: 'Arif Mahmud',
  },
  {
    id: 'mcat-2027-01-online',
    examSlug: 'mcat',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2027-01-10',
    endsOn: '2027-06-27',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 4,
  },

  /* — IELTS ——————————————————————————————————————————————————————————— */
  {
    id: 'ielts-2026-10-gulshan',
    examSlug: 'ielts',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-14',
    endsOn: '2026-12-20',
    schedule: EVENING,
    status: 'filling',
    seatsLeft: 3,
    instructor: 'Rehnuma Siddiqui',
  },
  {
    id: 'ielts-2026-11-online',
    examSlug: 'ielts',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-06',
    endsOn: '2027-01-15',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 8,
    instructor: 'Rehnuma Siddiqui',
    fee: bdtPrice(18000),
  },
  {
    id: 'ielts-2027-01-chattogram',
    examSlug: 'ielts',
    mode: 'Classroom',
    campus: CHATTOGRAM,
    startsOn: '2027-01-13',
    endsOn: '2027-03-21',
    schedule: EVENING,
    status: 'open',
    seatsLeft: 10,
    instructor: 'Zahid Hasan',
  },

  /* — TOEFL ——————————————————————————————————————————————————————————— */
  {
    id: 'toefl-2026-10-gulshan',
    examSlug: 'toefl',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-19',
    endsOn: '2026-12-25',
    schedule: LATE,
    status: 'filling',
    seatsLeft: 4,
    instructor: 'Rehnuma Siddiqui',
  },
  {
    id: 'toefl-2026-11-online',
    examSlug: 'toefl',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-09',
    endsOn: '2027-01-18',
    schedule: LATE,
    status: 'open',
    seatsLeft: 9,
    fee: bdtPrice(20000),
  },
  {
    id: 'toefl-2027-01-dhanmondi',
    examSlug: 'toefl',
    mode: 'Classroom',
    campus: DHANMONDI,
    startsOn: '2027-01-18',
    endsOn: '2027-03-26',
    schedule: EVENING,
    status: 'open',
    seatsLeft: 10,
  },

  /* — Duolingo English Test (LiveOnline only) ————————————————————————— */
  {
    id: 'duolingo-2026-10-online',
    examSlug: 'duolingo',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-10-06',
    endsOn: '2026-11-14',
    schedule: LATE,
    status: 'filling',
    seatsLeft: 2,
  },
  {
    id: 'duolingo-2026-11-online',
    examSlug: 'duolingo',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-20',
    endsOn: '2026-12-31',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 8,
  },
  {
    id: 'duolingo-2027-01-online',
    examSlug: 'duolingo',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2027-01-12',
    endsOn: '2027-02-20',
    schedule: LATE,
    status: 'open',
    seatsLeft: 10,
  },

  /* — PTE Academic ———————————————————————————————————————————————————— */
  {
    id: 'pte-2026-10-gulshan',
    examSlug: 'pte',
    mode: 'Classroom',
    campus: GULSHAN,
    startsOn: '2026-10-20',
    endsOn: '2026-12-19',
    schedule: EVENING,
    status: 'filling',
    seatsLeft: 3,
    instructor: 'Rehnuma Siddiqui',
  },
  {
    id: 'pte-2026-11-online',
    examSlug: 'pte',
    mode: 'LiveOnline',
    campus: null,
    startsOn: '2026-11-13',
    endsOn: '2027-01-15',
    schedule: WEEKEND,
    status: 'open',
    seatsLeft: 9,
    fee: bdtPrice(19000),
  },
  {
    id: 'pte-2027-01-chattogram',
    examSlug: 'pte',
    mode: 'Classroom',
    campus: CHATTOGRAM,
    startsOn: '2027-01-19',
    endsOn: '2027-03-20',
    schedule: EVENING,
    status: 'open',
    seatsLeft: 10,
  },
];

const byId = new Map(batches.map((batch) => [batch.id, batch]));

export function batchById(id: string): Batch | undefined {
  return byId.get(id);
}

/**
 * The runs of an exam a visitor can still join: not closed, and not yet
 * finished as of `now`, soonest first.
 *
 * "Not yet finished" rather than "not yet started" on purpose: a batch in its
 * first fortnight still takes late joiners, and hiding it would send them to
 * the enquiry form with nothing to ask about. Counted in Dhaka calendar days
 * via `daysUntil`, so the cut-off lands at local midnight, not UTC's.
 */
export function batchesFor(examSlug: string, now: Date = new Date()): readonly Batch[] {
  return batches
    .filter(
      (batch) =>
        batch.examSlug === examSlug &&
        batch.status !== 'closed' &&
        daysUntil(batch.endsOn, now) >= 0,
    )
    .sort((a, b) => a.startsOn.localeCompare(b.startsOn));
}

export function nextBatch(examSlug: string, now: Date = new Date()): Batch | undefined {
  return batchesFor(examSlug, now)[0];
}

/** What this run costs: the batch's own price if it sets one, else the course fee. */
export function batchFee(exam: ExamContent, batch?: Batch): Price {
  return batch?.fee ?? exam.fee.price;
}

/** Where a LiveOnline run "is", for every place a campus name would otherwise go. */
export const ONLINE_LABEL = 'Live online';

export function batchPlace(batch: Batch): string {
  return batch.campus ?? ONLINE_LABEL;
}

/** "IELTS · Dhaka — Gulshan · starts 14 Oct" — the line the enquiry form echoes back. */
export function batchLabel(exam: ExamContent, batch: Batch): string {
  return `${exam.name} · ${batchPlace(batch)} · starts ${formatDayMonth(batch.startsOn)}`;
}

/**
 * The enquiry-form link for an exam, or for one run of it.
 *
 * Built with URLSearchParams so a campus name with an em dash survives the
 * trip; /contact reads the same three keys back and validates each against
 * its source list before trusting it.
 */
export function enrolHref(exam: ExamContent, batch?: Batch): string {
  const params = new URLSearchParams({ interest: exam.interest });
  if (batch?.campus) params.set('campus', batch.campus);
  if (batch) params.set('batch', batch.id);
  return `/contact?${params.toString()}`;
}
