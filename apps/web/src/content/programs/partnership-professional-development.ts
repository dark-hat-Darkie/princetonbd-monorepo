import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const partnershipProfessionalDevelopment: ProgramContent = {
  path: '/partnerships/professional-development',
  seo: {
    title:
      'Teacher professional development and curriculum training — university admissions and test prep',
    description:
      'Upskill your staff on university admissions, test preparation and global education trends. Customised professional development for teachers across international and national curricula.',
  },
  hero: {
    eyebrow: 'Teacher professional development',
    title: 'Equip your staff with university admissions expertise.',
    intro:
      'Your careers and English teachers know your students. We give them the expertise to guide university decisions, coach essays and prepare for international admissions. Professional development that scales impact across your staff.',
    actions: [
      { label: 'Discuss professional development', href: '/contact' },
      { label: 'Training modules', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Formats', value: 'Workshops, ongoing coaching, online modules' },
      { label: 'Duration', value: '1–3 days plus ongoing support' },
      { label: 'Participants', value: 'Careers advisors, form tutors, English staff' },
      { label: 'Scale', value: 'Individual, departmental or school-wide' },
    ],
  },
  features: {
    eyebrow: 'What we train on',
    title: 'Expertise your staff will use immediately.',
    intro:
      'Our training translates admissions knowledge into skills your staff can use with students: how to read a US Common App vs UCAS, how to coach an essay, how to talk about university selection.',
    items: [
      {
        title: 'University systems and selection',
        desc: 'Training on US Common App, UCAS, Canadian and Australian systems. How each works, how students navigate them, how schools fit students to universities.',
      },
      {
        title: 'Essay coaching and personal statements',
        desc: "Your English teachers learn to coach university essays specifically—not just 'write well' but 'show your thinking' and 'be specific'. Hands-on practice with real essays.",
      },
      {
        title: 'Interview preparation',
        desc: 'Training on how universities interview, what they’re looking for and how to coach students. We include video of real interviews so staff understand the format.',
      },
      {
        title: 'Test preparation overview',
        desc: 'Staff training on SAT, ACT, IELTS, TOEFL and GMAT—what they measure, where they’re required and how students can prepare. Enough for staff to guide; depth without becoming tutors.',
      },
    ],
  },
  process: {
    eyebrow: 'How professional development works',
    title: 'From needs to staff capability.',
    steps: [
      {
        no: '01',
        title: 'Needs assessment and programme design',
        desc: 'We meet with leadership to understand staff needs. Are staff new to university advising? Do they need updated systems training? We design a programme matching your priorities.',
      },
      {
        no: '02',
        title: 'Initial workshops and training',
        desc: 'One to three days of intensive training. Participants learn systems, practice essay coaching and interview skills, and discuss how to apply it with your students.',
      },
      {
        no: '03',
        title: 'Ongoing coaching and support',
        desc: 'We stay available post-training—answering questions, reviewing staff plans and providing coaching on difficult cases. Typically two to four follow-up sessions in the first term.',
      },
      {
        no: '04',
        title: 'Evaluation and next-year planning',
        desc: 'End-of-year feedback from participants and leadership. We evaluate impact and discuss what additional training or support is needed next year.',
      },
    ],
  },
  stats: [
    {
      value: '91%',
      label: 'Staff report feeling more confident in university advising after training',
    },
    { value: '8–12 hrs', label: 'Typical initial training duration per staff member' },
    { value: '15+', label: 'Schools trained in last two years' },
    { value: '94%', label: 'Recommend professional development to other schools' },
  ],
  testimonials: [],
  faq: [
    {
      question: 'Can training be customised to our school’s needs?',
      answer:
        'Completely. We do a needs assessment first—talking to your leadership and careers team about where staff need most support. Some schools need university systems training; others need essay coaching skills. We tailor the content to match your priorities.',
    },
    {
      question: 'How much time commitment is involved?',
      answer:
        'Initial training is usually two to three days (can be condensed into one intensive day). Follow-up coaching happens quarterly or as needed—typically two to four half-day sessions over the year. We work around your calendar.',
    },
    {
      question: 'Do teachers need to be subject specialists to participate?',
      answer:
        'No. We train careers advisors, form tutors and English teachers. You don’t need to be a subject expert; we teach you enough to guide students well. English teachers will practise essay coaching; careers staff will deep-dive into university systems.',
    },
    ...commonFaq,
  ],
};
