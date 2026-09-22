import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';

import { forgetSearches } from '@/lib/recent-searches';
import {
  ANY,
  ONLINE_KEY,
  placeOptions,
  popularSearches,
  type ScheduleBatch,
  type ScheduleCourse,
  type ScheduleSelection,
} from '@/lib/schedule';
import { BatchFinder } from './batch-finder';

const ielts: ScheduleCourse = {
  slug: 'ielts',
  name: 'IELTS',
  path: '/test-prep/ielts',
  interest: 'IELTS / TOEFL',
  price: { amount: 18000, currency: 'BDT' },
};
const sat: ScheduleCourse = {
  ...ielts,
  slug: 'sat',
  name: 'SAT',
  path: '/test-prep/sat',
  interest: 'SAT / ACT',
  price: { amount: 42000, currency: 'BDT' },
};

let n = 0;
function batch(
  course: ScheduleCourse,
  placeKey: string,
  startsOn: string,
  extra: Partial<ScheduleBatch> = {},
): ScheduleBatch {
  n += 1;
  const online = placeKey === ONLINE_KEY;
  return {
    id: `b${String(n)}`,
    mode: online ? 'live_online' : 'classroom',
    branch: online ? null : { name: 'Dhaka — Gulshan', address: null },
    place: online ? 'Live online' : 'Dhaka — Gulshan',
    startsOn,
    endsOn: '2026-12-20',
    days: ['sat', 'mon', 'wed'],
    startTime: '18:30',
    endTime: '20:30',
    schedule: 'Sat · Mon · Wed, 6:30–8:30 pm',
    status: 'open',
    seatsLeft: null,
    teacherName: null,
    fee: null,
    course,
    placeKey,
    ...extra,
  };
}

const batches = [
  batch(ielts, 'gulshan', '2026-10-01'),
  batch(sat, 'gulshan', '2026-10-03', { status: 'waitlist' }),
  batch(ielts, ONLINE_KEY, '2026-10-05', { fee: { amount: 15000, currency: 'BDT' } }),
  batch(ielts, 'gulshan', '2026-10-08', { status: 'filling', seatsLeft: 3 }),
];

const places = placeOptions([{ slug: 'gulshan', name: 'Dhaka — Gulshan' }]);
const courses = [
  { key: 'ielts', label: 'IELTS' },
  { key: 'sat', label: 'SAT' },
];

function renderFinder(initial: ScheduleSelection = ANY) {
  return render(
    <BatchFinder
      batches={batches}
      places={places}
      courses={courses}
      popular={popularSearches(batches)}
      initial={initial}
    />,
  );
}

const resultCards = () =>
  screen
    .getAllByRole('listitem')
    .filter((item) => within(item).queryByRole('link', { name: /enrol|join waitlist/i }));

let replaceState: MockInstance;

beforeEach(() => {
  window.localStorage.clear();
  replaceState = vi.spyOn(window.history, 'replaceState').mockImplementation(() => undefined);
  Element.prototype.scrollIntoView = vi.fn();
  /* jsdom has no matchMedia; the finder asks it about reduced motion. */
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: () => ({ matches: false }) as MediaQueryList,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  forgetSearches();
});

