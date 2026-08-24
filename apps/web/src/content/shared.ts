/**
 * Content reused across many pages: the guarantee, the outcome figures, the
 * student quotes and the default closing call to action.
 *
 * These are marketing claims. They are illustrative placeholders and must be
 * replaced with audited figures before launch — see `docs` in the plan. Keeping
 * them in one module means that is one edit, not sixty.
 */

import type { ClosingContent, FaqItem, Feature, Stat, Testimonial } from './types';

export const guaranteeBand = {
  eyebrow: 'The guarantee',
  title: 'Reach your target score, or study again — free.',
  body: 'We stake our reputation on your result. Complete your course and mock schedule; if you don’t hit the agreed target, your next full course is on us.',
  action: { label: 'Claim your assessment', href: '/free-diagnostic' },
  features: [
    'Faculty trained on top global university curricula',
    'A written score-improvement guarantee',
    'Full-length adaptive mock tests, scored & reviewed',
    'Small cohorts with measured weekly progress',
  ],
} as const;

export const outcomeStats: readonly Stat[] = [
  { value: '12k+', label: 'Students coached across Bangladesh' },
  { value: '+210', label: 'Average SAT point improvement' },
  { value: '94%', label: 'Admitted to a top-choice university' },
  { value: '40yrs', label: 'Of test-prep teaching heritage' },
];

/**
 * Every quote we hold, tagged with the pages it belongs on.
 *
 * `testimonialsFor` picks from here rather than each page carrying its own
 * copies, so a quote that has to come down comes down everywhere at once.
 */
export const testimonialPool: readonly Testimonial[] = [
  {
    initials: 'NR',
    name: 'Nafisa Rahman',
    result: 'SAT 1540 · NUS, Singapore',
    quote:
      'The mock cycle felt harder than the real exam — by test day I was calm. My counselor knew exactly which schools fit me.',
    tags: ['sat', 'test-prep', 'admissions', 'undergraduate'],
  },
  {
    initials: 'TA',
    name: 'Tanvir Ahmed',
    result: 'GRE 328 · MS, University of Toronto',
    quote:
      'I went from a 305 diagnostic to 328 in ten weeks. The quant sessions completely changed how I approach problems.',
    tags: ['gre', 'test-prep', 'graduate', 'canada'],
  },
  {
    initials: 'SK',
    name: 'Sadia Karim',
    result: 'IELTS 8.0 · Imperial College London',
    quote:
      'The speaking labs were the difference. Weekly examiner-style feedback took me from a 6.5 to an 8.0.',
    tags: ['ielts', 'test-prep', 'english', 'uk'],
  },
  {
    initials: 'MH',
    name: 'Mahin Hossain',
    result: 'ACT 34 · University of Michigan',
    quote:
      'Section drills were relentless in the best way. My science score went from 27 to 34 without me ever feeling lost.',
    tags: ['act', 'test-prep', 'undergraduate', 'usa'],
  },
  {
    initials: 'FI',
    name: 'Farhana Islam',
    result: 'GMAT 730 · MBA, INSEAD',
    quote:
      'I was working full time. The evening cohort and the recorded reviews made a 730 possible without quitting my job.',
    tags: ['gmat', 'test-prep', 'business', 'online'],
  },
  {
    initials: 'RA',
    name: 'Rafid Anwar',
    result: 'Full scholarship · University of Toronto',
    quote:
      'My counselor found three scholarships I did not know existed and rebuilt my essay around what they actually fund.',
    tags: ['admissions', 'financial-aid', 'study-abroad', 'canada'],
  },
  {
    initials: 'TZ',
    name: 'Tasnim Zaman',
    result: 'TOEFL 112 · University of Melbourne',
    quote:
      'Two tutors, one for writing and one for speaking, in the same week. That is what took me past 110.',
    tags: ['toefl', 'test-prep', 'english', 'tutoring', 'australia'],
  },
  {
    initials: 'AK',
    name: 'Ayan Kabir',
    result: 'A-Level Maths A* · Imperial College London',
    quote:
      'Weekly one-to-one sessions rebuilt my foundations. By the mocks I was solving problems I could not read six months earlier.',
    tags: ['tutoring', 'math', 'uk'],
  },
];

/** Quotes tagged with any of `tags`, capped so a grid stays three across. */
export function testimonialsFor(tags: readonly string[], limit = 3): readonly Testimonial[] {
  if (tags.length === 0) return [];

  return testimonialPool
    .filter((testimonial) => testimonial.tags?.some((tag) => tags.includes(tag)))
    .slice(0, limit);
}

export const defaultClosing: ClosingContent = {
  eyebrow: 'Begin',
  title: 'Your seat at a great university starts with one conversation.',
  body: 'Book a free consultation and diagnostic. We’ll map your target schools, timeline and score plan — no obligation.',
  action: { label: 'Book a free consultation', href: '/contact' },
};

/** The four reasons that appear, in some form, on nearly every programme page. */
export const whyUs: readonly Feature[] = [
  {
    title: 'Expert faculty',
    desc: 'Instructors are selected on their own scores and trained for over 40 hours before they teach a single class.',
  },
  {
    title: 'Adaptive practice',
    desc: 'Full-length mocks scored the way the real exam scores, with a review session on every paper you sit.',
  },
  {
    title: 'Small cohorts',
    desc: 'Capped class sizes so your instructor knows your weak spots by name, not by spreadsheet.',
  },
  {
    title: 'Written guarantee',
    desc: 'Hit the target we agree at enrolment or study the whole course again — at no cost.',
  },
];

/** Questions asked on almost every course page, regardless of exam. */
export const commonFaq: readonly FaqItem[] = [
  {
    question: 'Where are your campuses?',
    answer:
      'We teach at Gulshan and Dhanmondi in Dhaka and at our Chattogram campus, and every course is also offered live online for students outside those cities.',
  },
  {
    question: 'Do you offer instalment plans?',
    answer:
      'Yes. Every course can be paid in two or three instalments at no extra cost. Talk to an enrolment advisor when you book your consultation.',
  },
  {
    question: 'What happens at the free consultation?',
    answer:
      'You sit a short diagnostic, we score it the same day, and a counselor walks you through a target score, a timetable and a shortlist of universities that fit your profile and budget.',
  },
];
