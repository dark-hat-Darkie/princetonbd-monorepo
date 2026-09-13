import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { announcement } from '@/content/site/announcement';
import { navGroups } from '@/content/site/nav';
import MarketingLayout from './layout';

/* The layout asks the CMS for the branch list (for structured data); stubbed
   so the test needs no API. */
vi.mock('@/lib/cms', () => ({
  getBranches: vi.fn().mockResolvedValue([]),
}));

/**
 * The chrome moved out of the page and into this layout, so the landmark and
 * navigation assertions moved with it. `page.test.tsx` covers the sections.
 *
 * The layout is an async Server Component: it is awaited for its element
 * tree and that tree is rendered, since Testing Library cannot render an
 * async component directly.
 */
describe('Marketing layout', () => {
  const renderLayout = async () => render(await MarketingLayout({ children: <p>page body</p> }));

  it('renders the document landmarks around its children', async () => {
    await renderLayout();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(within(screen.getByRole('main')).getByText('page body')).toBeInTheDocument();
    // The skip link belongs to the root layout, not this one.
  });

  it('renders one mega-menu trigger per nav section', async () => {
    await renderLayout();
    const primary = screen.getByRole('navigation', { name: 'Primary' });

    for (const group of navGroups) {
      expect(within(primary).getByRole('button', { name: group.label })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
  });

  it('renders the announcement bar above the header', async () => {
    await renderLayout();

    expect(screen.getByText(announcement.emphasis)).toBeInTheDocument();
  });
});
