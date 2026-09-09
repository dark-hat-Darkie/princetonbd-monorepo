import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq, standardFeeNotes } from '../shared';

export const duolingo: ExamContent = {
  path: '/test-prep/duolingo',
  slug: 'duolingo',
  name: 'Duolingo English Test',
  interest: 'IELTS / TOEFL',
  seo: {
    title: 'Duolingo English Test prep in Bangladesh — fast, adaptive and from home',
    description:
      'Duolingo English Test courses in Dhaka and Chattogram, plus live online. An hour at home, adaptive tasks and results in 48 hours. Alternative to IELTS and TOEFL.',
  },
  hero: {
    eyebrow: 'University admissions',
    title: 'The fast path to an English score.',
    intro:
      'An hour at home. Adaptive. Scored by machine. Results in 48 hours. The Duolingo English Test is the fastest way to land an English credential for university admissions, and it is accepted by more universities every year. We teach the format directly so nothing on test day surprises you.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Computer-based, at home · ~1 hour' },
      { label: 'Sections', value: 'Reading · Listening · Writing · Speaking' },
      { label: 'Scored', value: '10–160' },
      { label: 'Results', value: 'Within 48 hours' },
    ],
  },
  fee: {
    price: bdtPrice(16000),
    unit: 'per 6-week course',
    includes: [
      '18 taught hours, live online, in a class of ten or fewer',
      '6 full-length adaptive practice tests, reviewed',
      'Adaptive task drills twice weekly',
      'Recording access to every live session',
      'All materials and the online question bank',
    ],
    notes: standardFeeNotes,
  },
  modes: ['LiveOnline'],
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Six weeks, five modules, one adaptive hour rehearsed until it feels routine.',
    intro:
      'The test is short and adaptive, so preparation is about recognising every task type on sight and holding pace as the difficulty climbs. Each module ends with a timed, scored practice set so you know where you stand before the next one starts.',
    totals: { weeks: 6, taughtHours: 18, mocks: 6, classSize: 'Max 10' },
    modules: [
      {
        no: '01',
        title: 'Adaptive format and how it scores',
        summary:
          'What the computer is doing when the questions get harder, how the 10–160 overall and the four subscores are built, and where your first practice test puts you.',
        topics: [
          'Why the test adapts: difficulty, accuracy and the questions you never see',
          'The overall score and the Literacy, Comprehension, Conversation and Production subscores',
          'The at-home setup: camera, microphone, screen and proctoring rules',
          'Full-length adaptive diagnostic and your personal score map',
        ],
        hours: 3,
        outcome:
          'Know your current overall score and subscores and which task types are holding them down.',
      },
      {
        no: '02',
        title: 'Literacy and comprehension tasks',
        summary:
          'The fast reading and listening tasks that make up most of the adaptive section. Recognising each one instantly and answering under a tight clock.',
        topics: [
          'Read and Complete: filling missing letters without losing the sentence',
          'Read and Select and Listen and Select: real words vs invented ones',
          'Read Aloud and Listen and Type: accuracy on every word',
          'Interactive Reading: passage completion, main idea and inference under time',
        ],
        hours: 4,
        outcome:
          'Identify any literacy or comprehension task on sight and finish it inside its timer.',
      },
      {
        no: '03',
        title: 'Conversation and production tasks',
        summary:
          'The speaking and writing tasks the machine scores as you produce them: what it listens for, what it counts, and how to give it more of both.',
        topics: [
          'Interactive Listening: following a conversation and summarising it',
          'Speak About the Photo and Read, Then Speak: describing and developing for the full time',
          'Write About the Photo and Read, Then Write: detail, range and accuracy',
          'Fluency, vocabulary range and grammatical accuracy as the scorer measures them',
        ],
        hours: 4,
        outcome:
          'Speak and write for the full time allowed with the range and accuracy the scorer rewards.',
      },
      {
        no: '04',
        title: 'Writing and speaking samples',
        summary:
          'The longer Writing Sample and Speaking Sample at the end of the test. Scored, and also sent to every institution you share your results with.',
        topics: [
          'Choosing between the two prompts in the time allowed',
          'Structuring a five-minute written response with a clear position',
          'A three-minute spoken response that develops one idea rather than listing several',
          'Sounding like an applicant an admissions officer wants to hear',
        ],
        hours: 4,
        outcome:
          'Produce a writing and a speaking sample you would be happy for an admissions officer to read and hear.',
      },
      {
        no: '05',
        title: 'Timed practice and the video interview',
        summary:
          'Full-length adaptive practice tests under home conditions, each one reviewed, and the video interview that universities watch alongside your score.',
        topics: [
          'Weekly full-length practice tests, scored to the subscore',
          'One-on-one review of your recorded speaking and writing',
          'The video interview: choosing a prompt and speaking naturally for the full time',
          'Booking, ID, the environment checks and what gets a test invalidated',
        ],
        hours: 3,
        outcome:
          'Sit the real test at home knowing your score range and having passed every proctoring check in rehearsal.',
      },
    ],
    outcomes: [
      'Recognise every Duolingo task type on sight and know exactly how the machine scores it',
      'Hold pace through an hour of adaptive questions as the difficulty climbs',
      'Deliver writing and speaking samples and a video interview you are proud to share with institutions',
      'Set up and pass the at-home proctoring checks so nothing on test day is a surprise',
    ],
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation for an adaptive test that learns as you do.',
    intro:
      'Duolingo adapts: if you ace the easy tasks, you get harder ones. Your score depends not just on correctness but on the difficulty you face. We teach you how to recognise difficulty levels mid-test and how to keep pace.',
    items: [
      {
        title: 'Adaptive task drilling',
        desc: 'Practice on real Duolingo-format tasks that get harder as you improve, because the test does exactly that.',
      },
      {
        title: 'At-home test simulation',
        desc: 'We teach you how to set up your space, manage camera/microphone checks, and handle the proctoring protocol so you are calm on test day.',
      },
      {
        title: 'Time-pressure coaching',
        desc: 'The whole test is one hour. We teach time allocation per section and how to stay in control when the clock is tight.',
      },
      {
        title: 'Score guarantee within 48 hours',
        desc: 'You get your results in two days, not weeks, so you can retake immediately if needed. We guarantee your target score with our classroom cohort.',
      },
    ],
  },
  stats: [
    { value: '155+', label: 'Median score of our cohort' },
    { value: '48', label: 'Hours to receive your score' },
    { value: '1', label: 'Hour to sit the entire test' },
    { value: '92%', label: 'Achieved their target score on first attempt' },
  ],
  testimonials: ['english', 'test-prep'],
  faq: [
    {
      question: 'Is Duolingo English Test accepted by universities?',
      answer:
        'Yes. It is accepted by over 4,500 institutions globally, including all major US universities, many UK universities, Australian universities and Canadian schools. Check your specific university’s English requirement, but Duolingo is increasingly mainstream for admissions.',
    },
    {
      question: 'How is it scored, and what counts as good?',
      answer:
        'Duolingo is scored out of 160. A score of 120+ is competitive for most universities. Ivy League schools often ask for 130+. We will map a target for your shortlist in your free consultation.',
    },
    {
      question: 'Can I retake it easily?',
      answer:
        'Yes. You can sit Duolingo as many times as you want. Results come within 48 hours, so if you miss your target, you can book the next sitting almost immediately. That is why it is a favourite for students with tight timelines.',
    },
    {
      question: 'What is the "at-home" test experience like?',
      answer:
        'You sit on your computer in your own space, camera and microphone on. Duolingo’s proctoring system watches your screen and uses your webcam to invigilate. We teach you how to pass all the checks and manage the tech so nothing distracts you.',
    },
    ...commonFaq,
  ],
};
