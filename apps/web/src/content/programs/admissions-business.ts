import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const admissionsBusiness: ProgramContent = {
  path: '/admissions/business',
  seo: {
    title: 'MBA admissions counselling for Bangladeshi professionals — GMAT, essays, applications',
    description:
      'Specialist guidance on GMAT, essay strategy and application to top MBA programmes. We help working professionals apply to Ivies, INSEAD, London Business School and more.',
  },
  hero: {
    eyebrow: 'MBA admissions',
    title: 'An MBA that advances your career, not replaces it.',
    intro:
      'MBA applications are work-focused and time-compressed. You’re applying while working full time, with test scores, leadership stories and a clear post-MBA goal. We coach every step.',
    actions: [
      { label: 'Discuss MBA strategy', href: '/contact' },
      { label: 'Programme types', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Test required', value: 'GMAT (640–750 target)' },
      { label: 'Timeframe', value: '6–9 months typical' },
      { label: 'Application focus', value: 'Leadership and career story' },
      { label: 'Top schools we coach', value: 'Ivies, INSEAD, LBS, NUS' },
    ],
  },
  features: {
    eyebrow: 'MBA application strategy',
    title: 'Admissions are won with clarity.',
    intro:
      'The best MBA essays are not polished; they’re specific. Schools want to know what you want to do next, why that requires an MBA, and why their programme. We help you build that narrative.',
    items: [
      {
        title: 'GMAT strategy and tutoring',
        desc: 'Intensive online tutoring designed for professionals studying part-time. Quant rebuilding, verbal technique and test-day readiness in 8–12 weeks.',
      },
      {
        title: 'Programme selection and fit',
        desc: 'We help you match your profile (score, work experience, career goals) to schools where you’re a genuine fit. Not every top school is right for every applicant.',
      },
      {
        title: 'Essays and application narrative',
        desc: 'Coaching on your leadership story, career goals and why this MBA. Each essay coached through multiple drafts with senior feedback.',
      },
      {
        title: 'Interview and post-acceptance',
        desc: 'Mock interviews with MBA coaches, offer comparison, and guidance on transitioning from work to MBA.',
      },
    ],
  },
  process: {
    eyebrow: 'How MBA applications work',
    title: 'Four months to an acceptance.',
    steps: [
      {
        no: '01',
        title: 'GMAT and profile building',
        desc: 'Target score determined by your programme list. Online tutoring alongside a job; we compress the study cycle.',
      },
      {
        no: '02',
        title: 'Programme shortlist and strategy',
        desc: 'Five to eight schools matched to your score, work experience and post-MBA goals. Reach, target and safety programmes.',
      },
      {
        no: '03',
        title: 'Application and essays',
        desc: 'Why MBA, leadership story, career goals. Each application tailored to that school’s values and curriculum.',
      },
      {
        no: '04',
        title: 'Interviews and offers',
        desc: 'Mock interviews, post-interview strategy and offer comparison. Decision support through enrolment.',
      },
    ],
  },
  formats: [
    {
      name: 'Essentials',
      pitch:
        "GMAT tutoring and application strategy for professionals applying with 6–9 months' timeline.",
      price: bdtPrice(85000),
      priceUnit: 'for the full cycle',
      facts: ['Online tutoring', 'Monthly check-ins', 'Application planning'],
      includes: [
        'GMAT diagnostic and study plan',
        'Eight hours of online GMAT tutoring',
        'Programme selection guidance',
        'Application timeline and system overview',
      ],
      href: '/contact',
    },
    {
      name: 'Comprehensive',
      pitch:
        'Full GMAT prep, one-to-one counselling through applications, essay coaching and interview prep.',
      price: bdtPrice(210000),
      priceUnit: 'for the full cycle',
      facts: ['Dedicated counselor', 'Bi-weekly meetings', 'Unlimited essay drafts'],
      includes: [
        'Intensive GMAT tutoring (16+ hours)',
        'Full-cycle essay coaching',
        'Programme fit analysis and shortlisting',
        'Mock interviews with senior coaches',
        'Post-acceptance guidance',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Premium',
      pitch:
        'Everything in Comprehensive, plus executive coaching on leadership narrative and senior advisor support.',
      price: bdtPrice(360000),
      priceUnit: 'for the full cycle',
      facts: ['Executive coach', 'Weekly meetings', '24-hour response'],
      includes: [
        'Everything in Comprehensive',
        'Executive coaching on leadership positioning',
        'Offer negotiation and scholarship strategy',
        'Alumni network access post-enrolment',
        'Career coaching for your MBA summer internship',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '89%', label: 'Accepted on first application' },
    { value: '$92k', label: 'Average scholarship per student' },
    { value: '670–750', label: 'GMAT range of successful applicants' },
    { value: '18', label: 'Average work experience (months)' },
  ],
  testimonials: ['business'],
  faq: [
    {
      question: 'Do I need to leave my job to apply for an MBA?',
      answer:
        'No. Most applicants apply while working full time. Our GMAT tutoring and application coaching are designed for professionals balancing work and applications. You typically apply in your second or third year of work.',
    },
    {
      question: 'What GMAT score do I need?',
      answer:
        'It depends on the schools you’re targeting. Ivy League MBA programmes typically want 700+; strong UK and European programmes want 650–720. We help you set a target based on your list, then build a study plan to hit it.',
    },
    {
      question: 'How do I choose between MBA programmes?',
      answer:
        'We help you compare on curriculum, location, career outcomes and fit with your goals. An MBA is a two-year commitment; choosing the right school matters as much as the application strategy.',
    },
    ...commonFaq,
  ],
};
