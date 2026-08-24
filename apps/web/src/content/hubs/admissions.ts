import type { HubContent } from '../types';
import { commonFaq } from '../shared';

export const admissionsHub: HubContent = {
  path: '/admissions',
  seo: {
    title: 'Admissions counseling in Bangladesh — undergraduate to business school',
    description:
      'Strategic guidance for every stage of applying abroad. Personalised counseling for undergraduates, graduate students, business school and law school applicants, plus essay and interview support.',
  },
  hero: {
    eyebrow: 'Admissions counseling',
    title: 'Your strategy starts before you write a single word.',
    intro:
      'School selection, timeline, essay strategy, interview prep, financial aid — every piece in place before you invest hundreds of hours in applications. One counselor, your whole journey.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Meet our counselors', href: '/about/instructors', variant: 'outline' },
    ],
    facts: [
      { label: 'Students guided', value: '2000+ each year' },
      { label: 'Destinations', value: 'USA · UK · Canada · Australia · Europe' },
      { label: 'Programme types', value: 'Undergraduate · Masters · PhD · Professional' },
      { label: 'Essays reviewed', value: '10,000+ annually' },
    ],
  },
  cards: {
    eyebrow: 'Choose your path',
    title: 'Counseling for every degree.',
    intro:
      'Whether you are applying to your first university or your third, we have counselors who have guided students through exactly your journey.',
    items: [
      {
        no: '01',
        tag: 'Counseling',
        title: 'Undergraduate',
        desc: 'The big decision: where you study shapes who you become. We map schools by culture, career outcomes and fit, then structure your essays to get you in.',
        meta: 'Ages 16–18',
        href: '/admissions/undergraduate',
      },
      {
        no: '02',
        tag: 'Counseling',
        title: 'Graduate (MS & PhD)',
        desc: 'Research interests, supervisor fit, funding — the technical and human sides of graduate admissions. We help you tell your research story compellingly.',
        meta: 'STEM and humanities',
        href: '/admissions/graduate',
      },
      {
        no: '03',
        tag: 'Counseling',
        title: 'Business school',
        desc: 'MBA, EMBA, or executive programmes. We position your career narrative and quantify why now is your moment.',
        meta: 'Work experience strategies',
        href: '/admissions/business',
      },
      {
        no: '04',
        tag: 'Counseling',
        title: 'Medical school',
        desc: 'Clinical experience, research, test scores — and how to narrate them as a coherent vision. For pre-med applicants and IMG candidates.',
        meta: 'MD · MBBS · International routes',
        href: '/admissions/medical',
      },
      {
        no: '05',
        tag: 'Counseling',
        title: 'Law school',
        desc: 'JD, LLM or professional law degrees. We help you position your academic record, legal interests and professional goals as a unified case.',
        meta: 'Common law jurisdictions',
        href: '/admissions/law',
      },
      {
        no: '06',
        tag: 'Application support',
        title: 'Essays & personal statements',
        desc: 'From brainstorm to final draft. We teach the argument structures that admissions officers actually respond to, then make sure every sentence belongs.',
        meta: 'All essay types',
        href: '/admissions/essays',
      },
      {
        no: '07',
        tag: 'Application support',
        title: 'Recommendations',
        desc: 'We help you identify your strongest recommenders, then coach you on how to ask and what to give them — so your letter counts.',
        meta: 'Strategy + positioning',
        href: '/admissions/recommendations',
      },
      {
        no: '08',
        tag: 'Application support',
        title: 'Interview preparation',
        desc: 'Live practice interviews with interviewers trained in the specific format of your target universities. You leave knowing exactly how to come across.',
        meta: 'Recorded · Debriefed',
        href: '/admissions/interviews',
      },
      {
        no: '09',
        tag: 'Application support',
        title: 'Financial aid & scholarships',
        desc: 'How to find it, how to ask for it, how to maximise it. We match you with opportunities you would not have found alone.',
        meta: 'Need-based · Merit-based',
        href: '/admissions/financial-aid',
      },
    ],
  },
  features: {
    eyebrow: 'Why here',
    title: 'What every counselor brings to the table.',
    items: [
      {
        title: 'Real admissions knowledge',
        desc: 'Our counselors have trained in university admissions offices and taught at the universities themselves. They know how decisions happen.',
      },
      {
        title: 'Outcome obsession',
        desc: 'We do not leave it to chance. One counselor for your whole journey means your strategy is coherent from school selection to interview day.',
      },
      {
        title: 'A network of universities',
        desc: 'Relationships with admissions officers, financial aid staff and alumni interviewers at hundreds of universities means we know your schools.',
      },
      {
        title: 'Individualised not templated',
        desc: 'No cookie-cutter essays, no boilerplate school lists. Every recommendation is built for your story, your timeline and your budget.',
      },
    ],
  },
  stats: [
    { value: '2000+', label: 'Students guided every year' },
    { value: '94%', label: 'Admitted to a top-choice university' },
    { value: '1:8', label: 'Counselor to student ratio' },
    { value: '$12–20k', label: 'Average annual scholarship awarded' },
  ],
  testimonials: ['admissions'],
  faq: [
    {
      question: 'When should I start working with an admissions counselor?',
      answer:
        'Ideally before you start researching schools. A counselor can help you be strategic about which universities to consider based on your profile, your goals and your budget. That said, we also work with students who are already mid-application.',
    },
    {
      question: 'How long does the counseling process take?',
      answer:
        'It depends on where you are starting from. If you are two years out from applications, we usually see students fortnightly. As application deadlines approach, sessions become weekly. Most students work with us for six to eighteen months.',
    },
    {
      question: 'What if I am applying to universities in different countries?',
      answer:
        'That is actually quite common. The fundamentals — telling your story, choosing schools strategically, understanding how different admissions systems work — are things we do every day. We have counselors with specific expertise in each country’s system.',
    },
    ...commonFaq,
  ],
};
