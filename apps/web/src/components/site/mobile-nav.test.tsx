import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { navGroups } from '@/content/site/nav';
import { MobileNav } from './mobile-nav';

afterEach(() => {
  document.body.style.overflow = '';
});

describe('MobileNav', () => {
  const trigger = () => screen.getByRole('button', { name: 'Menu' });

  it('starts closed', () => {
    render(<MobileNav groups={navGroups} />);

    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens a labelled dialog holding every nav section and its links', () => {
    render(<MobileNav groups={navGroups} />);
    fireEvent.click(trigger());

    const dialog = screen.getByRole('dialog', { name: 'Site menu' });
    expect(trigger()).toHaveAttribute('aria-expanded', 'true');

    for (const group of navGroups) {
      expect(within(dialog).getByText(group.label)).toBeInTheDocument();
      for (const column of group.columns) {
        for (const link of column.links) {
          expect(
            within(dialog)
              .getAllByRole('link', { name: link.label })
              .some((node) => node.getAttribute('href') === link.href),
          ).toBe(true);
        }
      }
    }
  });

  it('locks page scroll while open and restores it on close', () => {
    render(<MobileNav groups={navGroups} />);

    fireEvent.click(trigger());
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on Escape', () => {
    render(<MobileNav groups={navGroups} />);
    fireEvent.click(trigger());

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when a nav link is followed', () => {
    render(<MobileNav groups={navGroups} />);
    fireEvent.click(trigger());

    const first = navGroups[0];
    expect(first).toBeDefined();
    fireEvent.click(screen.getByRole('link', { name: new RegExp(first!.hubLabel, 'i') }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
