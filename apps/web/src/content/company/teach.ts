import type { CompanyContent } from '@/content/types';

export const teachPage: CompanyContent = {
  path: '/careers/teach',
  seo: {
    title: 'Become an instructor at Princeton Review Bangladesh — teaching roles and training',
    description:
      'Teach SAT, ACT, GRE, GMAT and IELTS to students applying to universities worldwide. Training, pay and how to apply.',
  },
  hero: {
    eyebrow: 'Join our faculty',
    title: 'Teach the exams you know to students who are going places.',
    intro:
      'Instructor and tutor roles in SAT, ACT, GRE, GMAT and IELTS. Every instructor completes 40+ hours of training before they teach. We do not hire based on subject knowledge alone — we hire based on your exam score and your ability to teach it.',
  },
  body: [
    {
      type: 'paragraph',
      text: 'An instructor at Princeton Review does not lecture. They teach. That means knowing your content, knowing how your students think, and catching the moment when a student switches from "I do not understand this" to "oh, I know how to do this". That takes training, practice and feedback.',
    },
    { type: 'heading', text: 'The bar' },
    {
      type: 'paragraph',
      text: 'You need a score that puts you in the top 1–2% of test takers. Not because we are being elitist — because your students are trying to get into top universities and they need to see that it is possible.',
    },
    {
      type: 'list',
      items: [
        'SAT: 1450 or above',
        'ACT: 34 or above',
        'GRE: 320 or above',
        'GMAT: 700 or above',
        'IELTS: 8.0 or above',
        'TOEFL: 110 or above',
        'A-Level maths: A* or A grade',
      ],
    },
    { type: 'heading', text: 'The training' },
    {
      type: 'paragraph',
      text: 'Everyone starts as an apprentice. Before you teach your first live class, you complete over 40 hours of training: exam content mastery, pedagogy, mock-test design, how to give feedback on essays, and how to handle the student who panics two weeks before test day.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Curriculum workshops: deep dives into exam content, question types and student error patterns.',
        'Observation: watching two or three experienced instructors teach live so you see what good looks like.',
        'Mock teaching: you teach a section to the training team and get filmed feedback.',
        'Supervised teaching: you co-teach with a mentor for your first two or three classes.',
        'Ongoing professional development: monthly workshops on new exam formats, teaching techniques and student outcomes.',
      ],
    },
    { type: 'heading', text: 'Pay and scheduling' },
    {
      type: 'paragraph',
      text: 'Instructor pay is competitive and transparent. You are paid for class hours, training hours and mock-test reviews. Evening and weekend availability is ideal but not mandatory — we teach morning, afternoon and evening cohorts.',
    },
    {
      type: 'list',
      items: [
        'Class teaching: pays at a rate significantly above local tutoring market rates.',
        'Mock reviews: separate compensation for reviewing and debriefing student mock tests.',
        'Training: you are paid during mandatory training and professional development.',
        'Schedule: we accommodate PhD students, working professionals and full-time instructors.',
      ],
    },
    { type: 'heading', text: 'How to apply' },
    {
      type: 'paragraph',
      text: 'Email hello@princetonreviewbd.com with your CV, your official exam score report and a one-page note on why you want to teach. If we think it is a fit, we will send you an application form and a sample lesson to design. The entire process takes about two weeks. You do not need teaching experience — you need the score, the intellectual curiosity and the willingness to train.',
    },
  ],
  features: {
    eyebrow: 'Before you start',
    title: 'What you need to know about teaching here',
    items: [
      {
        title: '40+ hours of mandatory training',
        desc: 'You are not certified to teach your first class. Training is comprehensive, paid, and happens before you stand in front of students.',
      },
      {
        title: 'Small, engaged cohorts',
        desc: 'No lectures to 50 students. Your class has eight to twelve people and they are paying to be there.',
      },
      {
        title: 'Feedback and accountability',
        desc: 'You get recorded, observed and debriefed. We give you feedback every cycle on student progress and teaching effectiveness.',
      },
      {
        title: 'Pathways to senior roles',
        desc: 'Instructors become curriculum leads, interview team members and mentor new faculty. Advancement is based on teaching quality and student outcomes.',
      },
    ],
  },
};
