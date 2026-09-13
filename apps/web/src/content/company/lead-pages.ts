import type { LeadPageContent } from '@/components/templates/lead-page';

/**
 * The two pages whose only job is to start a conversation.
 *
 * They share a template and differ in what the visitor was promised on the way
 * in — so the reassurance column, not the form, is what changes between them.
 */

export const contactPage: LeadPageContent = {
  path: '/contact',
  seo: {
    title: 'Contact Princeton Review Bangladesh — book a free consultation',
    description:
      'Talk to an enrolment advisor about courses, tutoring or admissions counseling. Campuses in Gulshan, Dhanmondi and Chattogram, or live online anywhere in Bangladesh.',
  },
  hero: {
    eyebrow: 'Talk to us',
    title: 'One conversation, and the path gets a lot clearer.',
    intro:
      'Tell us where you are and where you want to go. An enrolment advisor will call you back within one working day — no scripts, no pressure.',
  },
  reassurance: [
    {
      title: 'A call back within one working day',
      desc: 'An advisor who knows the exams and the admissions calendar, not a call-centre queue.',
    },
    {
      title: 'A free diagnostic, scored the same day',
      desc: 'Sit a real, full-length test on campus or at home so the conversation starts from a number rather than a guess.',
    },
    {
      title: 'An honest recommendation',
      desc: 'Sometimes that is a course. Sometimes it is "sit the ACT instead" or "wait a term". You will get the truthful version.',
    },
  ],
};

export const freeDiagnosticPage: LeadPageContent = {
  path: '/free-diagnostic',
  seo: {
    title: 'Free diagnostic test — SAT, ACT, GRE, GMAT & IELTS in Bangladesh',
    description:
      'Sit a full-length diagnostic free, on campus in Dhaka or Chattogram or from home. Scored the same day, with a counselor to walk you through what it means.',
  },
  hero: {
    eyebrow: 'Free diagnostic',
    title: 'Find out where you actually stand — before you pay anyone.',
    intro:
      'A full-length, properly proctored test in the format you will really sit. Free, every Saturday, on campus or at home. Scored the same day.',
    facts: [
      { label: 'Cost', value: 'Free, no obligation' },
      { label: 'Tests offered', value: 'SAT · ACT · GRE · GMAT · IELTS' },
      { label: 'When', value: 'Every Saturday' },
      { label: 'Result', value: 'Scored the same day' },
    ],
  },
  interestDefault: 'SAT / ACT',
  reassurance: [
    {
      title: 'A real test, not a sample',
      desc: 'Full length, properly timed, in the digital format the exam actually uses. A twenty-question taster tells you nothing.',
    },
    {
      title: 'Scored and explained the same day',
      desc: 'Section-by-section, with the two or three things that are costing you the most marks named explicitly.',
    },
    {
      title: 'A target you can plan around',
      desc: 'What score your shortlist needs, how far that is from today, and how many weeks it usually takes to close.',
    },
  ],
};
