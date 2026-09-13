import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const lsat: ExamEditorial = {
  slug: 'lsat',
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
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Twelve weeks, six modules, the LSAT without logic games.',
    intro:
      'Since August 2024 the LSAT is two scored Logical Reasoning sections, one scored Reading Comprehension section and one unscored section, with LSAT Writing taken separately. Every module ends with a timed section so you know your score before the next one starts.',
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
