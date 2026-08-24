import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { aboutPage } from '@/content/company/about';
import { contactPage } from '@/content/company/lead-pages';
import { allExams } from '@/content/exams';
import { destinationUsa } from '@/content/guides/destination-usa';
import { testPrepHub } from '@/content/hubs/test-prep';
import { privacyPolicy } from '@/content/legal/privacy';
import { tutoringPrivate } from '@/content/programs/tutoring-private';
import { formatPrice } from '@/lib/money';
import { CompanyPage } from './company-page';
import { ExamPage } from './exam-page';
import { GuidePage } from './guide-page';
import { HubPage } from './hub-page';
import { LeadPage } from './lead-page';
import { LegalPage } from './legal-page';
import { ProgramPage } from './program-page';

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

  it('ExamPage renders every format with its price', () => {
    render(<ExamPage content={allExams[0]!} />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const format of allExams[0]!.formats) {
      expect(screen.getByRole('heading', { name: format.name })).toBeInTheDocument();
      expect(screen.getByText(formatPrice(format.price))).toBeInTheDocument();
    }
  });

  it('ProgramPage renders its process steps when the record has them', () => {
    render(<ProgramPage content={tutoringPrivate} />);

    for (const step of tutoringPrivate.process?.steps ?? []) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    }
  });

  it('GuidePage renders the body headings and a contents rail linking to them', () => {
    render(<GuidePage content={destinationUsa} />);

    const toc = screen.getByRole('navigation', { name: 'On this page' });
    const headings = destinationUsa.body.filter((block) => block.type === 'heading');

    for (const heading of headings) {
      expect(within(toc).getByRole('link', { name: heading.text })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: heading.text })).toBeInTheDocument();
    }
  });

  it('CompanyPage renders without a body when the record omits one', () => {
    render(<CompanyPage content={{ ...aboutPage, body: undefined }} />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('LegalPage shows the last-updated date and no call to action', () => {
    render(<LegalPage content={privacyPolicy} />);

    expect(screen.getByText(/Last updated/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /book a free consultation/i })).toBeNull();
  });

  it('LeadPage renders a labelled, submittable enquiry form', () => {
    render(<LeadPage content={contactPage} />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request a call back/i })).toBeInTheDocument();
  });
});
