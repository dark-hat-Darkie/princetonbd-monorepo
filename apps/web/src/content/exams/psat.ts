import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const psat: ExamEditorial = {
  slug: 'psat',
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
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Eight weeks, five modules, one October sitting.',
    intro:
      'The PSAT/NMSQT is the digital SAT in miniature: the same two sections, the same adaptive modules and the same question types on a 320–1520 scale. We teach the content once and the National Merit arithmetic alongside it, so every point lands where it counts.',
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
