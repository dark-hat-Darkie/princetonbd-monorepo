import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const ap: ExamContent = {
  path: '/test-prep/ap',
  slug: 'ap',
  name: 'AP',
  interest: 'SAT / ACT',
  seo: {
    title: 'AP exam preparation in Bangladesh — subject-specific courses & tutoring',
    description:
      'AP courses in Dhaka and Chattogram covering biology, chemistry, calculus, history and more. Small cohorts, full-length practice exams and a written score guarantee.',
  },
  hero: {
    eyebrow: 'University placement and credit',
    title: 'AP scores that earn university credit.',
    intro:
      'AP exams reward deep subject knowledge and exam technique in equal measure. We map the exact curriculum College Board expects, drill the free-response format relentlessly, and score every practice test the way the exam does.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Subject-specific exam · 2–3 hours' },
      { label: 'Sections', value: 'Multiple choice & free response' },
      { label: 'Scored', value: '1–5' },
      { label: 'Sittings', value: 'May and early June' },
    ],
  },
  fee: {
    price: bdtPrice(46000),
    unit: 'per subject · 10-week course',
    includes: [
      '48 taught hours in a class of eight or fewer',
      '10 full-length proctored exams, marked to the College Board rubric',
      'Two 1-on-1 free-response strategy sessions',
      'All materials and the online question bank',
      'Written 4–5 score guarantee',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, six modules, one subject taught to its course outline.',
    intro:
      'Every AP subject is a separate course with its own specialist, but each follows the same shape: the College Board course outline in two halves, then the two question formats under time. Every module ends with a scored section so you know your 1–5 before the next one starts.',
    totals: { weeks: 10, taughtHours: 48, mocks: 10, classSize: 'Max 8' },
    modules: [
      {
        no: '01',
        title: 'Course map and how AP scores',
        summary:
          'How your subject’s exam is built: the units, the weighting of each, the split between multiple choice and free response, and how raw marks become a 1–5. Then a full-length diagnostic.',
        topics: [
          'The course and exam description: units, skills and weightings',
          'Composite scoring: how MCQ and FRQ combine into a 1–5',
          'Full-length diagnostic exam under exam timing',
          'Your unit-by-unit score map and a 4–5 target',
        ],
        hours: 3,
        outcome:
          'Know which units carry the most marks in your subject and where your diagnostic puts you in each.',
      },
      {
        no: '02',
        title: 'Core content I',
        summary:
          'The first half of your subject’s course outline, taught to exam depth and checked with unit tests written in the exam’s own question style.',
        topics: [
          'The foundational units, in the order the outline sets',
          'The skills and practices the exam tests within them',
          'Unit tests in MCQ and FRQ form, marked to the rubric',
          'Vocabulary and notation the markers expect to see',
        ],
        hours: 12,
        outcome: 'Score at a 4 or better on unit tests covering the first half of the outline.',
      },
      {
        no: '03',
        title: 'Core content II',
        summary:
          'The second half of the outline, including the later units that many school courses reach late or not at all, with cumulative review of the first half.',
        topics: [
          'The later units, taught in full rather than skimmed',
          'Cross-unit questions that combine earlier and later material',
          'Cumulative unit tests in exam style',
          'Targeted revision of your weakest units from the score map',
        ],
        hours: 12,
        outcome: 'Cover the entire course outline with no unit you have not been tested on.',
      },
      {
        no: '04',
        title: 'Free-response technique',
        summary:
          'FRQs are marked by rubric, point by point, and reward structure as much as knowledge. How to read the prompt, plan the answer and earn every available point.',
        topics: [
          'Reading task verbs: describe, explain, justify, calculate',
          'Answer structure that follows the scoring guidelines',
          'Showing work and reasoning so partial credit is never lost',
          'Timing across the free-response section',
        ],
        hours: 8,
        outcome: 'Write a complete free response that hits every rubric point in the time allowed.',
      },
      {
        no: '05',
        title: 'Multiple choice under time',
        summary:
          'The multiple-choice section carries around half your score and is entirely about accuracy at pace. Elimination, stimulus-based sets and the distractors your subject favours.',
        topics: [
          'Stimulus-based sets: reading the source once',
          'Elimination and the distractor patterns of your subject',
          'Pacing plans for your section’s question count',
          'Error journals: categorising every miss by unit and cause',
        ],
        hours: 6,
        outcome: 'Finish the multiple-choice section with time to revisit flagged questions.',
      },
      {
        no: '06',
        title: 'Mock cycle and exam week',
        summary:
          'Ten proctored full-length exams across the course, each one marked to the College Board rubric and reviewed with you, and your exam-week plan.',
        topics: [
          'Weekly full-length exams, scored 1–5',
          'One-on-one review of your marked free responses',
          'Digital delivery on Bluebook: set-up and rehearsal',
          'Registration, May timing and score reporting to universities',
        ],
        hours: 7,
        outcome: 'Walk in knowing your 1–5 range and having sat the full exam ten times already.',
      },
    ],
    outcomes: [
      'Cover your subject’s entire course outline, not just what your school reached',
      'Write free responses structured to the scoring guidelines',
      'Hold pace and accuracy through the multiple-choice section',
      'Know your 1–5 range before you sit the exam in May',
    ],
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that teaches the exam, not around it.',
    intro:
      'AP free-response questions reward precise communication and methodology, not just right answers. We grade every response the way College Board does — partial credit, rubric and all.',
    items: [
      {
        title: 'College Board–aligned curriculum',
        desc: 'Every topic, every depth, every skill the exam can test. We map the entire curriculum to practice exam questions so nothing surprises you in May.',
      },
      {
        title: 'Free-response mastery',
        desc: 'FRQs are half your score. We teach you to structure answers by rubric, not by instinct — show your work, explain your reasoning, earn every point.',
      },
      {
        title: 'Formula and reference sheet strategy',
        desc: 'Know what you can look up and what you cannot, so you spend exam time on the thinking, not the memorisation.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the 4 or 5 we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '78%', label: 'Score a 4 or 5 in Classroom courses' },
    { value: '4', label: 'Average score across all our cohorts' },
    { value: '10', label: 'Full-length proctored exams per subject' },
    { value: '40+', label: 'Subjects covered across our programmes' },
  ],
  testimonials: ['test-prep', 'undergraduate'],
  faq: [
    {
      question: 'Which AP exams do you offer?',
      answer:
        'We run cohorts in the most popular subjects — Biology, Chemistry, Calculus AB, Calculus BC, Physics, US History and more. If your subject is not scheduled, we will arrange a private tutor.',
    },
    {
      question: 'When do AP exams happen?',
      answer:
        'AP exams are administered in May and early June. We time our cohorts to finish core content by late March, leaving six weeks for full-length mocks and review.',
    },
    {
      question: 'Can I retake an AP exam if I score below my target?',
      answer:
        'Yes, you can sit an AP exam in another year. We coach students in managing a second attempt: what to focus on, whether to register for a May retake, and what else you can do that summer.',
    },
    ...commonFaq,
  ],
};
