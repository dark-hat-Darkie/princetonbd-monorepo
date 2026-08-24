import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const subjectMath: ProgramContent = {
  path: '/tutoring/subjects/math',
  seo: {
    title: 'Mathematics tutoring — O-Level, A-Level, IB, AP, national curriculum',
    description:
      'Expert mathematics tutoring across every curriculum: pure maths, mechanics, statistics and applied. One tutor rebuilds your foundations so algebra is intuitive again.',
  },
  hero: {
    eyebrow: 'Mathematics tutoring',
    title: 'Where equations start to make sense.',
    intro:
      'You didn’t forget how to do algebra; you never built the intuition underneath it. A mathematics tutor rebuilds foundations, then drills the techniques until they’re automatic enough that you think about strategy, not mechanics.',
    actions: [
      { label: 'Book a diagnostic', href: '/contact' },
      { label: 'See all subjects', href: '/tutoring', variant: 'outline' },
    ],
    facts: [
      { label: 'Topics', value: 'Pure, mechanics, statistics, applied' },
      { label: 'Pace', value: 'Follows your mock scores, not the calendar' },
      { label: 'Delivery', value: 'On campus or live online' },
      { label: 'Specialties', value: 'Algebraic intuition and past paper drilling' },
    ],
  },
  features: {
    eyebrow: 'What our mathematics tutors do',
    title: 'More than marking right answers.',
    intro:
      'The difference between a 6 and an 8 is almost never "know more formulae". It’s intuition. Seeing why a cubic factors, or what a derivative tells you about the curve.',
    items: [
      {
        title: 'Foundations first',
        desc: 'We map where your algebra intuition broke down—years ago, usually—then rebuild it so quadratics and indices feel obvious.',
      },
      {
        title: 'Strategic problem-solving',
        desc: 'Past papers are not a grind: each problem is marked up with which technique the examiner wants you to see, so you learn to spot them in the real exam.',
      },
      {
        title: 'Proof and reasoning',
        desc: 'A-Level proof questions and IB problem-solving demand a different mindset. Your tutor teaches you to read the question for clues, not just apply formulae.',
      },
      {
        title: 'Mock analysis',
        desc: 'Every mock is scored by question type. You see patterns in what trips you up—whether it’s time pressure, reading misses or conceptual gaps.',
      },
    ],
  },
  stats: [
    { value: '87%', label: 'Improve one grade band in their first term' },
    { value: '4.9/5', label: 'Mathematics tutor ratings' },
    { value: '12 weeks', label: 'Average time to close a one-grade gap' },
    { value: '3 mocks', label: 'Scored and reviewed before the real exam' },
  ],
  testimonials: ['tutoring', 'math'],
  faq: [
    {
      question: 'Is the Bangladeshi national maths curriculum different from A-Level?',
      answer:
        'Yes—our national curriculum emphasises basic numerical computation and applied problems; A-Level is proof-heavy and more abstract. We tutor both, and our tutors know where the overlaps are.',
    },
    {
      question: 'Should I take pure maths and applied, or just pure?',
      answer:
        'That’s your school’s call, but our tutors teach both. If you’re doing pure and mechanics, we schedule them back-to-back so the tutor can cross-reference—that integration saves time.',
    },
    {
      question: 'What about IB HL mathematics? Is it harder than A-Level?',
      answer:
        'Different, not harder. HL goes deeper into calculus and statistics but is less proof-heavy. Our IB specialists know the curriculum cold and the tricks examiners like.',
    },
    ...commonFaq,
  ],
};
