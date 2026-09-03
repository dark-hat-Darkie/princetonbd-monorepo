/**
 * Landing page content.
 *
 * Transcribed verbatim from `renderVals()` in the design source
 * (`Princeton Review BD.dc.html`). Kept as typed constants so copy changes are
 * a single edit and the page stays statically renderable.
 *
 * Site-wide content — navigation, footer, contact details, the announcement
 * bar — lives in `content/site/` instead: it is rendered by the marketing
 * layout on every page, not by this one.
 */

import type { GridCard, Stat, Step, Testimonial } from './types';

/** The exam strip between the hero and the programs grid. */
export const exams = ['SAT · ACT', 'GRE · GMAT', 'IELTS · TOEFL', 'Common App', 'UCAS'] as const;

/* Each card links to the hub or exam page that sells it. The cards render as
   real links, with a hover lift and an arrow — a card that looks clickable and
   is not is the worst of both. */
export const programs: readonly GridCard[] = [
  {
    no: '01',
    tag: 'Undergraduate',
    title: 'SAT & ACT',
    desc: 'Intensive prep for undergraduate admissions, with adaptive mocks and section strategy tailored to your target score.',
    meta: 'On-campus · Live online',
    href: '/test-prep/sat',
  },
  {
    no: '02',
    tag: 'Graduate',
    title: 'GRE & GMAT',
    desc: 'Quant, verbal and analytical mastery for MS, MBA and PhD applicants aiming at competitive graduate programs.',
    meta: '10-week cohorts',
    href: '/test-prep/gre',
  },
  {
    no: '03',
    tag: 'English proficiency',
    title: 'IELTS & TOEFL',
    desc: 'Band-focused coaching across all four modules, with speaking labs and examiner-style feedback every week.',
    meta: 'Flexible batches',
    href: '/test-prep/ielts',
  },
  {
    no: '04',
    tag: 'Advisory',
    title: 'Admissions Counseling',
    desc: 'A dedicated counselor for your shortlist, essays, recommendations, financial aid and interview preparation.',
    meta: '1-on-1 mentorship',
    href: '/admissions',
  },
  {
    no: '05',
    tag: 'Placement',
    title: 'Study Abroad',
    desc: 'End-to-end guidance for the US, UK, Canada and beyond — applications, visas and pre-departure support.',
    meta: 'US · UK · CA · AU',
    href: '/study-abroad',
  },
  {
    no: '06',
    tag: 'Personalized',
    title: '1-on-1 Tutoring',
    desc: 'Private tutoring built entirely around your weak spots, schedule and pace — for any exam or subject.',
    meta: 'By appointment',
    href: '/tutoring/private',
  },
];

/**
 * Guarantee band rows. The design numbered these with a 0-based `$index`
 * (`0{{ $index }}`), which rendered 00–03 while every other numbered list in
 * the design starts at 01. Treated as an authoring slip and corrected — the
 * component derives the label from the array position.
 */
export const features = [
  'Faculty trained on top global university curricula',
  'A written score-improvement guarantee',
  'Full-length adaptive mock tests, scored & reviewed',
  'Small cohorts with measured weekly progress',
] as const;

export const steps: readonly Step[] = [
  { no: '01', title: 'Profile & shortlist', desc: 'Match schools to your goals and budget.' },
  { no: '02', title: 'Essays & applications', desc: 'Craft and polish every submission.' },
  { no: '03', title: 'Aid & scholarships', desc: 'Maximize funding opportunities.' },
  { no: '04', title: 'Visa & departure', desc: 'Interview prep and onboarding.' },
];

export const stats: readonly Stat[] = [
  { value: '12k+', label: 'Students coached across Bangladesh' },
  { value: '+210', label: 'Average SAT point improvement' },
  { value: '94%', label: 'Admitted to a top-choice university' },
  { value: '40yrs', label: 'Of test-prep teaching heritage' },
];

export const testimonials: readonly Testimonial[] = [
  {
    initials: 'NR',
    name: 'Nafisa Rahman',
    result: 'SAT 1540 · NUS, Singapore',
    quote:
      'The mock cycle felt harder than the real exam — by test day I was calm. My counselor knew exactly which schools fit me.',
  },
  {
    initials: 'TA',
    name: 'Tanvir Ahmed',
    result: 'GRE 328 · MS, University of Toronto',
    quote:
      'I went from a 305 diagnostic to 328 in ten weeks. The quant sessions completely changed how I approach problems.',
  },
  {
    initials: 'SK',
    name: 'Sadia Karim',
    result: 'IELTS 8.0 · Imperial College London',
    quote:
      'The speaking labs were the difference. Weekly examiner-style feedback took me from a 6.5 to an 8.0.',
  },
];

export const admits = [
  'Harvard',
  'MIT',
  'Stanford',
  'Oxford',
  'Cambridge',
  'NUS',
  'Toronto',
  'NYU',
  'Imperial',
  'UC Berkeley',
] as const;

/**
 * The marquee track is the list twice over. The animation translates the track
 * by exactly -50%, so at the end of a cycle the second copy sits precisely
 * where the first began and the loop is seamless. Changing one without the
 * other produces a visible jump.
 */
export const marquee = [...admits, ...admits];

/* ---------------------------------------------------------------------------
 * Section copy.
 *
 * The design carried these strings inline in the components. They move here
 * with everything else so the whole page reads as one document, and so the
 * shared section components can stay presentational.
 * ------------------------------------------------------------------------- */

export const examStripKicker = 'Preparation for';

export const programsSection = {
  eyebrow: 'Our programs',
  title: 'One academy for every step of the journey abroad.',
  action: { label: 'View all courses', href: '/test-prep' },
} as const;

export const guarantee = {
  eyebrow: 'The guarantee',
  title: 'Reach your target score, or study again — free.',
  body: 'We stake our reputation on your result. Complete your course and mock schedule; if you don’t hit the agreed target, your next full course is on us.',
  action: { label: 'Claim your assessment', href: '/free-diagnostic' },
} as const;

export const studyAbroadSection = {
  image: '/images/counselling.jpg',
  imageAlt: 'A counselor working through an application with a student',
  eyebrow: 'Admissions & study abroad',
  title: 'From shortlist to visa — a dedicated counselor at every turn.',
  body: 'Essays, recommendations, financial aid, interviews. Your counselor builds a university list matched to your profile and budget, then guides every application to submission.',
} as const;

export const testimonialsSection = {
  eyebrow: 'Student outcomes',
  title: 'Where our students are headed.',
} as const;

export const admitsKicker = 'Our students have earned places at';

export const closing = {
  eyebrow: 'Begin',
  title: 'Your seat at a great university starts with one conversation.',
  body: 'Book a free consultation and diagnostic. We’ll map your target schools, timeline and score plan — no obligation.',
  action: { label: 'Book a free consultation', href: '/contact' },
} as const;
