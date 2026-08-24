import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const subjectScience: ProgramContent = {
  path: '/tutoring/subjects/science',
  seo: {
    title: 'Physics, chemistry and biology tutoring — A-Level, IB, national curriculum',
    description:
      'Science tutoring in physics, chemistry and biology across O-Level, A-Level, IB and national curriculum. Lab-practical support and exam-technique drilling.',
  },
  hero: {
    eyebrow: 'Science tutoring',
    title: 'Equations with meaning, not just shapes to memorise.',
    intro:
      'You can memorise that F=ma, but you won’t solve a mechanics problem until you can see the forces. Science tutoring means building mental models first, then the equations click into place.',
    actions: [
      { label: 'Request a science tutor', href: '/contact' },
      { label: 'See all subjects', href: '/tutoring', variant: 'outline' },
    ],
    facts: [
      { label: 'Sciences', value: 'Physics, chemistry, biology, separately or together' },
      { label: 'Lab support', value: 'Practical technique, report writing, safety' },
      { label: 'Exams', value: 'O-Level, A-Level, IB, AP, national curriculum' },
      { label: 'Delivery', value: 'Campus-based or fully online' },
    ],
  },
  features: {
    eyebrow: 'What science tutoring covers',
    title: 'Concepts before calculations.',
    intro:
      'The best science students think through the physics first, then write the equation. That’s the shift our tutors engineer.',
    items: [
      {
        title: 'Conceptual foundations',
        desc: 'Why does light bend? What is an exothermic reaction? Your tutor explains the “why” so you’re not rote-learning disconnected facts.',
      },
      {
        title: 'Lab practicals and reporting',
        desc: 'A-Level practicals are assessed separately now. We teach technique, precision, and the write-up skills examiners want—independent variables and control variables built into every session.',
      },
      {
        title: 'Past paper by question type',
        desc: 'Calculation questions versus explain questions versus extended-response: each has a pattern. Learn to spot which technique the question wants before you start writing.',
      },
      {
        title: 'Synoptic questions',
        desc: 'A-Level loves linking chemistry to biology to physics. Your tutor shows you the bridges between topics so you can answer the hardest questions.',
      },
    ],
  },
  stats: [
    { value: '89%', label: 'Achieve or exceed their target grade first attempt' },
    { value: '48hrs', label: 'Tutor-training hours in specialist subject matter' },
    { value: '6', label: 'Mock papers scored per student per term' },
    { value: '4.8/5', label: 'Laboratory technique satisfaction rating' },
  ],
  testimonials: ['tutoring'],
  faq: [
    {
      question: 'Can I do physics and chemistry with the same tutor?',
      answer:
        'Yes—most of our tutors are strong in two sciences. Some students find chemistry and biology share more ground; others pair maths-heavy physics with chemistry. We match based on your preferences.',
    },
    {
      question: 'How much of tutoring is lab practicals versus classroom learning?',
      answer:
        'Typically 30% practicals, 70% theory and past papers. If you’re prepping for A-Level’s practical endorsement, we increase the lab fraction. Online students do virtual labs and report-writing.',
    },
    {
      question: 'Is IB sciences harder than A-Level?',
      answer:
        'Different. IB goes deeper on experimental design and Option topics; A-Level is slightly heavier on UK-specific practicals. Our tutors know both syllabi and can cross-reference where they overlap.',
    },
    ...commonFaq,
  ],
};
