import { describe, expect, it } from 'vitest';

import { bdtPrice, formatPrice } from './money';

describe('formatPrice', () => {
  it('renders taka with the ৳ symbol and no decimals', () => {
    expect(formatPrice(bdtPrice(18000))).toBe('৳18,000');
  });

  /**
   * Regression guard: the default and `symbol` currency displays both fall back
   * to the ISO code in en-* locales, which renders "BDT 18,000" across every
   * price card on the site.
   */
  it('never falls back to the ISO currency code', () => {
    expect(formatPrice(bdtPrice(85000))).not.toContain('BDT');
  });

  it('groups large amounts', () => {
    expect(formatPrice(bdtPrice(160000))).toBe('৳160,000');
  });
});
