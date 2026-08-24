import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const partnershipSchools: ProgramContent = {
  path: '/partnerships/schools',
  seo: {
    title:
      'University preparation and admissions coaching for schools — partnership with Princeton Review Bangladesh',
    description:
      'Boost university admission outcomes for your students. Our partnership programme brings university counseling and test prep to your school through on-site coaching and teacher training.',
  },
  hero: {
    eyebrow: 'School partnerships',
    title: 'Prepare students for universities where they’ll thrive.',
    intro:
      'Your students need more than grades to succeed at competitive universities. Our partnership brings specialised admissions counselling and test preparation directly to your campus, embedding expertise in your sixth form.',
    actions: [
      { label: 'Discuss a partnership', href: '/contact' },
      { label: 'How partnerships work', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Delivery model', value: 'On-campus sessions plus online options' },
      { label: 'Coverage', value: 'Admissions counselling, test prep, university selection' },
      { label: 'Class sizes', value: 'Small cohorts or one-to-one' },
      { label: 'Timeline', value: 'Year 10 through enrolment' },
    ],
  },
  features: {
    eyebrow: 'Partnership benefits',
    title: 'Outcomes your school can measure.',
    intro:
      'Our school partnerships are designed for results: higher university rankings achieved, more top-choice acceptances, larger scholarship values and stronger teacher capability.',
    items: [
      {
        title: 'Dedicated on-campus counselors',
        desc: 'A Princeton Review counselor works from your campus, available to students throughout the admissions cycle. They know your school culture and your students personally.',
      },
      {
        title: 'Test preparation cohorts',
        desc: 'SAT, ACT, IELTS, TOEFL and GMAT cohorts taught on-site during school hours or after. Small class sizes and full mock exams with proctoring.',
      },
      {
        title: 'Teacher training and upskilling',
        desc: 'We train your staff on university selection, essay coaching and interview preparation. Your teachers become better counselors alongside our experts.',
      },
      {
        title: 'Measurable cohort outcomes',
        desc: 'We track and report admission rates, university rankings achieved and scholarships secured. Transparent metrics so you see the impact.',
      },
    ],
  },
  process: {
    eyebrow: 'How partnerships work',
    title: 'From launch through measurable outcomes.',
    steps: [
      {
        no: '01',
        title: 'Partnership assessment and planning',
        desc: 'We assess your sixth form curriculum, student needs and goals. We design a bespoke programme—cohort size, frequency, focus areas.',
      },
      {
        no: '02',
        title: 'Teacher training and integration',
        desc: 'Our staff train your careers and English teachers on admissions strategy, essay coaching and university systems. We embed expertise into your institution.',
      },
      {
        no: '03',
        title: 'Cohort programming and tracking',
        desc: 'Regular cohort sessions on SAT/IELTS, university selection, essays and interviews. Monthly progress tracking and parent communications.',
      },
      {
        no: '04',
        title: 'Outcomes reporting and renewal',
        desc: 'End-of-cycle reporting on admissions outcomes, scholarships secured and university rankings achieved. Planning for next cohort begins.',
      },
    ],
  },
  stats: [
    { value: '87%', label: 'Average admission rate to target universities (partner schools)' },
    { value: '£1.8m', label: 'Average total scholarships per cohort of 40 students' },
    { value: '15+', label: 'Partner schools in Bangladesh currently' },
    { value: '94%', label: 'Parent satisfaction with partnership programmes' },
  ],
  testimonials: [],
  faq: [
    {
      question: 'How does on-campus preparation differ from students attending our centre?',
      answer:
        'On-campus, we bring expertise directly to your campus, reducing travel time and embedding ourselves in your school culture. Sessions integrate with your curriculum and your careers programme. Online access ensures no student is left behind by geography.',
    },
    {
      question: 'What commitment is required from the school?',
      answer:
        'We require dedicated space (one small room), timetabled slots for cohort sessions (typically 2–4 hours per week) and your careers team’s partnership in teacher training. We design the programme around your capacity and budget.',
    },
    {
      question: 'How are partnership fees structured?',
      answer:
        'Partnerships are quoted per school based on cohort size, frequency and scope (test prep vs counselling only). Typical engagements range from one cohort per year through multiple cohorts with teacher training. We discuss budget and structure at consultation.',
    },
    ...commonFaq,
  ],
};
