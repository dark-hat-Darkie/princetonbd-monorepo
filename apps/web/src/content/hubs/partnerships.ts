import type { HubContent } from '../types';
import { commonFaq } from '../shared';

export const partnershipsHub: HubContent = {
  path: '/partnerships',
  seo: {
    title: 'Institutional partnerships — schools, tutoring and teacher development in Bangladesh',
    description:
      'We partner with schools and educational institutions to deliver high-dosage tutoring, teacher professional development, and research-backed learning interventions.',
  },
  hero: {
    eyebrow: 'Institutional partnerships',
    title: 'Tutoring and support programmes built for schools.',
    intro:
      'We work with schools and districts to implement tutoring interventions, upskill teachers and improve student outcomes. Three programmes, proven results.',
    actions: [{ label: 'Talk to our partnerships team', href: '/contact' }],
    facts: [
      { label: 'Schools partnered', value: '30+' },
      { label: 'Students reached', value: '5,000+ annually' },
      { label: 'Teachers trained', value: '500+ per year' },
      { label: 'Subjects covered', value: 'Maths · Science · English' },
    ],
  },
  cards: {
    eyebrow: 'Our programmes',
    title: 'Three models for improving school outcomes.',
    intro:
      'From in-school tutoring to staff development, we tailor our approach to what your institution needs.',
    items: [
      {
        no: '01',
        tag: 'Programme',
        title: 'Schools & districts',
        desc: 'We work with school leadership to diagnose learning gaps, then embed tutoring interventions that raise achievement in core subjects. Proven to lift average scores by 10–15%.',
        meta: 'On-site · Ongoing support',
        href: '/partnerships/schools',
      },
      {
        no: '02',
        tag: 'Programme',
        title: 'High-dosage tutoring',
        desc: 'Intensive, targeted tutoring for students two to four grades behind. Small group sessions, regular progress monitoring, and rapid gains in foundational skills.',
        meta: '3–5 hours per week',
        href: '/partnerships/high-dosage-tutoring',
      },
      {
        no: '03',
        tag: 'Programme',
        title: 'Teacher development',
        desc: 'Professional development for school staff: classroom strategies, assessment practices, technology integration and instructional coaching that improves teaching quality.',
        meta: 'Ongoing · Research-backed',
        href: '/partnerships/professional-development',
      },
    ],
  },
  features: {
    eyebrow: 'Why partner with us',
    title: 'What we bring to an institution.',
    items: [
      {
        title: 'Research-backed methods',
        desc: 'Every programme is grounded in learning science. We measure outcomes, iterate based on data, and share results transparently.',
      },
      {
        title: 'Locally trained staff',
        desc: 'We hire and train local tutors and coaches, not send in outsiders. Your school gets to know the team; continuity builds trust.',
      },
      {
        title: 'Flexible implementation',
        desc: 'We work with your timetable, curriculum and constraints. Programmes scale and adapt based on what your school can support.',
      },
      {
        title: 'Measurable results',
        desc: 'We track student progress, teacher development and school-wide outcomes. You know what changed, by how much, and why.',
      },
    ],
  },
  stats: [
    { value: '30+', label: 'Schools partnered' },
    { value: '12–15%', label: 'Average score improvement' },
    { value: '5000+', label: 'Students reached annually' },
    { value: '90%', label: 'Teacher satisfaction with development programmes' },
  ],
  testimonials: [],
  faq: [
    {
      question: 'How long does it take to see results?',
      answer:
        'That depends on the programme. High-dosage tutoring can show progress in as little as three months with consistent attendance. School-wide interventions typically take a full academic year to mature; real impact is visible by year two.',
    },
    {
      question: 'What is the cost of a partnership?',
      answer:
        'Partnership costs vary based on scale, duration and which programmes you choose. We work with school budgets and can often structure payments across the financial year. The first step is a diagnostic conversation about what your school needs.',
    },
    {
      question: 'Can we pilot a programme with a small group before full implementation?',
      answer:
        'Yes, absolutely. Many of our school partners start with a pilot — perhaps tutoring for one class or professional development for one department — then expand if it goes well. Piloting reduces risk and helps you see the model in action.',
    },
    ...commonFaq,
  ],
};
