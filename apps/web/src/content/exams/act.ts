import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const act: ExamContent = {
  path: '/test-prep/act',
  name: 'ACT',
  seo: {
    title: 'ACT preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'ACT courses in Dhaka and Chattogram, plus live online cohorts. Full-length practice tests, a written score guarantee and instructors who scored in the top percentile themselves.',
  },
  hero: {
    eyebrow: 'Undergraduate admissions',
    title: 'The ACT score that opens doors.',
    intro:
      'Paper-based, not adaptive, and relentless on timing. We teach section by section and drill speed and accuracy in equal measure, with full-length mocks on the real exam’s schedule before you sit it.',
    actions: [
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Paper-based · 2h 55m' },
      { label: 'Sections', value: 'English · Math · Reading · Science (optional)' },
      { label: 'Scored', value: '1–36' },
      { label: 'Sittings', value: '7 international dates a year' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch: 'The complete curriculum on your own schedule, designed for self-motivated students.',
      price: bdtPrice(16000),
      priceUnit: 'one-off · 6 months of access',
      facts: ['50+ hours of video', 'Self-scheduled'],
      includes: [
        'Every lesson recorded and searchable',
        '4 full-length practice tests',
        'Section-by-section drill banks',
        'Email support from an ACT instructor',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'The classroom course delivered live to a small cohort, from wherever you are.',
      price: bdtPrice(30000),
      priceUnit: 'per 10-week cohort',
      facts: ['36 taught hours', 'Max 12 students', 'Evenings & weekends'],
      includes: [
        'Live classes with a named instructor',
        '8 full-length practice tests, reviewed',
        'Weekly homework marked and returned',
        'Recordings of every session',
      ],
      href: '/contact',
    },
    {
      name: 'Classroom 32+',
      pitch: 'Our flagship course, on campus, aimed at a 32 and above.',
      price: bdtPrice(44000),
      priceUnit: 'per 10-week cohort',
      facts: ['48 taught hours', 'Max 10 students', 'Gulshan · Dhanmondi · Chattogram'],
      includes: [
        'Everything in LiveOnline, taught in person',
        '10 full-length proctored tests',
        'Two 1-on-1 strategy sessions',
        'Written 32+ score guarantee',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Private Tutoring',
      pitch: 'One instructor, one student, one curriculum built entirely around your weak spots.',
      price: bdtPrice(88000),
      priceUnit: 'per 20-hour package',
      facts: ['20 hours', '1-on-1', 'On campus or online'],
      includes: [
        'Diagnostic-led plan rebuilt every fortnight',
        'Unlimited mock scoring and review',
        'Direct line to your tutor between sessions',
        'Scheduling around your school calendar',
      ],
      href: '/contact',
    },
  ],
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that mirrors the real ACT.',
    intro:
      'Speed and accuracy are both scored in the ACT. Practising on timed sections does not prepare you for three hours of unbroken focus, so every mock we run is full-length and proctored like exam day.',
    items: [
      {
        title: 'Timed section drills',
        desc: 'Forty-five-minute English and Reading drills, sixty-minute Math drills, with a forty-five-minute Science section — each timed to the second.',
      },
      {
        title: 'Science reasoning',
        desc: 'The ACT science section is not science; it is data interpretation and experimental reasoning. We teach that skill, not memorised facts.',
      },
      {
        title: 'Score choice awareness',
        desc: 'You can send the ACT scores from any test date — we map which schools benefit from superscoring and which do not.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+4.5', label: 'Average composite point improvement' },
    { value: '32', label: 'Median score of our 32+ cohort' },
    { value: '10', label: 'Full-length proctored tests in Classroom courses' },
    { value: '94%', label: 'Achieve or exceed their agreed target' },
  ],
  testimonials: ['act', 'undergraduate'],
  faq: [
    {
      question: 'ACT or SAT — which one is right for me?',
      answer:
        'Sit a diagnostic of each — we run both free — and prepare for whichever you score higher on relative to its curve. US universities treat both identically.',
    },
    {
      question: 'When should I take the ACT science section?',
      answer:
        'The science section is now optional. If you are applying to selective STEM programmes, take it; otherwise, skip it and spend the time perfecting English and Math.',
    },
    {
      question: 'How does the ACT science section work?',
      answer:
        'You will see passages with charts, graphs and data — you are not being tested on whether you memorised chemistry or biology. We teach you to read the visuals fast and spot what the question is really asking.',
    },
    {
      question: 'How does the score guarantee work?',
      answer:
        'We agree a target in writing at enrolment based on your diagnostic. Attend your classes, sit your scheduled mocks, and if the official score falls short, your next full course is free.',
    },
    ...commonFaq,
  ],
};
