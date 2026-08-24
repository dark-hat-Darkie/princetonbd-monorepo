import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const admissionsUndergraduate: ProgramContent = {
  path: '/admissions/undergraduate',
  seo: {
    title: 'University counselling for Bangladeshi school leavers — undergraduate admissions',
    description:
      'End-to-end guidance from shortlist through enrolment. We help school leavers in Bangladesh navigate Common App, UCAS and direct portals, write essays that admit, and land scholarships.',
  },
  hero: {
    eyebrow: 'Undergraduate admissions',
    title: 'A three-year conversation that leads somewhere.',
    intro:
      'No office ticks boxes once and moves on. Your counselor works with you from Year 10 through enrolment, knowing your grades, your finances and what the universities actually want.',
    actions: [
      { label: 'Begin your counseling', href: '/contact' },
      { label: 'Our approach', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Counselor', value: 'Dedicated, not shared' },
      { label: 'Timeline', value: 'Year 10 through enrolment' },
      { label: 'Reach', value: 'US, UK, Canada, Australia and more' },
      { label: 'Average admitted cohort', value: 'Top 30 global universities' },
    ],
  },
  features: {
    eyebrow: 'What you get',
    title: 'Support for every stage.',
    intro:
      'From UCAS and Common App systems through school selection, essay coaching and interview preparation, we guide the entire process.',
    items: [
      {
        title: 'University shortlisting',
        desc: 'Safety, target and reach schools chosen against your academics, tests and budget. Updated termly as your profile strengthens.',
      },
      {
        title: 'Application architecture',
        desc: 'Which platforms (Common App, UCAS, direct portals), which essays to write first, deadlines plotted against your timetable.',
      },
      {
        title: 'Essays and personal statements',
        desc: 'One-to-one coaching through every draft, with feedback on narrative, voice and what admissions actually reads.',
      },
      {
        title: 'Interview and test strategy',
        desc: 'Coaching on SAT, ACT, IELTS or TOEFL, with interview preparation tailored to the schools on your list.',
      },
    ],
  },
  process: {
    eyebrow: 'How we work',
    title: 'Four seasons of preparation.',
    steps: [
      {
        no: '01',
        title: 'Profile and shortlist',
        desc: 'Academic record, test scores and finances mapped to universities. A shortlist you can be confident in.',
      },
      {
        no: '02',
        title: 'Application architecture',
        desc: 'Essays, deadlines and platforms planned. Each application designed to show something different about you.',
      },
      {
        no: '03',
        title: 'Essays and interview prep',
        desc: 'Coaching on every draft. Mock interviews with feedback on your narrative and how universities will read it.',
      },
      {
        no: '04',
        title: 'Financial aid and enrolment',
        desc: 'Negotiating scholarships, visa requirements, accommodation. You arrive ready.',
      },
    ],
  },
  formats: [
    {
      name: 'Essentials',
      pitch:
        'University shortlisting, application strategy and core essay coaching. The right choice for most students starting in Year 11.',
      price: bdtPrice(75000),
      priceUnit: 'for the full cycle',
      facts: ['One counselor', 'Monthly check-ins', 'Unlimited essay drafts'],
      includes: [
        'University shortlist and fit analysis',
        'Application systems and deadlines guidance',
        'Essay and personal statement coaching',
        'Test score and timeline planning',
      ],
      href: '/contact',
    },
    {
      name: 'Comprehensive',
      pitch:
        'Everything in Essentials, plus interview prep, financial aid coaching and daily messaging access.',
      price: bdtPrice(180000),
      priceUnit: 'for the full cycle',
      facts: ['One counselor', 'Weekly check-ins', 'Daily messaging'],
      includes: [
        'Everything in Essentials',
        'Mock interviews with senior counselors',
        'Financial aid and scholarship strategy',
        'Direct messaging between meetings',
        'Final candidacy review before submission',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Premium',
      pitch:
        'Full-spectrum support from Year 10 through enrolment, including test prep tutoring and international university relations access.',
      price: bdtPrice(320000),
      priceUnit: 'for the full cycle',
      facts: ['Dedicated counselor', 'Bi-weekly check-ins', '24-hour response time'],
      includes: [
        'Everything in Comprehensive',
        'On-campus tutoring or online SAT, ACT or IELTS prep',
        'Access to our university relations network',
        'Post-enrolment guidance and visa coaching',
        'Gap-year planning if needed',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '94%', label: 'Enrolled at a university in their top three choices' },
    { value: '£2.4m', label: 'Average scholarship per student (UK students)' },
    { value: '3–5', label: 'Number of universities in a typical shortlist' },
    { value: '40+', label: 'Years advising students to top universities' },
  ],
  testimonials: ['admissions', 'undergraduate'],
  faq: [
    {
      question: 'When should we start counseling?',
      answer:
        'We usually work with students from Year 10 onwards, so you have three years to explore, visit and refine your list. Starting in Year 12 is possible but compressed; we can tell you more at a consultation.',
    },
    {
      question: 'How does counseling differ from school careers guidance?',
      answer:
        'School careers advice is general; our counselors are trained on Bangladeshi admission profiles and know which universities want what. We coach essays, negotiate financial aid and do mock interviews. Your school careers officer knows your local context; we know the destination universities.',
    },
    {
      question: 'Do you help with UK UCAS universities as well as US Common App schools?',
      answer:
        'Yes. We coach students applying to the US, UK, Canada, Australia and combinations of the above. The systems differ—UCAS is one application to five universities; Common App is five separate applications. We help you navigate both.',
    },
    ...commonFaq,
  ],
};
