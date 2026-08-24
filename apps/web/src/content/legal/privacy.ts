import type { LegalContent } from '../types';

export const privacyPolicy: LegalContent = {
  path: '/legal/privacy',
  seo: {
    title: 'Privacy policy — Princeton Review Bangladesh',
    description:
      'How we collect, use and protect your personal data. Our privacy commitments to students, parents and inquiry visitors.',
  },
  title: 'Privacy policy',
  updated: '2026-08-01',
  body: [
    {
      type: 'paragraph',
      text: 'Princeton Review Bangladesh values your privacy. This policy explains what personal data we collect, how we use it, who we share it with, and the rights you have over your information.',
    },
    {
      type: 'heading',
      text: 'What data we collect',
      id: 'what-data-we-collect',
    },
    {
      type: 'paragraph',
      text: 'We collect personal data in several ways, depending on how you interact with us. This includes data you provide directly (through forms, enquiries and enrolment) and data collected automatically (through analytics and cookies).',
    },
    {
      type: 'list',
      items: [
        'Enquiry forms: name, email, phone, school or college, test name and target score.',
        'Enrolment: email, phone, date of birth, national ID, payment information, academic history and test scores.',
        'Website analytics: anonymised behaviour data (pages visited, time spent, device type) via Google Analytics.',
        'Cookies: session data, preferences and usage patterns.',
        'Payment processors: card details and transaction history (processed by our payment partner, not stored by us).',
      ],
    },
    {
      type: 'heading',
      text: 'Lawful basis for collection',
      id: 'lawful-basis',
    },
    {
      type: 'paragraph',
      text: 'We collect and process your data for legitimate reasons tied to running our business and serving our students. These include contractual obligations (your enrolment agreement), your consent (marketing communications), legal compliance (financial records), and our legitimate interests (analytics to improve the site).',
    },
    {
      type: 'heading',
      text: 'How we use your data',
      id: 'how-we-use-data',
    },
    {
      type: 'list',
      items: [
        'To enrol you in a course, take payment and deliver the service.',
        'To communicate with you about your progress, schedule, materials and account.',
        'To send marketing emails (only if you have opted in).',
        'To comply with legal obligations (financial and employment records).',
        'To improve our website and courses through anonymised analytics.',
        'To support admissions counseling, university applications and visa interviews.',
      ],
    },
    {
      type: 'heading',
      text: 'Who we share your data with',
      id: 'data-sharing',
    },
    {
      type: 'paragraph',
      text: 'We do not sell your personal data. We share it only with partners who help us deliver our service, under confidentiality agreements.',
    },
    {
      type: 'list',
      items: [
        'Payment processors (Stripe, bKash or similar) to collect fees.',
        'University partners, only with your explicit consent, to support your applications.',
        'Cloud hosting providers (Google Cloud or similar) to secure our systems.',
        'Legal or regulatory authorities, only when required by law.',
      ],
    },
    {
      type: 'heading',
      text: 'Data retention and children',
      id: 'retention-and-children',
    },
    {
      type: 'paragraph',
      text: 'We keep your data only as long as needed: course records for at least three years after you finish, enquiries for one year, and marketing consent until you opt out. Many of our students are under 18. If you are under 18, we require a parent or guardian to provide consent before enrolment and before we send marketing messages.',
    },
    {
      type: 'heading',
      text: 'Your rights',
      id: 'your-rights',
    },
    {
      type: 'list',
      items: [
        'Access: you can request a copy of all data we hold about you.',
        'Correction: you can ask us to fix inaccurate information.',
        'Deletion: you can request deletion of your data (subject to legal retention obligations).',
        'Opt-out: you can unsubscribe from marketing emails at any time.',
        'Portability: you can request a machine-readable copy of your data.',
      ],
    },
    {
      type: 'heading',
      text: 'International data transfers',
      id: 'international-transfers',
    },
    {
      type: 'paragraph',
      text: 'Some of our services use cloud providers based outside Bangladesh. When data moves internationally, we ensure it is protected by standard contractual clauses or other recognised safeguards.',
    },
    {
      type: 'callout',
      title: 'Template notice',
      text: 'This privacy policy is a template. It must be reviewed and customised by a qualified lawyer in Bangladesh before the website goes live, to ensure it complies with local data protection laws and your specific business practices.',
    },
  ],
};
