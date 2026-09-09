import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const toefl: ExamContent = {
  path: '/test-prep/toefl',
  slug: 'toefl',
  name: 'TOEFL',
  interest: 'IELTS / TOEFL',
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
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Internet-based · ~2 hours' },
      { label: 'Sections', value: 'Reading · Listening · Speaking · Writing' },
      { label: 'Scored', value: '0–120 (30 per section)' },
      { label: 'Sittings', value: '50+ dates a year worldwide' },
    ],
  },
  fee: {
    price: bdtPrice(27000),
    unit: 'per 10-week course',
    includes: [
      '40 taught hours in a class of ten or fewer',
      '10 full-length proctored papers, scored and reviewed',
      'Weekly speaking mock interviews',
      'Written 100+ score guarantee',
      'All materials and the online question bank',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, six modules, every integrated task rehearsed to the second.',
    intro:
      'The shorter iBT leaves no room to warm up: every section counts from the first question. Each module ends with a timed, scored task so you know your section score before the next one starts.',
    totals: { weeks: 10, taughtHours: 40, mocks: 10, classSize: 'Max 10' },
    modules: [
      {
        no: '01',
        title: 'iBT format and scoring',
        summary:
          'The two-hour test section by section, how raw points become a 0–30 scaled score, and where your first full paper puts you.',
        topics: [
          'The shortened iBT: what changed in 2023 and what did not',
          'Section timings, question counts and the on-screen tools',
          'How the speaking and writing rubrics turn into scaled scores',
          'Full-length diagnostic paper and your personal score map',
        ],
        hours: 4,
        outcome:
          'Know your current score per section and which rubric criteria are costing you points.',
      },
      {
        no: '02',
        title: 'Reading',
        summary:
          'Two academic passages, twenty questions, thirty-five minutes. The question types that reward skimming and the ones that punish it.',
        topics: [
          'Factual, negative factual and inference questions',
          'Vocabulary in context and reference questions',
          'Sentence insertion and rhetorical purpose',
          'The prose summary question and how its points are awarded',
        ],
        hours: 7,
        outcome:
          'Finish both passages with time to check the summary questions that carry the most points.',
      },
      {
        no: '03',
        title: 'Listening',
        summary:
          'Lectures and campus conversations, heard once. Note-taking that captures structure, not words, and the traps in every recording.',
        topics: [
          'Gist, detail and function questions across lecture and conversation',
          'A note-taking system built around the main-point and example pattern',
          'Attitude, organisation and connecting-content questions',
          'Replay questions and what the speaker actually implies',
        ],
        hours: 7,
        outcome:
          'Take notes on a five-minute lecture you can answer six questions from without a second hearing.',
      },
      {
        no: '04',
        title: 'Speaking: independent and integrated tasks',
        summary:
          'Four tasks in sixteen minutes. One independent opinion, then three tasks that make you read, listen and speak from your notes.',
        topics: [
          'Task 1: a clear opinion with two reasons in forty-five seconds',
          'Tasks 2 and 3: campus announcement and academic reading-to-lecture',
          'Task 4: summarising a lecture from notes alone',
          'Delivery, language use and topic development, scored against the rubric',
        ],
        hours: 9,
        outcome:
          'Prepare in fifteen seconds and speak for forty-five without the clock deciding your score.',
      },
      {
        no: '05',
        title: 'Writing: integrated task and academic discussion',
        summary:
          'The integrated essay that pits a lecture against a passage, and the ten-minute academic discussion post that replaced the independent essay.',
        topics: [
          'Integrated task: recording how the lecture challenges each point of the reading',
          'A structure for the integrated essay that scores on completeness, not length',
          'Writing for an Academic Discussion: a position, a reason and a reply in ten minutes',
          'Language use and development, scored on the two writing rubrics',
        ],
        hours: 9,
        outcome:
          'Write an integrated essay that captures all three lecture points and a discussion post that scores 4 or above.',
      },
      {
        no: '06',
        title: 'Full-test cycle and test day',
        summary:
          'Timed full papers under exam conditions, each one reviewed section by section, and your test-day plan.',
        topics: [
          'Weekly full-length papers, scored on the 0–120 scale',
          'One-on-one review of your recorded speaking and marked writing',
          'Test centre vs Home Edition: choosing and rehearsing the setup',
          'Registration, ID, score reporting and what to expect on the day',
        ],
        hours: 4,
        outcome: 'Walk in knowing your score range and having sat the full test ten times already.',
      },
    ],
    outcomes: [
      'Sit the two-hour iBT with a timing plan for every section',
      'Answer any of the four speaking tasks from notes inside the fifteen-second preparation window',
      'Write an integrated essay and an academic discussion post that meet every rubric criterion',
      'Know your score per section before you book the real test',
    ],
  },
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
