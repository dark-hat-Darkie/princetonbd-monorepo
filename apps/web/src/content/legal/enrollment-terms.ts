import type { LegalContent } from '../types';

export const enrollmentTerms: LegalContent = {
  path: '/legal/enrollment-terms',
  seo: {
    title: 'Enrolment terms & conditions — Princeton Review Bangladesh',
    description:
      'Terms governing course enrolment, payment, score guarantees, attendance and conduct. Read before you enrol.',
  },
  title: 'Enrolment terms & conditions',
  updated: '2026-08-01',
  body: [
    {
      type: 'paragraph',
      text: 'By enrolling in a Princeton Review Bangladesh course, you enter into an agreement with us. These terms outline what we expect from you, what we provide, how payment works, and what happens if you or we need to cancel.',
    },
    {
      type: 'heading',
      text: 'Enrolment and payment',
      id: 'enrolment-payment',
    },
    {
      type: 'paragraph',
      text: 'When you enrol, you pay a registration fee and course fees according to the schedule you selected. We accept payment by card, bKash and bank transfer. Your enrolment is confirmed once payment is received and your account is set up.',
    },
    {
      type: 'heading',
      text: 'Instalment payment plans',
      id: 'instalments',
    },
    {
      type: 'paragraph',
      text: 'For courses over 20,000 BDT, we offer instalment plans: typically 50% at enrolment and 50% before the course starts, or three equal payments. Late payment may result in course suspension and forfeiture of the cooling-off right. We will notify you via email and SMS of upcoming payments.',
    },
    {
      type: 'heading',
      text: 'Attendance expectations',
      id: 'attendance',
    },
    {
      type: 'paragraph',
      text: 'Consistent attendance is essential for success. We expect you to attend all scheduled classes. If you cannot attend, notify us in advance. Excessive absences (more than 25% of scheduled classes) may result in removal from the cohort.',
    },
    {
      type: 'list',
      items: [
        'Classes run on schedule as advertised.',
        'Online classes require a stable internet connection and a device with camera and microphone.',
        'No refund is issued for absence or connectivity issues on your end.',
        'Recorded sessions are available for review; recordings are not a substitute for live attendance.',
      ],
    },
    {
      type: 'heading',
      text: 'Score guarantee: terms and conditions',
      id: 'score-guarantee',
    },
    {
      type: 'paragraph',
      text: 'Our score guarantee applies to full courses (SAT, ACT, GRE, GMAT prep) and is conditional. You are eligible to retake the course at no charge if you do not achieve the target score, provided you meet all of the following conditions:',
    },
    {
      type: 'list',
      items: [
        'You attend at least 90% of scheduled lessons.',
        'You sit all scheduled mock exams (typically 2–4 mocks depending on course).',
        'You take the official test (SAT, ACT, GRE or GMAT) within 60 days of course completion.',
        'You submit your official score report within 7 days of receiving it.',
        'Your target score is realistic for your start score (typically an improvement of 100–150 points for SAT/ACT, 3–5 points for GRE/GMAT verbal and quantitative, or equivalent). The retake is a full repeat of the course, not a subset of lessons; if you qualify and retake, the second course is free (you pay only new test fees). The guarantee expires 12 months after course completion.',
      ],
    },
    {
      type: 'heading',
      text: 'Code of conduct and behaviour',
      id: 'code-of-conduct',
    },
    {
      type: 'list',
      items: [
        'Be respectful and courteous to instructors, peers and staff.',
        'Do not engage in harassment, bullying or discrimination.',
        'Do not cheat, plagiarise or forge scores or documents.',
        'Do not disrupt classes or use abusive language.',
        'Do not attempt to share or resell course materials or recordings. Serious breaches of conduct may result in immediate removal from the course without refund.',
      ],
    },
    {
      type: 'heading',
      text: 'Recordings and course materials',
      id: 'recordings-materials',
    },
    {
      type: 'paragraph',
      text: "Class recordings (if provided) are for enrolled students' personal study only. You may not download, share, sell or use recordings for any commercial purpose. We retain the copyright to all materials, instructor notes and proprietary methods.",
    },
    {
      type: 'heading',
      text: 'Deferral and rescheduling',
      id: 'deferral',
    },
    {
      type: 'paragraph',
      text: 'You may defer to a later cohort once, up to 90 days after your course start date, at no additional cost. Further deferrals incur a 10% administrative fee. Deferrals must be requested in writing. After 90 days, deferral is treated as cancellation and subject to our refund policy.',
    },
    {
      type: 'heading',
      text: 'Cancellation and course suspension',
      id: 'cancellation',
    },
    {
      type: 'paragraph',
      text: 'You may cancel your enrolment within seven days of payment for a full refund (cooling-off period). After that, refunds are pro-rata as detailed in our Refund Policy. We reserve the right to suspend or cancel your access if you violate these terms or fail to pay outstanding fees.',
    },
    {
      type: 'callout',
      title: 'Template notice',
      text: 'These enrolment terms are a template. They must be reviewed and customised by a qualified lawyer in Bangladesh before the website goes live, to ensure compliance with local education laws, consumer protection regulations and your operational practices.',
    },
  ],
};
