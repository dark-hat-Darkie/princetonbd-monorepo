import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const onlineSelfPaced: ProgramContent = {
  path: '/online-courses/self-paced',
  seo: {
    title: 'Self-paced online prep — study on your own schedule',
    description:
      'Self-paced online courses with lifetime access. Video lessons, problem sets and full-length mocks for test prep and school subjects.',
  },
  hero: {
    eyebrow: 'Self-paced online courses',
    title: 'Your curriculum, your calendar.',
    intro:
      'Not every student can attend live every Tuesday at 6 p.m. Self-paced courses give you the entire syllabus in video, problem sets and mocks—watch it all in three weeks if you need to, or spread it over ten.',
    actions: [
      { label: 'View courses', href: '/contact' },
      { label: 'Want live instead?', href: '/online-courses/live-online', variant: 'outline' },
    ],
    facts: [
      { label: 'Access', value: 'Lifetime access to all videos' },
      { label: 'Pace', value: 'Yours entirely—fast-track or take ten weeks' },
      { label: 'Support', value: 'Email support and optional live reviews' },
      { label: 'Cost', value: 'One-off purchase, watch forever' },
    ],
  },
  features: {
    eyebrow: 'What self-paced gives you',
    title: 'Expert content, your schedule.',
    intro:
      'The trade-off: you lose real-time teaching and peer interaction, but you gain absolute flexibility. For the motivated student with an unpredictable calendar, that’s worth it.',
    items: [
      {
        title: 'Sliced by topic, not by session',
        desc: 'Videos are 8–15 minutes—one concept per video. Master quadratics, then move on. No artificial pacing waiting for classmates.',
      },
      {
        title: 'Downloadable problem sets',
        desc: 'Every topic has a problem set. Print them, solve them, then check the video solution. Optionally email to a tutor for feedback—10 USD per set.',
      },
      {
        title: 'Full-length practice mocks',
        desc: 'Three mocks, downloadable and printable. Solve under timed conditions, then watch the scored review—question by question, your errors explained.',
      },
      {
        title: 'For students who learn by repetition',
        desc: 'Watch a video twice, three times if you need to. That’s not possible in live class. Pause, rewind, or watch at 1.5x speed.',
      },
    ],
  },
  process: {
    eyebrow: 'How self-paced learning works',
    title: 'Start today, learn on your terms.',
    steps: [
      {
        no: '01',
        title: 'Purchase and register',
        desc: 'Buy the course and create your account. You’ll receive a welcome video that maps the curriculum and suggests a study calendar.',
      },
      {
        no: '02',
        title: 'Watch and solve',
        desc: 'Work through the video lessons and problem sets at your pace. Most students spend 60–90 minutes per topic.',
      },
      {
        no: '03',
        title: 'Optional tutoring',
        desc: 'Email a problem set for feedback (10 USD per set), or skip it entirely. The core course is complete without additional support.',
      },
      {
        no: '04',
        title: 'Mock and review',
        desc: 'Sit the three full-length mocks under timed conditions. Watch the video review, identify your patterns, then circle back to those topics.',
      },
    ],
  },
  formats: [
    {
      name: 'Single subject',
      pitch: 'One exam or one school subject—everything you need for that topic.',
      price: bdtPrice(12000),
      priceUnit: 'one-time purchase, lifetime access',
      facts: ['Lifetime access', '30+ video lessons', 'Three full-length mocks'],
      includes: [
        'Full-syllabus video curriculum',
        'Downloadable problem sets with video solutions',
        'Three full-length practice exams',
        'Scored review for every mock',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Test prep bundle',
      pitch: 'SAT plus Subject Test, or GRE plus GMAT—the two tests that make sense together.',
      price: bdtPrice(18000),
      priceUnit: 'one-time purchase, lifetime access',
      facts: ['Two exams', '50+ video lessons', 'Six full-length mocks'],
      includes: [
        'Everything in two single subjects',
        'Six full-length mocks total',
        'Discount coupon for tutoring reviews (20 USD per 3 sets)',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '73%', label: 'Complete the full course within 12 weeks' },
    { value: '4.6/5', label: 'Course satisfaction rating' },
    { value: '500+', label: 'Practice problems across all topics' },
    { value: 'Lifetime', label: 'Access—rewatch anytime' },
  ],
  testimonials: ['online', 'test-prep'],
  faq: [
    {
      question: 'Can I ask questions if I get stuck on a concept?',
      answer:
        'Yes. Email us your problem set or a screenshot of your stuck point, and a tutor will respond within 24 hours. If it needs video explanation, we add that to your course.',
    },
    {
      question: 'Is self-paced harder than live classes?',
      answer:
        'Different, not harder. You lose the social push and the instructor answering questions in real time, but you can rewatch concepts as many times as you need. Self-paced suits independent learners.',
    },
    {
      question: 'What if I want to sit with an instructor sometimes?',
      answer:
        'You can purchase optional tutoring reviews—10 USD per problem set, or 20 USD for three sets. A tutor scores your set and records a 10-minute video explaining your errors.',
    },
    ...commonFaq,
  ],
};
