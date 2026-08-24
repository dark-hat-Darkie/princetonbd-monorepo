import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const onlineLive: ProgramContent = {
  path: '/online-courses/live-online',
  seo: {
    title: 'Live online courses — test prep and school subjects',
    description:
      'Instructor-led live online courses in SAT, GRE, IELTS and school subjects. Real-time teaching, breakout rooms and recorded sessions kept for the full term.',
  },
  hero: {
    eyebrow: 'Live online courses',
    title: 'Taught live. Recorded forever.',
    intro:
      'An instructor teaches to a classroom of fifteen students, same time every week. You attend live when it suits, or watch the recording later—both get you the same education.',
    actions: [
      { label: 'Browse courses', href: '/contact' },
      { label: 'Is live online right for me?', href: '/tutoring/online', variant: 'outline' },
    ],
    facts: [
      { label: 'Class size', value: '10–15 students per cohort' },
      { label: 'Format', value: 'Real-time live instruction plus recorded' },
      { label: 'Duration', value: '90 minutes per week, 10 weeks' },
      { label: 'Flexibility', value: 'Attend live or watch the recording same-day' },
    ],
  },
  features: {
    eyebrow: 'Why live online works',
    title: 'Classroom learning, geography-proof.',
    intro:
      'Most students learn better with a live instructor. Real-time questions, seeing other students struggle with what confused you, the social dynamic of a classroom—now without the commute.',
    items: [
      {
        title: 'Real-time interaction',
        desc: 'Your hand goes up, the instructor calls on you, and a doubt that would have festered gets cleared up in two minutes. Try that with recorded courses.',
      },
      {
        title: 'Breakout rooms for problem-solving',
        desc: 'Three students get a practice problem, solve it together, then come back and teach the rest of the class. Peer teaching cements understanding.',
      },
      {
        title: 'Pacing adjusted live',
        desc: 'If the cohort’s stuck on quadratics, we spend an extra ten minutes. Your cohort moves together at the pace of its understanding.',
      },
      {
        title: 'Recordings for gap-filling',
        desc: 'You missed last week’s session? Watch the recording and catch up. Fall ill during the unit test? Review that section again before sitting a make-up.',
      },
    ],
  },
  process: {
    eyebrow: 'How live online courses work',
    title: 'From registration to your first class.',
    steps: [
      {
        no: '01',
        title: 'Select your course',
        desc: 'Browse our live online roster—SAT, GRE, IELTS, school subjects—and pick a start date that fits your timeline.',
      },
      {
        no: '02',
        title: 'Join the cohort',
        desc: 'We send you the Zoom link and a password-protected portal with the syllabus, session notes and recordings as they post.',
      },
      {
        no: '03',
        title: 'Attend live or later',
        desc: 'Show up for the live session if you can. If not, the recording posts within an hour and stays in your portal for the rest of the term.',
      },
      {
        no: '04',
        title: 'Practice and mock',
        desc: 'Weekly problem sets are due before the next session. Mid-term and final mocks are scored and reviewed the same week.',
      },
    ],
  },
  formats: [
    {
      name: 'Essentials cohort',
      pitch: 'Seven weeks, foundations only. For students starting from a low base.',
      price: bdtPrice(22000),
      priceUnit: 'per student, per cohort',
      facts: ['Seven weeks', '10–15 students', 'Recorded sessions kept'],
      includes: [
        'Two full-length mocks, scored and reviewed',
        'Weekly problem sets, reviewed in class',
        'Session recordings available for 12 months',
        'Access to past paper library',
      ],
      href: '/contact',
    },
    {
      name: 'Standard cohort',
      pitch: 'Ten weeks, full curriculum. The most popular choice.',
      price: bdtPrice(32000),
      priceUnit: 'per student, per cohort',
      facts: ['Ten weeks', '10–15 students', 'Adaptive pacing'],
      includes: [
        'Everything in Essentials',
        'Three full-length mocks, scored and reviewed',
        'Breakout rooms for peer problem-solving',
        'Unlimited access to the cohort Slack channel',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Premium cohort',
      pitch: 'Twelve weeks plus tutoring. For students aiming for the highest scores.',
      price: bdtPrice(45000),
      priceUnit: 'per student, per cohort',
      facts: ['Twelve weeks', '8–10 students', 'One-on-one review included'],
      includes: [
        'Everything in Standard',
        'Four full-length mocks',
        'Two 30-minute private review sessions',
        'Priority support during live sessions',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '88%', label: 'Achieve their target score within one term' },
    { value: '4.8/5', label: 'Course satisfaction rating' },
    { value: '12–15', label: 'Students per live cohort' },
    { value: '92%', label: 'Attendance rate—both live and recorded' },
  ],
  testimonials: ['online', 'test-prep'],
  faq: [
    {
      question: 'What if I miss a live session?',
      answer:
        'The recording is ready within an hour. Watch it at your own pace, and send your problem set by the deadline—we’ll score it when we score the group’s.',
    },
    {
      question: 'Can I attend some weeks live and some recorded?',
      answer:
        'Yes, absolutely. Many students attend live when work or school allows, then watch recordings other weeks. There’s no penalty either way.',
    },
    {
      question: 'How large are the cohorts? Will I be ignored in a huge Zoom?',
      answer:
        'Capped at 15, usually running 10–12. Small enough that the instructor can call on you by name or notice you’re stuck. Large enough to create the peer-learning dynamic.',
    },
    ...commonFaq,
  ],
};
