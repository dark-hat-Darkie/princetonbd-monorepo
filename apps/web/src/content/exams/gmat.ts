import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const gmat: ExamContent = {
  path: '/test-prep/gmat',
  slug: 'gmat',
  name: 'GMAT',
  interest: 'GRE / GMAT',
  seo: {
    title: 'GMAT preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'GMAT Focus Edition courses in Dhaka and Chattogram, plus live online cohorts. Adaptive full-length mocks, a written score guarantee and instructors who scored in the top percentile themselves.',
  },
  hero: {
    eyebrow: 'MBA and business school admissions',
    title: 'The GMAT score your MBA shortlist expects.',
    intro:
      'The GMAT measures your ability to solve problems under time pressure using the tools an MBA student actually needs. We teach the new Focus Edition the way business schools score it, prove it with full-length mocks, and guarantee the result.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, on demand · 2h 15m' },
      { label: 'Sections', value: 'Quantitative · Verbal · Data Insights' },
      { label: 'Scored', value: '205–805' },
      { label: 'Sittings', value: 'Sit as often as you need throughout the year' },
    ],
  },
  fee: {
    price: bdtPrice(52000),
    unit: 'per 8-week course',
    includes: [
      '48 taught hours in a class of eight or fewer',
      '12 proctored full-length Focus Edition mocks, reviewed',
      'Two 1-on-1 strategy sessions',
      'All materials and the online question bank',
      'Written 700+ score guarantee',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Eight weeks, six modules, all three Focus Edition sections.',
    intro:
      'The Focus Edition is three 45-minute sections, no essay, and a score out of 805. We teach it exactly as GMAC scores it, with a timed section at the end of every module so you know where you stand before the next one starts.',
    totals: { weeks: 8, taughtHours: 48, mocks: 12, classSize: 'Max 8' },
    modules: [
      {
        no: '01',
        title: 'Focus Edition anatomy',
        summary:
          'Three sections, 64 questions, 2h 15m. How question-level adaptivity works, what Review & Edit lets you change, and where your diagnostic lands.',
        topics: [
          'Quant 21 · Verbal 23 · Data Insights 20: what each section asks',
          'Question adaptivity and why the early questions matter',
          'Review & Edit: bookmarking and the three-answer change limit',
          'Full-length diagnostic, scored 205–805',
        ],
        hours: 4,
        outcome: 'Know your three section scores and the question types that cost you most.',
      },
      {
        no: '02',
        title: 'Quantitative reasoning',
        summary:
          'Twenty-one problem-solving questions in 45 minutes, no calculator and no geometry. Arithmetic and algebra at speed.',
        topics: [
          'Number properties, fractions, percents and ratios',
          'Algebra: equations, inequalities, exponents and functions',
          'Word problems: rates, work, mixtures and sets',
          'Counting, probability and statistics',
        ],
        hours: 12,
        outcome:
          'Finish all 21 questions in 45 minutes with mental arithmetic that does not slow you down.',
      },
      {
        no: '03',
        title: 'Verbal reasoning',
        summary:
          'Twenty-three questions of reading comprehension and critical reasoning. Sentence correction is gone; argument logic carries the section.',
        topics: [
          'Passage mapping for short and long passages',
          'Inference, main idea and function questions',
          'Critical reasoning: assumption, strengthen, weaken, evaluate',
          'Boldface and resolve-the-paradox questions',
        ],
        hours: 10,
        outcome:
          'Read once, hold the argument’s structure in your head and pick answers on evidence.',
      },
      {
        no: '04',
        title: 'Data insights',
        summary:
          'The section most candidates underestimate: twenty questions across five formats, with the on-screen calculator.',
        topics: [
          'Data sufficiency: solving for whether, not what',
          'Multi-source reasoning and table analysis',
          'Graphics interpretation and two-part analysis',
          'Using the calculator without wasting time on it',
        ],
        hours: 10,
        outcome: 'Move between five question formats without losing pace or accuracy.',
      },
      {
        no: '05',
        title: 'Section order and pacing strategy',
        summary:
          'You choose your section order and take one optional break. Pacing plans for each order, and when to bookmark and move on.',
        topics: [
          'Choosing a section order to match your stamina and strengths',
          'Per-question time budgets and checkpoints',
          'Guessing strategy and the penalty for unanswered questions',
          'The ten-minute break and how to use it',
        ],
        hours: 4,
        outcome: 'Have a section order and pacing plan you have rehearsed and trust.',
      },
      {
        no: '06',
        title: 'Mock cycle and score review',
        summary:
          'Full-length Focus Edition mocks in exam conditions, each reviewed question by question, and your test-day plan.',
        topics: [
          'Weekly full-length mocks, scored 205–805',
          'Error log review by question type and cause',
          'Reading the score report and acting on it',
          'Test centre vs online delivery, booking and score sending',
        ],
        hours: 8,
        outcome: 'Walk in having sat the Focus Edition twelve times with your score range known.',
      },
    ],
    outcomes: [
      'Sit all three sections in the order you chose, at full pace, with bookmarks used well',
      'Solve Quant without a calculator and Data Insights with one, without losing time',
      'Read critical reasoning arguments the way GMAC writes them',
      'Know your score range before you book the real test',
    ],
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation built for the Focus Edition.',
    intro:
      'The new GMAT is shorter and sharper — emphasis moved to data interpretation and away from pure grammar. We teach the three-section structure the way Pearson scores it, using full-length mocks, not exercises.',
    items: [
      {
        title: 'Focus Edition mocks',
        desc: 'Full-length tests using the current three-section format, scored exactly as business schools receive them.',
      },
      {
        title: 'Data Insights mastery',
        desc: 'The new section rewards speed and multi-source reasoning — we teach the move from single-question drills to full-page interpretation.',
      },
      {
        title: 'Error categorisation',
        desc: 'Every wrong answer goes into a weakness log so the same mistake stops recurring by week three.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+70', label: 'Average point improvement' },
    { value: '715', label: 'Median score of our 700+ cohort' },
    { value: '12', label: 'Full-length mocks in the classroom course' },
    { value: '93%', label: 'Hit or beat their agreed target' },
  ],
  testimonials: ['gmat', 'business'],
  faq: [
    {
      question: 'What is the GMAT Focus Edition?',
      answer:
        'Launched in 2024, it replaces the older format with a 2h15m exam focused on the skills MBA programmes actually use: quantitative reasoning, verbal reasoning and a new Data Insights section. Nearly every top programme now accepts only Focus Edition scores.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top programmes typically want 700+, but excellent schools admit at 650+. Your target depends on the programme and its competitiveness. We help you set a realistic target at your free consultation.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Eight to ten weeks is typical for a 60–80 point gain. Start earlier if you are aiming past 740 or if your diagnostic comes in below 600. We provide honest timelines at the consultation.',
    },
    {
      question: 'Can I take the GMAT from home?',
      answer:
        'Yes — the GMAT is offered at test centres and at home via ProctorU. Our live online and self-paced courses prepare you equally well for either format.',
    },
    ...commonFaq,
  ],
};
