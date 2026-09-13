import { describe, expect, it } from 'vitest';

import type { ExamEditorial } from '@/content/types';
import { courseDetailFixture } from '@/test/fixtures/course-detail';
import { initialsOf, toCourseView } from './course-view';

describe('toCourseView', () => {
  const view = toCourseView(courseDetailFixture);

  it('maps the fee and curriculum into the shapes the sections take', () => {
    expect(view.fee.price).toEqual({ amount: 45000, currency: 'BDT' });
    expect(view.fee.unit).toBe('per 10-week course');
    expect(view.fee.notes?.length).toBeGreaterThan(0);
    expect(view.curriculum.modules.map((m) => m.no)).toEqual(['01', '02']);
    expect(view.curriculum.modules[1]).toMatchObject({ hours: undefined, outcome: undefined });
    expect(view.curriculum.totals).toEqual({
      weeks: 10,
      taughtHours: 48,
      mocks: 10,
      classSize: 'Max 10',
    });
  });

  it('renders each batch with its place, schedule line and fee override', () => {
    const [classroom, online] = view.batches;
    expect(classroom).toMatchObject({
      place: 'Dhaka — Gulshan',
      schedule: 'Sat · Mon · Wed, 6:30–8:30 pm',
      teacherName: 'Dr. Imran Chowdhury',
      fee: null,
    });
    expect(online).toMatchObject({
      place: 'Live online',
      schedule: 'Fri · Sat, 10:00 am–1:00 pm',
      teacherName: null,
      fee: { amount: 32000, currency: 'BDT' },
    });
  });

  it('derives monograms for teachers and testimonials', () => {
    expect(view.teachers[0]?.initials).toBe('DI');
    expect(view.testimonials[0]?.initials).toBe('NR');
    expect(initialsOf('Farzana Haque')).toBe('FH');
    expect(initialsOf('')).toBe('·');
  });

  it('falls back to generic copy when there is no editorial overlay', () => {
    expect(view.hero.title).toBe('SAT preparation.');
    expect(view.hero.intro).toBe(courseDetailFixture.description);
    expect(view.interest).toBe('Something else');
    expect(view.faq.length).toBeGreaterThan(0);
    expect(view.seo.title).toMatch(/^SAT preparation in Bangladesh/);
    expect(view.path).toBe('/test-prep/sat');
  });

  it('prefers the overlay wherever one is written', () => {
    const overlay: ExamEditorial = {
      slug: 'sat',
      interest: 'SAT / ACT',
      seo: { title: 'Custom title', description: 'Custom description' },
      hero: { eyebrow: 'Undergraduate admissions', title: 'Custom hero', intro: 'Intro' },
      includes: { eyebrow: 'x', title: 'y', items: [] },
      faq: [{ question: 'Q', answer: 'A' }],
      curriculum: { title: 'Ten weeks, seven modules.' },
      stats: [{ value: '+210', label: 'Average point improvement' }],
    };
    const custom = toCourseView(courseDetailFixture, overlay);

    expect(custom.hero.title).toBe('Custom hero');
    expect(custom.interest).toBe('SAT / ACT');
    expect(custom.curriculum.title).toBe('Ten weeks, seven modules.');
    expect(custom.curriculum.eyebrow).toBe('Curriculum');
    expect(custom.faq).toEqual([{ question: 'Q', answer: 'A' }]);
    expect(custom.stats?.[0]?.value).toBe('+210');
  });
});
