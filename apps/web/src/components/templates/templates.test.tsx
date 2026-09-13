import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { contactPage } from '@/content/company/lead-pages';
import { testPrepHub } from '@/content/hubs/test-prep';
import { privacyPolicy } from '@/content/legal/privacy';
import { tutoringPrivate } from '@/content/programs/tutoring-private';
import { toCourseView } from '@/lib/course-view';
import { formatPrice } from '@/lib/money';
import { courseDetailFixture } from '@/test/fixtures/course-detail';
import { ExamPage } from './exam-page';
import { HubPage } from './hub-page';
import { LeadPage } from './lead-page';
import { LegalPage } from './legal-page';
import { ProgramPage } from './program-page';

/* The enquiry form's Server Action reaches the CMS through `lib/cms`, which
   is `server-only`; stubbed so the template renders under jsdom. */
vi.mock('@/lib/cms', () => ({
  getBatch: vi.fn(),
  getBranches: vi.fn(),
}));

/**
 * Smoke tests: every template renders its real content record without throwing,
 * puts exactly one `h1` on the page, and shows the pieces a visitor came for.
 *
 * Deliberately shallow. These guard the wiring between content and template —
 * an optional block that renders when it should not, a field renamed on one
 * side only — not the prose, which is reviewed by eye.
 */
describe('page templates', () => {
  it('HubPage renders its heading, every card and the FAQ', () => {
    render(<HubPage content={testPrepHub} />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const card of testPrepHub.cards.items) {
      expect(screen.getByRole('heading', { name: card.title })).toBeInTheDocument();
    }
    for (const item of testPrepHub.faq ?? []) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it('ExamPage shows the fee, every curriculum module and every upcoming batch', () => {
    const course = toCourseView(courseDetailFixture);

    render(<ExamPage course={course} />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByText(formatPrice(course.fee.price)).length).toBeGreaterThan(0);

    for (const unit of course.curriculum.modules) {
      expect(screen.getByText(unit.title)).toBeInTheDocument();
    }

    expect(course.batches.length).toBeGreaterThan(0);
    for (const batch of course.batches) {
      expect(screen.getAllByText(batch.place).length).toBeGreaterThan(0);
      expect(screen.getAllByText(batch.schedule).length).toBeGreaterThan(0);
    }

    /* Named in the instructor strip and again on the batch rows. */
    for (const teacher of course.teachers) {
      expect(screen.getAllByText(teacher.name).length).toBeGreaterThan(0);
    }

    const reserve = screen.getByRole('link', { name: /reserve a seat/i });
    expect(reserve).toHaveAttribute('href', expect.stringContaining('interest='));
    expect(reserve).toHaveAttribute(
      'href',
      expect.stringContaining(`batch=${course.batches[0]!.id}`),
    );
  });

  it('ExamPage falls back to generic copy and hides empty sections without an overlay', () => {
    const bare = toCourseView({
      ...courseDetailFixture,
      modules: [],
      batches: [],
      teachers: [],
      testimonials: [],
    });

    render(<ExamPage course={bare} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SAT preparation.');
    expect(screen.getByText(/no dates published yet/i)).toBeInTheDocument();
    expect(screen.queryByText(/who teaches the/i)).toBeNull();
    /* Once in the fee card, once in the empty batch list. */
    expect(screen.getAllByRole('link', { name: /register interest/i }).length).toBeGreaterThan(0);
  });

  it('ProgramPage renders its process steps when the record has them', () => {
    render(<ProgramPage content={tutoringPrivate} />);

    for (const step of tutoringPrivate.process?.steps ?? []) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    }
  });

  it('LegalPage shows the last-updated date and no call to action', () => {
    render(<LegalPage content={privacyPolicy} />);

    expect(screen.getByText(/Last updated/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /book a free consultation/i })).toBeNull();
  });

  it('LeadPage renders a labelled, submittable enquiry form', () => {
    render(
      <LeadPage
        content={contactPage}
        campuses={[{ name: 'Dhaka — Gulshan', address: 'Road 1', phone: '+880 1700-000000' }]}
      />,
    );

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dhaka — Gulshan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request a call back/i })).toBeInTheDocument();
  });
});
