import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const partnershipHighDosage: ProgramContent = {
  path: '/partnerships/high-dosage-tutoring',
  seo: {
    title:
      'High-dosage tutoring programme for schools and districts — intensive maths and literacy support',
    description:
      'High-impact tutoring targeting literacy and numeracy gaps. One-to-one tutoring at scale for schools, designed to raise achievement across cohorts with evidence-backed methods.',
  },
  hero: {
    eyebrow: 'High-dosage tutoring',
    title: 'Intensive tutoring that raises cohort achievement.',
    intro:
      'Students falling behind in maths and English need more than remedial classes. High-dosage tutoring—frequent, intensive, personalised—closes achievement gaps and builds confidence. We deliver it at scale.',
    actions: [
      { label: 'Discuss high-dosage tutoring', href: '/contact' },
      { label: 'Evidence and outcomes', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Frequency', value: '3–5 sessions per week, 50–60 minutes each' },
      { label: 'Format', value: 'One-to-one, targeted on gaps' },
      { label: 'Duration', value: 'Full academic year, with progress tracking' },
      { label: 'Teachers trained', value: '40+ qualified tutors per district' },
    ],
  },
  features: {
    eyebrow: 'How high-dosage tutoring works',
    title: 'Intensive, personalised, measurable.',
    intro:
      'High-dosage tutoring is evidence-backed: frequent sessions, clear learning goals, and regular progress measurement. We train your staff as tutors and manage the programme end-to-end.',
    items: [
      {
        title: 'Tutor recruitment and training',
        desc: 'We identify strong teachers or recent graduates, train them on our methods and systems, and pair them with students. Ongoing coaching ensures quality.',
      },
      {
        title: 'Diagnostic and personalised planning',
        desc: 'Each student starts with a diagnostic assessment identifying specific gaps (fractions, algebra, reading fluency). Plans target those gaps weekly.',
      },
      {
        title: 'Frequent sessions and monitoring',
        desc: 'Three to five sessions per week mean real progress. We track attainment weekly, adjust plans and report to parents and school leadership monthly.',
      },
      {
        title: 'Accountability and outcomes',
        desc: 'End-of-year assessments show impact on school exams and standardised tests. We publish cohort data so you see the return on investment.',
      },
    ],
  },
  process: {
    eyebrow: 'Implementing high-dosage tutoring',
    title: 'From planning to scaled impact.',
    steps: [
      {
        no: '01',
        title: 'Needs assessment and tutor recruitment',
        desc: 'We assess which students need tutoring (typically bottom 25–30% in maths and English). We recruit and screen tutors from your staff or local graduates.',
      },
      {
        no: '02',
        title: 'Training and launch',
        desc: 'Intensive tutor training on our diagnostic methods and session structures. Students matched to tutors. First tutoring sessions begin within two weeks.',
      },
      {
        no: '03',
        title: 'Weekly monitoring and adjustment',
        desc: 'Each tutor submits session notes weekly. We review progress, adjust plans and coach tutors on technique. Parent communication happens monthly.',
      },
      {
        no: '04',
        title: 'End-of-year outcomes and planning',
        desc: 'Full cohort assessment. Report on achievement gains, test score improvements and impact on school results. Planning for next year begins.',
      },
    ],
  },
  stats: [
    { value: '+1.2 years', label: 'Average learning gain in one year of high-dosage tutoring' },
    {
      value: '73%',
      label: 'Of tutored students move from below-target to on-target in their subject',
    },
    { value: '3–5', label: 'Tutoring sessions per week per student' },
    { value: '£850', label: 'Average cost per student per year' },
  ],
  testimonials: [],
  faq: [
    {
      question: 'How many students can be tutored at once?',
      answer:
        'High-dosage tutoring scales to your needs. We’ve run programmes for 30–300 students in a school. Each student gets one-to-one sessions; the scale comes from recruiting and training a large tutor pool. We help you plan the right cohort size.',
    },
    {
      question: 'Can tutoring happen during the school day or must it be after school?',
      answer:
        'Both. Some schools embed tutoring into the timetable (during English or maths lessons, with students pulled into small groups). Others run after-school or weekend sessions. We work with your timetable and can blend both.',
    },
    {
      question: 'How are tutors trained and supported?',
      answer:
        'We provide intensive initial training (three to five days) on diagnostic assessment, session structure and our teaching methods. Then weekly coaching—we observe tutors, provide feedback and adjust their plans. Ongoing professional development keeps quality high.',
    },
    ...commonFaq,
  ],
};
