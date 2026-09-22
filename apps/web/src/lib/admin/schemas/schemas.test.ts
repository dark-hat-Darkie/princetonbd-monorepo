import { describe, expect, it } from 'vitest';

import { firstErrors, readForm } from '../form-data';
import { batchFormOptions, batchSchema } from './batch';
import { branchFormOptions, branchSchema } from './branch';
import { counselorFormOptions, counselorSchema, checkInToInput } from './counselor';
import { courseFormOptions, courseSchema } from './course';

function form(entries: [string, string][]): FormData {
  const data = new FormData();
  for (const [key, value] of entries) data.append(key, value);
  return data;
}

describe('branchSchema', () => {
  it('turns empty optional boxes into null and an empty slug into undefined', () => {
    const parsed = branchSchema.parse(
      readForm(
        form([
          ['slug', ''],
          ['name', 'Dhaka — Gulshan'],
          ['address', ''],
          ['phone', ''],
          ['sortOrder', ''],
        ]),
        branchFormOptions,
      ),
    );
    expect(parsed).toEqual({
      slug: undefined,
      name: 'Dhaka — Gulshan',
      address: null,
      phone: null,
      isActive: false,
      sortOrder: 0,
    });
  });

  it('rejects a malformed slug with a readable message', () => {
    const result = branchSchema.safeParse(
      readForm(
        form([
          ['slug', 'Not A Slug'],
          ['name', 'x'],
        ]),
        branchFormOptions,
      ),
    );
    expect(result.success).toBe(false);
    if (!result.success) expect(firstErrors(result.error).slug).toMatch(/Lower-case/);
  });
});

describe('courseSchema', () => {
  it('requires a price and at least one mode', () => {
    const result = courseSchema.safeParse(
      readForm(
        form([
          ['name', 'SAT'],
          ['priceAmount', ''],
          ['priceUnit', 'per course'],
          ['status', 'draft'],
        ]),
        courseFormOptions,
      ),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = firstErrors(result.error);
      expect(errors.priceAmount).toMatch(/whole number/);
      expect(errors.modes).toMatch(/delivery mode/);
    }
  });
});

describe('counselorSchema', () => {
  it('passes a full assignment through, tagging the check-in with Dhaka time', () => {
    const result = counselorSchema.safeParse(
      readForm(
        form([
          ['name', 'Shafqat Rahman'],
          ['role', 'Senior Admissions Counselor'],
          ['email', 'counselling@princetonreviewbd.com'],
          ['phone', '+880 1700-000000'],
          ['nextCheckIn', '2026-09-03T17:00'],
        ]),
        counselorFormOptions,
      ),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        name: 'Shafqat Rahman',
        role: 'Senior Admissions Counselor',
        email: 'counselling@princetonreviewbd.com',
        phone: '+880 1700-000000',
        nextCheckIn: '2026-09-03T17:00:00+06:00',
      });
    }
  });

  it('clears everything when the name is empty', () => {
    const result = counselorSchema.safeParse(
      readForm(
        form([
          ['name', ''],
          ['role', ''],
          ['email', ''],
          ['phone', ''],
          ['nextCheckIn', ''],
        ]),
        counselorFormOptions,
      ),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        name: null,
        role: null,
        email: null,
        phone: null,
        nextCheckIn: null,
      });
    }
  });

  it('rejects a bad email with a readable message', () => {
    const result = counselorSchema.safeParse(
      readForm(form([['name', 'Shafqat Rahman'], ['email', 'not-an-email']]), counselorFormOptions),
    );
    expect(result.success).toBe(false);
    if (!result.success) expect(firstErrors(result.error).email).toMatch(/valid email/);
  });

  it('round-trips a stored check-in back into the datetime-local box', () => {
    expect(checkInToInput('2026-09-03T11:00:00.000Z')).toBe('2026-09-03T17:00');
    expect(checkInToInput(null)).toBe('');
    expect(checkInToInput(undefined)).toBe('');
  });
});

describe('batchSchema', () => {
  const base: [string, string][] = [
    ['mode', 'classroom'],
    ['branchId', ''],
    ['teacherId', ''],
    ['startsOn', '2030-01-10'],
    ['endsOn', '2029-12-01'],
    ['days', 'sat'],
    ['startTime', '18:30'],
    ['endTime', '18:00'],
    ['status', 'open'],
    ['seatsLeft', ''],
    ['feeAmount', ''],
  ];

  it('mirrors the API cross-field rules so obvious mistakes never leave the browser', () => {
    const result = batchSchema.safeParse(readForm(form(base), batchFormOptions));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(firstErrors(result.error)).sort()).toEqual([
        'branchId',
        'endTime',
        'endsOn',
      ]);
    }
  });
});
