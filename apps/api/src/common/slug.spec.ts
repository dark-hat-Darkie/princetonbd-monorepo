import { describe, expect, it } from 'vitest';

import { SLUG_PATTERN, slugify } from './slug.js';

describe('slugify', () => {
  it('collapses punctuation and dashes', () => {
    expect(slugify('Dhaka — Gulshan')).toBe('dhaka-gulshan');
    expect(slugify('  SAT / ACT Bootcamp!  ')).toBe('sat-act-bootcamp');
    expect(slugify('Dr. Imran Chowdhury')).toBe('dr-imran-chowdhury');
  });

  it('produces a value the slug pattern accepts', () => {
    for (const input of ['IELTS', 'Duolingo English Test', 'PTE Academic 2027']) {
      expect(slugify(input)).toMatch(SLUG_PATTERN);
    }
  });
});
