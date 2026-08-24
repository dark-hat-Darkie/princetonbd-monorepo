import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { navGroups } from '@/content/site/nav';
import { PrimaryNav } from './primary-nav';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('PrimaryNav', () => {
  const first = navGroups[0]!;
  const triggerFor = (label: string) => screen.getByRole('button', { name: label });

  it('renders one collapsed trigger per section', () => {
    render(<PrimaryNav groups={navGroups} />);

    for (const group of navGroups) {
      expect(triggerFor(group.label)).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('opens a panel holding the hub link and every child link', () => {
    render(<PrimaryNav groups={navGroups} />);
    fireEvent.click(triggerFor(first.label));

    expect(triggerFor(first.label)).toHaveAttribute('aria-expanded', 'true');

    const panelId = triggerFor(first.label).getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId!);
    expect(panel).not.toBeNull();

    expect(
      within(panel!).getByRole('link', { name: new RegExp(first.hubLabel, 'i') }),
    ).toHaveAttribute('href', first.href);

    for (const column of first.columns) {
      for (const link of column.links) {
        expect(within(panel!).getByRole('link', { name: link.label })).toHaveAttribute(
          'href',
          link.href,
        );
      }
    }
  });

  it('closes on Escape and puts focus back on the trigger', () => {
    render(<PrimaryNav groups={navGroups} />);
    fireEvent.click(triggerFor(first.label));

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(triggerFor(first.label)).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(triggerFor(first.label));
  });

  it('closes when a pointer lands outside the nav', () => {
    render(<PrimaryNav groups={navGroups} />);
    fireEvent.click(triggerFor(first.label));

    fireEvent.pointerDown(document.body);

    expect(triggerFor(first.label)).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens only one panel at a time', () => {
    render(<PrimaryNav groups={navGroups} />);
    const second = navGroups[1]!;

    fireEvent.click(triggerFor(first.label));
    fireEvent.click(triggerFor(second.label));

    expect(triggerFor(first.label)).toHaveAttribute('aria-expanded', 'false');
    expect(triggerFor(second.label)).toHaveAttribute('aria-expanded', 'true');
  });
});
