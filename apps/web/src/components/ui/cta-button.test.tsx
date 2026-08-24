import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CtaButton } from './cta-button';

/**
 * Guards the property that broke: a solid and an outlined button of the same
 * size must occupy the same height.
 *
 * jsdom does no layout, so height cannot be measured. What can be checked is
 * everything height is computed from — vertical padding, font size and border
 * width — and that is what these compare. The outlined variant used to ignore
 * `size` entirely and carry a border the solid one lacked, which broke both.
 */
const sizes = ['sm', 'md', 'lg'] as const;

/** The utilities that contribute to a button's height. */
function heightClasses(element: HTMLElement): string[] {
  return [...element.classList]
    .filter((name) => /^(py-|text-\[|text-base|border$|border-\[|border-transparent)/.test(name))
    .sort();
}

describe('CtaButton sizing', () => {
  it.each(sizes)('renders %s at the same height in both variants', (size) => {
    render(
      <>
        <CtaButton href="/" size={size}>
          Solid
        </CtaButton>
        <CtaButton href="/" size={size} variant="outline">
          Outline
        </CtaButton>
      </>,
    );

    const solid = heightClasses(screen.getByRole('link', { name: 'Solid' }));
    const outline = heightClasses(screen.getByRole('link', { name: 'Outline' }));

    // Same vertical padding and type scale.
    expect(solid.filter((c) => !c.startsWith('border'))).toEqual(
      outline.filter((c) => !c.startsWith('border')),
    );
    // Both carry exactly one 1px border, so neither is the odd 2px out.
    expect(solid).toContain('border');
    expect(outline).toContain('border');
  });

  it('applies the size to the outlined variant at all', () => {
    render(
      <>
        <CtaButton href="/" size="sm" variant="outline">
          Small
        </CtaButton>
        <CtaButton href="/" size="lg" variant="outline">
          Large
        </CtaButton>
      </>,
    );

    expect(heightClasses(screen.getByRole('link', { name: 'Small' }))).not.toEqual(
      heightClasses(screen.getByRole('link', { name: 'Large' })),
    );
  });

  it('lets a caller override padding without the variants diverging', () => {
    render(
      <>
        <CtaButton href="/" className="py-[15px]">
          Solid
        </CtaButton>
        <CtaButton href="/" variant="outline" className="py-[15px]">
          Outline
        </CtaButton>
      </>,
    );

    expect(heightClasses(screen.getByRole('link', { name: 'Solid' }))).toEqual(
      heightClasses(screen.getByRole('link', { name: 'Outline' })).map((c) =>
        c === 'border-[rgba(27,36,54,.28)]' ? 'border-transparent' : c,
      ),
    );
  });
});
