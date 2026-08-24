import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const sat: ExamContent = {
  path: '/test-prep/sat',
  name: 'SAT',
  seo: {
    title: 'SAT preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'SAT courses in Dhaka and Chattogram, plus live online cohorts. Adaptive full-length mocks, a written score guarantee and instructors who scored in the top percentile themselves.',
  },
  hero: {
    eyebrow: 'Undergraduate admissions',
    title: 'The SAT score your shortlist actually needs.',
    intro:
      'Digital, adaptive and unforgiving of guesswork. We teach the test the way it is now scored — module by module — and prove the gain with full-length mocks before you ever sit the real thing.',
    actions: [
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, adaptive · 2h 14m' },
      { label: 'Sections', value: 'Reading & Writing · Math' },
      { label: 'Scored', value: '400–1600' },
      { label: 'Sittings', value: '7 international dates a year' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch: 'The full syllabus on your own clock, for students who prefer to set their own pace.',
      price: bdtPrice(18000),
      priceUnit: 'one-off · 6 months of access',
      facts: ['60+ hours of video', 'Self-scheduled'],
      includes: [
        'Every lesson recorded and searchable',
        '4 full-length adaptive mock tests',
        'Question bank with worked solutions',
        'Email support from an SAT instructor',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'The classroom course, taught live to a small cohort, from wherever you are.',
      price: bdtPrice(32000),
      priceUnit: 'per 10-week cohort',
      facts: ['36 taught hours', 'Max 12 students', 'Evenings & weekends'],
      includes: [
        'Live classes with a named instructor',
        '8 full-length adaptive mock tests, reviewed',
        'Weekly homework marked and returned',
        'Recordings of every session you miss',
      ],
      href: '/contact',
    },
    {
      name: 'Classroom 1400+',
      pitch: 'Our flagship course, on campus, aimed squarely at a 1400 and above.',
      price: bdtPrice(45000),
      priceUnit: 'per 10-week cohort',
      facts: ['48 taught hours', 'Max 10 students', 'Gulshan · Dhanmondi · Chattogram'],
      includes: [
        'Everything in LiveOnline, taught in person',
        '10 proctored full-length mocks',
        'Two 1-on-1 strategy sessions',
        'Written 1400+ score guarantee',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Private Tutoring',
      pitch: 'One instructor, one student, one syllabus built entirely around your gaps.',
      price: bdtPrice(85000),
      priceUnit: 'per 20-hour package',
      facts: ['20 hours', '1-on-1', 'On campus or online'],
      includes: [
        'Diagnostic-led plan rebuilt every fortnight',
        'Unlimited mock scoring and review',
        'Direct line to your tutor between sessions',
        'Scheduling around your school calendar',
      ],
      href: '/contact',
    },
  ],
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that survives contact with the real exam.',
    intro:
      'The digital SAT adapts to you mid-test. Practising on static paper papers does not prepare you for that, so ours adapt too.',
    items: [
      {
        title: 'Adaptive mocks',
        desc: 'Full-length tests that change their second module based on your first, scored exactly as College Board scores them.',
      },
      {
        title: 'Module strategy',
        desc: 'How to bank the easy marks fast so the adaptive engine hands you the harder — and higher-scoring — second module.',
      },
      {
        title: 'Error journals',
        desc: 'Every wrong answer is categorised, not just corrected, so the same mistake stops recurring by week four.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+210', label: 'Average point improvement' },
    { value: '1450', label: 'Median score of our 1400+ cohort' },
    { value: '10', label: 'Full-length mocks in the classroom course' },
    { value: '94%', label: 'Hit or beat their agreed target' },
  ],
  testimonials: ['sat', 'undergraduate'],
  faq: [
    {
      question: 'Digital or paper — which SAT will I sit?',
      answer:
        'Every SAT worldwide is now digital and adaptive, taken on the Bluebook app. All our practice is on adaptive full-length tests that mirror it, not on retired paper papers.',
    },
    {
      question: 'How long before my test date should I start?',
      answer:
        'Ten to twelve weeks is the sweet spot for a 100–250 point gain. Start earlier if you are aiming past 1500 or if your diagnostic comes back below 1100 — we will tell you honestly at the consultation.',
    },
    {
      question: 'Should I take the SAT or the ACT?',
      answer:
        'Sit a diagnostic of each — we run both free — and prepare for whichever you score better on relative to its curve. Universities in the US treat them identically.',
    },
    {
      question: 'How does the score guarantee work?',
      answer:
        'We agree a target in writing at enrolment based on your diagnostic. Attend your classes, sit your scheduled mocks, and if the official score falls short, your next full course is free.',
    },
    ...commonFaq,
  ],
};
