import { describe, expect, it } from 'vitest';

import { daysUntil, formatDayMonth, formatTime, relativeDay } from './dates';

/**
 * The timestamps in the student record carry a +06:00 offset. These assert the
 * formatters pin Asia/Dhaka rather than following the machine's zone — without
 * that, a 6pm class renders as noon on a UTC server and the browser disagrees,
 * which React reports as a hydration mismatch.
 */
describe('date formatting', () => {
  it('renders a Dhaka evening as an evening', () => {
    expect(formatTime('2026-08-26T18:00:00+06:00')).toMatch(/6:00\s*pm/i);
  });

  it('does not shift the day across the UTC boundary', () => {
    // 00:30 in Dhaka is still the previous day in UTC.
    expect(formatDayMonth('2026-08-26T00:30:00+06:00')).toBe('26 Aug');
  });
});

describe('daysUntil', () => {
  const from = new Date('2026-08-24T12:00:00Z');

  it('counts whole days regardless of the time of day at either end', () => {
    expect(daysUntil('2026-08-25T01:00:00+06:00', from)).toBe(1);
    expect(daysUntil('2026-08-25T23:00:00+06:00', from)).toBe(1);
  });

  it('is zero for today and negative once past', () => {
    expect(daysUntil('2026-08-24T23:59:00+06:00', from)).toBe(0);
    expect(daysUntil('2026-08-21T09:00:00+06:00', from)).toBe(-3);
  });
});

describe('relativeDay', () => {
  const from = new Date('2026-08-24T12:00:00Z');

  it('names the near days rather than counting them', () => {
    expect(relativeDay('2026-08-24T18:00:00+06:00', from)).toBe('today');
    expect(relativeDay('2026-08-25T18:00:00+06:00', from)).toBe('tomorrow');
    expect(relativeDay('2026-08-23T18:00:00+06:00', from)).toBe('yesterday');
  });

  it('counts the rest in both directions', () => {
    expect(relativeDay('2026-08-29T09:30:00+06:00', from)).toBe('in 5 days');
    expect(relativeDay('2026-08-19T09:30:00+06:00', from)).toBe('5 days ago');
  });
});
