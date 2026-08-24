import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const psat: ExamContent = {
  path: '/test-prep/psat',
  name: 'PSAT',
  seo: {
    title: 'PSAT preparation in Bangladesh — digital adaptive practice & tutoring',
    description:
      'PSAT courses in Dhaka and Chattogram, plus live online cohorts. Full-length adaptive mocks, National Merit prep and a written score guarantee.',
  },
  hero: {
    eyebrow: 'University readiness and National Merit',
    title: 'The PSAT score that opens scholarship doors.',
    intro:
      'Digital and adaptive, just like the SAT, but taken in October to a national scoresheet. We prepare you to qualify for National Merit, to understand your college readiness, and to lay a foundation for the SAT itself.',
    actions: [
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, adaptive · 2h 45m' },
      { label: 'Sections', value: 'Reading & Writing · Math' },
      { label: 'Scored', value: '320–1520' },
      { label: 'Sittings', value: 'October administration' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch:
        'Complete preparation on your own clock, for students who like to learn independently.',
      price: bdtPrice(15000),
      priceUnit: 'one-off · 4 months of access',
      facts: ['45+ hours of video', 'Self-scheduled'],
      includes: [
        'Adaptive practice covering all tested skills',
        '3 full-length adaptive mocks',
        'Reading, Writing and Math drill banks',
        'Email support from a PSAT instructor',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'The classroom course taught live to a small cohort, from anywhere in the world.',
      price: bdtPrice(28000),
      priceUnit: 'per 8-week cohort',
      facts: ['28 taught hours', 'Max 12 students', 'Evenings & weekends'],
      includes: [
        'Live classes with a named instructor',
        '6 full-length adaptive mocks, reviewed',
        'Weekly homework with feedback',
        'Recording access and revision materials',
      ],
      href: '/contact',
    },
    {
      name: 'Classroom',
      pitch: 'On campus, aiming at National Merit qualification and SAT readiness.',
      price: bdtPrice(42000),
      priceUnit: 'per 8-week cohort',
      facts: ['36 taught hours', 'Max 10 students', 'Gulshan · Dhanmondi · Chattogram'],
      includes: [
        'Everything in LiveOnline, taught in person',
        '8 full-length proctored mocks',
        'National Merit strategy session',
        'Written score guarantee and free SAT prep',
      ],
      href: '/contact',
      featured: true,
    },
  ],
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that readies you for college.',
    intro:
      'The PSAT is adaptive, so it adapts to you in real time. Practising on static worksheets teaches nothing about adapting under pressure, so every mock in our courses is adaptive, timed and scored the same way College Board scores you.',
    items: [
      {
        title: 'Adaptive full-length mocks',
        desc: 'Every practice test changes its second half based on your first, scored exactly as the PSAT scores yours. That is the only way to practise what you will see.',
      },
      {
        title: 'National Merit pathway',
        desc: 'We map your state cutoff, set a realistic target, and walk you through qualification strategy so you know what score gets you into the programme.',
      },
      {
        title: 'SAT bridge curriculum',
        desc: 'PSAT covers the same content as the SAT — we use it as a roadmap, so you are building skills that carry straight into junior year SAT prep.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+80', label: 'Average score gain from diagnostic to exit' },
    { value: '1380', label: 'Median score in our Classroom courses' },
    { value: '8', label: 'Full-length adaptive mocks per cohort' },
    { value: '94%', label: 'Achieve or exceed their agreed target' },
  ],
  testimonials: ['test-prep', 'undergraduate'],
  faq: [
    {
      question: 'Is the PSAT really adaptive?',
      answer:
        'Yes. Your second half adapts to your first, just like the SAT. Practising on non-adaptive tests teaches nothing about the real pressure, so all our mocks are fully adaptive and timed.',
    },
    {
      question: 'When should I start PSAT preparation?',
      answer:
        'Eight to ten weeks before October test day is ideal for a 100–150 point gain. Start earlier if you are aiming for National Merit or if your diagnostic falls below 1000.',
    },
    {
      question: 'What is National Merit and do I need to qualify?',
      answer:
        'National Merit is a scholarship programme. Qualification cutoffs vary by state. We help you understand whether National Merit is reachable for you and map the exact score you need.',
    },
    ...commonFaq,
  ],
};
