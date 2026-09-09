import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const act: ExamContent = {
  path: '/test-prep/act',
  slug: 'act',
  name: 'ACT',
  interest: 'SAT / ACT',
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
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Paper or online · about 2h 05m core' },
      { label: 'Sections', value: 'English · Math · Reading · Science (optional)' },
      { label: 'Scored', value: '1–36' },
      { label: 'Sittings', value: '7 international dates a year' },
    ],
  },
  fee: {
    price: bdtPrice(44000),
    unit: 'per 10-week course',
    includes: [
      '48 taught hours in a class of ten or fewer',
      '10 full-length proctored tests, scored and reviewed',
      'Two 1-on-1 strategy sessions',
      'All materials and the online question bank',
      'Written 32+ score guarantee',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, six modules, every section timed to the second.',
    intro:
      'The ACT is a pacing exam before it is a content exam, so every module is taught against the clock from the first week. Science is optional on the enhanced ACT; we teach it anyway, because the reasoning it tests is the reasoning STEM programmes look for.',
    totals: { weeks: 10, taughtHours: 48, mocks: 10, classSize: 'Max 10' },
    modules: [
      {
        no: '01',
        title: 'Test anatomy and pacing',
        summary:
          'How the enhanced ACT is built: three core sections that make the 1–36 composite, an optional Science section scored on its own, and shorter sections with more time per question than before. Then a full-length diagnostic.',
        topics: [
          'Composite vs section scores: how English, Maths and Reading average to 1–36',
          'Online or paper, Science or not: choosing your version',
          'Full-length diagnostic under exam timing',
          'Your section-by-section score map and a 32+ target',
        ],
        hours: 4,
        outcome: 'Know your composite, your weakest section and the pacing plan for each.',
      },
      {
        no: '02',
        title: 'English',
        summary:
          'Fifty questions in thirty-five minutes on passages with underlined portions. Conventions of standard English, production of writing and knowledge of language.',
        topics: [
          'Punctuation: commas, apostrophes, semicolons, colons and dashes',
          'Sentence structure, agreement, verb tense and modifiers',
          'Transitions, topic sentences and whether to add or delete',
          'Concision, tone and word choice at 42 seconds a question',
        ],
        hours: 10,
        outcome:
          'Finish all the passages with time to spare and stop losing marks to concision questions.',
      },
      {
        no: '03',
        title: 'Maths',
        summary:
          'Forty-five questions in fifty minutes, four answer choices each, from pre-algebra through to trigonometry. Calculator allowed throughout.',
        topics: [
          'Number and quantity, ratios, percentages and unit conversion',
          'Algebra: linear, quadratic, systems and functions',
          'Geometry: coordinate, plane and solid; circles and triangles',
          'Statistics, probability, matrices and trigonometry',
        ],
        hours: 11,
        outcome:
          'Solve every routine item in under a minute so the last ten questions get the time they need.',
      },
      {
        no: '04',
        title: 'Reading',
        summary:
          'Four passages, thirty-six questions, forty minutes. Literary narrative, social science, humanities and natural science, each with its own way of hiding the answer.',
        topics: [
          'Key ideas and details: locating evidence fast',
          'Craft and structure: word meaning, purpose and point of view',
          'Paired passages and integrating ideas across texts',
          'Passage order: reading the four in the order that suits you',
        ],
        hours: 9,
        outcome:
          'Finish all four passages inside forty minutes with a working strategy for the one you find hardest.',
      },
      {
        no: '05',
        title: 'Science reasoning',
        summary:
          'Optional on the enhanced ACT, and still worth sitting for STEM applicants. Forty questions in forty minutes on data, experiments and conflicting viewpoints; it tests reading, not recall.',
        topics: [
          'Data representation: reading tables and graphs quickly',
          'Research summaries: variables, controls and what changed between trials',
          'Conflicting viewpoints: mapping who claims what',
          'When to skip the passage and go straight to the questions',
        ],
        hours: 8,
        outcome:
          'Answer science questions from the figures in under a minute each, without needing the underlying chemistry or biology.',
      },
      {
        no: '06',
        title: 'Mock cycle and score review',
        summary:
          'Ten proctored full-length tests across the course, each one reviewed section by section, and your test-day plan.',
        topics: [
          'Weekly full-length tests on the real exam schedule',
          'One-on-one review of your error journal and section trend',
          'Registration, online vs paper set-up and test-day timing',
          'Superscoring, score choice and which sittings to send',
        ],
        hours: 6,
        outcome:
          'Walk in knowing your composite range and having sat the full ACT ten times already.',
      },
    ],
    outcomes: [
      'Hold pace through every section without leaving questions blank',
      'Read ACT science figures as data, not as a science test',
      'Know whether to sit Science, online or on paper, and when',
      'Know your 1–36 range before you book the real test',
    ],
  },
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
