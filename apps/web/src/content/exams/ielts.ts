import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const ielts: ExamContent = {
  path: '/test-prep/ielts',
  slug: 'ielts',
  name: 'IELTS',
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
  fee: {
    price: bdtPrice(25000),
    unit: 'per 10-week course',
    includes: [
      '36 taught hours in a class of ten or fewer',
      '10 full-length papers, fully marked and reviewed',
      'Weekly examiner-led speaking labs',
      'All materials and the online question bank',
      'Written band 7+ score guarantee',
    ],
    notes: standardFeeNotes,
  },
  modes: ['Classroom', 'LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, seven modules, every band descriptor covered.',
    intro:
      'Academic and General Training are taught as separate reading and writing tracks inside the same course. Every module ends with a scored task so you know your band before the next one starts.',
    totals: { weeks: 10, taughtHours: 36, mocks: 10, classSize: 'Max 10' },
    modules: [
      {
        no: '01',
        title: 'Band descriptors and your diagnostic',
        summary:
          'How the four papers are marked, what separates a 6.5 from a 7.5, and where your first full paper puts you.',
        topics: [
          'The public band descriptors, decoded',
          'Academic vs General Training: what actually differs',
          'Full-length diagnostic paper, all four modules',
          'Your personal band map and target',
        ],
        hours: 4,
        outcome:
          'Know your current band per module and exactly which criteria are costing you marks.',
      },
      {
        no: '02',
        title: 'Listening',
        summary:
          'Four sections, forty questions, one hearing. Prediction, note-taking and the traps built into every recording.',
        topics: [
          'Form completion and multiple choice under time',
          'Map, plan and diagram labelling',
          'Distractors, corrections and paraphrase in the audio',
          'Transferring answers without losing marks to spelling',
        ],
        hours: 5,
        outcome: 'Hold pace through Section 4 and stop losing marks to spelling and plurals.',
      },
      {
        no: '03',
        title: 'Reading — Academic and General Training',
        summary:
          'Three passages in sixty minutes. Skimming, scanning and the question types that reward each.',
        topics: [
          'True/False/Not Given and Yes/No/Not Given',
          'Matching headings and matching information',
          'Summary, note and sentence completion',
          'Time allocation across passages of rising difficulty',
        ],
        hours: 5,
        outcome: 'Finish all forty questions with time to check the ones you flagged.',
      },
      {
        no: '04',
        title: 'Writing Task 1',
        summary:
          'Describing data (Academic) or writing a letter (General Training) in 150 words that hit every criterion.',
        topics: [
          'Overview statements that examiners look for first',
          'Selecting and grouping data, not listing it',
          'Letter tone: formal, semi-formal and informal',
          'Task achievement and coherence, criterion by criterion',
        ],
        hours: 5,
        outcome:
          'Write a complete Task 1 in twenty minutes with a clear overview and no missing features.',
      },
      {
        no: '05',
        title: 'Writing Task 2',
        summary:
          'The essay that carries two-thirds of your writing band. Argument structure, position and the lexical resource examiners reward.',
        topics: [
          'Question types: opinion, discussion, problem–solution, two-part',
          'Planning in five minutes, writing in thirty',
          'Cohesion without mechanical linking words',
          'Grammatical range: complex sentences that stay accurate',
        ],
        hours: 7,
        outcome: 'Produce a 250-word essay with a clear position that scores 7 on task response.',
      },
      {
        no: '06',
        title: 'Speaking labs',
        summary:
          'Weekly examiner-led practice across all three parts, recorded and scored against the descriptors.',
        topics: [
          'Part 1: extending answers without rambling',
          'Part 2: the two-minute long turn from a cue card',
          'Part 3: abstract discussion and opinion',
          'Fluency, pronunciation and self-correction habits',
        ],
        hours: 6,
        outcome: 'Speak for two minutes on any cue card without hesitation that costs a band.',
      },
      {
        no: '07',
        title: 'Full-paper cycle and exam week',
        summary:
          'Timed full papers under exam conditions, each one reviewed line by line, and your test-day plan.',
        topics: [
          'Weekly full-length papers, scored to the half band',
          'One-on-one review of your marked writing',
          'Paper vs computer delivery: choosing and rehearsing',
          'Booking, ID, test-day timing and what to expect',
        ],
        hours: 4,
        outcome: 'Walk in knowing your band range and having sat the paper ten times already.',
      },
    ],
    outcomes: [
      'Sit both Academic and General Training confidently, whichever your shortlist asks for',
      'Write Task 1 and Task 2 responses that meet every criterion in the time allowed',
      'Hold a Part 3 discussion at the level a band 7 demands',
      'Know your band per module before you book the real test',
    ],
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
