import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const subjectSocialStudies: ProgramContent = {
  path: '/tutoring/subjects/social-studies',
  seo: {
    title: 'History, geography and economics tutoring — O-Level, A-Level, IB',
    description:
      'History, geography, economics and business studies tutoring. Structured essays, source analysis, case studies and exam-technique drilling.',
  },
  hero: {
    eyebrow: 'Social studies tutoring',
    title: 'Essays built on evidence, not opinion.',
    intro:
      'History and social studies are not recitation. A good essay analyses; it integrates multiple sources and perspectives. Your tutor teaches the method: how to read sources, synthesise them, then write a structured argument.',
    actions: [
      { label: 'Request a tutor', href: '/contact' },
      { label: 'Back to subjects', href: '/tutoring', variant: 'outline' },
    ],
    facts: [
      { label: 'Subjects', value: 'History, geography, economics, business studies' },
      { label: 'Approach', value: 'Source analysis, not memorisation' },
      { label: 'Essays', value: 'Structured arguments with evidence' },
      { label: 'Delivery', value: 'Campus or live online' },
    ],
  },
  features: {
    eyebrow: 'What social studies tutoring teaches',
    title: 'The thinking behind the facts.',
    intro:
      'Good students in these subjects know how to handle evidence. They can read contradictory sources and build an argument that acknowledges both.',
    items: [
      {
        title: 'Source literacy',
        desc: 'Examiners give you sources you’ve never seen. Your tutor teaches you to read them for bias, context, and provenance before you answer the question.',
      },
      {
        title: 'Structured essays',
        desc: 'A history essay needs a thesis, then evidence. Your tutor shows you the outline format that works under timed conditions: thesis, three points, each anchored in sources.',
      },
      {
        title: 'Conceptual depth',
        desc: 'Economics essays need clear definitions. Geography case studies need place knowledge and real examples. Your tutor builds the vocabulary and the depth so your answers ring true.',
      },
      {
        title: 'Paper-specific strategy',
        desc: 'Each exam board has a house style. We drill past papers by question type so you know what each marker rewards.',
      },
    ],
  },
  stats: [
    { value: '85%', label: 'Improve their essay grade by one band' },
    { value: '3–4', label: 'Source-analysis practice questions per session' },
    { value: '6 timed essays', label: 'Marked and reviewed per term' },
    { value: '4.8/5', label: 'Tutor rating for clarity of explanation' },
  ],
  testimonials: ['tutoring'],
  faq: [
    {
      question: 'Can I study history and geography with the same tutor?',
      answer:
        'Some of our tutors teach both; most are stronger in one. If you want two subjects, we can pair you with a tutor for each or find one who’s confident in both. Let us know your preference when you book.',
    },
    {
      question: 'How much content do I need to memorise?',
      answer:
        'Less than you think. You need key dates and names as anchors, and 3–4 detailed case studies. Your tutor will tell you which facts matter and which are detail you can look up.',
    },
    {
      question: 'Is IB history different from A-Level?',
      answer:
        'Yes—IB emphasises global perspectives and historiography (how we know history); A-Level is more specific-topic focused. Our tutors know both curricula and can cross-reference.',
    },
    ...commonFaq,
  ],
};
