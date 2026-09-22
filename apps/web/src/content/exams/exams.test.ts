import { describe, expect, it } from 'vitest';

import { leadInterests } from '@/lib/actions/lead-shape';
import { courseFamilies, editorialFor, editorials } from './index';

/**
 * Shape checks on the editorial overlays: the fields the course page renders
 * without a guard must be present, and the in-page anchors the hero links to
 * must be sections the template actually renders.
 */
const anchors = ['#curriculum', '#batches'];

describe('course editorials', () => {
  it('have unique slugs, each in exactly one family', () => {
    const slugs = editorials.map((editorial) => editorial.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    const grouped = courseFamilies.flatMap((family) => family.slugs);
    expect([...grouped].sort()).toEqual([...slugs].sort());

    for (const slug of slugs) {
      expect(editorialFor(slug)?.slug).toBe(slug);
    }
  });

  it.each(editorials)('$slug maps to an enquiry interest and has a search snippet', (editorial) => {
    expect(leadInterests).toContain(editorial.interest);
    expect(editorial.seo.title.length).toBeGreaterThan(10);
    expect(editorial.seo.description.length).toBeGreaterThan(40);
    expect(editorial.includes.items.length).toBeGreaterThan(0);
    expect(editorial.faq.length).toBeGreaterThan(0);
  });

  it.each(editorials)('$slug only links to anchors the page renders', (editorial) => {
    for (const action of editorial.hero.actions ?? []) {
      if (action.href.startsWith('#')) expect(anchors).toContain(action.href);
    }
  });
});
