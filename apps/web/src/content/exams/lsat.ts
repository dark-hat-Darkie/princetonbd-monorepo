import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const lsat: ExamContent = {
  path: '/test-prep/lsat',
  slug: 'lsat',
  name: 'LSAT',
  interest: 'GRE / GMAT',
  seo: {
    title: 'LSAT preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'LSAT courses in Dhaka and Chattogram, plus live online cohorts and private tutoring. Full-length mocks, a written score guarantee and instructors trained in the new two-section format.',
  },
  hero: {
    eyebrow: 'Law school admissions',
    title: 'The LSAT score your law school shortlist expects.',
    intro:
      'The LSAT measures reading comprehension and logical reasoning under relentless time pressure. We teach the new format — two logical reasoning sections and one reading comprehension — prove it with full-length proctored mocks, and guarantee the score you need.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, nationwide on demand · 2h 35m' },
      { label: 'Sections', value: 'Logical Reasoning (×2) · Reading Comprehension' },
      { label: 'Scored', value: '120–180' },
      { label: 'Sittings', value: 'Up to three times in a 12-month rolling window' },
    ],
  },
  fee: {
    price: bdtPrice(42000),
    unit: 'per 12-week course',
    includes: [
      '48 taught hours live online, in a group of four or fewer',
      '12 full-length proctored mocks, reviewed',
      'Weekly homework marked with detailed feedback',
      'Recordings of every session you miss',
      'All materials and the online question bank',
    ],
    notes: standardFeeNotes,
  },
  modes: ['LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Twelve weeks, six modules, the LSAT without logic games.',
    intro:
      'Since August 2024 the LSAT is two scored Logical Reasoning sections, one scored Reading Comprehension section and one unscored section, with LSAT Writing taken separately. Every module ends with a timed section so you know your score before the next one starts.',
    totals: { weeks: 12, taughtHours: 48, mocks: 12, classSize: 'Max 4' },
    modules: [
      {
        no: '01',
        title: 'Logical reasoning I: argument structure',
        summary:
          'Two of your three scored sections. Breaking every stimulus into premise and conclusion, and the question families built on that structure.',
        topics: [
          'Conclusions, premises and the words that signal them',
          'Conditional reasoning: sufficient, necessary and contrapositive',
          'Must be true, most strongly supported and main point',
          'Reading the question stem before the stimulus',
        ],
        hours: 12,
        outcome:
          'Diagram any argument in under thirty seconds and answer structure questions on sight.',
      },
      {
        no: '02',
        title: 'Logical reasoning II: flaws, assumptions and inference',
        summary:
          'The question types that separate a 160 from a 170: what the argument takes for granted, and where it breaks.',
        topics: [
          'Necessary and sufficient assumption questions',
          'Strengthen, weaken and evaluate',
          'Flaw families: causation, sampling, equivocation, scope',
          'Parallel reasoning and parallel flaw',
        ],
        hours: 10,
        outcome:
          'Name the flaw before reading the choices and stop losing points on assumption questions.',
      },
      {
        no: '03',
        title: 'Reading comprehension',
        summary:
          'Four passages in 35 minutes, one of them a comparative pair. Mapping structure and viewpoint rather than remembering detail.',
        topics: [
          'Passage mapping: viewpoints, structure and tone',
          'Main point, primary purpose and author attitude',
          'Comparative reading: where two passages agree and diverge',
          'Inference and analogy questions across law, science and the humanities',
        ],
        hours: 10,
        outcome: 'Read each passage once and answer from the map, with time left for the fourth.',
      },
      {
        no: '04',
        title: 'Timed reasoning under pressure',
        summary:
          'Thirty-five minutes a section, roughly 25 questions each. Pacing, triage and treating the unscored section as live.',
        topics: [
          'Time checkpoints and when to skip and return',
          'Triage: the hardest questions sit at the end, not the start',
          'The unscored section: why every section is played as real',
          'Digital interface: flagging, highlighting and eliminating',
        ],
        hours: 6,
        outcome:
          'Finish every section with a pacing plan you have rehearsed, not a rush at the end.',
      },
      {
        no: '05',
        title: 'The writing sample',
        summary:
          'LSAT Writing is unscored but sent to every law school. Taken separately online, it is the one piece of your prose they read before your personal statement.',
        topics: [
          'The argumentative writing task and its 50-minute format',
          'Taking a position and using the perspectives provided',
          'The structure a law school admissions reader expects',
          'One sample written, reviewed and returned',
        ],
        hours: 2,
        outcome:
          'Produce a clear, well-organised writing sample that supports rather than undercuts your application.',
      },
      {
        no: '06',
        title: 'Timed mock cycle',
        summary:
          'Full-length proctored mocks in exam conditions, each reviewed question by question, and your test-day plan.',
        topics: [
          'Weekly full-length mocks, scored 120–180',
          'Error log review by question family',
          'Retake limits and choosing your test date',
          'Registration, test-day rules and score release',
        ],
        hours: 8,
        outcome:
          'Walk in having sat the test twelve times with your score range known to the point.',
      },
    ],
    outcomes: [
      'Diagram any Logical Reasoning stimulus and name the flaw before reading the choices',
      'Map a Reading Comprehension passage once and answer from the map',
      'Hold pace across four 35-minute sections without a rush at the end',
      'Know your score range before you book the real test',
    ],
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation for the two-section LSAT.',
    intro:
      'Logic Games were retired from the LSAT in 2024 — the test is now three sections of pure logical reasoning and reading comprehension. We teach the real format, using full-length adaptive mocks and rigorous review cycles.',
    items: [
      {
        title: 'Logical reasoning mastery',
        desc: 'How to see the structure of every argument and spot the flaws before reading the answer choices.',
      },
      {
        title: 'Reading comprehension at speed',
        desc: 'The technique to map dense passages in real time and find the answer without re-reading.',
      },
      {
        title: 'Timed drilling',
        desc: 'Every session includes timed sections so you build the speed and accuracy the test demands.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+12', label: 'Average point improvement' },
    { value: '170', label: 'Highest score in our recent cohort' },
    { value: '12', label: 'Full-length proctored mocks in small group' },
    { value: '91%', label: 'Hit or beat their agreed target' },
  ],
  testimonials: ['test-prep'],
  faq: [
    {
      question: 'When did Logic Games disappear?',
      answer:
        'The LSAT removed Analytical Reasoning (Logic Games) in August 2024. The test is now Logical Reasoning (section 1), Logical Reasoning (section 2), Reading Comprehension and a variable section. All our mocks use the current format.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top law schools expect 170+, but excellent schools admit at 165+. Your target depends on your law school ambitions and the schools you are applying to. We set a realistic target at your free consultation.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Twelve to sixteen weeks is typical for a 10–15 point gain. The LSAT rewards sustained, daily practice more than most exams. Start earlier if aiming past 172 or if your diagnostic comes in below 155.',
    },
    {
      question: 'Can I take the LSAT from home?',
      answer:
        'No — the LSAT is administered at official test centres only. We prepare you for the centre experience, with proctored mocks that simulate the real conditions exactly.',
    },
    ...commonFaq,
  ],
};
