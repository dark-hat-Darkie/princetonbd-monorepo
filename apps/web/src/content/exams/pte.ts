import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const pte: ExamContent = {
  path: '/test-prep/pte',
  slug: 'pte',
  name: 'PTE Academic',
  interest: 'IELTS / TOEFL',
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
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Computer-based · ~2 hours' },
      { label: 'Sections', value: 'Speaking & Writing · Reading · Listening' },
      { label: 'Scored', value: '10–90' },
      { label: 'Results', value: 'Typically within 48 hours' },
    ],
  },
  fee: {
    price: bdtPrice(26000),
    unit: 'per 9-week course',
    includes: [
      '36 taught hours in a class of ten or fewer',
      '8 full-length proctored papers, scored and reviewed',
      'Weekly one-on-one speaking and writing reviews',
      'Written 75+ score guarantee',
      'All materials and the online question bank',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Nine weeks, six modules, every task taught the way the computer scores it.',
    intro:
      'PTE marks are shared across skills: a Read Aloud feeds your reading score and a Summarise Spoken Text feeds your listening score. The course is built around that scoring, and every module ends with a scored task so you know your number before the next one starts.',
    totals: { weeks: 9, taughtHours: 36, mocks: 8, classSize: 'Max 10' },
    modules: [
      {
        no: '01',
        title: 'Computer scoring and what it rewards',
        summary:
          'How an automated scorer marks speech and text, why the 10–90 scale behaves the way it does, and where your first full paper puts you.',
        topics: [
          'The three sections, twenty task types and their timings',
          'Integrated scoring: which tasks feed which communicative skill',
          'Oral fluency, pronunciation, spelling and form as the machine measures them',
          'Full-length diagnostic paper and your personal score map',
        ],
        hours: 4,
        outcome:
          'Know your current score per communicative skill and which task types are moving it most.',
      },
      {
        no: '02',
        title: 'Speaking and writing',
        summary:
          'One section, up to seven task types, and the largest share of your marks. Speaking to a microphone and writing to a word count in a way the scorer rewards.',
        topics: [
          'Read Aloud, Repeat Sentence and Describe Image: fluency over hesitation',
          'Re-tell Lecture and Answer Short Question from notes',
          'Summarise Written Text: one sentence, 5–75 words, every key point',
          'The essay: 200–300 words on structure, grammar, vocabulary and spelling',
        ],
        hours: 9,
        outcome:
          'Deliver every speaking task without a pause the microphone can hear and write to the word limits from memory.',
      },
      {
        no: '03',
        title: 'Reading',
        summary:
          'Five task types in around thirty minutes with a single clock across all of them. Where to spend time and where to move on.',
        topics: [
          'Reading and Writing: Fill in the Blanks, the highest-value reading task',
          'Re-order Paragraphs: finding the anchor sentence first',
          'Multiple Choice single and multiple answer, and the negative marking',
          'Reading: Fill in the Blanks and pacing across the whole section',
        ],
        hours: 6,
        outcome:
          'Finish the reading section inside its single timer without leaving the high-value tasks unanswered.',
      },
      {
        no: '04',
        title: 'Listening',
        summary:
          'Eight task types heard once, ending with the dictation that carries the most marks. Note-taking that survives a single hearing.',
        topics: [
          'Summarise Spoken Text: 50–70 words scored for content, form and language',
          'Fill in the Blanks, Highlight Correct Summary and Select Missing Word',
          'Highlight Incorrect Words: reading and listening at the same time',
          'Write From Dictation: capturing every word and the marks it feeds into writing',
        ],
        hours: 6,
        outcome:
          'Reproduce a dictated sentence word for word and hold accuracy through the final task of the test.',
      },
      {
        no: '05',
        title: 'Templates and pacing',
        summary:
          'Where a template earns marks and where it costs them, and a minute-by-minute plan for each of the three sections.',
        topics: [
          'Describe Image and Re-tell Lecture frameworks that stay flexible',
          'Essay and Summarise Written Text structures the scorer credits',
          'When a memorised answer is penalised and how to sound natural inside a frame',
          'Section timing plans and the tasks worth skipping when the clock is short',
        ],
        hours: 6,
        outcome:
          'Enter any task with a structure ready and know to the minute how long it should take.',
      },
      {
        no: '06',
        title: 'Scored mock cycle',
        summary:
          'Timed full papers under exam conditions, each one scored on the 10–90 scale and reviewed one on one, and your test-day plan.',
        topics: [
          'Weekly full-length papers with communicative and enabling skill scores',
          'One-on-one review of your recorded speaking and marked writing',
          'Reading your score report: which task types to fix before you rebook',
          'Booking, ID, the test centre setup and what to expect on the day',
        ],
        hours: 5,
        outcome:
          'Walk in knowing your score range and having sat the full test eight times already.',
      },
    ],
    outcomes: [
      'Speak and write in the way an automated scorer rewards, not the way a human examiner would forgive',
      'Manage a single clock across each section without leaving high-value tasks unanswered',
      'Use templates where they earn marks and speak naturally where they do not',
      'Know your score per communicative skill before you book the real test',
    ],
  },
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
