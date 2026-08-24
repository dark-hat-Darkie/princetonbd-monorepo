import type { LegalContent } from '../types';

export const refundPolicy: LegalContent = {
  path: '/legal/refund-policy',
  seo: {
    title: 'Refund policy — Princeton Review Bangladesh',
    description:
      'Our refund policy covers cooling-off periods, pro-rata refunds, course cancellations and the process to request a refund.',
  },
  title: 'Refund policy',
  updated: '2026-08-01',
  body: [
    {
      type: 'paragraph',
      text: 'Princeton Review Bangladesh wants you to be satisfied with your course. This policy outlines when and how refunds are issued, what fees are non-refundable, and the process to request one.',
    },
    {
      type: 'heading',
      text: 'Cooling-off period',
      id: 'cooling-off-period',
    },
    {
      type: 'paragraph',
      text: 'You have seven calendar days from the date of enrolment to withdraw without penalty and receive a full refund. This cooling-off window applies to all course types and payment plans. To withdraw, send written notice to our email address (see contact details below).',
    },
    {
      type: 'heading',
      text: 'Refunds after classes begin',
      id: 'refunds-after-start',
    },
    {
      type: 'paragraph',
      text: 'If you cancel after your course has started, refunds are calculated on a pro-rata basis: the total fee minus the proportion of the course you have attended, plus any non-refundable fees (see below).',
    },
    {
      type: 'list',
      items: [
        'Attendance is calculated as the number of lessons attended divided by total lessons scheduled.',
        'Partial attendance of a lesson counts as full attendance.',
        'Lessons missed due to no-show or late cancellation still count toward your attendance.',
      ],
    },
    {
      type: 'heading',
      text: 'Non-refundable fees and materials',
      id: 'non-refundable-fees',
    },
    {
      type: 'paragraph',
      text: 'The following are non-refundable and cannot be credited against future courses:',
    },
    {
      type: 'list',
      items: [
        'Registration or administration fee (typically 1,000–3,000 BDT depending on the course).',
        'Downloaded or printed course materials (study guides, practice tests, answer keys).',
        'Official test fees (SAT, ACT, GRE, GMAT, TOEFL, IELTS) — these are not our fees and cannot be refunded by us.',
      ],
    },
    {
      type: 'heading',
      text: 'Transfers between cohorts',
      id: 'transfers',
    },
    {
      type: 'paragraph',
      text: 'You may request a transfer to a different cohort (batch) or course type without penalty within 14 days of your course start date. After 14 days, a transfer incurs a 5% administrative fee of your course fee. The receiving course must have capacity and must start within 90 days of your original course start date.',
    },
    {
      type: 'heading',
      text: 'We cancel your course',
      id: 'our-cancellation',
    },
    {
      type: 'paragraph',
      text: 'If Princeton Review Bangladesh cancels a course cohort (due to insufficient enrolments, instructor unavailability or force majeure), we will offer you a full refund or a place in the next available cohort at no extra charge. You have seven days to choose.',
    },
    {
      type: 'heading',
      text: 'Instalment plans and refunds',
      id: 'instalments',
    },
    {
      type: 'paragraph',
      text: 'If you are paying by instalment and withdraw, refunds are calculated as above. Outstanding instalments become due immediately unless you have exercised the cooling-off right (within seven days), in which case no further payment is required.',
    },
    {
      type: 'heading',
      text: 'How refunds are issued',
      id: 'how-refunds-issued',
    },
    {
      type: 'paragraph',
      text: 'Refunds are processed via the same payment method used for enrolment (card, bKash, bank transfer) within 14 business days of approval. Processing times may vary depending on your bank or payment provider.',
    },
    {
      type: 'heading',
      text: 'How to request a refund',
      id: 'request-refund',
    },
    {
      type: 'list',
      items: [
        'Email our office with your course name, enrolment date and reason for withdrawal.',
        'Include proof of payment (receipt or bank transaction).',
        'We will calculate your refund entitlement and confirm in writing.',
        'Refunds are not issued to third-party accounts — they return to the account that paid.',
      ],
    },
  ],
};
