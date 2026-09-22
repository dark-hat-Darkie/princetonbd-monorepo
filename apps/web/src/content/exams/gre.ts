import type { ExamEditorial } from '../types';
import { commonFaq } from '../shared';

export const gre: ExamEditorial = {
  slug: 'gre',
  interest: 'GRE / GMAT',
  seo: {
    title: 'GRE preparation in Bangladesh — courses, tutoring & free diagnostic',
    description:
      'GRE courses in Dhaka and Chattogram, plus live online cohorts. Adaptive full-length mocks, a written score guarantee and instructors who scored in the top percentile themselves.',
  },
  hero: {
    eyebrow: 'Graduate school admissions',
    title: 'The GRE score your target programme expects.',
    intro:
      'The GRE measures reasoning under time pressure — not tricks or test-taking shortcuts. We teach you to think like the test does, prove it with full-length adaptive mocks, and guarantee the score you need.',
    actions: [
      { label: 'See upcoming batches', href: '#batches' },
      { label: 'View the curriculum', href: '#curriculum', variant: 'outline' },
    ],
    facts: [
      { label: 'Format', value: 'Digital, on demand · 1h 58m' },
      { label: 'Sections', value: 'Verbal · Quantitative · Writing' },
      { label: 'Scored', value: '130–170 + 0–6 essay' },
      { label: 'Sittings', value: 'Sit as often as you need throughout the year' },
    ],
  },
  curriculum: {
    eyebrow: 'Curriculum',
    title: 'Ten weeks, seven modules, every section of the shorter GRE.',
    intro:
      'The GRE has been under two hours since September 2023: one essay, two Verbal and two Quant sections, with the second section of each measure adapting to how you did on the first. Every module ends with a timed section so your score map is current before the next one starts.',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Preparation that teaches you to think at speed.',
    intro:
      'The GRE is a reasoning test, not a knowledge test. We build the habits you need to untangle dense passages and tough quant under time pressure, and prove it works with full-length mocks.',
    items: [
      {
        title: 'Adaptive mocks',
        desc: 'Full-length tests that mirror how the real exam adapts, scored exactly as ETS scores them.',
      },
      {
        title: 'Logic and argument mapping',
        desc: 'How to see the joints in every argument so the right answer becomes obvious, not a guess.',
      },
      {
        title: 'Quant drilling by weakness',
        desc: 'Every wrong answer feeds into a personal error log so you stop repeating the same mistakes.',
      },
      {
        title: 'Score guarantee',
        desc: 'Hit the target we agree at enrolment or take the entire course again, free.',
      },
    ],
  },
  stats: [
    { value: '+30', label: 'Average point improvement' },
    { value: '328', label: 'Median score of our 325+ cohort' },
    { value: '12', label: 'Full-length mocks in the classroom course' },
    { value: '92%', label: 'Hit or beat their agreed target' },
  ],
  faq: [
    {
      question: 'How does the GRE differ from the GMAT?',
      answer:
        'The GRE tests broad reasoning across maths and English; the GMAT focuses on business-school-relevant skills. GRE is accepted by most MBA programmes now, but check your target schools. We can help you decide which to sit.',
    },
    {
      question: 'What score do I need?',
      answer:
        'Top programmes want 320+, but many excellent schools accept 310+. It depends entirely on your target programme and how competitive the application pool is. We advise at your free consultation based on your diagnostic.',
    },
    {
      question: 'How long should I study?',
      answer:
        'Eight to twelve weeks is typical for a 20–30 point gain. Start earlier if aiming past 330 or if your diagnostic comes back below 305. We provide honest timelines at the consultation.',
    },
    {
      question: 'Can I take the GRE from home?',
      answer:
        'Yes — the GRE is offered at test centres and at home via ProctorU. Our live online and self-paced courses prepare you equally well for either format.',
    },
    ...commonFaq,
  ],
};
