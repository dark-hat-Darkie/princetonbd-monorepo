import type { HubContent } from '../types';
import { commonFaq, outcomeStats, whyUs } from '../shared';

export const testPrepHub: HubContent = {
  path: '/test-prep',
  seo: {
    title: 'Test prep in Bangladesh — SAT, ACT, GRE, GMAT, IELTS & TOEFL courses',
    description:
      'Courses and private tutoring for every admissions test Bangladeshi students sit, on campus in Dhaka and Chattogram or live online. Free diagnostic, adaptive mocks, written score guarantee.',
  },
  hero: {
    eyebrow: 'Test preparation',
    title: 'Every admissions test, taught by people who have topped it.',
    intro:
      'Twelve exams, four ways to study, one written guarantee. Start with a free diagnostic and we will tell you which test suits you and what a realistic target looks like.',
    actions: [
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare all courses', href: '/test-prep/compare', variant: 'outline' },
    ],
    facts: [
      { label: 'Exams covered', value: '12' },
      { label: 'Formats', value: 'Classroom · LiveOnline · 1-on-1 · Self-paced' },
      { label: 'Campuses', value: 'Gulshan · Dhanmondi · Chattogram' },
      { label: 'Guarantee', value: 'Written, on every course' },
    ],
  },
  strip: {
    kicker: 'Preparation for',
    items: ['SAT · ACT', 'GRE · GMAT', 'IELTS · TOEFL', 'LSAT · MCAT', 'AP · PSAT'],
  },
  cards: {
    eyebrow: 'Choose your exam',
    title: 'Start where you are headed.',
    intro:
      'Not sure which test your universities want? Sit a free diagnostic and a counselor will map it out with you.',
    items: [
      {
        no: '01',
        tag: 'Undergraduate',
        title: 'SAT',
        desc: 'Digital and adaptive. Module strategy, adaptive mocks and a written 1400+ track for students aiming high.',
        meta: 'Classroom · LiveOnline · 1-on-1',
        href: '/test-prep/sat',
      },
      {
        no: '02',
        tag: 'Undergraduate',
        title: 'ACT',
        desc: 'Faster, more content-heavy, and the better test for some students. Pacing drills and a science section that stops being a mystery.',
        meta: 'Classroom · LiveOnline',
        href: '/test-prep/act',
      },
      {
        no: '03',
        tag: 'Undergraduate',
        title: 'AP',
        desc: 'Subject-by-subject preparation for Advanced Placement exams, aimed at the credit and the admissions signal alike.',
        meta: '12 subjects',
        href: '/test-prep/ap',
      },
      {
        no: '04',
        tag: 'Undergraduate',
        title: 'PSAT',
        desc: 'The rehearsal that counts. Early practice on the digital format, plus National Merit preparation.',
        meta: 'Autumn cohorts',
        href: '/test-prep/psat',
      },
      {
        no: '05',
        tag: 'Graduate',
        title: 'GRE',
        desc: 'Quant, verbal and analytical writing for MS and PhD applicants — the shorter GRE, taught to its new shape.',
        meta: '10-week cohorts',
        href: '/test-prep/gre',
      },
      {
        no: '06',
        tag: 'Business',
        title: 'GMAT',
        desc: 'GMAT Focus Edition: data insights, quant and verbal, with the section-order strategy that suits your profile.',
        meta: 'Evening cohorts',
        href: '/test-prep/gmat',
      },
      {
        no: '07',
        tag: 'Law',
        title: 'LSAT',
        desc: 'Logical and analytical reasoning taught as a method, not a set of tricks, for JD applicants abroad.',
        meta: '1-on-1 · Small group',
        href: '/test-prep/lsat',
      },
      {
        no: '08',
        tag: 'Medicine',
        title: 'MCAT',
        desc: 'Content review across four sections plus the passage strategy that decides CARS, for pre-med applicants.',
        meta: 'Extended cohorts',
        href: '/test-prep/mcat',
      },
      {
        no: '09',
        tag: 'English proficiency',
        title: 'IELTS',
        desc: 'Band-focused coaching across all four modules, with speaking labs and examiner-style feedback every week.',
        meta: 'Academic · General',
        href: '/test-prep/ielts',
      },
      {
        no: '10',
        tag: 'English proficiency',
        title: 'TOEFL',
        desc: 'Integrated tasks are what separate a 95 from a 110. We drill them until the format stops costing you marks.',
        meta: 'Flexible batches',
        href: '/test-prep/toefl',
      },
      {
        no: '11',
        tag: 'English proficiency',
        title: 'Duolingo English Test',
        desc: 'Accepted more widely every year, sat from home, and adaptive throughout. Short, focused preparation.',
        meta: '3-week sprint',
        href: '/test-prep/duolingo',
      },
      {
        no: '12',
        tag: 'English proficiency',
        title: 'PTE Academic',
        desc: 'Computer-scored, which rewards a very particular kind of answer. We teach exactly what the scorer rewards.',
        meta: 'Flexible batches',
        href: '/test-prep/pte',
      },
    ],
  },
  features: {
    eyebrow: 'Why here',
    title: 'What every course has in common.',
    items: whyUs,
  },
  guarantee: true,
  stats: outcomeStats,
  testimonials: ['test-prep'],
  faq: [
    {
      question: 'Which test should I take?',
      answer:
        'It depends on where you are applying and how you read under time pressure. We run free diagnostics for the SAT, ACT, GRE and GMAT — sit one, or two, and we will recommend based on your actual scores rather than a hunch.',
    },
    {
      question: 'Do you teach on campus or online?',
      answer:
        'Both, and the syllabus is identical. Classroom courses run at Gulshan, Dhanmondi and Chattogram; LiveOnline cohorts are taught live by the same instructors for students anywhere in Bangladesh.',
    },
    ...commonFaq,
  ],
};
