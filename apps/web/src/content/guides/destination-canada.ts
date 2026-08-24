import type { GuideContent } from '../types';

export const destinationCanada: GuideContent = {
  path: '/study-abroad/destinations/canada',
  seo: {
    title: 'Studying in Canada from Bangladesh — co-op, work permits and costs',
    description:
      'Canada for Bangladeshi students: co-op degrees, Post-Graduation Work Permits, study-permit requirements, and realistic tuition and living costs.',
  },
  image: {
    src: '/images/destination-canada.jpg',
    alt: 'Autumn light on a historic Canadian university building',
  },
  hero: {
    eyebrow: 'Destination guide',
    title: 'Canada, co-op and clear pathways.',
    intro:
      'Lower tuition than the USA, a work-permit route that is not capped, and universities that market themselves on paid internships. Here is how the visa works, what you will spend, and what the co-op advantage actually is.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Find universities', href: '/study-abroad/university-finder', variant: 'outline' },
    ],
    facts: [
      { label: 'Intakes', value: 'September · January · May' },
      { label: 'Work permit', value: 'Post-Graduation Work Permit · 1–3 years' },
      { label: 'Apply by', value: 'Oct–Jan for following September' },
      { label: 'Tests', value: 'No standardised tests (most universities)' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'Canada is often overlooked by Bangladeshi students, which is a mistake. Tuition is predictable, English-language instruction is universal, and the work-permit system is straightforward: your Post-Graduation Work Permit lasts as long as your programme. For a three-year engineering degree, you get a three-year work permit.',
    },
    { type: 'heading', text: 'Co-op: paid internships, not extras' },
    {
      type: 'paragraph',
      text: 'Many Canadian universities, particularly in engineering, technology and commerce, build co-op into the degree structure. You alternate between semesters of study and semesters of paid work — often at leading tech and financial firms.',
    },
    {
      type: 'list',
      items: [
        'A four-year degree with co-op may be four years of study plus four four-month co-op terms.',
        'Co-op terms are paid at competitive rates; employers include Microsoft, Google, RBC and Shopify.',
        'This pattern extends your time in Canada but provides income and work experience.',
        'Your Post-Graduation Work Permit reflects your total study period; co-op terms do not extend it.',
      ],
    },
    { type: 'heading', text: 'Tuition and living costs' },
    {
      type: 'paragraph',
      text: 'Canadian international student fees are set by province and institution. Below is the realistic annual range in Canadian dollars, including living costs.',
    },
    {
      type: 'table',
      head: ['Programme type', 'Annual tuition', 'Living costs', 'Total annual'],
      rows: [
        [
          'Engineering or Computer Science',
          'CAD 22,000–$35,000',
          'CAD 14,000–$18,000',
          'CAD 36,000–$53,000',
        ],
        ['Business or Commerce', 'CAD 18,000–$28,000', 'CAD 13,000–$17,000', 'CAD 31,000–$45,000'],
        ['Arts or Sciences', 'CAD 12,000–$20,000', 'CAD 12,000–$16,000', 'CAD 24,000–$36,000'],
      ],
    },
    {
      type: 'callout',
      title: 'Provincial variation matters',
      text: 'Ontario universities are often more expensive than those in Alberta or Saskatchewan. Research your specific programme and province; tuition can vary by 30–40% across the country.',
    },
    { type: 'heading', text: 'The study permit and financial requirements' },
    {
      type: 'paragraph',
      text: 'To get a Canadian study permit, you must satisfy IRCC (Immigration, Refugees and Citizenship Canada) that you can afford to study and support yourself.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Receive an acceptance letter from a Designated Learning Institution (DLI). Most Canadian universities are DLIs.',
        'Show proof of funds covering tuition and living costs for your first year. Some provinces require a Guaranteed Investment Certificate (GIC) or proof of funds held in a Canadian bank.',
        'Provide a Provincial Attestation Letter (PAL) if studying in Ontario, British Columbia or Quebec. This letter confirms IRCC has assessed your financial capacity.',
        'Provide proof of English or French language ability (TOEFL, IELTS, CAEL, TEF or CLB, depending on the university).',
        'Submit your study permit application (online or by mail); processing takes 2–8 weeks.',
      ],
    },
    { type: 'heading', text: 'Work during and after studies' },
    {
      type: 'paragraph',
      text: 'On your study permit, you may work on campus up to twenty hours a week during term and full time during scheduled holidays. Off-campus work requires an off-campus work permit, which most students apply for alongside their study permit (no separate fee).',
    },
    {
      type: 'paragraph',
      text: 'Upon graduation, you are eligible for a Post-Graduation Work Permit (PGWP). The length depends on the duration of your studied programme: a two-year degree = two-year PGWP, a four-year degree = four-year PGWP. There is no job-offer requirement and no salary cap.',
    },
    { type: 'heading', text: 'The application timeline' },
    {
      type: 'table',
      head: ['When', 'What happens'],
      rows: [
        [
          'Aug–Oct (year before)',
          'Research programmes and universities; sit language test if required',
        ],
        ['Oct–Dec', 'Submit applications directly to universities'],
        ['Dec–Mar', 'Receive acceptances; choose programme and pay deposit'],
        [
          'Mar–Apr',
          'Receive Letter of Acceptance; gather financial documents; request PAL if applicable',
        ],
        ['Apr–Jun', 'Submit study permit application with all required documents'],
        ['Jun–Aug', 'Study permit approval; book flights'],
        ['Sep onwards', 'Arrive and begin studies; co-op terms interspersed as scheduled'],
      ],
    },
  ],
  related: [
    {
      tag: 'Destination',
      title: 'United States',
      desc: 'Longer degrees, more funding options, but F-1 visa interviews and higher cost.',
      meta: 'Guide',
      href: '/study-abroad/destinations/usa',
    },
    {
      tag: 'Destination',
      title: 'United Kingdom',
      desc: 'One-year masters, Graduate Route and shorter total investment.',
      meta: 'Guide',
      href: '/study-abroad/destinations/uk',
    },
    {
      tag: 'Preparation',
      title: 'Before you go: banking, visas and first-week essentials',
      desc: 'Opening a Canadian bank account, health insurance and settling into your first weeks.',
      meta: 'Guide',
      href: '/study-abroad/pre-departure',
    },
  ],
  faq: [
    {
      question: 'What is a Guaranteed Investment Certificate and do I need one?',
      answer:
        'A GIC is a deposit held in a Canadian bank for a fixed term, often required for study-permit approval in some provinces. It demonstrates financial capacity. Not all provinces require one, but if your chosen programme is in a province that does, your bank can arrange this for roughly 1–3% of the deposit amount. You regain access to the funds once your studies end.',
    },
    {
      question: 'Can I apply to study in Canada without TOEFL or IELTS?',
      answer:
        'Most Canadian universities accept IELTS or TOEFL and require either of these or a proof of English-medium education (secondary school diploma from an English-speaking country). If your schooling was in Bangladesh, you will likely need to sit the test. Check your programme requirements; some accept equivalent qualifications.',
    },
    {
      question: 'How do I apply for the Post-Graduation Work Permit?',
      answer:
        'Your university will advise you on the timing, but generally you apply for it after you have completed your programme (or early in your final term). You submit an online application to IRCC along with your diploma or transcript. Processing takes 4–8 weeks. Apply well before your study permit expires to ensure continuity.',
    },
  ],
};
