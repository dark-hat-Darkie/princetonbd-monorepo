import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ApplicationsPage from '@/app/(app)/dashboard/applications/page';
import CoursesPage from '@/app/(app)/dashboard/courses/page';
import ResourcesPage from '@/app/(app)/dashboard/resources/page';
import SchedulePage from '@/app/(app)/dashboard/schedule/page';
import ScoresPage from '@/app/(app)/dashboard/scores/page';
import { student } from '@/content/dashboard/student';
import { portalLinks } from './portal-nav';
import { PortalLinks } from './portal-links';
import { ScoreChart } from './score-chart';

vi.mock('next/navigation', () => ({ usePathname: () => '/dashboard/scores' }));

/**
 * The five portal pages that render from the student record alone. Overview and
 * Settings read the session and are covered end to end rather than here.
 */
describe('portal pages', () => {
  it('Courses lists every enrolment with its syllabus', () => {
    render(<CoursesPage />);

    for (const course of student.courses) {
      expect(screen.getByRole('heading', { name: course.name })).toBeInTheDocument();
      for (const unit of course.modules) {
        expect(screen.getByText(unit.title)).toBeInTheDocument();
      }
    }
  });

  it('Schedule lists every session and every open task', () => {
    render(<SchedulePage />);

    for (const session of student.sessions) {
      expect(screen.getByText(session.title)).toBeInTheDocument();
    }
    for (const task of student.tasks.filter((t) => !t.done)) {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    }
  });

  /** Completed work should not reappear as outstanding. */
  it('Schedule leaves finished tasks out of the deadline list', () => {
    render(<SchedulePage />);

    for (const task of student.tasks.filter((t) => t.done)) {
      expect(screen.queryByText(task.title)).not.toBeInTheDocument();
    }
  });

  it('Scores publishes the figures as a real table, not only as a chart', () => {
    render(<ScoresPage />);

    const table = screen.getByRole('table');
    for (const score of student.scores) {
      expect(within(table).getByRole('rowheader', { name: score.label })).toBeInTheDocument();
      expect(within(table).getAllByText(String(score.total)).length).toBeGreaterThan(0);
    }
  });

  it('Applications marks exactly one stage as current per application', () => {
    render(<ApplicationsPage />);

    const current = screen.getAllByText('— current stage', { exact: false });
    expect(current).toHaveLength(student.applications.length);
  });

  it('Resources lists every shared item', () => {
    render(<ResourcesPage />);

    for (const resource of student.resources) {
      expect(screen.getByText(resource.title)).toBeInTheDocument();
    }
  });
});

describe('ScoreChart', () => {
  it('describes itself for anyone not reading the plot', () => {
    render(<ScoreChart scores={student.scores} target={student.targetScore} />);

    const figure = screen.getByRole('img');
    expect(figure).toHaveAccessibleName(/mock scores from 1180 to 1380/i);
    expect(figure).toHaveAccessibleName(/target of 1450/i);
  });

  it('asks for a second sitting rather than drawing a line through one point', () => {
    render(<ScoreChart scores={student.scores.slice(0, 1)} target={1450} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/two full-length mocks/i)).toBeInTheDocument();
  });
});

describe('PortalLinks', () => {
  it('marks only the current page', () => {
    render(<PortalLinks links={portalLinks} />);

    const current = screen.getAllByRole('link').filter((a) => a.getAttribute('aria-current'));
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute('href', '/dashboard/scores');
  });
});
