import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const gmat: ExamEditorial = {
  slug: 'gmat',
  interest: 'GRE / GMAT',
  seo: {
    title: 'GMAT preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'GMAT Focus Edition courses in Dhaka and Chattogram, plus live online cohorts. Adaptive full-length mocks, a written score guarantee and instructors who scored in the top percentile themselves.',
  },
  hero: {
    eyebrow: 'MBA and business school admissions',
    title: 'The GMAT score your MBA shortlist expects.',
    intro:
      'The GMAT measures your ability to solve problems under time pressure using the tools an MBA student actually needs. We teach the new Focus Edition the way business schools score it, prove it with full-length mocks, and guarantee the result.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, on demand · 2h 15m' },
      { label: 'Sections', value: 'Quantitative · Verbal · Data Insights' },
      { label: 'Scored', value: '205–805' },
      { label: 'Sittings', value: 'Sit as often as you need throughout the year' },
    ],
  },
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Eight weeks, six modules, all three Focus Edition sections.',
    intro:
      'The Focus Edition is three 45-minute sections, no essay, and a score out of 805. We teach it exactly as GMAC scores it, with a timed section at the end of every module so you know where you stand before the next one starts.',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation built for the Focus Edition.',
    intro:
      'The new GMAT is shorter and sharper — emphasis moved to data interpretation and away from pure grammar. We teach the three-section structure the way Pearson scores it, using full-length mocks, not exercises.',
    items: [
      {
        title: 'Focus Edition mocks',
        desc: 'Full-length tests using the current three-section format, scored exactly as business schools receive them.',
      },
      {
        title: 'Data Insights mastery',
        desc: 'The new section rewards speed and multi-source reasoning — we teach the move from single-question drills to full-page interpretation.',
      },
      {
        title: 'Error categorisation',
        desc: 'Every wrong answer goes into a weakness log so the same mistake stops recurring by week three.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+70', label: 'Average point improvement' },
    { value: '715', label: 'Median score of our 700+ cohort' },
    { value: '12', label: 'Full-length mocks in the classroom course' },
    { value: '93%', label: 'Hit or beat their agreed target' },
  ],
  faq: [
    {
      question: 'What is the GMAT Focus Edition?',
      answer:
        'Launched in 2024, it replaces the older format with a 2h15m exam focused on the skills MBA programmes actually use: quantitative reasoning, verbal reasoning and a new Data Insights section. Nearly every top programme now accepts only Focus Edition scores.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top programmes typically want 700+, but excellent schools admit at 650+. Your target depends on the programme and its competitiveness. We help you set a realistic target at your free consultation.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Eight to ten weeks is typical for a 60–80 point gain. Start earlier if you are aiming past 740 or if your diagnostic comes in below 600. We provide honest timelines at the consultation.',
    },
    {
      question: 'Can I take the GMAT from home?',
      answer:
        'Yes — the GMAT is offered at test centres and at home via ProctorU. Our live online and self-paced courses prepare you equally well for either format.',
    },
    ...commonFaq,
  ],
};
