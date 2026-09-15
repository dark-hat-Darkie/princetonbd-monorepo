import { describe, expect, it } from 'vitest';

import {
  ANY,
  ONLINE_KEY,
  filterBatches,
  parseSelection,
  placeOptions,
  popularSearches,
  scheduleHref,
  type ScheduleBatch,
  type ScheduleCourse,
} from './schedule';

const ielts: ScheduleCourse = {
  slug: 'ielts',
  name: 'IELTS',
  path: '/test-prep/ielts',
  interest: 'IELTS / TOEFL',
  price: { amount: 18000, currency: 'BDT' },
};
const sat: ScheduleCourse = { ...ielts, slug: 'sat', name: 'SAT', path: '/test-prep/sat' };

let n = 0;
function batch(course: ScheduleCourse, placeKey: string, startsOn: string): ScheduleBatch {
  n += 1;
  const online = placeKey === ONLINE_KEY;
  return {
    id: `b${String(n)}`,
    mode: online ? 'live_online' : 'classroom',
    branch: online ? null : { name: `Campus ${placeKey}`, address: null },
    place: online ? 'Live online' : `Campus ${placeKey}`,
    startsOn,
    endsOn: '2026-12-31',
    days: ['sat', 'mon'],
    startTime: '18:00',
    endTime: '20:00',
    schedule: 'Sat · Mon, 6:00–8:00 pm',
    status: 'open',
    seatsLeft: null,
    teacherName: null,
    fee: null,
    course,
    placeKey,
  };
}

const rows = [
  batch(ielts, 'gulshan', '2026-10-01'),
  batch(sat, 'gulshan', '2026-10-03'),
  batch(ielts, ONLINE_KEY, '2026-10-05'),
  batch(ielts, 'gulshan', '2026-10-08'),
  batch(sat, 'dhanmondi', '2026-10-09'),
  batch(sat, 'dhanmondi', '2026-10-12'),
];

const places = placeOptions([
  { slug: 'gulshan', name: 'Dhaka — Gulshan' },
  { slug: 'dhanmondi', name: 'Dhaka — Dhanmondi' },
]);
const courses = [
  { key: 'ielts', label: 'IELTS' },
  { key: 'sat', label: 'SAT' },
];

describe('placeOptions', () => {
  it('lists every branch and puts live online last', () => {
    expect(places.map((place) => place.key)).toEqual(['gulshan', 'dhanmondi', ONLINE_KEY]);
    expect(places.at(-1)?.label).toBe('Live online');
  });
});

describe('parseSelection', () => {
  it('keeps values that name a real option and drops the rest', () => {
    expect(parseSelection({ branch: 'gulshan', course: 'sat' }, { places, courses })).toEqual({
      branch: 'gulshan',
      course: 'sat',
    });
    expect(
      parseSelection({ branch: 'mars', course: 'basket-weaving' }, { places, courses }),
    ).toEqual(ANY);
  });

  it('accepts the online key and takes the first of a repeated key', () => {
    expect(parseSelection({ branch: [ONLINE_KEY, 'gulshan'] }, { places, courses })).toEqual({
      branch: ONLINE_KEY,
      course: null,
    });
  });
});

describe('filterBatches', () => {
  it('narrows by either axis or both, keeping the stored order', () => {
    expect(filterBatches(rows, ANY)).toHaveLength(6);
    expect(filterBatches(rows, { branch: 'gulshan', course: null }).map((b) => b.id)).toEqual([
      'b1',
      'b2',
      'b4',
    ]);
    expect(filterBatches(rows, { branch: null, course: 'sat' })).toHaveLength(3);
    expect(filterBatches(rows, { branch: ONLINE_KEY, course: 'ielts' }).map((b) => b.id)).toEqual([
      'b3',
    ]);
    expect(filterBatches(rows, { branch: ONLINE_KEY, course: 'sat' })).toEqual([]);
  });
});

describe('scheduleHref', () => {
  it('writes only the parts that are set', () => {
    expect(scheduleHref(ANY)).toBe('/batch-schedule');
    expect(scheduleHref({ branch: 'gulshan', course: null })).toBe(
      '/batch-schedule?branch=gulshan',
    );
    expect(scheduleHref({ branch: ONLINE_KEY, course: 'ielts' })).toBe(
      '/batch-schedule?branch=online&course=ielts',
    );
  });
});

describe('popularSearches', () => {
  it('ranks course × place pairs by batch count, ties by soonest start', () => {
    const popular = popularSearches(rows);

    expect(popular.map((entry) => [entry.course.slug, entry.placeKey, entry.count])).toEqual([
      ['ielts', 'gulshan', 2],
      ['sat', 'dhanmondi', 2],
      ['sat', 'gulshan', 1],
      ['ielts', ONLINE_KEY, 1],
    ]);
    expect(popular[0]?.selection).toEqual({ branch: 'gulshan', course: 'ielts' });
    expect(popular[3]?.place).toBe('Live online');
  });

  it('honours the limit', () => {
    expect(popularSearches(rows, 2)).toHaveLength(2);
  });
});
