import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const ielts: ExamContent = {
  path: '/test-prep/ielts',
  name: 'IELTS',
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
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Paper and computer-based · 2h 45m' },
      { label: 'Sections', value: 'Listening · Reading · Writing · Speaking' },
      { label: 'Scored', value: '0–9 in half-band increments' },
      { label: 'Sittings', value: '48 dates a year worldwide' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch: 'The full syllabus on your own clock, for students who prefer to set their own pace.',
      price: bdtPrice(10000),
      priceUnit: 'one-off · 6 months of access',
      facts: ['50+ hours of video', 'Self-scheduled'],
      includes: [
        'Every lesson recorded and searchable',
        '6 full-length practice papers',
        'Task-based writing samples with model answers',
        'Email support from an IELTS instructor',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'The classroom course, taught live to a small cohort, from wherever you are.',
      price: bdtPrice(18000),
      priceUnit: 'per 10-week cohort',
      facts: ['30 taught hours', 'Max 12 students', 'Evenings & weekends'],
      includes: [
        'Live classes with a named instructor',
        '6 full-length papers, reviewed',
        'Weekly writing corrections from an examiner',
        'Bi-weekly speaking labs with examiner feedback',
      ],
      href: '/contact',
    },
    {
      name: 'Classroom 7+',
      pitch: 'Our flagship course, on campus, aimed squarely at a band 7 and above.',
      price: bdtPrice(25000),
      priceUnit: 'per 10-week cohort',
      facts: ['36 taught hours', 'Max 10 students', 'Gulshan · Dhanmondi · Chattogram'],
      includes: [
        'Everything in LiveOnline, taught in person',
        '10 full-length papers, fully marked and reviewed',
        'Weekly examiner-led speaking labs',
        'Written band 7+ score guarantee',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Private Tutoring',
      pitch: 'One instructor, one student, one syllabus built entirely around your gaps.',
      price: bdtPrice(55000),
      priceUnit: 'per 20-hour package',
      facts: ['20 hours', '1-on-1', 'On campus or online'],
      includes: [
        'Diagnostic-led plan rebuilt every fortnight',
        'Unlimited full-length papers, scored and reviewed',
        'Examiner-style speaking feedback in every session',
        'Direct line to your tutor between classes',
      ],
      href: '/contact',
    },
  ],
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
  testimonials: ['ielts', 'english'],
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
