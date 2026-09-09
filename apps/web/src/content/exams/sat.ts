import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const sat: ExamContent = {
  path: '/test-prep/sat',
  slug: 'sat',
  name: 'SAT',
  interest: 'SAT / ACT',
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
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, adaptive · 2h 14m' },
      { label: 'Sections', value: 'Reading & Writing · Math' },
      { label: 'Scored', value: '400–1600' },
      { label: 'Sittings', value: '7 international dates a year' },
    ],
  },
  fee: {
    price: bdtPrice(45000),
    unit: 'per 10-week course',
    includes: [
      '48 taught hours in a class of ten or fewer',
      '10 proctored full-length adaptive mocks, scored and reviewed',
      'Two 1-on-1 strategy sessions',
      'All materials and the online question bank',
      'Written 1400+ score guarantee',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, seven modules, both test halves covered.',
    intro:
      'Reading & Writing and Math are taught in parallel from week one, because the adaptive engine scores them separately and a weak half caps the whole. Every module ends with a timed module pair so you know your section score before the next one starts.',
    totals: { weeks: 10, taughtHours: 48, mocks: 10, classSize: 'Max 10' },
    modules: [
      {
        no: '01',
        title: 'Diagnostic and the adaptive format',
        summary:
          'How the digital SAT builds your score: two modules per section, a second module chosen by your first, and 2h 14m on the Bluebook app. Then a full-length diagnostic to find out where you stand.',
        topics: [
          'Section-adaptive scoring: why module 1 decides your ceiling',
          'Bluebook tools: the built-in calculator, annotation and flagging',
          'Full-length adaptive diagnostic under exam timing',
          'Your score map and a 1400+ target by section',
        ],
        hours: 4,
        outcome:
          'Know your current 400–1600 score, your split by section and which question domains are costing you most.',
      },
      {
        no: '02',
        title: 'Reading & Writing: evidence and craft',
        summary:
          'Short passages, one question each, 27 per module. The Information and Ideas and Craft and Structure domains, and the reasoning each one rewards.',
        topics: [
          'Central ideas, details and command of textual evidence',
          'Words in context: precision over familiarity',
          'Text structure, purpose and cross-text connections',
          'Quantitative evidence: tables and graphs inside passages',
        ],
        hours: 8,
        outcome:
          'Answer evidence questions by elimination against the passage, not by instinct, at 71 seconds a question.',
      },
      {
        no: '03',
        title: 'Standard English conventions',
        summary:
          'The most learnable marks on the test: grammar, punctuation and sentence structure, plus the Expression of Ideas questions on transitions and rhetorical synthesis.',
        topics: [
          'Boundaries: commas, semicolons, colons and dashes',
          'Subject–verb and pronoun agreement, verb tense and form',
          'Transitions that follow the logic of the passage',
          'Rhetorical synthesis: matching notes to a stated goal',
        ],
        hours: 6,
        outcome: 'Miss no more than one conventions question per module.',
      },
      {
        no: '04',
        title: 'Algebra and advanced maths',
        summary:
          'Linear equations, systems and inequalities, then the nonlinear content that separates a 650 from a 750: quadratics, exponentials, polynomials and functions.',
        topics: [
          'Linear equations, inequalities and systems in one and two variables',
          'Quadratic and exponential functions, roots and vertex form',
          'Polynomial and rational expressions, equivalent forms',
          'Using the built-in Desmos calculator to solve, not just check',
        ],
        hours: 8,
        outcome:
          'Solve any algebra or advanced maths item in under two minutes, with Desmos where it is faster.',
      },
      {
        no: '05',
        title: 'Problem solving and data analysis',
        summary:
          'Ratios, rates, percentages and statistics, together with the geometry and trigonometry that make up the rest of the Math section.',
        topics: [
          'Ratios, rates, proportions and units',
          'Percentages, one- and two-variable data, centre and spread',
          'Probability, sampling and inference from data',
          'Area, volume, circles, right triangles and trigonometry',
        ],
        hours: 7,
        outcome:
          'Read a word problem once and set up the model before you reach for the calculator.',
      },
      {
        no: '06',
        title: 'Module-2 strategy and pacing',
        summary:
          'How to bank the easy marks fast so the engine hands you the harder, higher-scoring second module, and what to do when it does.',
        topics: [
          'Pacing plans for the 32-minute and 35-minute modules',
          'Guessing, flagging and coming back: no penalty, no wasted seconds',
          'Reading the harder module: what changes and what does not',
          'Error journals: categorising every miss by cause',
        ],
        hours: 6,
        outcome:
          'Reach the harder second module in both sections and finish it with time to check your flags.',
      },
      {
        no: '07',
        title: 'Full-length mock cycle and review',
        summary:
          'Ten proctored adaptive mocks across the course, each one reviewed question by question, and your test-day plan.',
        topics: [
          'Weekly full-length adaptive mocks, scored 400–1600',
          'One-on-one review of your error journal and score trend',
          'Registration, Bluebook set-up and device checks',
          'Score choice, superscoring and which sitting to send',
        ],
        hours: 9,
        outcome:
          'Walk in knowing your score range and having sat the digital SAT ten times already.',
      },
    ],
    outcomes: [
      'Sit the digital SAT knowing how the adaptive engine will score you',
      'Finish every Reading & Writing module with time to check flagged questions',
      'Solve the full range of Math domains with and without the calculator',
      'Know your 400–1600 range before you book the real test',
    ],
  },
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
