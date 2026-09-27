import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

/**
 * MCAT is referral-only: our teachers have not been trained for it, so we do
 * not run local cohorts. This page captures interest and places students in
 * an official The Princeton Review (US) course or 1:1 tutoring — it must not
 * promise local classes, local teachers, a guarantee, or cohort outcomes.
 */
export const mcat: ExamEditorial = {
  slug: 'mcat',
  interest: 'GRE / GMAT',
  seo: {
    title: 'MCAT preparation from Bangladesh — TPR US courses via local referral',
    description:
      'Thinking about the MCAT from Bangladesh? Talk to us first: we place you in an official The Princeton Review (US) MCAT course or 1:1 tutoring and guide you locally from consultation to test day.',
  },
  hero: {
    eyebrow: 'Medical school admissions',
    title: 'The MCAT, via our US partner.',
    intro:
      'We do not run local MCAT cohorts — our teachers have not been trained for it yet. Instead, we place you in an official The Princeton Review (US) MCAT course or 1:1 tutoring, and stay your local point of contact from consultation to test day.',
    actions: [
      { label: 'Register your interest', href: '/contact' },
      { label: 'Compare all courses', href: '/test-prep/compare', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Computer-based, test centre · 7h 30m' },
      { label: 'Sections', value: 'Chem/Phys · Bio/Biochem · Psych/Soc · CARS' },
      { label: 'Scored', value: '472–528 (midpoint 500)' },
      { label: 'Sittings', value: 'Multiple sittings, January–September' },
    ],
  },
  curriculum: {
    eyebrow: 'The exam',
    title: 'What any serious MCAT preparation has to cover.',
    intro:
      'Four sections, 230 questions, seven and a half hours, scored 472–528. The TPR US course we place you in teaches the content, builds the reasoning and rehearses the stamina — six months is the typical runway.',
  },
  includes: {
    eyebrow: 'How placement works',
    title: 'A US course, arranged and supported locally.',
    intro:
      'You get the official American course — we make sure it is the right one, and that you are never navigating it alone from a different time zone.',
    items: [
      {
        title: 'Placed in a TPR US course',
        desc: 'We enrol you directly in an official The Princeton Review (US) MCAT course or 1:1 tutoring matched to your timeline and target score.',
      },
      {
        title: 'Local guidance throughout',
        desc: 'A Dhaka-based advisor helps you choose between course and tutoring, tracks your schedule, and plans your test date and test-day setup.',
      },
      {
        title: 'The real format, explained',
        desc: 'Seven and a half hours across four sections, testing application rather than memorisation. We make sure you know what you are signing up for before you pay anything.',
      },
      {
        title: 'Free consultation first',
        desc: 'Tell us your timeline and target medical schools; we will tell you honestly whether the MCAT is the right test and which US option fits.',
      },
    ],
  },
  faq: [
    {
      question: 'Do you run MCAT classes in Dhaka?',
      answer:
        'Not yet — our teachers have not been trained for the MCAT, so we do not offer local cohorts. Instead we place you in an official The Princeton Review (US) course or 1:1 tutoring and support you locally. Talk to us before enrolling anywhere; placement details are confirmed at your free consultation.',
    },
    {
      question: 'How much content do I need to know?',
      answer:
        'A lot: general chemistry, organic chemistry, biochemistry, biology, psychology and statistics. But the MCAT is not a memorisation test — it tests your ability to apply concepts you might not have seen before. The US course teaches the core curriculum plus drilling and strategy.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top medical schools expect 515+, but excellent schools admit at 505+. Your target depends on the schools you aim for and their competitiveness. We set a realistic target at your free consultation.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Six to nine months is typical, with three to four hours of study most days. The MCAT rewards consistency over cramming. Start early if you are aiming past 520 or if your diagnostic shows gaps in biology or chemistry.',
    },
    {
      question: 'Can I take the MCAT from home?',
      answer:
        'No — the MCAT is administered at official test centres only. We help you pick a sitting and prepare for the centre experience.',
    },
    ...commonFaq,
  ],
};
