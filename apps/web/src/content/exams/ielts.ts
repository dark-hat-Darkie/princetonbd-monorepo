import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const ielts: ExamEditorial = {
  slug: 'ielts',
  interest: 'IELTS / TOEFL',
  seo: {
    title: 'IELTS preparation in Bangladesh — Academic, General Training & speaking labs',
    description:
      'IELTS courses in Dhaka and Chattogram, plus live online cohorts. Examiner-led speaking labs, task-based writing feedback and a written band guarantee. Bangladesh’s most-sat English exam.',
  },
  hero: {
    eyebrow: 'International admissions',
    title: 'The IELTS band for your shortlist.',
    intro:
      'More students from Bangladesh sit IELTS than any other English exam. We teach both Academic and General Training, with weekly examiner-led speaking labs and task-based writing feedback from someone who has marked for the IELTS board itself.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Paper and computer-based · 2h 45m' },
      { label: 'Sections', value: 'Listening · Reading · Writing · Speaking' },
      { label: 'Scored', value: '0–9 in half-band increments' },
      { label: 'Sittings', value: '48 dates a year worldwide' },
    ],
  },
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, seven modules, every band descriptor covered.',
    intro:
      'Academic and General Training are taught as separate reading and writing tracks inside the same course. Every module ends with a scored task so you know your band before the next one starts.',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'IELTS preparation built on how examiners actually mark.',
    intro:
      'Your writing is marked by someone who has trained others to mark for the IELTS board. Your speaking practice happens with someone who understands the nine-band descriptor. Task-based feedback, not generic tips.',
    items: [
      {
        title: 'Examiner-led speaking labs',
        desc: 'Weekly small-group or 1-on-1 sessions with someone who has sat beside an IELTS examiner, so you hear the feedback that counts.',
      },
      {
        title: 'Task-based writing feedback',
        desc: 'Every essay is marked on the IELTS criteria — task response, coherence, vocabulary, grammar — and tagged so you stop repeating the same mistake.',
      },
      {
        title: 'Band-score accuracy tracking',
        desc: 'Full-length papers are scored the way IELTS scores them, not a percentile, so you know your exact band before you sit the real exam.',
      },
      {
        title: 'Academic and General Training',
        desc: 'We teach both modules separately, because the reading and writing differ sharply and muddling them costs half a band.',
      },
    ],
  },
  stats: [
    { value: '8.5', label: 'Highest band achieved by our cohort' },
    { value: '90%+', label: 'Achieved their target band within one sitting' },
    { value: 'Weekly', label: 'Examiner-led speaking labs' },
    { value: '48', label: 'IELTS sittings available per year' },
  ],
  faq: [
    {
      question: 'IELTS Academic or General Training — which should I take?',
      answer:
        'Academic if you are applying to university. General Training if you are migrating or applying to most professional programmes. The reading and writing differ significantly — we teach them as separate syllabi so you do not mix the styles.',
    },
    {
      question: 'How is IELTS speaking scored?',
      answer:
        'By a live human examiner in a face-to-face interview, not a computer. You sit for 11–14 minutes and are scored on fluency, lexis, grammar and pronunciation. That is why we run weekly speaking labs — you need practice with live feedback, not just a script.',
    },
    {
      question: 'What band do I need?',
      answer:
        'It depends on your university and programme. Most Russell Group universities ask for 6.5 or 7.0. Medical schools often ask for 7.5. We recommend you check your shortlist in your free consultation and we will map a target from there.',
    },
    {
      question: 'Paper or computer — does it matter?',
      answer:
        'Not for your preparation. The test format and marking are identical. Choose whichever you find easier — some students prefer writing by hand, others prefer typing — and we will prepare you for both.',
    },
    ...commonFaq,
  ],
};
