import type { CompanyContent } from '@/content/types';
import { outcomeStats, whyUs } from '@/content/shared';

export const aboutPage: CompanyContent = {
  path: '/about',
  seo: {
    title: 'About Princeton Review Bangladesh — test prep, tutoring and admissions',
    description:
      'Founded in 1980. We prepare Bangladeshi students for the SAT, ACT, GRE, GMAT and IELTS, offer bespoke tutoring, and guide admissions to universities across the USA, UK, Canada and beyond.',
  },
  hero: {
    eyebrow: 'About us',
    title: 'Forty years of getting students into great universities.',
    intro:
      'Test preparation, tutoring, admissions counseling and study-abroad services for Bangladeshi students. Three campuses, live online, and honest advice about what it takes to get in.',
    facts: [
      { label: 'Founded', value: '1980 in Princeton, New Jersey' },
      { label: 'Students in Bangladesh', value: '12,000+' },
      { label: 'Campuses', value: 'Gulshan · Dhanmondi · Chattogram' },
      { label: 'Universities we feed', value: 'Ivy League to Australia' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'Princeton Review Bangladesh sits inside a forty-year global operation. We teach the same curriculum, the same adaptive mock-test formats, and the same methods that put Americans into MIT and Oxford. The exams do not change. What changes is the context: a Bangladeshi student applying to a US university faces different visa rules, different scholarship windows, and different costs than their American peer.',
    },
    { type: 'heading', text: 'Who we teach' },
    {
      type: 'paragraph',
      text: 'Students in Dhaka and Chattogram applying abroad — teenagers aiming for the SAT or ACT before university, graduates taking the GRE or GMAT for business school and PhDs, and everyone in between preparing English tests for admission or work visas. We also tutor students here in Bangladesh preparing GCSEs and A-Levels, and advise families making the study-abroad decision.',
    },
    { type: 'heading', text: 'The teaching model' },
    {
      type: 'paragraph',
      text: 'Every class has a cap. You do not sit in a lecture hall with ninety other students watching someone work examples. Your instructor knows your weak spots by name, not by anonymous numbers.',
    },
    {
      type: 'list',
      items: [
        'Small cohorts, typically eight to twelve students per class.',
        'Full-length adaptive mock tests every cycle, scored and reviewed with your instructor.',
        'Section drills on the specific topics bringing down your score, not generic revision.',
        'A written guarantee: hit your target or study the whole course again free.',
        'Faculty trained on top global university curricula — instructors study the exams they teach.',
      ],
    },
    { type: 'heading', text: 'Where we teach' },
    {
      type: 'paragraph',
      text: 'Campuses in Dhaka and Chattogram, with live online options for students outside those cities. We do not run satellite offices — we run full teaching centres. Every campus has the full roster of courses, the exam library and the admissions counselors.',
    },
    {
      type: 'table',
      head: ['Campus', 'Location', 'Courses', 'Contact'],
      rows: [
        [
          'Gulshan',
          'House 00, Road 00, Gulshan-2, Dhaka 1212',
          'All courses live',
          '+880 1700-000000',
        ],
        [
          'Dhanmondi',
          'House 00, Road 00, Dhanmondi, Dhaka 1205',
          'All courses live',
          '+880 1700-000001',
        ],
        [
          'Chattogram',
          'Level 0, 00 CDA Avenue, Chattogram 4000',
          'All courses live',
          '+880 1700-000002',
        ],
        ['Online', 'Anywhere in Bangladesh', 'All courses', 'hello@princetonreviewbd.com'],
      ],
    },
    { type: 'heading', text: 'The admissions side' },
    {
      type: 'paragraph',
      text: 'We advise on university choice, essay strategy, recommendation letters and financial aid. The goal is not "any admission" — it is the right university at the right price. We turn down students sometimes. We tell families "this school costs too much for what you get" or "you applied late; let us get you a stronger shortlist for next year". That is the honest version.',
    },
  ],
  features: {
    eyebrow: 'Why Princeton Review',
    title: 'The difference when you choose us',
    items: whyUs,
  },
  cards: {
    eyebrow: 'Explore',
    title: 'Everything you need to know',
    items: [
      {
        tag: 'Company',
        title: 'Our instructors',
        desc: 'Who teaches at Princeton Review Bangladesh, the training they complete, and what they know.',
        href: '/about/instructors',
      },
      {
        tag: 'Company',
        title: 'Our campuses',
        desc: 'Three teaching centres in Dhaka and Chattogram. Address, hours, what each offers.',
        href: '/about/campuses',
      },
      {
        tag: 'Outcomes',
        title: 'Our results',
        desc: 'Where students have been admitted, their score improvements, scholarships won.',
        href: '/about/results',
      },
      {
        tag: 'Guarantee',
        title: 'The score guarantee',
        desc: 'What we stand behind, what the guarantee covers, how to claim it.',
        href: '/about/guarantee',
      },
    ],
  },
  stats: outcomeStats,
};
