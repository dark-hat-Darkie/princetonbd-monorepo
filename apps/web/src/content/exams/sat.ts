import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const sat: ExamEditorial = {
  slug: 'sat',
  interest: 'SAT / ACT',
  seo: {
    title: 'SAT preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'SAT courses in Dhaka and Chattogram, plus live online cohorts. Twelve adaptive full-length tests, the Digital SAT Manual, and a score-improvement guarantee with TPR-trained instructors.',
  },
  hero: {
    eyebrow: 'Undergraduate admissions',
    title: 'The SAT score your shortlist actually needs.',
    intro:
      'The digital SAT is adaptive: two sections of two modules each, where your second module is harder or easier depending on your first — and one composite score, 400–1600, with a score for each section. We teach to that format, and prove the gain with full-length adaptive mocks before you ever sit the real thing.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, adaptive · 2h 14m' },
      { label: 'Sections', value: 'Reading & Writing · Math' },
      { label: 'Scored', value: '400–1600' },
      { label: 'Sittings', value: '8 official sittings a year' },
    ],
  },
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, seven modules, both test halves covered.',
    intro:
      'Reading & Writing and Math are taught in parallel from week one, because each section earns its own 200–800 score and a weak half caps your 400–1600 total. Every section block ends with a timed practice set, so you always know your section score before moving on.',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that survives contact with the real exam.',
    intro:
      'The digital SAT adapts to you mid-test. Practising on static paper papers does not prepare you for that, so ours adapt too.',
    items: [
      {
        title: 'Twelve adaptive mocks',
        desc: 'Full-length tests — our adaptive mocks plus official College Board Bluebook practice — scored 400–1600 with personalised score reports that pinpoint what to study next.',
      },
      {
        title: 'The Digital SAT Manual',
        desc: 'The official manual, exclusive to Princeton Review instructor-led courses, with 365 days of access to materials and the online question bank.',
      },
      {
        title: 'Drills that target your gaps',
        desc: '150+ targeted drills and thousands of practice questions, assigned from your error journal — every wrong answer categorised, not just corrected, so the same mistake stops recurring by week four.',
      },
      {
        title: 'Score-improvement guarantee',
        desc: 'Improve on your starting score or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '12', label: 'Full-length adaptive practice tests' },
    { value: '150+', label: 'Targeted practice drills' },
    { value: '365', label: 'Days of access to materials' },
    { value: '48', label: 'Live taught hours' },
  ],
  disclaimer:
    'SAT® is a trademark registered by the College Board, which is not affiliated with, and does not endorse this product.',
  faq: [
    {
      question: 'Digital or paper — which SAT will I sit?',
      answer:
        'Every SAT worldwide is now digital and adaptive, taken on the Bluebook app. You will practise on both our adaptive full-length mocks and official College Board Bluebook practice tests — never on retired paper papers.',
    },
    {
      question: 'How long before my test date should I start?',
      answer:
        'Ten to twelve weeks is the sweet spot for a 100–250 point gain. Start earlier if you are aiming past 1500 or if your diagnostic comes back below 1100 — we will tell you honestly at the consultation.',
    },
    {
      question: 'Should I take the SAT or the ACT?',
      answer:
        'Sit a diagnostic of each — we run both free — and prepare for whichever you score better on relative to its curve. Universities in the US treat them identically.',
    },
    {
      question: 'How does the score guarantee work?',
      answer:
        'We record your starting score at enrolment. Attend your classes, sit your scheduled mocks, and if your official score does not improve on it, your next full course is free. See the enrolment terms for the full conditions.',
    },
    ...commonFaq,
  ],
};
