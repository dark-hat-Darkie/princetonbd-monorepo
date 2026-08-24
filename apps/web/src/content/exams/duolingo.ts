import type { ExamContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const duolingo: ExamContent = {
  path: '/test-prep/duolingo',
  name: 'Duolingo English Test',
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
      { label: 'Book a free diagnostic', href: '/free-diagnostic' },
      { label: 'Compare course formats', href: '#formats', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Computer-based, at home · ~1 hour' },
      { label: 'Sections', value: 'Reading · Listening · Writing · Speaking' },
      { label: 'Scored', value: '10–160' },
      { label: 'Results', value: 'Within 48 hours' },
    ],
  },
  formats: [
    {
      name: 'Self-Paced',
      pitch: 'Pre-recorded lessons and practice tasks, for students who want to prepare alone.',
      price: bdtPrice(8000),
      priceUnit: 'one-off · 6 months of access',
      facts: ['40+ hours of content', 'Self-scheduled'],
      includes: [
        'Format walkthroughs for all four sections',
        '3 full-length adaptive practice tests',
        'Video explanations of every section',
        'Email support from a Duolingo instructor',
      ],
      href: '/contact',
    },
    {
      name: 'LiveOnline',
      pitch: 'Taught live to a small cohort, perfect for rapid improvement before your test date.',
      price: bdtPrice(16000),
      priceUnit: 'per 6-week cohort',
      facts: ['18 taught hours', 'Max 10 students', 'Evenings & weekends'],
      includes: [
        'Live strategy sessions with a named instructor',
        '4 full-length practice tests, reviewed',
        'Adaptive task drills twice weekly',
        'Live recording access to every session',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Private Tutoring',
      pitch: 'One instructor, one student, one plan built around your gaps and timeline.',
      price: bdtPrice(48000),
      priceUnit: 'per 15-hour package',
      facts: ['15 hours', '1-on-1', 'On campus or online'],
      includes: [
        'Diagnostic-led coaching tailored to your score goal',
        'Unlimited full-length papers with detailed scoring',
        'Section-specific drills at double speed',
        'Direct access to your tutor between sessions',
      ],
      href: '/contact',
    },
  ],
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
