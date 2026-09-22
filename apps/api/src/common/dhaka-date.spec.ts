import { describe, expect, it } from 'vitest';

import { dhakaToday } from './dhaka-date.js';

describe('dhakaToday', () => {
  /* 2026-10-11T20:30Z is already 02:30 on the 12th in Dhaka (UTC+6). */
  it('reports the Dhaka calendar day, not the UTC one', () => {
    expect(dhakaToday(new Date('2026-10-11T20:30:00Z'))).toBe('2026-10-12');
    expect(dhakaToday(new Date('2026-10-11T17:59:00Z'))).toBe('2026-10-11');
  });
});
