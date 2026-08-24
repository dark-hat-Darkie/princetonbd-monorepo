import type { CompanyContent } from '@/content/types';

export const careersPage: CompanyContent = {
  path: '/careers',
  seo: {
    title: 'Careers at Princeton Review Bangladesh — teaching, counseling, operations',
    description:
      'Work with us. Instructor roles, counselor positions and operations jobs across Gulshan, Dhanmondi and Chattogram campuses.',
  },
  hero: {
    eyebrow: 'Careers',
    title: 'Help us send more students to great universities.',
    intro:
      'We are hiring across teaching, counseling and operations. Work at our Dhaka or Chattogram campuses, or lead our online programmes.',
  },
  body: [
    {
      type: 'paragraph',
      text: 'We are not a call centre. Everyone here either teaches, advises students, or directly supports people who do. The work is intellectually demanding, the students are sharp, and the stakes — for them — are real.',
    },
    { type: 'heading', text: 'Teaching roles' },
    {
      type: 'paragraph',
      text: 'We hire instructors in SAT, ACT, GRE, GMAT, IELTS, TOEFL and A-Level tutoring. Every instructor completes 40+ hours of training before their first class. We do not hire based on "strong knowledge of the subject" — we hire based on your score and your willingness to learn how to teach that score to someone who does not yet have it.',
    },
    {
      type: 'list',
      items: [
        'Live classroom teaching at our Dhaka and Chattogram campuses, or leading online cohorts.',
        'Full-length mock-test design and review sessions for every student in your class.',
        'Mentoring students one-to-one between classes for persistent weak spots.',
      ],
    },
    { type: 'heading', text: 'Counselling and admissions roles' },
    {
      type: 'paragraph',
      text: 'Admissions counselors advise students on university choice, applications and financial aid. You need to know how admissions works (either because you work in it or because you apply to universities), but more importantly you need to care enough about a student’s future to tell them hard truths. Sometimes that is "you applied late — let us get you into a stronger place next year". Sometimes it is "this university is too expensive for you".',
    },
    {
      type: 'list',
      items: [
        'One-to-one student consultations on university shortlists and application strategy.',
        'Essay review and feedback for US, UK and Canadian applications.',
        'Financial aid strategy and funding research.',
        'Follow-up with students through acceptance season.',
      ],
    },
    { type: 'heading', text: 'Operations and support roles' },
    {
      type: 'paragraph',
      text: 'Admissions coordinators, curriculum specialists and administrative staff keep the operation running. We do not hire administrative staff to shuffle paper — we hire people who understand the mission and can anticipate what students and instructors actually need.',
    },
    {
      type: 'list',
      items: [
        'Student enrolment, mock-test scheduling and campus logistics.',
        'Instructor support, training and ongoing professional development.',
        'Curriculum development and exam-format updates.',
        'Facilities management, IT support and campus operations.',
      ],
    },
  ],
  features: {
    eyebrow: 'What you get',
    title: 'Why work at Princeton Review Bangladesh',
    items: [
      {
        title: 'Work that matters',
        desc: 'Your students are applying to Ivy League, STEM PhDs and business schools that transform their lives. That is not abstract — you see it.',
      },
      {
        title: 'Room to grow',
        desc: 'Instructors become curriculum leads. Counselors lead student-outcome initiatives. We promote from within because we know how we work.',
      },
      {
        title: 'Competitive pay',
        desc: 'Instructor pay starts at a significant multiple of local tutoring rates. Counselors and operations staff are paid to market rates in their role.',
      },
      {
        title: 'Flexible delivery',
        desc: 'Teach live on campus, lead online cohorts, or a mix. Suitable for PhD students, working professionals, or career changers.',
      },
    ],
  },
  cards: {
    eyebrow: 'Open roles',
    title: 'Current opportunities',
    intro: 'We are always hiring instructors. These roles are open right now.',
    columns: 3,
    items: [
      {
        no: '01',
        tag: 'Teaching',
        title: 'SAT instructor',
        desc: 'Lead live SAT cohorts at our Gulshan or Dhanmondi campus. Requires SAT 1450+.',
        href: '/contact',
      },
      {
        no: '02',
        tag: 'Teaching',
        title: 'GRE instructor',
        desc: 'Teach quantitative reasoning, verbal and analytical writing. GRE 320+ required.',
        href: '/contact',
      },
      {
        no: '03',
        tag: 'Counselling',
        title: 'Admissions counselor',
        desc: 'Guide students through US, UK and Canadian applications. Familiarity with admissions processes required.',
        href: '/contact',
      },
      {
        no: '04',
        tag: 'Operations',
        title: 'Admissions coordinator',
        desc: 'Manage student enrolments, mock scheduling and campus operations at Chattogram.',
        href: '/contact',
      },
      {
        no: '05',
        tag: 'Teaching',
        title: 'IELTS instructor',
        desc: 'Live classroom teaching in reading, writing, listening and speaking. IELTS 8.0+ required.',
        href: '/contact',
      },
    ],
  },
};
