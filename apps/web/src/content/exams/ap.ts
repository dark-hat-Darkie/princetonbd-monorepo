import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const ap: ExamEditorial = {
  slug: 'ap',
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
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, six modules, one subject taught to its course outline.',
    intro:
      'Every AP subject is a separate course with its own specialist, but each follows the same shape: the College Board course outline in two halves, then the two question formats under time. Every module ends with a scored section so you know your 1–5 before the next one starts.',
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
