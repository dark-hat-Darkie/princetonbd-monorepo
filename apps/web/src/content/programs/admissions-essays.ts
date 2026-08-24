import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const admissionsEssays: ProgramContent = {
  path: '/admissions/essays',
  seo: {
    title: 'University essay coaching and personal statement editing for Bangladeshi students',
    description:
      'One-to-one coaching on university essays, personal statements and supplemental essays. We teach writing that shows who you are, not who you think admissions want.',
  },
  hero: {
    eyebrow: 'Essays and personal statements',
    title: 'Essays that show what grades cannot.',
    intro:
      'Your essays are the only words you write directly to admissions. Grades and tests are credentials; essays are character. We coach you to write essays that are true, specific and compelling.',
    actions: [
      { label: 'Book essay coaching', href: '/contact' },
      { label: 'Essay guide', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'One-to-one coaching', value: 'Your essayist, not a bot' },
      { label: 'Turnaround', value: 'Feedback within 48 hours' },
      { label: 'Format coverage', value: 'Common App, UCAS, direct university portals' },
      { label: 'Drafts included', value: 'Unlimited until submission' },
    ],
  },
  features: {
    eyebrow: 'What essay coaching covers',
    title: 'From brainstorm to final draft.',
    intro:
      'The best essays start with honesty, not strategy. We teach you to find your story, then shape it so admissions understand what matters.',
    items: [
      {
        title: 'Brainstorming and story selection',
        desc: 'We help you identify moments that matter—the challenges you’ve faced, the things you’ve learned, what you genuinely care about—and shape them into essays.',
      },
      {
        title: 'Personal statement drafting',
        desc: 'Coaching on voice, structure and pacing. Personal statements are short; every word counts. We teach you to show character, not list achievements.',
      },
      {
        title: 'Why us essays and supplementals',
        desc: 'For each university, there are different questions. We help you write supplementals that are specific to that school, not generic.',
      },
      {
        title: 'Editing for voice and clarity',
        desc: 'We correct grammar and punctuation, but mostly we listen for your voice. Does this sound like you? Would an admissions counselor remember this essay?',
      },
    ],
  },
  stats: [
    {
      value: '94%',
      label: 'Of students who work with us get into their first or second choice university',
    },
    { value: '50+', label: 'Universities represented among our past students' },
    { value: '2–3', label: 'Average drafts per essay before submission-ready' },
    { value: '48hrs', label: 'Typical feedback turnaround' },
  ],
  testimonials: ['admissions'],
  faq: [
    {
      question: 'How many essays do I need to write?',
      answer:
        'Common App schools typically want a main personal statement (650 words) and then supplemental essays for each university (50–500 words each). If you’re applying to four universities, that’s roughly four supplementals plus the main essay. We coach all of them.',
    },
    {
      question: 'Can you help if I’m not a native English speaker?',
      answer:
        'Yes. We work with many non-native speakers. We help you write clearly and authentically—not by making you sound American, but by teaching you to communicate your ideas well in English. Authenticity matters more than perfect grammar.',
    },
    {
      question: 'What if I don’t know what to write about?',
      answer:
        'That’s normal. In our first session we brainstorm. We ask about challenges you’ve faced, things you’ve learned, moments that changed your perspective. Almost every student discovers stories they didn’t realise mattered until we talk.',
    },
    ...commonFaq,
  ],
};
