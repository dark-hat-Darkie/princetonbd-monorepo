import type { GuideContent } from '../types';

export const destinationAustralia: GuideContent = {
  path: '/study-abroad/destinations/australia',
  seo: {
    title: 'Studying in Australia from Bangladesh — visas, intakes and costs',
    description:
      'Australia for Bangladeshi students: Temporary Graduate visa, Genuine Student assessment, February and July intakes, and realistic costs including living standards.',
  },
  image: {
    src: '/images/destination-australia.jpg',
    alt: 'Sydney Harbour at sunset, with the Opera House and Harbour Bridge',
  },
  hero: {
    eyebrow: 'Destination guide',
    title: 'Australia, with its eyes open.',
    intro:
      'A popular choice because the weather is warm and English is universal — but also because the Temporary Graduate visa gives you work experience options. Here is what the visa actually covers, what a year costs, and which intakes are available.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Find universities', href: '/study-abroad/university-finder', variant: 'outline' },
    ],
    facts: [
      { label: 'Intakes', value: 'February (main) · July (some)' },
      { label: 'Visa type', value: 'Temporary Graduate (subclass 485)' },
      { label: 'Apply by', value: 'Aug–Oct for Feb, Feb–Apr for July' },
      { label: 'Key test', value: 'IELTS · 6.0+ typical for most fields' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'Australia’s student visa system is straightforward, and the Temporary Graduate visa that you become eligible for after graduation gives you two to five years to work and gain experience. However, do not assume Australia is cheaper than the UK or Canada — it is not. Factor in the strength of the Australian dollar and the cost of living, especially in Melbourne and Sydney.',
    },
    { type: 'heading', text: 'The Genuine Student requirement' },
    {
      type: 'paragraph',
      text: 'Australian immigration replaced the "Genuine Temporary Entrant" test with the "Genuine Student" assessment in 2021. This means the Department of Home Affairs looks closely at why you are coming, whether you can afford it, and whether you intend to comply with your visa conditions.',
    },
    {
      type: 'list',
      items: [
        'You must show genuine intent to study, not merely work or settle.',
        "Your financial capacity must be demonstrated: bank statements, sponsors' income declarations or evidence of scholarship.",
        'Your chosen field should align with your academic background. A sudden pivot to a very different discipline can trigger scrutiny.',
        'English-language proficiency is assessed; IELTS 6.0 overall (no band below 5.5) is typical.',
      ],
    },
    { type: 'heading', text: 'Tuition and cost of living' },
    {
      type: 'paragraph',
      text: 'Australian international student fees are set per institution and field. Below are realistic annual ranges in Australian dollars.',
    },
    {
      type: 'table',
      head: ['Field', 'Annual tuition', 'Living costs', 'Total annual'],
      rows: [
        ['Engineering or IT', 'AUD 30,000–$42,000', 'AUD 18,000–$26,000', 'AUD 48,000–$68,000'],
        [
          'Business or Accounting',
          'AUD 24,000–$36,000',
          'AUD 17,000–$25,000',
          'AUD 41,000–$61,000',
        ],
        [
          'Arts, Education or Science',
          'AUD 18,000–$28,000',
          'AUD 16,000–$24,000',
          'AUD 34,000–$52,000',
        ],
      ],
    },
    {
      type: 'callout',
      title: 'Sydney and Melbourne are not the norm',
      text: 'Major cities push living costs to AUD 25,000+ per year. Brisbane, Perth and Adelaide are 20–30% cheaper. Similarly, regional universities often have lower tuition but may have fewer job opportunities post-graduation.',
    },
    { type: 'heading', text: 'The student visa (subclass 500)' },
    {
      type: 'paragraph',
      text: 'The standard student visa for Australia is subclass 500. To obtain it:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Receive an unconditional Confirmation of Enrolment (CoE) from your university. This confirms your place and the tuition paid or payable.',
        'Show evidence of financial capacity: typically the full cost of tuition plus living costs for the duration of your course. This must be in your name, a parent’s name, or in a sponsor account.',
        'Provide proof of English: IELTS (minimum 6.0 overall, no band below 5.5), TOEFL iBT (60+), or equivalent.',
        'Submit your visa application online; processing typically takes 1–4 weeks.',
      ],
    },
    { type: 'heading', text: 'Work and the Temporary Graduate visa' },
    {
      type: 'paragraph',
      text: 'On your student visa, you may work up to twenty hours per week during teaching periods and full time during scheduled holidays. This income helps cover living costs but is not reliable for tuition.',
    },
    {
      type: 'paragraph',
      text: 'Upon graduation, if you meet certain conditions (usually relating to your field and the university’s accreditation), you become eligible for a Temporary Graduate visa (subclass 485). This visa:',
    },
    {
      type: 'list',
      items: [
        'Lasts from two to five years, depending on your field of study and qualification level.',
        'Allows full-time work with no sector restrictions — you need not stay in your field of study.',
        'Requires you to demonstrate ongoing financial capacity and English language ability.',
        'Must be applied for within six months of completing your qualification.',
      ],
    },
    { type: 'heading', text: 'Application timeline and intakes' },
    {
      type: 'table',
      head: ['When', 'What happens'],
      rows: [
        ['May–Aug (for Feb intake)', 'Research universities; sit IELTS; submit applications'],
        ['Aug–Nov', 'Receive conditional offers; apply for CoE once admission is final'],
        ['Nov–Jan', 'Receive CoE; gather financial and English documentation'],
        ['Dec–Feb', 'Submit student visa application'],
        ['Feb–Mar', 'Visa approval; book flights'],
        ['Feb–Jun', 'First semester; register with student services'],
        ['Jun–Aug', 'Prepare to apply for Temporary Graduate visa in your final month of study'],
      ],
    },
  ],
  related: [
    {
      tag: 'Destination',
      title: 'United Kingdom',
      desc: 'One-year masters, Graduate Route work visa and lower total costs.',
      meta: 'Guide',
      href: '/study-abroad/destinations/uk',
    },
    {
      tag: 'Funding',
      title: 'Scholarships & funding',
      desc: 'Where money is available and which Bangladeshi students are most likely to win.',
      meta: 'Guide',
      href: '/study-abroad/scholarships',
    },
    {
      tag: 'Preparation',
      title: 'Before you go: banking, accommodation and essentials',
      desc: 'Setting up an Australian bank account, arranging health cover and arriving prepared.',
      meta: 'Guide',
      href: '/study-abroad/pre-departure',
    },
  ],
  faq: [
    {
      question: 'What is a Confirmation of Enrolment and how do I get it?',
      answer:
        'A CoE is issued by your university once you have an unconditional offer and have paid the deposit (typically 20–50% of the first year’s tuition). The university then sends you the CoE, which you attach to your student visa application. This link from the university to the immigration department is what makes the Australian system straightforward — there is no separate credential to obtain.',
    },
    {
      question: 'Do I need IELTS UKVI or any special variant?',
      answer:
        'No. Australian immigration accepts IELTS (Academic), TOEFL iBT, or several other approved tests. You do not need a UKVI variant. Ensure your test result is dated within two years of your visa application and meets the minimum band scores.',
    },
    {
      question: 'How long after graduation can I apply for the Temporary Graduate visa?',
      answer:
        'You must apply within six months of completing your course. In practice, most students apply toward the end of their final semester so the visa is approved shortly after graduation. If you miss the six-month window, you will need to leave Australia and apply from offshore, which is more complicated.',
    },
  ],
};
