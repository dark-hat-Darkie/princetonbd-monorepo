import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const subjectAdvancedPlacement: ProgramContent = {
  path: '/tutoring/subjects/advanced-placement',
  seo: {
    title: 'AP subject exam tutoring — all AP examinations',
    description:
      'AP tutoring in calculus, chemistry, biology, US history, world history, English and more. Expert preparation for every AP exam.',
  },
  hero: {
    eyebrow: 'Advanced Placement tutoring',
    title: 'Five threes is a win. A four is a win for most students.',
    intro:
      'The AP examination is unforgiving—the curve is steep. A 5 puts you in the top 10%. A 4 earns college credit almost everywhere and takes the pressure off first-year selection. We drill the material where the College Board rewards you most.',
    actions: [
      { label: 'Find your AP subject', href: '/contact' },
      { label: 'See all subjects', href: '/tutoring', variant: 'outline' },
    ],
    facts: [
      { label: 'Subjects', value: '20+ AP exams covered' },
      { label: 'Curriculum', value: 'College Board official curriculum' },
      { label: 'Focus', value: 'High-yield material and scoring patterns' },
      { label: 'Exams', value: 'Three full practice tests, scored officially' },
    ],
  },
  features: {
    eyebrow: 'How we prep for the AP exam',
    title: 'The College Board rewards pattern recognition.',
    intro:
      'The AP is not a knowledge test; it’s a reading-comprehension test with a subject. Learn to spot what the question is really asking, and the content arranges itself.',
    items: [
      {
        title: 'Unit-by-unit mastery',
        desc: 'The College Board organises each AP into units. We sequence tutoring unit by unit, drilling the multiple-choice and free-response question types as we go.',
      },
      {
        title: 'High-yield triage',
        desc: 'Not all units appear equally on the exam. We weight your study toward the topics that carry the most points.',
      },
      {
        title: 'Scoring patterns',
        desc: 'Every AP free-response rubric is public. Your tutor teaches you the language of a high-scoring answer: what each point demands, which details examiners reward.',
      },
      {
        title: 'Time management',
        desc: 'The multiple-choice section is 90 minutes for 45 questions. Your tutor drills the pace and the shortcuts so you finish with time for a final pass.',
      },
    ],
  },
  stats: [
    { value: '78%', label: 'Score a 4 or higher on their AP exam' },
    { value: '4.7/5', label: 'Average AP tutor rating' },
    { value: '12 weeks', label: 'Typical prep timeline for a 5-pointer' },
    { value: '3 full mocks', label: 'Scored using official rubrics' },
  ],
  testimonials: ['tutoring'],
  faq: [
    {
      question: 'Is AP tutoring different from school subject tutoring?',
      answer:
        'Yes—AP is compressed and high-stakes. We prioritise the 20% of material that carries 80% of the points, and we drill the exact question formats the College Board uses.',
    },
    {
      question: 'When should I start AP prep tutoring?',
      answer:
        'Three months before the exam is solid. Six months is more comfortable, especially if your school year is busy. We’ll map your target score and see if the timeline allows it.',
    },
    {
      question: 'Can I tutor two AP subjects at once?',
      answer:
        'Yes. Many students take two or three APs the same year. We can schedule two tutors—one for each subject—back-to-back, or find one tutor strong in both (eg, AP Calculus and Statistics).',
    },
    ...commonFaq,
  ],
};
