import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const onlineOnDemand: ProgramContent = {
  path: '/online-courses/on-demand',
  seo: {
    title: 'On-demand video courses — watch whenever, wherever',
    description:
      'Recorded expert instruction available anytime. Stream video lessons, download transcripts, and access practice materials whenever you need them.',
  },
  hero: {
    eyebrow: 'On-demand courses',
    title: 'Hit play when you’re ready.',
    intro:
      'No deadlines, no cohorts, no live sessions. Professional video instruction, problem sets and mocks—available in Bangladesh and globally. Start tonight or in six months; it’s there when you log in.',
    actions: [
      { label: 'Browse all courses', href: '/contact' },
      { label: 'Prefer live teaching?', href: '/online-courses/live-online', variant: 'outline' },
    ],
    facts: [
      { label: 'Start date', value: 'Anytime—no cohort required' },
      { label: 'Duration', value: 'Watch on your schedule' },
      { label: 'Access', value: 'Desktop, tablet, or mobile' },
      { label: 'Support', value: 'Email support, optional tutoring' },
    ],
  },
  features: {
    eyebrow: 'Why on-demand works',
    title: 'When live classes fit no one’s calendar.',
    intro:
      'Some students are juggling work, school and family. Waiting for the cohort to progress means nothing gets done. On-demand lets you study in 15-minute bursts whenever you have space.',
    items: [
      {
        title: 'Professional production',
        desc: 'Every video is shot by our teaching team, reviewed for clarity, and narrated at natural speed. This is not a phone recording of a blackboard.',
      },
      {
        title: 'Transcripts downloadable',
        desc: 'Download a PDF of every video’s transcript. Search for the concept you half-remember, jump to that timestamp, and re-watch.',
      },
      {
        title: 'Mobile-friendly',
        desc: 'Watch on your phone on the train, tablet at home, desktop for problem-solving. All sync so you can pause on your phone and resume on your desktop.',
      },
      {
        title: 'No time pressure, no motivation hit',
        desc: 'Live cohorts feel like classes at school—pressure, schedules, deadlines. On-demand is gentler: explore concepts at your pace, skip back if you lose the thread.',
      },
    ],
  },
  process: {
    eyebrow: 'How on-demand learning works',
    title: 'Study your way.',
    steps: [
      {
        no: '01',
        title: 'Buy and access',
        desc: 'Purchase the course and receive login credentials. Log in anytime—content is yours immediately.',
      },
      {
        no: '02',
        title: 'Watch and rewatch',
        desc: 'Videos are sliced by topic, 8–20 minutes each. Watch once or five times. Download transcripts. Take notes alongside the video.',
      },
      {
        no: '03',
        title: 'Practice at your pace',
        desc: 'Problem sets are downloadable. Work through them over an evening or a month. No deadline means no panic—just progress.',
      },
      {
        no: '04',
        title: 'Mock and reflect',
        desc: 'Three full-length mocks are downloadable and timed. Score your mock, watch the video review, and identify your weak points to revisit.',
      },
    ],
  },
  stats: [
    { value: '67%', label: 'Complete an on-demand course' },
    { value: '4.4/5', label: 'Course satisfaction rating' },
    { value: '24/7', label: 'Access anytime, anywhere' },
    { value: '1 year', label: 'Typical window from purchase to completion' },
  ],
  testimonials: ['online', 'test-prep'],
  faq: [
    {
      question: 'What’s the difference between self-paced and on-demand?',
      answer:
        'Self-paced has a suggested study calendar and problem sets tied to each video—it’s more structured. On-demand is purely video: watch what you want, when you want, no calendar. On-demand is for someone who already knows how to study; self-paced is for someone who needs a bit of structure.',
    },
    {
      question: 'Can I download videos to watch offline?',
      answer:
        'Videos stream only, but transcripts are downloadable. You can read the transcript offline, then watch the video when you reconnect.',
    },
    {
      question: 'Is there a deadline to finish the course?',
      answer:
        'No. Once you buy it, the content is yours forever. Some students finish in six weeks; others take a year. You progress at your pace.',
    },
    ...commonFaq,
  ],
};
