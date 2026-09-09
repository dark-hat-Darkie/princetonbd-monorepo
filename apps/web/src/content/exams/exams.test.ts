import { describe, expect, it } from 'vitest';

import { leadInterests } from '@/lib/actions/lead-shape';
import { allExams, examBySlug } from './index';

/**
 * Shape checks on the twelve exam records: the fields a template renders
 * without a guard must be present and sane, and the in-page anchors the hero
 * links to must be sections the template actually renders.
 */
const anchors = ['#curriculum', '#batches'];

describe('exam records', () => {
  it('have unique slugs that match their paths', () => {
    const slugs = allExams.map((exam) => exam.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const exam of allExams) {
      expect(exam.path).toBe(`/test-prep/${exam.slug}`);
      expect(examBySlug(exam.slug)).toBe(exam);
    }
  });

  it.each(allExams)('$name has a fee, a mode and an enquiry interest', (exam) => {
    expect(exam.fee.price.amount).toBeGreaterThan(0);
    expect(exam.fee.includes.length).toBeGreaterThan(0);
    expect(exam.modes.length).toBeGreaterThan(0);
    expect(leadInterests).toContain(exam.interest);
  });

  it.each(allExams)('$name has a curriculum whose hours add up', (exam) => {
    const { modules, totals } = exam.curriculum;
    expect(modules.length).toBeGreaterThanOrEqual(4);

    const numbers = modules.map((module) => module.no);
    expect(new Set(numbers).size).toBe(numbers.length);

    const hours = modules.reduce((sum, module) => sum + (module.hours ?? 0), 0);
    expect(hours).toBeLessThanOrEqual(totals.taughtHours);
    expect(totals.weeks).toBeGreaterThan(0);
  });

  it.each(allExams)('$name only links to anchors the page renders', (exam) => {
    for (const action of exam.hero.actions ?? []) {
      if (action.href.startsWith('#')) expect(anchors).toContain(action.href);
    }
  });
});
