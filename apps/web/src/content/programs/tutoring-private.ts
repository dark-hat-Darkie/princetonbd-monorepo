import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const tutoringPrivate: ProgramContent = {
  path: '/tutoring/private',
  seo: {
    title: 'Private 1-on-1 tutoring in Bangladesh — any exam, any subject',
    description:
      'One tutor, one student, one syllabus built around your gaps. Private tutoring for SAT, GRE, IELTS and school subjects, on campus in Dhaka and Chattogram or online.',
  },
  hero: {
    eyebrow: 'Private tutoring',
    title: 'A syllabus with exactly one student on it.',
    intro:
      'No cohort to keep pace with, no topic covered because the schedule said so. Your tutor teaches what your last mock says you need, and re-plans every fortnight.',
    actions: [
      { label: 'Request a tutor', href: '/contact' },
      { label: 'See our subjects', href: '/tutoring', variant: 'outline' },
    ],
    facts: [
      { label: 'Ratio', value: '1 tutor : 1 student' },
      { label: 'Sessions', value: '90 minutes, scheduled by you' },
      { label: 'Where', value: 'On campus, at home or online' },
      { label: 'Minimum', value: '10-hour package' },
    ],
  },
  features: {
    eyebrow: 'Why 1-on-1',
    title: 'What a class of one gets you.',
    intro:
      'Group teaching is efficient and, for most students, enough. Private tutoring earns its price in three specific situations.',
    items: [
      {
        title: 'A very uneven profile',
        desc: 'When quant is already at target and verbal is thirty points behind, a cohort spends half your time on things you have already mastered.',
      },
      {
        title: 'A compressed timeline',
        desc: 'Six weeks to a test date does not fit a ten-week cohort. A private plan cuts straight to the highest-yield material.',
      },
      {
        title: 'A schedule that will not bend',
        desc: 'A-Level mocks, a job, a family commitment. Sessions move to fit your week rather than the other way round.',
      },
      {
        title: 'A very high target',
        desc: 'Getting from 1450 to 1550 is a different problem from getting to 1450, and it is solved question by question.',
      },
    ],
  },
  process: {
    eyebrow: 'How it works',
    title: 'From first call to first session in a week.',
    steps: [
      {
        no: '01',
        title: 'Diagnostic',
        desc: 'A full-length test, scored and broken down by question type.',
      },
      {
        no: '02',
        title: 'Tutor match',
        desc: 'We pair you on subject, target and how you like to be taught.',
      },
      {
        no: '03',
        title: 'A written plan',
        desc: 'Session-by-session, with the target and the date it is measured.',
      },
      {
        no: '04',
        title: 'Fortnightly re-plan',
        desc: 'The plan follows your mocks, not the other way round.',
      },
    ],
  },
  formats: [
    {
      name: '10-hour package',
      pitch: 'A focused push on one or two weak areas before a test date already in the diary.',
      price: bdtPrice(45000),
      priceUnit: 'per 10 hours',
      facts: ['10 hours', '1-on-1', 'Valid 3 months'],
      includes: [
        'Diagnostic and written plan',
        'Session notes after every meeting',
        'Mock scoring and review',
        'Message your tutor between sessions',
      ],
      href: '/contact',
    },
    {
      name: '20-hour package',
      pitch: 'The usual choice: enough time to rebuild a section rather than patch it.',
      price: bdtPrice(85000),
      priceUnit: 'per 20 hours',
      facts: ['20 hours', '1-on-1', 'Valid 6 months'],
      includes: [
        'Everything in the 10-hour package',
        'Fortnightly re-planning against your mocks',
        'Unlimited mock scoring',
        'Priority scheduling',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: '40-hour package',
      pitch:
        'Full preparation from a standing start, with a second tutor where a subject calls for one.',
      price: bdtPrice(160000),
      priceUnit: 'per 40 hours',
      facts: ['40 hours', '1-on-1', 'Valid 12 months'],
      includes: [
        'Everything in the 20-hour package',
        'A second specialist tutor at no extra cost',
        'Full mock series with proctoring',
        'Written score guarantee',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '1:1', label: 'Every session, every hour' },
    { value: '40hrs', label: 'Minimum tutor training before teaching' },
    { value: '14 days', label: 'Between plan reviews' },
    { value: '4.9/5', label: 'Average tutor rating' },
  ],
  testimonials: ['tutoring'],
  faq: [
    {
      question: 'Can I split the hours between two subjects?',
      answer:
        'Yes, and on the 40-hour package we will assign a specialist to each rather than asking one tutor to cover both. There is no extra charge for the second tutor.',
    },
    {
      question: 'What if the tutor is not the right fit?',
      answer:
        'Tell us after the first session and we will rematch you and refund that hour. It happens occasionally and it is not a problem.',
    },
    {
      question: 'Do you tutor school subjects as well as admissions tests?',
      answer:
        'Yes — mathematics, the sciences, English and social studies across the O-Level, A-Level, IB and national curricula, as well as AP subjects.',
    },
    ...commonFaq,
  ],
};