describe('BatchFinder', () => {
  it('lists every batch, numbered, with an enrol link carrying the batch into checkout', () => {
    renderFinder();

    expect(screen.getByRole('status')).toHaveTextContent('4 batches');
    const cards = resultCards();
    expect(cards).toHaveLength(4);
    expect(cards[0]).toHaveTextContent('01');
    expect(cards[0]).toHaveTextContent('IELTS');
    expect(cards[0]).toHaveTextContent('1 October 2026');
    expect(cards[0]).toHaveTextContent('6:30–8:30 pm');
    expect(cards[0]).toHaveTextContent('Sat · Mon · Wed');

    const enrol = within(cards[0]!).getByRole('link', { name: 'Enrol' });
    expect(enrol.getAttribute('href')).toContain('/enroll?');
    expect(enrol.getAttribute('href')).toContain('course=ielts');
    expect(enrol.getAttribute('href')).toContain('batch=b1');
  });

  it('words the waitlist, the seat count and a batch-specific fee', () => {
    renderFinder();
    const cards = resultCards();

    expect(within(cards[1]!).getByRole('link', { name: 'Join waitlist' })).toBeInTheDocument();
    expect(cards[2]).toHaveTextContent('৳15,000');
    expect(cards[2]).toHaveTextContent('online rate');
    expect(cards[3]).toHaveTextContent('Filling fast · 3 left');
  });

  it('starts from the selection the server parsed out of the URL', () => {
    renderFinder({ branch: ONLINE_KEY, course: 'ielts' });

    expect(screen.getByLabelText('Campus')).toHaveValue(ONLINE_KEY);
    expect(screen.getByLabelText('Course')).toHaveValue('ielts');
    expect(screen.getByRole('status')).toHaveTextContent('1 IELTS batch live online');
    expect(resultCards()).toHaveLength(1);
  });

  it('re-filters as the selectors change and mirrors the selection into the URL', () => {
    renderFinder();

    fireEvent.change(screen.getByLabelText('Course'), { target: { value: 'sat' } });
    expect(screen.getByRole('status')).toHaveTextContent('1 SAT batch');
    expect(replaceState).toHaveBeenLastCalledWith(null, '', '/batch-schedule?course=sat');

    fireEvent.change(screen.getByLabelText('Campus'), { target: { value: ONLINE_KEY } });
    expect(screen.getByRole('status')).toHaveTextContent('0 SAT batches live online yet');
    expect(screen.getByText(/nothing scheduled live online for SAT yet/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Register interest' })).toHaveAttribute(
      'href',
      '/contact?interest=SAT+%2F+ACT',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByRole('status')).toHaveTextContent('4 batches');
    expect(replaceState).toHaveBeenLastCalledWith(null, '', '/batch-schedule');
  });

  it('shows how many batches each option would leave, given the other selector', () => {
    renderFinder();

    expect(screen.getByRole('option', { name: 'IELTS (3)' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Campus'), { target: { value: ONLINE_KEY } });
    expect(screen.getByRole('option', { name: 'IELTS (1)' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'SAT (0)' })).toBeInTheDocument();
  });

  it('ranks popular searches by batch count and applies one on click', () => {
    renderFinder();
    const popular = within(screen.getByRole('region', { name: 'Popular searches' }));

    const top = popular.getAllByRole('link')[0]!;
    expect(top).toHaveTextContent('IELTS');
    expect(top).toHaveTextContent('Dhaka — Gulshan');
    expect(top).toHaveTextContent('02');
    expect(top).toHaveAttribute('href', '/batch-schedule?branch=gulshan&course=ielts');

    fireEvent.click(top);
    expect(screen.getByLabelText('Course')).toHaveValue('ielts');
    expect(screen.getByLabelText('Campus')).toHaveValue('gulshan');
    expect(top).toHaveAttribute('aria-current', 'true');
    expect(resultCards()).toHaveLength(2);
  });

  it('remembers a search in the browser and replays it', () => {
    renderFinder();
    expect(screen.queryByRole('region', { name: 'Recently searched' })).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Course'), { target: { value: 'sat' } });
    fireEvent.submit(screen.getByRole('form', { name: 'Find a batch' }));

    const recent = within(screen.getByRole('region', { name: 'Recently searched' }));
    const entry = recent.getByRole('link');
    expect(entry).toHaveTextContent('SAT');
    expect(entry).toHaveTextContent('Any campus');

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByLabelText('Course')).toHaveValue('');

    fireEvent.click(entry);
    expect(screen.getByLabelText('Course')).toHaveValue('sat');

    fireEvent.click(recent.getByRole('button', { name: 'Clear' }));
    expect(screen.queryByRole('region', { name: 'Recently searched' })).not.toBeInTheDocument();
  });
});
