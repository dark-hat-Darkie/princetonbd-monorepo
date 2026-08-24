import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const pte: ExamContent = {
  path: '/test-prep/pte',
  name: 'PTE Academic',
  seo: {
    title: 'PTE Academic preparation in Bangladesh — computer-scored English for university',
    description:
      'PTE Academic courses in Dhaka and Chattogram, plus live online. Computer-scored, results in 48 hours, and fully recognised for UK, Australian and Canadian university admissions.',
  },
  hero: {
    eyebrow: 'Commonwealth university admissions',
    title: 'The PTE score for UK, Australia and Canada.',
    intro:
      'PTE Academic is a computer-scored alternative to IELTS and TOEFL, fully accepted by UK, Australian and Canadian universities. We teach the format directly — speaking and writing to a microphone and keyboard, reading and listening in timed sections — with full-length papers and live instructor review.',
    actions: [
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Computer-based · ~2 hours' },
      { label: 'Sections', value: 'Speaking & Writing · Reading · Listening' },
      { label: 'Scored', value: '10–90' },
      { label: 'Results', value: 'Typically within 48 hours' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch: 'The full PTE syllabus on your own schedule, for independent learners.',
      price: bdtPrice(9000),
      priceUnit: 'one-off · 6 months of access',
      facts: ['48+ hours of video', 'Self-scheduled'],
      includes: [
        'Format tutorials for all three sections',
        '4 full-length practice papers with scoring',
        'Speaking and writing sample responses',
        'Email support from a PTE instructor',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'The classroom course, taught live to a small cohort, from wherever you are.',
      price: bdtPrice(19000),
      priceUnit: 'per 9-week cohort',
      facts: ['28 taught hours', 'Max 12 students', 'Evenings & weekends'],
      includes: [
        'Live classes with a named PTE instructor',
        '6 full-length papers, marked and reviewed',
        'Bi-weekly speaking and writing clinics',
        'Recordings of every session for your review',
      ],
      href: '/contact',
    },
    {
      name: 'Classroom 75+',
      pitch: 'Our flagship course, on campus, aimed squarely at a 75 and above.',
      price: bdtPrice(26000),
      priceUnit: 'per 9-week cohort',
      facts: ['36 taught hours', 'Max 10 students', 'Gulshan · Dhanmondi · Chattogram'],
      includes: [
        'Everything in LiveOnline, taught in person',
        '9 full-length proctored papers',
        'Weekly one-on-one speaking and writing reviews',
        'Written 75+ score guarantee',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Private Tutoring',
      pitch: 'One instructor, one student, one syllabus built entirely around your gaps.',
      price: bdtPrice(52000),
      priceUnit: 'per 20-hour package',
      facts: ['20 hours', '1-on-1', 'On campus or online'],
      includes: [
        'Diagnostic assessment rebuilt every two weeks',
        'Unlimited full-length papers with detailed scoring',
        'Recorded speaking and writing feedback on every task',
        'Direct line to your tutor between classes',
      ],
      href: '/contact',
    },
  ],
  includes: {
    eyebrow: 'What you get',
    title: 'PTE preparation built on real-test accuracy and speed.',
    intro:
      'PTE is computer-scored, not human-marked, and it rewards accuracy and pace. We teach you how to score high in speaking (the microphone is listening for pronunciation and flow) and writing (spell and grammar checkers are part of the mark), and how to manage the time pressure across three dense sections.',
    items: [
      {
        title: 'Computer-scoring accuracy',
        desc: 'We teach the automated criteria PTE uses — how the microphone scores your speech for pronunciation and fluency, how your essays are checked for grammar and vocabulary automatically.',
      },
      {
        title: 'Speaking and writing integration',
        desc: 'PTE bundles your speaking and writing section, which means summary writing, short answer and reading aloud all count towards one score. We teach them as an integrated unit.',
      },
      {
        title: 'Time-pressure strategy',
        desc: 'The speaking and writing section is 54–67 minutes for ten different task types. We teach time allocation and pacing so you do not run out of time.',
      },
      {
        title: 'Communicative skills mastery',
        desc: 'PTE scores you on enabling skills — grammar, fluency, written discourse — not just raw accuracy. We teach that distinction because it changes how you should practise.',
      },
    ],
  },
  stats: [
    { value: '79', label: 'Median score of our 75+ cohort' },
    { value: '87%', label: 'Hit or beat their agreed target on first sitting' },
    { value: '48', label: 'Hours to get your official score' },
    { value: '90', label: 'Maximum PTE score' },
  ],
  testimonials: ['english', 'test-prep'],
  faq: [
    {
      question: 'Is PTE accepted by UK, Australian and Canadian universities?',
      answer:
        'Yes, fully. PTE Academic is recognised by universities across the UK (UKVI approved), Australia (TEQSA registered) and Canada. If you are applying to any of those countries, PTE is equivalent to IELTS and TOEFL.',
    },
    {
      question: 'What is a good PTE score?',
      answer:
        'Scores range from 10 to 90. Most universities ask for 65–79 for undergraduate entry. Graduate programmes often ask for 75+. We will map your target based on your shortlist in your free consultation.',
    },
    {
      question: 'How is PTE different from IELTS?',
      answer:
        'The main differences: PTE is entirely computer-scored (no human examiner in speaking), speaking and writing are in one section, results come in 48 hours instead of 5–13 days, and the score is out of 90, not 9 bands. The content is similar but the pacing and format are stricter.',
    },
    {
      question: 'Can I retake it quickly?',
      answer:
        'Yes. You can book another sitting within 7 days of your previous test. Results come within 48 hours, so you can prepare and retake rapidly if you miss your target. That speed is one reason students choose PTE.',
    },
    ...commonFaq,
  ],
};
