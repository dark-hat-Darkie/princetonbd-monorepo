import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const admissionsLaw: ProgramContent = {
  path: '/admissions/law',
  seo: {
    title: 'Law school admissions for Bangladeshi students — JD, LLM guidance',
    description:
      'Expert coaching on US law school (JD), UK law (LLM) and other international law programmes. LSAT preparation, personal statement coaching and school selection.',
  },
  hero: {
    eyebrow: 'Law school admissions',
    title: 'A law degree abroad. Strategy from start to enrolment.',
    intro:
      'Law school admissions are numbers-first (LSAT and GPA in the US; strong academics in the UK) but also story-based. We coach LSAT prep, school selection and applications that explain your interest in law.',
    actions: [
      { label: 'Discuss law school options', href: '/contact' },
      { label: 'Programme guide', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Programme types', value: 'JD (US), LLM (UK, Canada, Australia)' },
      { label: 'Test required', value: 'LSAT (US JD), TOEFL/IELTS (UK LLM)' },
      { label: 'School types', value: 'Ivies, Russell Group, top nationals' },
      { label: 'Timeline', value: '6–12 months typical' },
    ],
  },
  features: {
    eyebrow: 'Law admissions coaching',
    title: 'LSAT excellence plus application strategy.',
    intro:
      'Law school success starts with an LSAT score in the top percentile. We teach test strategy, but also help you build an application that explains why you want law and why that school.',
    items: [
      {
        title: 'LSAT preparation and tutoring',
        desc: 'Intensive LSAT coaching on logical reasoning, reading comprehension and analytical reasoning. Most students improve 8–12 points with structured tutoring.',
      },
      {
        title: 'School selection by market and prestige',
        desc: 'Strategic shortlisting by school prestige, geography and career outcomes. For international students, US Ivy law schools open different doors than regional schools.',
      },
      {
        title: 'Personal statement and application narrative',
        desc: 'Coaching on why law, why this school and what your career goals are. Law schools want to see clear thinking about the profession.',
      },
      {
        title: 'Interview and scholarship negotiation',
        desc: 'Some schools interview; most offer scholarships to strong candidates. We coach both and help you evaluate multiple offers.',
      },
    ],
  },
  process: {
    eyebrow: 'How law school applications work',
    title: 'From LSAT to acceptance.',
    steps: [
      {
        no: '01',
        title: 'LSAT target and study plan',
        desc: 'Diagnostic LSAT determines your target score and study timeline. US schools want 160+; we build a plan to get you there.',
      },
      {
        no: '02',
        title: 'Intensive LSAT tutoring',
        desc: 'Structured tutoring on each section, diagnostic after every full test, and adaptive practice. Most students study 8–10 weeks.',
      },
      {
        no: '03',
        title: 'Applications and essays',
        desc: 'School shortlist and application strategy. Personal statements, diversity statements and optional essays coached through multiple drafts.',
      },
      {
        no: '04',
        title: 'Offers and negotiation',
        desc: 'Some schools conduct interviews; others make decisions on numbers alone. We help you compare offers and negotiate scholarships.',
      },
    ],
  },
  formats: [
    {
      name: 'Essentials',
      pitch:
        'LSAT preparation and application planning. For students with a clear timeline and focused approach.',
      price: bdtPrice(70000),
      priceUnit: 'for the full cycle',
      facts: ['Self-study tutoring', 'Monthly check-ins', 'Test planning'],
      includes: [
        'LSAT diagnostic and study plan',
        'Eight hours of LSAT tutoring',
        'School selection guidance',
        'Application timeline overview',
      ],
      href: '/contact',
    },
    {
      name: 'Comprehensive',
      pitch:
        'Full LSAT tutoring, dedicated counselor and personal statement coaching through all applications.',
      price: bdtPrice(195000),
      priceUnit: 'for the full cycle',
      facts: ['Dedicated counselor', 'Bi-weekly meetings', 'Unlimited essay drafts'],
      includes: [
        'Intensive LSAT tutoring (20+ hours)',
        'School fit analysis and shortlisting',
        'Personal statement coaching through all drafts',
        'Diversity statement and optional essays',
        'Interview coaching if needed',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Premium',
      pitch:
        'Everything in Comprehensive, plus advanced LSAT strategy, offer comparison and post-acceptance guidance.',
      price: bdtPrice(340000),
      priceUnit: 'for the full cycle',
      facts: ['Senior law advisor', 'Weekly meetings', '24-hour response'],
      includes: [
        'Everything in Comprehensive',
        'Advanced LSAT strategy and retake planning',
        'Multiple offer negotiation and comparison',
        'Scholarship negotiation coaching',
        'Career advising for 1L summer internships',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '93%', label: 'Accepted to a top-20 law school' },
    { value: '164–173', label: 'LSAT range of successful applicants' },
    { value: '$120k', label: 'Average scholarship per student' },
    { value: '4–6', label: 'Typical law schools on a shortlist' },
  ],
  testimonials: ['admissions'],
  faq: [
    {
      question: 'What LSAT score do I need?',
      answer:
        'It depends on your target schools. Top 20 schools typically want 160+; top 50 want 150–160. We help you set a realistic target based on your starting diagnostic, then build a tutoring plan to reach it.',
    },
    {
      question: 'Should I apply to US (JD) or UK (LLM) law school?',
      answer:
        'JD is a three-year professional degree that qualifies you to practise law in the US; LLM is a one-year specialized degree. For Bangladeshi students, JD opens more doors but is more competitive. We help you assess which programme fits your goals and profile.',
    },
    {
      question: 'How much do scholarships cover?',
      answer:
        'Top law schools offer scholarships ranging from half to full tuition. Negotiation is common—schools often match competing offers. We help you understand scholarship packages and negotiate based on your LSAT score.',
    },
    ...commonFaq,
  ],
};
