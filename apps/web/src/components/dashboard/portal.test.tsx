import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { portalLinkFor, portalLinks } from './portal-nav';
import { PortalLinks } from './portal-links';

vi.mock('next/navigation', () => ({ usePathname: () => '/dashboard/courses' }));

/**
 * The portal is down to three pages — Overview, My courses, Settings — all
 * reading live data. Overview and Settings read the session and are covered
 * end to end rather than here; My courses joins enrollments to the catalog in
 * `loadStudentCourses`, and the join itself is covered in
 * `src/lib/course-view.test.ts`.
 */
describe('PortalLinks', () => {
  it('lists exactly Overview, My courses and Settings', () => {
    expect(portalLinks.map((link) => link.href)).toEqual([
      '/dashboard',
      '/dashboard/courses',
      '/dashboard/settings',
    ]);
  });

  it('has no Applications, Schedule, Scores or Resources entry', () => {
    for (const href of [
      '/dashboard/applications',
      '/dashboard/schedule',
      '/dashboard/scores',
      '/dashboard/resources',
    ]) {
      expect(portalLinkFor(href)).toBeUndefined();
    }
    for (const label of ['Applications', 'Schedule', 'Scores', 'Resources']) {
      expect(portalLinks.some((link) => link.label === label)).toBe(false);
    }
  });

  it('marks only the current page', () => {
    render(<PortalLinks links={portalLinks} />);

    const current = screen.getAllByRole('link').filter((a) => a.getAttribute('aria-current'));
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute('href', '/dashboard/courses');
  });
});
