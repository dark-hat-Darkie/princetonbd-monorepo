import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { announcement } from '@/content/site/announcement';
import { navGroups } from '@/content/site/nav';
import MarketingLayout from './layout';

/**
 * The chrome moved out of the page and into this layout, so the landmark and
 * navigation assertions moved with it. `page.test.tsx` covers the sections.
 */
describe('Marketing layout', () => {
  const renderLayout = () => render(<MarketingLayout>{<p>page body</p>}</MarketingLayout>);

  it('renders the document landmarks around its children', () => {
    renderLayout();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(within(screen.getByRole('main')).getByText('page body')).toBeInTheDocument();
    // The skip link belongs to the root layout, not this one.
  });

  it('renders one mega-menu trigger per nav section', () => {
    renderLayout();
    const primary = screen.getByRole('navigation', { name: 'Primary' });

    for (const group of navGroups) {
      expect(within(primary).getByRole('button', { name: group.label })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
  });

  it('renders the announcement bar above the header', () => {
    renderLayout();

    expect(screen.getByText(announcement.emphasis)).toBeInTheDocument();
  });
});
