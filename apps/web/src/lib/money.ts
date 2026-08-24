/** A course price. Every figure on the site is quoted in Bangladeshi taka. */
export interface Price {
  amount: number;
  currency: 'BDT';
}

/*
 * Built once at module scope rather than per call: constructing an
 * Intl.NumberFormat is the expensive part, and formatting sixty pages of price
 * cards would otherwise build one formatter per card.
 *
 * `en-BD` rather than `bn-BD` — the site is in English, so prices should read
 * with Latin digits. The lakh/crore grouping still applies.
 */
const bdt = new Intl.NumberFormat('en-BD', {
  style: 'currency',
  currency: 'BDT',
  /* `narrowSymbol` is what produces "৳18,000". The default and `symbol` both
     fall back to the ISO code — "BDT 18,000" — because ICU has no plain symbol
     registered for BDT in an en-* locale. */
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
});

export function formatPrice(price: Price): string {
  return bdt.format(price.amount);
}

/** Convenience for the common case of an inline literal. */
export function bdtPrice(amount: number): Price {
  return { amount, currency: 'BDT' };
}
