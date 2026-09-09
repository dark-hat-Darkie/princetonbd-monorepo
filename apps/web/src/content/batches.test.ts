import { describe, expect, it } from 'vitest';

import { allExams } from './exams';
import { instructors } from './people';
import { campuses } from './site/contact';
import { batchById, batchesFor, enrolHref, nextBatch, batches } from './batches';

/**
 * The checks an admin form would do on a batch, run against the static rows
 * instead: every reference resolves, every date is a date, every run belongs
 * to an exam that actually offers that mode.
 */
const now = new Date('2026-09-09T00:00:00+06:00');
const examSlugs = new Set(allExams.map((exam) => exam.slug));
const campusNames = new Set(campuses.map((campus) => campus.name));
const facultyNames = new Set(instructors.map((instructor) => instructor.name));
const DAY = /^\d{4}-\d{2}-\d{2}$/;

describe('batches', () => {
  it('have unique ids', () => {
    const ids = batches.map((batch) => batch.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(batches)('$id belongs to a real exam, campus and instructor', (batch) => {
    expect(examSlugs.has(batch.examSlug)).toBe(true);

    if (batch.mode === 'LiveOnline') {
      expect(batch.campus).toBeNull();
    } else {
      expect(batch.campus).not.toBeNull();
      expect(campusNames.has(batch.campus ?? '')).toBe(true);
    }

    if (batch.instructor) expect(facultyNames.has(batch.instructor)).toBe(true);
  });

  it.each(batches)('$id runs in a mode its exam offers', (batch) => {
    const exam = allExams.find((entry) => entry.slug === batch.examSlug);
    expect(exam?.modes).toContain(batch.mode);
  });

  it.each(batches)('$id has well-formed dates that run forwards', (batch) => {
    expect(batch.startsOn).toMatch(DAY);
    expect(batch.endsOn).toMatch(DAY);
    expect(batch.startsOn < batch.endsOn).toBe(true);
  });

  it.each(batches)('$id only reports seats when they can be taken', (batch) => {
    if (batch.seatsLeft !== undefined) {
      expect(['open', 'filling']).toContain(batch.status);
      expect(batch.seatsLeft).toBeGreaterThan(0);
    }
  });

  it('gives every exam at least one upcoming batch', () => {
    for (const exam of allExams) {
      expect(batchesFor(exam.slug, now).length).toBeGreaterThan(0);
    }
  });

  it('lists upcoming batches soonest first and drops finished ones', () => {
    for (const exam of allExams) {
      const upcoming = batchesFor(exam.slug, now);
      const starts = upcoming.map((batch) => batch.startsOn);
      expect(starts).toEqual([...starts].sort());
      for (const batch of upcoming) expect(batch.endsOn >= '2026-09-09').toBe(true);
    }

    const afterEverything = new Date('2030-01-01T00:00:00+06:00');
    expect(batchesFor('ielts', afterEverything)).toEqual([]);
    expect(nextBatch('ielts', afterEverything)).toBeUndefined();
  });

  it('builds an enquiry link the contact page can read back', () => {
    const exam = allExams.find((entry) => entry.slug === 'ielts')!;
    const batch = nextBatch('ielts', now)!;
    const href = enrolHref(exam, batch);

    expect(href.startsWith('/contact?')).toBe(true);
    const params = new URLSearchParams(href.slice('/contact?'.length));
    expect(params.get('interest')).toBe(exam.interest);
    expect(params.get('campus')).toBe(batch.campus);
    expect(batchById(params.get('batch') ?? '')).toBe(batch);
  });

  it('omits the campus from an online run’s enquiry link', () => {
    const exam = allExams.find((entry) => entry.slug === 'lsat')!;
    const href = enrolHref(exam, nextBatch('lsat', now));
    expect(new URLSearchParams(href.slice('/contact?'.length)).has('campus')).toBe(false);
  });
});
