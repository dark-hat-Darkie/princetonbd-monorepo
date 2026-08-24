import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const admissionsFinancialAid: ProgramContent = {
  path: '/admissions/financial-aid',
  seo: {
    title: 'Scholarship and financial aid coaching for Bangladeshi university students',
    description:
      'Expert guidance on FAFSA, CSS Profile, scholarship applications and financial aid negotiation. We help you understand aid packages and fund your university education.',
  },
  hero: {
    eyebrow: 'Financial aid and scholarships',
    title: 'Funding your university education takes strategy.',
    intro:
      'Financial aid systems (FAFSA, CSS Profile, UCAS funding) are complex but learnable. We help you navigate them, apply for scholarships and negotiate aid packages so cost doesn’t derail your plans.',
    actions: [
      { label: 'Get financial aid guidance', href: '/contact' },
      { label: 'Aid types guide', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Aid types', value: 'Grants, loans, scholarships, assistantships' },
      { label: 'Systems covered', value: 'FAFSA, CSS Profile, Direct loans, UK Student Loans' },
      { label: 'School budgets', value: '£15–50k per year depending on university' },
      { label: 'Average aid per student', value: '50–80% of cost at top universities' },
    ],
  },
  features: {
    eyebrow: 'Financial aid coaching',
    title: 'Making university affordable.',
    intro:
      'Most students and parents don’t understand how financial aid works. We translate it: what you qualify for, how to apply, what to negotiate and how to plan payments.',
    items: [
      {
        title: 'Understanding aid packages',
        desc: 'Some universities offer grants (free money); others offer loans (you pay back). Merit scholarships reward academics; need-based aid depends on family finances. We decode your offer letters.',
      },
      {
        title: 'Scholarship hunting and applications',
        desc: 'Beyond university aid, there are external scholarships—from governments, NGOs, companies. We help you find scholarships you’re eligible for and complete applications.',
      },
      {
        title: 'Financial aid forms: FAFSA, CSS Profile and others',
        desc: 'These forms determine your aid. We guide you through them line by line, showing you what information to include and what it affects.',
      },
      {
        title: 'Negotiation and gap-year planning',
        desc: 'If aid is insufficient, you can negotiate with universities. If cost is still prohibitive, gap-year planning (earn, then study) might be the right path.',
      },
    ],
  },
  stats: [
    {
      value: '£2.4m',
      label: 'Average total aid per student over their degree (scholarships + loans)',
    },
    { value: '£50k+', label: 'Annual cost at top UK universities' },
    { value: '$70k+', label: 'Annual cost at top US universities' },
    { value: '80%', label: 'Percentage of international students who receive some financial aid' },
  ],
  testimonials: ['admissions', 'financial-aid'],
  faq: [
    {
      question: 'Who qualifies for financial aid as an international student?',
      answer:
        'It varies by country and university. US universities offer need-based aid to some international students, but not all. UK universities do not offer government loans to international students, but many offer bursaries. Australia offers limited aid. We help you understand what you qualify for before you apply.',
    },
    {
      question: 'What’s the difference between a grant, a scholarship and a loan?',
      answer:
        'A grant or scholarship is money you don’t pay back. A loan is money you borrow and repay, usually after graduation. Merit scholarships are based on academics; need-based aid on family finances. Most students need a mix.',
    },
    {
      question: 'Can I negotiate a financial aid package?',
      answer:
        'Yes, often. If another university offers more aid, most universities will match it or come close. If aid is still insufficient, some universities can increase it based on circumstances. Negotiation usually works best between January and May, before students commit.',
    },
    ...commonFaq,
  ],
};
