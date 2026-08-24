import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const toefl: ExamContent = {
  path: '/test-prep/toefl',
  name: 'TOEFL',
  seo: {
    title: 'TOEFL iBT preparation in Bangladesh — integrated speaking and writing',
    description:
      'TOEFL iBT courses in Dhaka and Chattogram, plus live online cohorts. Integrated task practice, full-length adaptive mocks and a written score guarantee. American university English.',
  },
  hero: {
    eyebrow: 'US university admissions',
    title: 'The TOEFL score US universities expect.',
    intro:
      'The TOEFL iBT is test-taking under pressure: you are speaking on a prompt you have 15 seconds to read, writing an essay from an academic lecture you have just heard. We teach those integrated tasks directly, with timed practice and instructor feedback on every submission.',
    actions: [
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Internet-based · ~2 hours' },
      { label: 'Sections', value: 'Reading · Listening · Speaking · Writing' },
      { label: 'Scored', value: '0–120 (30 per section)' },
      { label: 'Sittings', value: '50+ dates a year worldwide' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch: 'The full syllabus on your own clock, for students who prefer to set their own pace.',
      price: bdtPrice(10500),
      priceUnit: 'one-off · 6 months of access',
      facts: ['55+ hours of video', 'Self-scheduled'],
      includes: [
        'Every lesson recorded and searchable',
        '5 full-length TOEFL papers with scoring',
        'Integrated task templates and models',
        'Email support from a TOEFL instructor',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'The classroom course, taught live to a small cohort, from wherever you are.',
      price: bdtPrice(20000),
      priceUnit: 'per 10-week cohort',
      facts: ['32 taught hours', 'Max 12 students', 'Evenings & weekends'],
      includes: [
        'Live classes with a named instructor',
        '6 full-length papers, scored and reviewed',
        'Bi-weekly integrated speaking sessions',
        'Weekly written essays reviewed for TOEFL rubrics',
      ],
      href: '/contact',
    },
    {
      name: 'Classroom 100+',
      pitch: 'Our flagship course, on campus, aimed squarely at a 100 and above.',
      price: bdtPrice(27000),
      priceUnit: 'per 10-week cohort',
      facts: ['40 taught hours', 'Max 10 students', 'Gulshan · Dhanmondi · Chattogram'],
      includes: [
        'Everything in LiveOnline, taught in person',
        '10 full-length proctored papers',
        'Weekly speaking mock interviews',
        'Written 100+ score guarantee',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Private Tutoring',
      pitch: 'One instructor, one student, one syllabus built entirely around your gaps.',
      price: bdtPrice(60000),
      priceUnit: 'per 20-hour package',
      facts: ['20 hours', '1-on-1', 'On campus or online'],
      includes: [
        'Diagnostic-led plan rebuilt every fortnight',
        'Unlimited full-length papers with detailed scoring',
        'Integrated task feedback on every recording',
        'Direct line to your tutor between sessions',
      ],
      href: '/contact',
    },
  ],
  includes: {
    eyebrow: 'What you get',
    title: 'TOEFL preparation for integrated English, not multiple choice.',
    intro:
      'The TOEFL iBT has abandoned single-skill questions. Every task now demands you read or listen before you speak or write. We practise exactly that — integrated task by integrated task — so by test day you are calm under a 15-second timer.',
    items: [
      {
        title: 'Integrated task practice',
        desc: 'Reading-to-speaking and listening-to-writing tasks, timed and scored exactly as the real exam does it, with instructor feedback on every one.',
      },
      {
        title: 'Academic lecture listening',
        desc: 'We use actual recorded university lectures — science, history, literature — because TOEFL does, and your notes from them become your speaking prompt.',
      },
      {
        title: 'Speaking under 15 seconds',
        desc: 'You prepare and respond in 45 seconds. Timed practice drills this reflexively so you are not paralysed by the clock on test day.',
      },
      {
        title: 'Essay scoring rubric mastery',
        desc: 'Every essay is scored on the four TOEFL criteria — task completion, development, organization, language use — so you know what to aim for before you write.',
      },
    ],
  },
  stats: [
    { value: '115', label: 'Median score of our 100+ cohort' },
    { value: '88%', label: 'Hit or beat their agreed target' },
    { value: '10', label: 'Full-length practice papers in the classroom course' },
    { value: '50+', label: 'TOEFL iBT dates available annually' },
  ],
  testimonials: ['toefl', 'english'],
  faq: [
    {
      question: 'Is TOEFL the right test for me?',
      answer:
        'TOEFL is the standard for American universities and many Commonwealth schools. If you are applying to the US, TOEFL is usually preferred. If you are applying to the UK, IELTS is standard. Check your university’s English requirement and ask us at your free consultation.',
    },
    {
      question: 'What makes the TOEFL harder than IELTS?',
      answer:
        'Integrated tasks. You listen to a lecture, take notes, then speak for 45 seconds. You read a passage, hear a lecture arguing against it, then write a synthesis. Single skills are easier. TOEFL is harder because it mirrors university work.',
    },
    {
      question: 'How long should I prepare?',
      answer:
        'Eight to ten weeks is typical for a 20–30 point gain. Start earlier if you are aiming past 110 or if your diagnostic is below 70. We will guide you in your consultation.',
    },
    {
      question: 'Does TOEFL iBT have a paper version?',
      answer:
        'TOEFL also offers a paper-based exam in some countries, but most students sit iBT on a computer. For US universities, iBT is standard. We train you for iBT unless you specify otherwise.',
    },
    ...commonFaq,
  ],
};
