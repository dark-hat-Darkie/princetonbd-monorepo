import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { studyAbroadSection } from './home';

/**
 * Images are referenced by path and served from `public/`, so a rename or a
 * typo is invisible until the page renders a broken frame. These check the
 * files the landing page points at are actually there.
 */
function publicPath(src: string): string {
  return join(process.cwd(), 'public', src);
}

describe('landing photography', () => {
  it('points at a file that exists', () => {
    expect(existsSync(publicPath(studyAbroadSection.image))).toBe(true);
  });

  it('still references the hero image the Hero component renders', () => {
    expect(existsSync(publicPath('/images/hero-students.jpg'))).toBe(true);
  });
});
