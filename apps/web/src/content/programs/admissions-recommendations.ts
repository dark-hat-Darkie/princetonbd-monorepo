import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const admissionsRecommendations: ProgramContent = {
  path: '/admissions/recommendations',
  seo: {
    title: 'University recommendation letter strategy for Bangladeshi students',
    description:
      'Expert guidance on selecting recommenders, preparing briefings and strengthening recommendation letters. We teach you to work with teachers so they write letters that matter.',
  },
  hero: {
    eyebrow: 'Recommendation letters',
    title: 'Great recommendations don’t happen by accident.',
    intro:
      'A strong recommender knows you well and can speak specifically about your intellectual curiosity and character. We help you choose the right people, prepare them well, and give them the information they need to write a compelling letter.',
    actions: [
      { label: 'Start recommendation planning', href: '/contact' },
      { label: 'Recommender guide', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Recommenders needed', value: 'Usually 2–3 depending on university' },
      { label: 'Ideal recommenders', value: 'Teachers who know your academics well' },
      { label: 'Briefing', value: 'One page, showing you and your goals' },
      { label: 'Deadline strategy', value: 'Request 4–6 weeks before submission' },
    ],
  },
  features: {
    eyebrow: 'Recommendation strategy',
    title: 'Finding the right voices to recommend you.',
    intro:
      "Admissions officers read thousands of recommendations. The ones that stand out show the student clearly and specifically—not just 'excellent' but 'built a thesis project that made me reconsider the curriculum'.",
    items: [
      {
        title: 'Choosing recommenders strategically',
        desc: 'We help you decide who to ask. The best recommenders are teachers who know your intellectual strengths well, not necessarily your grades.',
      },
      {
        title: 'Preparing briefings and talking points',
        desc: 'A one-page briefing showing your achievements, university goals and what you want them to emphasise. This helps them write stronger letters.',
      },
      {
        title: 'Timing and follow-up',
        desc: 'When to ask (4–6 weeks before deadline), how to follow up respectfully, and how to ensure letters submit on time.',
      },
      {
        title: 'Addressing gaps and concerns',
        desc: 'If you have a lower grade in a subject, a recommender letter addressing it carries weight. We help frame that conversation.',
      },
    ],
  },
  stats: [
    { value: '4.1/5', label: 'Average rating of recommendation letters from our process' },
    { value: '95%', label: 'On-time submission rate when we manage the timeline' },
    { value: '3', label: 'Average number of recommenders requested' },
    { value: '2–3', label: 'Weeks advance notice to give your recommender' },
  ],
  testimonials: ['admissions'],
  faq: [
    {
      question: 'Should I use teachers from my academic subjects or supervisors from clubs I lead?',
      answer:
        'Admissions prioritise academic teachers because they evaluate your intellectual capacity directly. If you have academic teachers who know you well, use those. A supervisor or coach can work if they can speak specifically about your strengths.',
    },
    {
      question: 'Can I ask the same teacher to recommend me for different universities?',
      answer:
        'Yes. Teachers often write one strong letter and submit it to all universities. Most university portals allow a teacher to submit the same letter to multiple schools. If a particular university asks a school-specific question, you can ask your teacher to personalise it.',
    },
    {
      question: 'What if my recommender writes a weak letter?',
      answer:
        'It’s rare if you’ve briefed them well. But if a letter comes back shorter or less specific than you’d hoped, you can ask them to revise it—most teachers are happy to strengthen it. You can also ask a different teacher instead.',
    },
    ...commonFaq,
  ],
};
