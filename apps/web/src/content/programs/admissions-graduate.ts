import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const admissionsGraduate: ProgramContent = {
  path: '/admissions/graduate',
  seo: {
    title: 'Graduate school admissions counselling for Bangladeshi students — MS, MA, MBA',
    description:
      'Expert guidance on programme selection, test strategy, applications and scholarship negotiation for students applying to US, UK and Commonwealth graduate schools.',
  },
  hero: {
    eyebrow: 'Graduate admissions',
    title: 'From application to scholarship. End to end.',
    intro:
      'Graduate admission is different from undergraduate: schools care about your research interests, your previous work, your fit to their department. We help you build a portfolio and tell that story.',
    actions: [
      { label: 'Discuss your graduate goals', href: '/contact' },
      { label: 'Programme types', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Typical timeline', value: '4–6 months from start to decision' },
      { label: 'Test coverage', value: 'GRE, GMAT, IELTS, TOEFL' },
      { label: 'School types', value: 'Russell Group, Ivies, public US universities' },
      { label: 'Funding focus', value: 'Scholarships and assistantships' },
    ],
  },
  features: {
    eyebrow: 'What graduate counseling covers',
    title: 'Strategy for a different game.',
    intro:
      'Graduate schools evaluate research potential, career goals and fit to their departments. Your resume, statement of purpose and test scores tell a different story than undergraduate applications.',
    items: [
      {
        title: 'Programme fit and research alignment',
        desc: 'We help you map your research interests to specific labs, advisors and universities. Not all schools are equal; we help you find where you’ll thrive.',
      },
      {
        title: 'Statement of purpose and research essays',
        desc: 'Coaching on telling your academic story and research vision. These essays do different work than personal statements; we help you write for your audience.',
      },
      {
        title: 'Test strategy and coaching',
        desc: 'GRE and GMAT coaching tailored to your target programmes. Some fields care about quant; others about verbal. We optimise for where you’re applying.',
      },
      {
        title: 'Funding negotiation and visa planning',
        desc: 'Strategies for fellowships, assistantships and scholarships. We also guide F-1 and Tier 2 visas through to arrival.',
      },
    ],
  },
  process: {
    eyebrow: 'How we structure it',
    title: 'From interest to enrolment.',
    steps: [
      {
        no: '01',
        title: 'Programme research and fit',
        desc: 'Map your interests to schools and advisors. Shortlist universities by reputation, funding and research alignment.',
      },
      {
        no: '02',
        title: 'Test preparation and applications',
        desc: 'GRE or GMAT coaching alongside application assembly. Some schools have rolling admissions; we help you sequence submissions.',
      },
      {
        no: '03',
        title: 'Essays and application strategy',
        desc: 'Statement of purpose coached through multiple drafts. Each programme application tailored to that school’s vision.',
      },
      {
        no: '04',
        title: 'Offers, funding and visa',
        desc: 'Once offers arrive, we help you compare programmes, negotiate funding and prepare visa applications.',
      },
    ],
  },
  formats: [
    {
      name: 'Essentials',
      pitch:
        'Programme research, test planning and application strategy. For students with two or three years before applying.',
      price: bdtPrice(70000),
      priceUnit: 'for the full cycle',
      facts: ['Shared group support', 'Quarterly check-ins', 'Test planning only'],
      includes: [
        'Graduate programme research guidance',
        'Test timeline and strategy',
        'Application system overview',
        'Statement of purpose outline coaching',
      ],
      href: '/contact',
    },
    {
      name: 'Comprehensive',
      pitch:
        'One-on-one programme selection, full test prep, coaching on every essay draft and funding strategy.',
      price: bdtPrice(190000),
      priceUnit: 'for the full cycle',
      facts: ['Dedicated counselor', 'Monthly meetings', 'Unlimited essay drafts'],
      includes: [
        'Research-focused programme shortlisting',
        'On-campus or online GRE/GMAT tutoring',
        'Statement of purpose coaching through all drafts',
        'Research experience and CV strategy',
        'Funding negotiation support',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Premium',
      pitch:
        'Everything in Comprehensive, plus advisor outreach coaching, post-acceptance negotiation and visa guidance.',
      price: bdtPrice(340000),
      priceUnit: 'for the full cycle',
      facts: ['Senior counselor', 'Bi-weekly meetings', '24-hour response'],
      includes: [
        'Everything in Comprehensive',
        'Email and video coaching for advisor outreach',
        'Offer comparison and negotiation coaching',
        'Visa and immigration guidance',
        'Post-enrolment support through your first semester',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '91%', label: 'Accepted to a top-10 programme in their field' },
    { value: '$24k', label: 'Average assistantship stipend (annual)' },
    { value: '3–5', label: 'Universities on a typical graduate shortlist' },
    { value: '2–4', label: 'Typical months from application to offer' },
  ],
  testimonials: ['admissions', 'graduate'],
  faq: [
    {
      question: 'When should I start planning for graduate school?',
      answer:
        'If you’re planning to go straight from undergraduate to graduate school, starting counseling in your final year is typical. If you’re planning to work first, starting 12–18 months before you want to apply gives you time to research programmes and build your profile.',
    },
    {
      question: 'How is graduate admissions different from undergraduate?',
      answer:
        'Graduate schools prioritise research fit and career goals over test scores. They want to know what you want to research, who you want to work with and why that specific programme. Funding (assistantships and fellowships) is also a much bigger piece of graduate admission.',
    },
    {
      question: 'Do you work with all types of graduate programmes?',
      answer:
        'Yes—MA, MS, MBA, MEng, LLM and other master’s degrees. We also advise on PhD applications. Each has different priorities (coursework vs research, teaching assistantships, funding norms) and we coach for all of them.',
    },
    ...commonFaq,
  ],
};
