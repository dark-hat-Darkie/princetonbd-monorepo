import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const act: ExamEditorial = {
  slug: 'act',
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
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, six modules, every section timed to the second.',
    intro:
      'The ACT is a pacing exam before it is a content exam, so every module is taught against the clock from the first week. Science is optional on the enhanced ACT; we teach it anyway, because the reasoning it tests is the reasoning STEM programmes look for.',
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
