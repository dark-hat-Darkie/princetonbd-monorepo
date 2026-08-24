import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const admissionsInterviews: ProgramContent = {
  path: '/admissions/interviews',
  seo: {
    title: 'University interview coaching for Bangladeshi students — mock interviews, strategy',
    description:
      'Expert interview coaching and mock interviews with experienced admissions interviewers. We teach you to speak about yourself clearly, thoughtfully and authentically.',
  },
  hero: {
    eyebrow: 'University interviews',
    title: 'An interview is a conversation, not an interrogation.',
    intro:
      'Some universities want to meet you. An interview is a chance to show intellectual curiosity, think out loud and demonstrate that you’re someone they want to teach. We coach you to do all three.',
    actions: [
      { label: 'Book interview coaching', href: '/contact' },
      { label: 'Interview preparation guide', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Interview types', value: 'Admissions-led, alumni, student-led' },
      { label: 'Duration', value: 'Usually 20–45 minutes' },
      { label: 'Format', value: 'In-person, Zoom, phone' },
      { label: 'Our mock interviews', value: 'With experienced interviewers' },
    ],
  },
  features: {
    eyebrow: 'Interview coaching',
    title: 'From nervous to naturally you.',
    intro:
      'Interview preparation is not about memorising answers. It’s about thinking clearly, listening carefully and learning to talk about yourself in a way that sounds genuine.',
    items: [
      {
        title: 'Mock interviews with professional feedback',
        desc: 'We conduct mock interviews and give you feedback on what you said, how you said it, and what you might say better next time. Multiple mocks reduce nerves dramatically.',
      },
      {
        title: 'Thinking out loud and handling difficult questions',
        desc: 'Some interviews ask "What\'s your weakness?" or push on grades. We teach you to answer honestly and thoughtfully, turning potential weaknesses into reflections of character.',
      },
      {
        title: 'Research and personalisation',
        desc: 'For each university, we help you identify what genuinely excites you about their programme. Then you can speak specifically rather than generically.',
      },
      {
        title: 'Post-interview follow-up',
        desc: 'After an interview, the thank-you note matters. We coach what to write and how to keep the conversation going if you’re waitlisted.',
      },
    ],
  },
  stats: [
    {
      value: '92%',
      label: 'Of our students report feeling confident after mock interview coaching',
    },
    { value: '3–5', label: 'Typical number of mock interviews before a real interview' },
    { value: '20–45', label: 'Minutes: typical interview duration' },
    { value: '4.8/5', label: 'Average interviewer rating from our coaching sessions' },
  ],
  testimonials: ['admissions'],
  faq: [
    {
      question: 'Do all universities interview?',
      answer:
        'No. Some universities (like US schools) do not interview at all. Some conduct optional interviews; others require them. UK universities (Cambridge, Oxford) interview almost all candidates. We help you understand which universities on your list interview and prepare accordingly.',
    },
    {
      question: 'How should I prepare?',
      answer:
        'Read deeply about the university and what excites you specifically. Know your own story (grades, achievements, interests) inside out. And do mock interviews—at least three. Preparation reduces nerves and helps you think more clearly in the real interview.',
    },
    {
      question: 'What if I mess up during the interview?',
      answer:
        'Everyone stammers, loses their train of thought, or gives an answer they wish they’d phrased differently. Interviewers know this. If you stumble, take a breath and move on. What matters is overall thoughtfulness and genuine interest in the university.',
    },
    ...commonFaq,
  ],
};
