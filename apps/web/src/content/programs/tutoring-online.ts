import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const tutoringOnline: ProgramContent = {
  path: '/tutoring/online',
  seo: {
    title: 'Live-online group tutoring in school subjects — study from anywhere',
    description:
      'Small online cohorts with a camera and a cursor. Live-online tutoring in mathematics, sciences, English and social studies for students across Bangladesh.',
  },
  hero: {
    eyebrow: 'Live-online tutoring',
    title: 'Your tutor in Dhaka, you at home, meeting in the middle.',
    intro:
      'Everything about small-group tutoring stays the same: peer problem-solving, weekly practice sets, expert teaching. Only the commute goes away. Every session is live and recorded; you attend both or just watch the replay.',
    actions: [
      { label: 'Schedule a trial class', href: '/contact' },
      { label: 'See all subjects', href: '/tutoring', variant: 'outline' },
    ],
    facts: [
      { label: 'Cohort size', value: '4–6 students online' },
      { label: 'Session format', value: 'Live only, recorded available' },
      { label: 'Commute time', value: 'Zero — study from anywhere' },
      { label: 'Time zones', value: 'Scheduled for Bangladesh evening' },
    ],
  },
  features: {
    eyebrow: 'Why live online suits rural students',
    title: 'Geography should not decide your tutor.',
    intro:
      'Our Chittagong, Sylhet and Dhaka students are in the same cohort, watching the same whiteboard, solving the same problems — but from home.',
    items: [
      {
        title: 'The best tutor for your subject',
        desc: 'You are no longer limited to tutors within commuting distance. We place you with the right expert, whether they teach from Gulshan or online.',
      },
      {
        title: 'Recording for revision',
        desc: 'Every session is recorded and kept in your cohort library. Re-watch problem-solving or the explanation you missed the first time.',
      },
      {
        title: 'Interactive digital whiteboard',
        desc: 'Your tutor writes live; you solve alongside them. Breakout rooms let three students tackle a problem together while the tutor circulates.',
      },
      {
        title: 'Flexible attendance',
        desc: 'Illness, a family commitment or a missed connection doesn’t mean a missed week. Watch the recording same-day and send your problem set within 48 hours.',
      },
    ],
  },
  stats: [
    { value: '6+', label: 'Districts covered by our live-online cohorts' },
    { value: '91%', label: 'Attendance rate across all online cohorts' },
    { value: '4.8/5', label: 'Student satisfaction on interactive features' },
    { value: '100%', label: 'Of recordings retained for the full term' },
  ],
  testimonials: ['tutoring'],
  faq: [
    {
      question: 'Is there a time limit on how long I can watch a recording?',
      answer:
        'No. Cohort recordings are yours for the full term after it ends — you can revise from them for as long as you’re preparing.',
    },
    {
      question: 'What if my internet cuts out mid-session?',
      answer:
        'You’ll have the full recording within an hour. Send your problem set when you’re back online, and we’ll score it alongside the group.',
    },
    {
      question: 'Can I attend some live and some recorded?',
      answer:
        'Yes. Many students attend live when work or school allows, then watch the recording other weeks. There’s no penalty for missing a live session.',
    },
    ...commonFaq,
  ],
};
