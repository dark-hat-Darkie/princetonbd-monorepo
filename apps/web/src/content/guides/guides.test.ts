import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { destinationAustralia } from './destination-australia';
import { destinationCanada } from './destination-canada';
import { destinationEurope } from './destination-europe';
import { destinationUk } from './destination-uk';
import { destinationUsa } from './destination-usa';
import { studyAbroadSection } from '../home';

/**
 * Images are referenced by path and served from `public/`, so a rename or a
 * typo is invisible until the page renders a broken frame. These check the
 * files are actually there, and that every one carries alt text — a decorative
 * `alt=""` would be wrong here, since each photograph is the subject of its
 * page.
 */
const guides = [
  destinationUsa,
  destinationUk,
  destinationCanada,
  destinationAustralia,
  destinationEurope,
];

function publicPath(src: string): string {
  return join(process.cwd(), 'public', src);
}

describe('guide photography', () => {
  it.each(guides.map((g) => [g.path, g] as const))('%s has an image on disk', (_path, guide) => {
    expect(guide.image).toBeDefined();
    expect(existsSync(publicPath(guide.image?.src ?? ''))).toBe(true);
  });

  it.each(guides.map((g) => [g.path, g] as const))('%s describes its image', (_path, guide) => {
    expect((guide.image?.alt ?? '').length).toBeGreaterThan(15);
  });
});

describe('landing photography', () => {
  it('points at a file that exists', () => {
    expect(existsSync(publicPath(studyAbroadSection.image))).toBe(true);
  });

  it('still references the hero image the Hero component renders', () => {
    expect(existsSync(publicPath('/images/hero-students.jpg'))).toBe(true);
  });
});
