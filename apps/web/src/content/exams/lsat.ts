import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

/**
 * LSAT is referral-only: our teachers have not been trained for it, so we do
 * not run local cohorts. This page captures interest and places students in
 * an official The Princeton Review (US) course or 1:1 tutoring — it must not
 * promise local classes, local teachers, a guarantee, or cohort outcomes.
 */
export const lsat: ExamEditorial = {
  slug: 'lsat',
  interest: 'GRE / GMAT',
  seo: {
    title: 'LSAT preparation from Bangladesh — TPR US courses via local referral',
    description:
      'Thinking about the LSAT from Bangladesh? Talk to us first: we place you in an official The Princeton Review (US) LSAT course or 1:1 tutoring and guide you locally from consultation to test day.',
  },
  hero: {
    eyebrow: 'Law school admissions',
    title: 'The LSAT, via our US partner.',
    intro:
      'We do not run local LSAT cohorts — our teachers have not been trained for it yet. Instead, we place you in an official The Princeton Review (US) LSAT course or 1:1 tutoring, and stay your local point of contact from consultation to test day.',
    actions: [
      { label: 'Register your interest', href: '/contact' },
      { label: 'Compare all courses', href: '/test-prep/compare', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Online or test centre · ~2h 35m' },
      { label: 'Sections', value: 'Logical Reasoning (×2) · Reading Comprehension' },
      { label: 'Scored', value: '120–180' },
      { label: 'Sittings', value: 'Up to three times per testing year' },
    ],
  },
  curriculum: {
    eyebrow: 'The exam',
    title: 'What any serious LSAT preparation has to cover.',
    intro:
      'Since August 2024 the LSAT is two scored Logical Reasoning sections, one scored Reading Comprehension section and one unscored section, with LSAT Writing taken separately. The TPR US course we place you in teaches exactly this syllabus.',
  },
  includes: {
    eyebrow: 'How placement works',
    title: 'A US course, arranged and supported locally.',
    intro:
      'You get the official American course — we make sure it is the right one, and that you are never navigating it alone from a different time zone.',
    items: [
      {
        title: 'Placed in a TPR US course',
        desc: 'We enrol you directly in an official The Princeton Review (US) LSAT course or 1:1 tutoring matched to your timeline and target score.',
      },
      {
        title: 'Local guidance throughout',
        desc: 'A Dhaka-based advisor helps you choose between course and tutoring, tracks your schedule, and plans your test date and test-day setup.',
      },
      {
        title: 'The real format, explained',
        desc: 'Logic Games were retired in 2024 — the test is now pure logical reasoning and reading comprehension. We make sure you know what you are signing up for before you pay anything.',
      },
      {
        title: 'Free consultation first',
        desc: 'Tell us your timeline and target law schools; we will tell you honestly whether the LSAT is the right test and which US option fits.',
      },
    ],
  },
  faq: [
    {
      question: 'Do you run LSAT classes in Dhaka?',
      answer:
        'Not yet — our teachers have not been trained for the LSAT, so we do not offer local cohorts. Instead we place you in an official The Princeton Review (US) course or 1:1 tutoring and support you locally. Talk to us before enrolling anywhere; placement details are confirmed at your free consultation.',
    },
    {
      question: 'When did Logic Games disappear?',
      answer:
        'The LSAT removed Analytical Reasoning (Logic Games) in August 2024. The test is now Logical Reasoning (section 1), Logical Reasoning (section 2), Reading Comprehension and a variable section. The US courses we refer into teach the current format.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top law schools expect 170+, but excellent schools admit at 165+. Your target depends on your law school ambitions and the schools you are applying to. We set a realistic target at your free consultation.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Twelve to sixteen weeks is typical for a 10–15 point gain. The LSAT rewards sustained, daily practice more than most exams. Start earlier if aiming past 172 or if your diagnostic comes in below 155.',
    },
    {
      question: 'Can I take the LSAT from home?',
      answer:
        'Yes — the LSAT can be taken online with live remote proctoring or at a test centre. We help you pick the setting that suits you and prepare accordingly.',
    },
    ...commonFaq,
  ],
};
