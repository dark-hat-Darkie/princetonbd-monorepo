import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const tutoringSmallGroup: ProgramContent = {
  path: '/tutoring/small-group',
  seo: {
    title: 'Small-group tutoring for school subjects — O-Level, A-Level, IB, AP',
    description:
      'Three to five students, one syllabus, one timeline. Small-group tutoring for mathematics, sciences, English and social studies across every curriculum.',
  },
  hero: {
    eyebrow: 'Small-group tutoring',
    title: 'Three to five students who need the same thing.',
    intro:
      'Group sizes small enough that your teacher knows where you got stuck on the last problem set. Large enough that you study smarter by working through hard problems with your peers.',
    actions: [
      { label: 'Explore our subjects', href: '/tutoring' },
      { label: 'Enrol now', href: '/contact', variant: 'outline' },
    ],
    facts: [
      { label: 'Class size', value: '3–5 students' },
      { label: 'Duration', value: '90 minutes per session, weekly' },
      { label: 'Term length', value: '8 to 12 weeks' },
      { label: 'Group cohesion', value: 'Cohort stays the same all term' },
    ],
  },
  features: {
    eyebrow: 'Why small groups work',
    title: 'Learning alongside your peers.',
    intro:
      'The sweet spot between one-on-one and a full class: expert instruction at a fraction of private tutoring’s price, plus the cognitive gain of working peer problems.',
    items: [
      {
        title: 'Peer problem-solving',
        desc: 'You see how three other students approach the question you got stuck on. That variety is worth more than a second explanation from the tutor.',
      },
      {
        title: 'Pacing built around progress',
        desc: 'A cohort of five with the same target keeps pace together. No one is left behind for material to fit a fixed schedule.',
      },
      {
        title: 'Accountable practice',
        desc: 'Weekly problem sets scored and reviewed in class. Your homework is small enough that it gets done, large enough that it sticks.',
      },
      {
        title: 'A third of private tutoring’s cost',
        desc: 'Economics work in everyone’s favour. Small groups are affordable: three to five students, one expert tutor, no margin wasted.',
      },
    ],
  },
  process: {
    eyebrow: 'How it works',
    title: 'From enrolment to your first session.',
    steps: [
      {
        no: '01',
        title: 'Diagnostic',
        desc: 'A short assessment to place you in the right cohort and identify gaps to address early.',
      },
      {
        no: '02',
        title: 'Cohort formed',
        desc: 'We match three to five students on curriculum, target and current level, then lock the group in.',
      },
      {
        no: '03',
        title: 'Term plan issued',
        desc: 'A session-by-session breakdown showing which topics are covered, when mock exams sit, and what to revise between classes.',
      },
      {
        no: '04',
        title: 'Weekly review cycles',
        desc: 'Problem sets due before class, scored and reviewed in the first 15 minutes of each session.',
      },
    ],
  },
  formats: [
    {
      name: 'Mathematics cohort',
      pitch: 'Four students, 90 minutes, every week for 10 weeks.',
      price: bdtPrice(35000),
      priceUnit: 'per cohort, per student',
      facts: ['40 hours total', '3–5 students', 'Weekly sessions'],
      includes: [
        'Full-term syllabus covered week by week',
        'Weekly problem sets, scored in class',
        'Two full-length mocks mid-term and end-of-term',
        'Revision summary sheet for each topic',
      ],
      href: '/contact',
    },
    {
      name: 'Sciences cohort',
      pitch: 'Physics and chemistry together, or separate groups if your cohort prefers.',
      price: bdtPrice(30000),
      priceUnit: 'per cohort, per student',
      facts: ['40 hours total', '3–5 students', 'Lab-integrated'],
      includes: [
        'Theory sessions plus practical application',
        'Past paper drilling by topic',
        'Experiment reviews and marking schemes',
        'Mock exams with immediate feedback',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'English and humanities cohort',
      pitch: 'Literature and language together, with essay feedback baked into every session.',
      price: bdtPrice(28000),
      priceUnit: 'per cohort, per student',
      facts: ['40 hours total', '3–5 students', 'Essay-focused'],
      includes: [
        'Guided reading in class, from unseen text to analysis',
        'Essay titles each week, marked within 24 hours',
        'Practice paper under timed conditions',
        'Revision guide to key texts and critical theory',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '94%', label: 'Achieve their target grade in their first term' },
    { value: '3–5', label: 'Stable cohort size keeps pace together' },
    { value: '8 weeks', label: 'Typical term before the first mock' },
    { value: '40hrs', label: 'Tutor training and subject mastery required' },
  ],
  testimonials: ['tutoring'],
  faq: [
    {
      question: 'Can I join mid-term if a place opens up?',
      answer:
        'Yes, if a student leaves and the cohort agrees. We catch you up on the first two weeks of material before adding you to the active group.',
    },
    {
      question: 'What if my cohort has progressed faster than expected?',
      answer:
        'We adjust the pace within the group’s capability, not the calendar. If you’re ahead of schedule, we spend extra time on harder past papers rather than marking time.',
    },
    {
      question: 'Are subjects combined or separate?',
      answer:
        'Separate where curriculum demands it. Math cohorts are standalone; sciences we usually teach together (physics and chemistry) unless students have different exam boards.',
    },
    ...commonFaq,
  ],
};
