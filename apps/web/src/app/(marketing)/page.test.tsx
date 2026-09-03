import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { admits, features, programs, stats, steps, testimonials } from '@/content/home';
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
   * The guarantee band used to number its features 01–04 and this asserted
   * those labels. The retheme replaced the numerals with check icons, and the
   * assertion kept passing on the program cards' own 01–06 — a guard that had
   * silently stopped guarding. It now checks what the band actually promises.
   */
  it('renders every guarantee feature', () => {
    render(<HomePage />);

    for (const feature of features) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });

  /**
   * Regression guard for the design's 0-based `$index`, which rendered a
   * numbered list as 00–03 while every other one starts at 01. The band that
   * had the bug no longer renders numbers, but the programs grid and the
   * study-abroad steps still do, and both take their numerals from content.
   */
  it('starts every numbered list at 01, never 00', () => {
    render(<HomePage />);

    expect(programs.map((program) => program.no)).toContain('01');
    expect(steps.map((step) => step.no)).toContain('01');
    for (const label of [...programs.map((p) => p.no), ...steps.map((s) => s.no)]) {
      expect(screen.getAllByText(label ?? '').length).toBeGreaterThan(0);
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
