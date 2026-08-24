import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { stats } from '@/content/home';
import { Hero } from './hero';

describe('Hero', () => {
  it('shows the photo treatment by default', () => {
    render(<Hero />);

    expect(screen.getByRole('img', { name: /university library/i })).toBeInTheDocument();
    expect(screen.queryByText('By the numbers')).not.toBeInTheDocument();
  });

  /** The design defines this variant but never shows it; it stays reachable. */
  it('swaps the photo for the stats panel when heroMedia is "stats"', () => {
    render(<Hero heroMedia="stats" />);

    expect(screen.getByText('By the numbers')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /university library/i })).not.toBeInTheDocument();
    for (const stat of stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it('gates the score-guarantee badge on its prop', () => {
    const { rerender } = render(<Hero />);
    expect(screen.getByText('Score guarantee')).toBeInTheDocument();

    rerender(<Hero showGuaranteeBadge={false} />);
    expect(screen.queryByText('Score guarantee')).not.toBeInTheDocument();
  });
});
