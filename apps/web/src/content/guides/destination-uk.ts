import type { GuideContent } from '../types';

export const destinationUk: GuideContent = {
  path: '/study-abroad/destinations/uk',
  seo: {
    title: 'Studying in the United Kingdom from Bangladesh — one-year masters, visa and costs',
    description:
      'What you need to know about UK universities: one-year taught masters, Graduate Route work visa, Student visa requirements, and realistic costs from Bangladesh.',
  },
  image: {
    src: '/images/destination-uk.jpg',
    alt: 'A Gothic university quadrangle in the United Kingdom',
  },
  hero: {
    eyebrow: 'Destination guide',
    title: 'The United Kingdom, one year at a time.',
    intro:
      'The most time-efficient and, paradoxically, one of the cheapest options for a postgraduate degree. Here is what you pay, how the visa works, and where your coursework actually happens.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Find universities', href: '/study-abroad/university-finder', variant: 'outline' },
    ],
    facts: [
      { label: 'Degree length', value: 'One year · Masters only' },
      { label: 'Intakes', value: 'September (most) · January (some)' },
      { label: 'Apply by', value: 'Nov–Jan for following September' },
      { label: 'Work visa', value: 'Graduate Route · Two years' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'A UK postgraduate degree is unique: taught masters last one year, not two. This compressed timeline cuts the total cost and gets you into the workforce faster — which matters when you are funding the degree yourself or looking to work on the Graduate Route visa.',
    },
    { type: 'heading', text: 'The one-year masters advantage' },
    {
      type: 'paragraph',
      text: 'Most UK masters are taught programmes lasting September through July. Coursework (lectures, seminars, labs) typically ends in April or May; the summer is for project work and final exams. This pace is fast and intense, but the financial logic is clear.',
    },
    {
      type: 'list',
      items: [
        'Total time in the UK is around twelve months, not twenty-four.',
        'Tuition is one year of fees, not two.',
        'Work visa eligibility starts immediately upon graduation.',
        'You enter the job market a full year ahead of your American or Australian counterparts.',
      ],
    },
    { type: 'heading', text: 'Costs and funding' },
    {
      type: 'paragraph',
      text: 'International students pay the same tuition as domestic students in Scotland; England, Wales and Northern Ireland charge international rates. Below is the realistic annual spend, in British pounds, including living costs.',
    },
    {
      type: 'table',
      head: ['University type', 'Annual tuition', 'Living costs', 'Total for one year'],
      rows: [
        ['Russell Group (selective)', '£18,000–£28,000', '£12,000–£16,000', '£30,000–£44,000'],
        [
          'Researchintensive (non-Russell)',
          '£13,000–£20,000',
          '£11,000–£15,000',
          '£24,000–£35,000',
        ],
        ['Post-92 / newer universities', '£10,000–£16,000', '£10,000–£14,000', '£20,000–£30,000'],
      ],
    },
    {
      type: 'callout',
      title: 'The GBP headwind',
      text: 'When you convert to BDT, a £30,000 year is roughly 60 lakh taka at current rates. This often comes as a shock to students accustomed to US pricing, but remember: one year, not two, and UK postgraduate work permits have no capped salary.',
    },
    { type: 'heading', text: 'The Student visa and financial requirements' },
    {
      type: 'paragraph',
      text: 'UK Student visa rules changed in 2021 under the Student visa route. The essentials:',
    },
    {
      type: 'list',
      items: [
        'Your university issues a Confirmation of Acceptance for Studies (CAS) once fees and proof of English are met.',
        'You must show financial maintenance: funds covering your tuition and living costs. The amount is set by the university; for most students it is the full cost of the programme.',
        'Funds must be in your account (or your sponsor’s account, if your parents are the financial guarantor) for at least twenty-eight days before you apply.',
        'IELTS UKVI, TOEFL iBT or Duolingo English Test is required. IELTS (Academic) is most common.',
      ],
    },
    { type: 'heading', text: 'Work during and after studies' },
    {
      type: 'paragraph',
      text: 'You may work on campus up to twenty hours a week during term time, and full time during holidays. Off-campus work is limited to your university’s approved list; plan your budget without off-campus income.',
    },
    {
      type: 'paragraph',
      text: 'After graduation, the Graduate Route visa permits two years of unrestricted work in the UK. No job offer is required, and there is no salary cap. This period counts toward indefinite leave to remain for those who wish to stay beyond.',
    },
    { type: 'heading', text: 'The application and timeline' },
    {
      type: 'table',
      head: ['When', 'What happens'],
      rows: [
        ['Aug–Sep (year before)', 'Research programmes and universities; sit IELTS/TOEFL'],
        ['Oct–Nov', 'Submit applications via university portals'],
        ['Dec–Feb', 'Receive offers; choose firm acceptance; provide financial documents'],
        ['Feb–Apr', 'Receive CAS; book visa appointment'],
        ['Apr–Aug', 'Visa decision (usually 3–8 weeks); purchase flights'],
        ['Sep–Jul (next year)', 'Study; at end, apply for Graduate Route visa'],
      ],
    },
  ],
  related: [
    {
      tag: 'Destination',
      title: 'United States',
      desc: 'Longer degrees, more funding options and an F-1 visa interview.',
      meta: 'Guide',
      href: '/study-abroad/destinations/usa',
    },
    {
      tag: 'Destination',
      title: 'Canada',
      desc: 'Co-op programs and Post-Graduation Work Permits tied to degree length.',
      meta: 'Guide',
      href: '/study-abroad/destinations/canada',
    },
    {
      tag: 'Preparation',
      title: 'Visa interviews and documentation',
      desc: 'The Student visa interview process and what evidence you need from Bangladesh.',
      meta: 'Guide',
      href: '/study-abroad/visa',
    },
  ],
  faq: [
    {
      question: 'Do I need IELTS UKVI or can I use a regular IELTS?',
      answer:
        'The UK Student visa requires either IELTS UKVI (or an approved equivalent like TOEFL iBT or Duolingo). A regular IELTS certificate is not accepted for the visa, only for university admission. Book the UKVI version to avoid redoing it.',
    },
    {
      question: 'What counts as financial maintenance?',
      answer:
        'The UK calculates maintenance at roughly £1,025 per month for London, and £820 per month elsewhere. Your university will state the exact figure. The entire year (twelve months) must be demonstrated, even if your course is only nine or ten months.',
    },
    {
      question: 'Can I extend my student visa if I want to stay longer after my masters?',
      answer:
        'No, the Student visa expires when your course ends. After graduation, you move to the Graduate Route visa if you wish to remain and work in the UK. The Graduate Route is not extendable; after two years you must either find a skilled-worker sponsorship or leave.',
    },
  ],
};
