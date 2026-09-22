import type { HubContent } from '../types';
import { commonFaq, outcomeStats, whyUs } from '../shared';

export const tutoringHub: HubContent = {
  path: '/tutoring',
  seo: {
    title: 'Tutoring in Bangladesh — SAT, ACT, IELTS, TOEFL, A-levels, AP and school subjects',
    description:
      'Private, small group and online tutoring across test prep, school subjects and AP. One-to-one sessions on campus in Dhaka and Chattogram, or live online from anywhere.',
  },
  hero: {
    eyebrow: 'Tutoring',
    title: 'One tutor, one student, one syllabus.',
    intro:
      'Whether you need precision work on a weak concept or a weekly partner through your whole course, we match you with a tutor who has mastered the subject and knows how to teach it. Classroom, small group, or online.',
    actions: [
      { label: 'Book a tutor', href: '/contact' },
      { label: 'See our tutors', href: '/about/instructors', variant: 'outline' },
    ],
    facts: [
      { label: 'Subjects', value: 'Test prep · STEM · English · Social studies · AP' },
      { label: 'Formats', value: '1-on-1 · Small group · Online' },
      { label: 'Campuses', value: 'Gulshan · Dhanmondi · Chattogram' },
      { label: 'Guarantee', value: 'Written, on tutoring packages' },
    ],
  },
  strip: {
    kicker: 'Tutoring in',
    items: ['Mathematics', 'Science', 'English', 'Social studies', 'AP subjects'],
  },
  cards: {
    eyebrow: 'How it works',
    title: 'Tutoring that fits your life.',
    intro:
      'Every package starts with a diagnostic and a tutor matched to the subject, the exam and the way you learn — on campus, or live online from anywhere.',
    items: [
      {
        no: '01',
        tag: 'Format',
        title: 'Private 1-on-1',
        desc: 'Intensive, bespoke tuition matched to exactly what you need. The most personal and fastest path to a higher score.',
        meta: 'On campus · Online available',
        href: '/tutoring/private',
      },
    ],
  },
  features: {
    eyebrow: 'Why here',
    title: 'What every tutoring session has in common.',
    items: whyUs,
  },
  guarantee: true,
  stats: outcomeStats,
  testimonials: ['tutoring'],
  faq: [
    {
      question: 'How much does tutoring cost?',
      answer:
        'Pricing depends on the format you choose: private sessions, small group classes and online tuition all have different per-hour rates, and packages of four, eight, or twelve hours at a discount. We also offer single sessions for those trying us for the first time.',
    },
    {
      question: 'How often should I meet with a tutor?',
      answer:
        'That depends on your goal and your current level. A student preparing for SAT maths might need two sessions a week; a student shoring up school chemistry might need one. Your tutor will help you set a rhythm in your first session.',
    },
    {
      question: 'Can I choose my tutor?',
      answer:
        'Yes. Once you book, you will meet a tutor in a brief compatibility call before your first session, and you can request a different tutor if the fit is not right.',
    },
    ...commonFaq,
  ],
};
