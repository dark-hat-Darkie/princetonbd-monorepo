import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { admits, programs, stats, testimonials } from '@/content/home';
import HomePage from './page';

/**
 * Sections only. The header, footer and announcement bar now come from the
 * marketing layout and are covered by `layout.test.tsx`.
 */
describe('Landing page', () => {
  it('renders all six programs with their tags and metadata', () => {
    render(<HomePage />);

    for (const program of programs) {
      expect(screen.getByRole('heading', { name: program.title })).toBeInTheDocument();
      expect(screen.getByText(program.desc)).toBeInTheDocument();
      expect(screen.getByText(program.meta ?? '')).toBeInTheDocument();
    }
  });

  /**
   * Regression guard for the design's 0-based `$index`, which rendered the
   * guarantee band as 00–03 while every other numbered list starts at 01.
   */
  it('numbers the guarantee band 01 through 04', () => {
    render(<HomePage />);

    for (const label of ['01', '02', '03', '04']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.queryByText('00')).not.toBeInTheDocument();
  });

  it('renders the testimonials and their outcomes', () => {
    render(<HomePage />);

    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(screen.getByText(testimonial.result)).toBeInTheDocument();
    }
  });

  it('renders each stat value and label', () => {
    render(<HomePage />);

    for (const stat of stats) {
      expect(screen.getAllByText(stat.value).length).toBeGreaterThan(0);
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  /**
   * The marquee track is the list twice over so the -50% translate loops
   * seamlessly. If these ever diverge the animation visibly jumps.
   */
  it('duplicates the admits list so the marquee loops seamlessly', () => {
    render(<HomePage />);

    for (const name of admits) {
      expect(screen.getAllByText(name)).toHaveLength(2);
    }
  });

  it('points the primary calls to action at the enrolment section', () => {
    render(<HomePage />);

    const enrolLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '#enroll');
    expect(enrolLinks.length).toBeGreaterThanOrEqual(1);
  });
});
