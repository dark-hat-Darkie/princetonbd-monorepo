import { describe, expect, it } from 'vitest';

import {
  batchLabel,
  batchPlace,
  enrolHref,
  formatClock,
  formatSchedule,
  sortDays,
} from './batches';

const classroom = {
  id: 'b1',
  mode: 'classroom' as const,
  branch: { name: 'Dhaka — Gulshan' },
  startsOn: '2026-10-14',
  days: ['mon', 'sat', 'wed'] as const,
  startTime: '18:30',
  endTime: '20:30',
};

const online = { ...classroom, id: 'b2', mode: 'live_online' as const, branch: null };

describe('formatSchedule', () => {
  it('reproduces the hand-written schedule lines', () => {
    expect(formatSchedule(['sat', 'mon', 'wed'], '18:30', '20:30')).toBe(
      'Sat · Mon · Wed, 6:30–8:30 pm',
    );
    expect(formatSchedule(['fri', 'sat'], '10:00', '13:00')).toBe('Fri · Sat, 10:00 am–1:00 pm');
    expect(formatSchedule(['tue', 'thu'], '19:00', '21:00')).toBe('Tue · Thu, 7:00–9:00 pm');
  });

  it('keeps the stored day order and sorts only on request', () => {
    expect(formatSchedule(['wed', 'sat'], '09:00', '11:00')).toMatch(/^Wed · Sat,/);
    expect(sortDays(['fri', 'sat', 'mon'])).toEqual(['sat', 'mon', 'fri']);
  });

  it('formats the clock on a twelve-hour dial', () => {
    expect(formatClock('00:15')).toBe('12:15 am');
    expect(formatClock('12:00')).toBe('12:00 pm');
    expect(formatClock('23:05')).toBe('11:05 pm');
  });
});

describe('places and labels', () => {
  it('names the branch or falls back to the online label', () => {
    expect(batchPlace(classroom)).toBe('Dhaka — Gulshan');
    expect(batchPlace(online)).toBe('Live online');
  });

  it('builds the enquiry echo line', () => {
    expect(batchLabel('IELTS', classroom)).toBe('IELTS · Dhaka — Gulshan · starts 14 Oct');
  });

  it('builds a contact link that survives an em dash and omits campus when online', () => {
    const href = enrolHref({ interest: 'SAT / ACT', batch: classroom });
    const params = new URL(href, 'http://x').searchParams;
    expect(params.get('interest')).toBe('SAT / ACT');
    expect(params.get('campus')).toBe('Dhaka — Gulshan');
    expect(params.get('batch')).toBe('b1');

    const onlineParams = new URL(
      enrolHref({ interest: 'IELTS / TOEFL', batch: online }),
      'http://x',
    ).searchParams;
    expect(onlineParams.get('campus')).toBeNull();
    expect(onlineParams.get('batch')).toBe('b2');

    expect(enrolHref({ interest: 'GRE / GMAT' })).toBe('/contact?interest=GRE+%2F+GMAT');
  });
});
