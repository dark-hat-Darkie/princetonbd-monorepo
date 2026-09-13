import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const mcat: ExamEditorial = {
  slug: 'mcat',
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
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Twenty-four weeks, six modules, all four sections of the MCAT.',
    intro:
      'Four sections, 230 questions, seven and a half hours, scored 472–528. Six months is long enough to teach the content, build the reasoning and rehearse the stamina, with a timed section at the end of every module.',
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
