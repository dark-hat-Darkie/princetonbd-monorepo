import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const ap: ExamContent = {
  path: '/test-prep/ap',
  name: 'AP',
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
      { label: 'Book a free consultation', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Subject-specific exam · 2–3 hours' },
      { label: 'Sections', value: 'Multiple choice & free response' },
      { label: 'Scored', value: '1–5' },
      { label: 'Sittings', value: 'May and early June' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch: 'A subject-specific curriculum on your own schedule, for independent learners.',
      price: bdtPrice(18000),
      priceUnit: 'per subject · 5 months of access',
      facts: ['60+ hours of video', 'Self-scheduled'],
      includes: [
        'Complete syllabus aligned to College Board',
        '5 full-length practice exams per subject',
        'Free-response question bank with model answers',
        'Email support from an AP subject specialist',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'The classroom course delivered live to a small cohort, available from anywhere.',
      price: bdtPrice(32000),
      priceUnit: 'per subject per cohort',
      facts: ['40 taught hours', 'Max 10 students', 'Evenings & weekends'],
      includes: [
        'Live classes with a subject specialist',
        '8 full-length practice exams, reviewed',
        'Weekly free-response assignments marked',
        'Session recordings and revision materials',
      ],
      href: '/contact',
    },
    {
      name: 'Classroom',
      pitch: 'On campus, with a named specialist, aiming squarely at a 4 or 5.',
      price: bdtPrice(46000),
      priceUnit: 'per subject per cohort',
      facts: ['48 taught hours', 'Max 8 students', 'Gulshan · Dhanmondi · Chattogram'],
      includes: [
        'Everything in LiveOnline, taught in person',
        '10 full-length proctored exams',
        'Two 1-on-1 free-response strategy sessions',
        'Written 4–5 score guarantee',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Private Tutoring',
      pitch: 'One specialist, one student, one curriculum built around your exact gaps.',
      price: bdtPrice(90000),
      priceUnit: 'per 20-hour package',
      facts: ['20 hours', '1-on-1', 'On campus or online'],
      includes: [
        'Diagnostic-led learning plan',
        'Unlimited full-length exam scoring',
        'FRQ-specific coaching between sessions',
        'Scheduling around your school calendar',
      ],
      href: '/contact',
    },
  ],
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
