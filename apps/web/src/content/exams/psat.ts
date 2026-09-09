import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const psat: ExamContent = {
  path: '/test-prep/psat',
  slug: 'psat',
  name: 'PSAT',
  interest: 'SAT / ACT',
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
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, adaptive · 2h 14m' },
      { label: 'Sections', value: 'Reading & Writing · Math' },
      { label: 'Scored', value: '320–1520' },
      { label: 'Sittings', value: 'October administration' },
    ],
  },
  fee: {
    price: bdtPrice(42000),
    unit: 'per 8-week course',
    includes: [
      '36 taught hours in a class of ten or fewer',
      '8 full-length proctored adaptive mocks, scored and reviewed',
      'National Merit strategy session',
      'All materials and the online question bank',
      'Written score guarantee and free SAT prep',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Eight weeks, five modules, one October sitting.',
    intro:
      'The PSAT/NMSQT is the digital SAT in miniature: the same two sections, the same adaptive modules and the same question types on a 320–1520 scale. We teach the content once and the National Merit arithmetic alongside it, so every point lands where it counts.',
    totals: { weeks: 8, taughtHours: 36, mocks: 8, classSize: 'Max 10' },
    modules: [
      {
        no: '01',
        title: 'Digital format and adaptive modules',
        summary:
          'How the PSAT is built: two modules per section, a second module chosen by your first, and 2h 14m on the Bluebook app. Then a full-length diagnostic to find out where you stand.',
        topics: [
          'Section-adaptive scoring: why module 1 decides your ceiling',
          'Bluebook tools: the built-in calculator, annotation and flagging',
          'Full-length adaptive diagnostic under exam timing',
          'Your 320–1520 score map and a target by section',
        ],
        hours: 4,
        outcome:
          'Know your current score, your split by section and which question domains are costing you most.',
      },
      {
        no: '02',
        title: 'Reading & Writing',
        summary:
          'Short passages, one question each, across four domains: information and ideas, craft and structure, expression of ideas and standard English conventions.',
        topics: [
          'Central ideas, textual evidence and words in context',
          'Text structure, purpose and cross-text connections',
          'Transitions and rhetorical synthesis from notes',
          'Punctuation, agreement and sentence boundaries',
        ],
        hours: 10,
        outcome: 'Finish every Reading & Writing module with time to check your flagged questions.',
      },
      {
        no: '03',
        title: 'Maths',
        summary:
          'Algebra, advanced maths, problem solving and data analysis, and geometry and trigonometry, with the built-in calculator available throughout.',
        topics: [
          'Linear equations, inequalities and systems',
          'Quadratic, exponential and polynomial functions',
          'Ratios, percentages, statistics and probability',
          'Area, volume, right triangles and circles',
        ],
        hours: 10,
        outcome: 'Solve every Math item in under two minutes, with Desmos where it is faster.',
      },
      {
        no: '04',
        title: 'National Merit strategy',
        summary:
          'The Selection Index counts Reading & Writing twice, and students at schools outside the US are measured against a single international cutoff, so where you earn points matters as much as how many.',
        topics: [
          'The Selection Index: how a 320–1520 becomes a 48–228',
          'Cutoffs: why the international threshold sits near the top',
          'Where the next ten points are cheapest for you',
          'Eligibility, the October sitting and what follows a qualifying score',
        ],
        hours: 5,
        outcome:
          'Know your Selection Index, the cutoff you are chasing and the section that closes the gap fastest.',
      },
      {
        no: '05',
        title: 'Mock cycle and score report',
        summary:
          'Eight proctored adaptive mocks across the course, each one reviewed question by question, and how to read the score report that follows the October sitting.',
        topics: [
          'Weekly full-length adaptive mocks, scored 320–1520',
          'One-on-one review of your error journal and score trend',
          'Test-day set-up on Bluebook and school-day timing',
          'Reading the score report and carrying it into SAT prep',
        ],
        hours: 7,
        outcome:
          'Walk in knowing your score range and having sat the digital PSAT eight times already.',
      },
    ],
    outcomes: [
      'Sit the digital PSAT knowing how the adaptive modules will score you',
      'Know your Selection Index and how far it sits from the cutoff',
      'Handle every Reading & Writing and Math domain the SAT will test again',
      'Carry a scored error journal straight into SAT preparation',
    ],
  },
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
