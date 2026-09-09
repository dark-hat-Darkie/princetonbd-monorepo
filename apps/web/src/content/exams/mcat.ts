import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const mcat: ExamContent = {
  path: '/test-prep/mcat',
  slug: 'mcat',
  name: 'MCAT',
  interest: 'GRE / GMAT',
  seo: {
    title: 'MCAT preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'MCAT courses in Dhaka and Chattogram, plus live online cohorts and private tutoring. Full-length mocks, a written score guarantee and instructors who know medical school admissions.',
  },
  hero: {
    eyebrow: 'Medical school admissions',
    title: 'The MCAT score your med school shortlist expects.',
    intro:
      'The MCAT is relentless: seven and a half hours, four sections, and a barrier that keeps out half the test-takers every year. We teach the content, the strategy and the stamina, prove it with full-length mocks in exam conditions, and guarantee the score you need.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, computer-based · 7h 30m' },
      { label: 'Sections', value: 'Chemistry · Biology · Psychology · Biochemistry' },
      { label: 'Scored', value: '472–528 (midpoint 500)' },
      { label: 'Sittings', value: 'Annual sittings; plan 6–9 months ahead' },
    ],
  },
  fee: {
    price: bdtPrice(42000),
    unit: 'per 24-week course',
    includes: [
      '60 taught hours live online, in a group of four or fewer',
      '8 full-length timed mocks, reviewed',
      'Weekly homework sets with marked solutions',
      'Recordings of every session you miss',
      'All materials and the online question bank',
    ],
    notes: standardFeeNotes,
  },
  modes: ['LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Twenty-four weeks, six modules, all four sections of the MCAT.',
    intro:
      'Four sections, 230 questions, seven and a half hours, scored 472–528. Six months is long enough to teach the content, build the reasoning and rehearse the stamina, with a timed section at the end of every module.',
    totals: { weeks: 24, taughtHours: 60, mocks: 8, classSize: 'Max 4' },
    modules: [
      {
        no: '01',
        title: 'Chemical and physical foundations',
        summary:
          'Fifty-nine questions in 95 minutes across general chemistry, physics, organic chemistry and the biochemistry they lean on.',
        topics: [
          'Thermodynamics, kinetics, equilibrium and acid–base chemistry',
          'Fluids, circuits, optics and the physics of living systems',
          'Organic mechanisms: seeing the reaction type, not memorising it',
          'Passage-based data: reading the figure before the question',
        ],
        hours: 12,
        outcome:
          'Reason through an unfamiliar chemistry or physics passage from principles rather than recall.',
      },
      {
        no: '02',
        title: 'Biological and biochemical foundations',
        summary:
          'The section with the most content: cell biology, physiology, genetics and the biochemistry that anchors a quarter of the test.',
        topics: [
          'Amino acids, enzymes and metabolic pathways',
          'Cell biology, DNA replication and gene expression',
          'Organ systems and physiology',
          'Experimental design and interpreting research passages',
        ],
        hours: 14,
        outcome:
          'Answer biochemistry from mechanism and read a research passage the way the test writers intend.',
      },
      {
        no: '03',
        title: 'Psychological, social and biological foundations',
        summary:
          'Fifty-nine questions of psychology, sociology and the biology of behaviour. Terminology-heavy, and the easiest section to raise quickly.',
        topics: [
          'Sensation, perception, learning and memory',
          'Social psychology, identity and group behaviour',
          'Sociology: institutions, stratification and demographics',
          'Research methods and statistics in the behavioural sciences',
        ],
        hours: 10,
        outcome:
          'Recognise every high-yield term in context and read a behavioural-science study critically.',
      },
      {
        no: '04',
        title: 'CARS passage method',
        summary:
          'Critical Analysis and Reasoning Skills: nine humanities and social-science passages in 90 minutes, with no outside knowledge required or rewarded.',
        topics: [
          'Mapping a passage for argument, tone and purpose',
          'Foundations of comprehension and reasoning within the text',
          'Reasoning beyond the text: applying the author’s view to new cases',
          'Pacing at ten minutes a passage',
        ],
        hours: 8,
        outcome: 'Score consistently on CARS instead of swinging with the passage topic.',
      },
      {
        no: '05',
        title: 'Integrated content review',
        summary:
          'The MCAT crosses disciplines inside single passages. Revision organised around the ten foundational concepts, not the textbook chapters.',
        topics: [
          'Cross-section topics: enzymes in physics, statistics everywhere',
          'Scientific reasoning and research-design questions across all three science sections',
          'Equation and pathway sheets you rebuild from memory',
          'Targeted drills from your personal error log',
        ],
        hours: 6,
        outcome: 'Move between disciplines inside a passage without losing the thread.',
      },
      {
        no: '06',
        title: 'Full-length cycle and test day',
        summary:
          'Full-length mocks on the real 7h 30m clock, each reviewed section by section, and the stamina and logistics of test day.',
        topics: [
          'Eight full-length mocks in exam order, scored 472–528',
          'Section-by-section review and error log',
          'Break strategy, nutrition and stamina across seven hours',
          'Registration, test centre rules and score release',
        ],
        hours: 10,
        outcome:
          'Walk in having sat the full seven and a half hours eight times with your score range known.',
      },
    ],
    outcomes: [
      'Reason through unfamiliar science passages from principles, not recall',
      'Read a research passage and its figures the way the test writers intend',
      'Score consistently on CARS regardless of the passage topic',
      'Hold accuracy across seven and a half hours and know your score range before you book',
    ],
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that teaches content, strategy and stamina.',
    intro:
      'The MCAT combines content depth, reasoning speed and seven-hour endurance. We build all three through video lessons, guided problem-solving and full-length mocks in exam conditions.',
    items: [
      {
        title: 'Full-length timed mocks',
        desc: 'Exams taken in real time, in exam order, so you build the stamina and test-day rhythm the real MCAT demands.',
      },
      {
        title: 'Biochemistry and organic reasoning',
        desc: 'How to see mechanism and reaction types rather than memorising every equation — the difference between 500 and 515.',
      },
      {
        title: 'CARS strategy',
        desc: 'Critical Analysis and Reasoning Skills is the section most students underestimate — we teach the reading and timing discipline that lets you score consistently.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+8', label: 'Average point improvement' },
    { value: '515', label: 'Median score of our 510+ cohort' },
    { value: '8', label: 'Full-length timed mocks in small group' },
    { value: '89%', label: 'Hit or beat their agreed target' },
  ],
  testimonials: ['test-prep'],
  faq: [
    {
      question: 'How much content do I need to know?',
      answer:
        'A lot: general chemistry, organic chemistry, biochemistry, biology, psychology and statistics. But the MCAT is not a memorisation test — it tests your ability to apply concepts you might not have seen before. We teach the core curriculum and then drilling and strategy.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top medical schools expect 515+, but excellent schools admit at 505+. Your target depends on the schools you aim for and their competitiveness. We set a realistic target at your free consultation.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Six to nine months is typical, with three to four hours of study most days. The MCAT rewards consistency over cramming. Start early if you are aiming past 520 or if your diagnostic shows gaps in biology or chemistry.',
    },
    {
      question: 'Can I take the MCAT from home?',
      answer:
        'No — the MCAT is administered at official test centres only. We prepare you with full-length mocks in exam conditions so you walk in confident on test day.',
    },
    ...commonFaq,
  ],
};
