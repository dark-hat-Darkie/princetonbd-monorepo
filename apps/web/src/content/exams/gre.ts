import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const gre: ExamContent = {
  path: '/test-prep/gre',
  slug: 'gre',
  name: 'GRE',
  interest: 'GRE / GMAT',
  seo: {
    title: 'GRE preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'GRE courses in Dhaka and Chattogram, plus live online cohorts. Adaptive full-length mocks, a written score guarantee and instructors who scored in the top percentile themselves.',
  },
  hero: {
    eyebrow: 'Graduate school admissions',
    title: 'The GRE score your target programme expects.',
    intro:
      'The GRE measures reasoning under time pressure — not tricks or test-taking shortcuts. We teach you to think like the test does, prove it with full-length adaptive mocks, and guarantee the score you need.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, on demand · 1h 58m' },
      { label: 'Sections', value: 'Verbal · Quantitative · Writing' },
      { label: 'Scored', value: '130–170 + 0–6 essay' },
      { label: 'Sittings', value: 'Sit as often as you need throughout the year' },
    ],
  },
  fee: {
    price: bdtPrice(52000),
    unit: 'per 10-week course',
    includes: [
      '48 taught hours in a class of eight or fewer',
      '12 proctored full-length adaptive mocks, reviewed',
      'Two 1-on-1 strategy sessions',
      'All materials and the online question bank',
      'Written 325+ score guarantee',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, seven modules, every section of the shorter GRE.',
    intro:
      'The GRE has been under two hours since September 2023: one essay, two Verbal and two Quant sections, with the second section of each measure adapting to how you did on the first. Every module ends with a timed section so your score map is current before the next one starts.',
    totals: { weeks: 10, taughtHours: 48, mocks: 12, classSize: 'Max 8' },
    modules: [
      {
        no: '01',
        title: 'The shorter GRE and your diagnostic',
        summary:
          'How the 1h 58m test is built, how the second section adapts to the first, and where a full-length diagnostic puts you.',
        topics: [
          'Section order, timing and the on-screen calculator',
          'Section-level adaptivity: why the first section matters most',
          'Full-length diagnostic, scored 130–170 per measure',
          'Your personal score map and target',
        ],
        hours: 4,
        outcome:
          'Know your Verbal and Quant scores to the point and which question types are costing you most.',
      },
      {
        no: '02',
        title: 'Quant foundations',
        summary:
          'Arithmetic, algebra and geometry rebuilt from the ground up, because the GRE tests school maths under pressure, not advanced maths.',
        topics: [
          'Number properties, fractions, ratios and percents',
          'Linear and quadratic equations, inequalities and exponents',
          'Lines, angles, triangles, circles and coordinate geometry',
          'Quantitative Comparison: the four answer choices and their traps',
        ],
        hours: 7,
        outcome:
          'Solve any foundations question cleanly and never guess on a Quantitative Comparison.',
      },
      {
        no: '03',
        title: 'Quant problem solving and data interpretation',
        summary:
          'Word problems, counting and statistics, and the data interpretation sets that anchor every Quant section.',
        topics: [
          'Rates, work, mixtures and overlapping sets',
          'Counting, probability and basic statistics',
          'Reading tables and graphs: the data interpretation set',
          'Numeric entry and multiple-answer questions without the calculator crutch',
        ],
        hours: 8,
        outcome:
          'Finish a Quant section on time with the data interpretation set answered, not skipped.',
      },
      {
        no: '04',
        title: 'Verbal: text completion and sentence equivalence',
        summary:
          'Half of every Verbal section is vocabulary in context. Reading the clue before the blank, not the answer choices first.',
        topics: [
          'Clues, pivots and structural signals in the sentence',
          'One-, two- and three-blank text completions',
          'Sentence equivalence: pairs that produce the same meaning',
          'High-frequency GRE vocabulary, learnt in context',
        ],
        hours: 7,
        outcome:
          'Fill any blank from the sentence’s own clues and stop losing pairs on sentence equivalence.',
      },
      {
        no: '05',
        title: 'Reading comprehension',
        summary:
          'Dense passages and the questions that follow them, including the short argument passages that test critical reasoning.',
        topics: [
          'Mapping a passage: main idea, structure and tone',
          'Select-in-passage and multiple-answer questions',
          'Argument passages: assumption, strengthen and weaken',
          'Pacing across long, short and paired passages',
        ],
        hours: 7,
        outcome:
          'Read once, answer with evidence, and hold pace through the second Verbal section.',
      },
      {
        no: '06',
        title: 'Analytical writing',
        summary:
          'One thirty-minute essay, Analyze an Issue, scored 0–6. Position, development and the prose readers reward.',
        topics: [
          'What the scoring guide rewards at 4, 5 and 6',
          'Planning a position in five minutes',
          'Developing examples that support, not decorate',
          'Two essays written, scored and returned',
        ],
        hours: 5,
        outcome: 'Write a complete Issue essay in thirty minutes that scores 4.5 or better.',
      },
      {
        no: '07',
        title: 'Adaptive mock cycle',
        summary:
          'Full-length adaptive mocks under exam conditions, each reviewed question by question, and your test-day plan.',
        topics: [
          'Weekly full-length adaptive mocks, scored 130–170',
          'Error log review: the pattern, not the individual question',
          'Section pacing and when to mark and move on',
          'Test centre vs at-home delivery, booking and score reporting',
        ],
        hours: 10,
        outcome:
          'Walk in having sat the test twelve times with your score range known to the point.',
      },
    ],
    outcomes: [
      'Sit both Verbal and Quant sections at full pace with time to review flagged questions',
      'Solve Quantitative Comparison and data interpretation without the traps ETS builds in',
      'Fill text completions and sentence equivalence from the sentence, not the answer choices',
      'Know your score range to the point before you book the real test',
    ],
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that teaches you to think at speed.',
    intro:
      'The GRE is a reasoning test, not a knowledge test. We build the habits you need to untangle dense passages and tough quant under time pressure, and prove it works with full-length mocks.',
    items: [
      {
        title: 'Adaptive mocks',
        desc: 'Full-length tests that mirror how the real exam adapts, scored exactly as ETS scores them.',
      },
      {
        title: 'Logic and argument mapping',
        desc: 'How to see the joints in every argument so the right answer becomes obvious, not a guess.',
      },
      {
        title: 'Quant drilling by weakness',
        desc: 'Every wrong answer feeds into a personal error log so you stop repeating the same mistakes.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+30', label: 'Average point improvement' },
    { value: '328', label: 'Median score of our 325+ cohort' },
    { value: '12', label: 'Full-length mocks in the classroom course' },
    { value: '92%', label: 'Hit or beat their agreed target' },
  ],
  testimonials: ['gre', 'graduate'],
  faq: [
    {
      question: 'How does the GRE differ from the GMAT?',
      answer:
        'The GRE tests broad reasoning across maths and English; the GMAT focuses on business-school-relevant skills. GRE is accepted by most MBA programmes now, but check your target schools. We can help you decide which to sit.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top programmes want 320+, but many excellent schools accept 310+. It depends entirely on your target programme and how competitive the application pool is. We advise at your free consultation based on your diagnostic.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Eight to twelve weeks is typical for a 20–30 point gain. Start earlier if aiming past 330 or if your diagnostic comes back below 305. We provide honest timelines at the consultation.',
    },
    {
      question: 'Can I take the GRE from home?',
      answer:
        'Yes — the GRE is offered at test centres and at home via ProctorU. Our live online and self-paced courses prepare you equally well for either format.',
    },
    ...commonFaq,
  ],
};
