import { describe, expect, it } from 'vitest';

import { editorials, editorialFor } from './exams';
import { admitsKicker, features, stats } from './home';
import { testPrepHub } from './hubs/test-prep';
import { guaranteeBand, outcomeStats, whyUs } from './shared';
import { footerColumns, footerDisclaimers } from './site/footer';

/**
 * Regression guards for the TPR US review feedback.
 *
 * Every claim on the site must either be audited local data or be explicitly
 * attributed to the US organisation. LSAT/MCAT stay referral-only — out of
 * browse navigation — until the TPR US referral terms are agreed.
 */
describe('review-feedback claims', () => {
  it('makes no unaudited rating or cohort-size claims', () => {
    const haystack = JSON.stringify({
      stats,
      outcomeStats,
      features,
      guaranteeBand,
      editorials,
      hub: testPrepHub,
    });

    for (const banned of ['4.9', '12k+', '12,000+', '+210', '94%']) {
      expect(haystack).not.toContain(banned);
    }
    expect(haystack.toLowerCase()).not.toContain('written score');
    expect(haystack.toLowerCase()).not.toContain('written band');
    expect(haystack.toLowerCase()).not.toContain('written, on');
    expect(haystack).not.toContain('top percentile');
  });

  it('attributes the heritage figure to the US organisation', () => {
    for (const stat of [...stats, ...outcomeStats]) {
      if (stat.value === '40') expect(stat.label).toContain('(US)');
    }
  });

  it('does not present the admits ticker as earned places', () => {
    expect(admitsKicker).not.toContain('earned places');
  });

  it('lists ten exams on the test-prep hub, without LSAT or MCAT', () => {
    expect(testPrepHub.cards.items).toHaveLength(10);
    expect(testPrepHub.cards.items.map((card) => card.href)).not.toContain('/test-prep/lsat');
    expect(testPrepHub.cards.items.map((card) => card.href)).not.toContain('/test-prep/mcat');
    expect(testPrepHub.hero.intro).toContain('Ten exams');
    expect(testPrepHub.hero.facts).toContainEqual({ label: 'Exams covered', value: '10' });
  });

  it('keeps LSAT and MCAT out of the footer', () => {
    const hrefs = footerColumns.flatMap((column) => column.links.map((link) => link.href));
    expect(hrefs).not.toContain('/test-prep/lsat');
    expect(hrefs).not.toContain('/test-prep/mcat');
  });

  it('carries the Princeton University disclaimer on every page via the footer', () => {
    expect(footerDisclaimers).toContain(
      'The Princeton Review is not affiliated with Princeton University.',
    );
  });

  it('keeps LSAT and MCAT referral-only: no stats, no guarantee, contact first', () => {
    for (const slug of ['lsat', 'mcat']) {
      const editorial = editorialFor(slug);
      expect(editorial).toBeDefined();
      expect(editorial?.stats).toBeUndefined();
      expect(JSON.stringify(editorial?.includes).toLowerCase()).not.toContain('guarantee');
      expect(editorial?.hero.actions?.[0]?.href).toBe('/contact');
    }
  });

  it('states the SAT trademark disclaimer verbatim', () => {
    expect(editorialFor('sat')?.disclaimer).toBe(
      'SAT® is a trademark registered by the College Board, which is not affiliated with, and does not endorse this product.',
    );
  });

  it('frames the guarantee as improvement-or-retake, never a specific score', () => {
    expect(guaranteeBand.title).toContain('Improve your score');
    expect(guaranteeBand.body).toContain('does not improve on your starting score');
    expect(whyUs.map((feature) => feature.title)).not.toContain('Written guarantee');
  });
});
