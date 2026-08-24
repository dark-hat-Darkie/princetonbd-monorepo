import type { GuideContent } from '../types';

export const majorsAndCareers: GuideContent = {
  path: '/resources/majors-and-careers',
  seo: {
    title: 'Choosing a major and field of study abroad — career returns and Bangladeshi pathways',
    description:
      'How to choose a field of study that offers good career outcomes, visa sponsorship prospects, and return on investment. Which fields Bangladeshi students commonly pursue and why.',
  },
  hero: {
    eyebrow: 'Career guidance',
    title: 'What to study and why it matters.',
    intro:
      'The cost of study abroad is high. Choosing the wrong field means four years of debt with poor job prospects. Here is how to pick a major based on outcomes, not just interest, and which fields open doors for Bangladeshi graduates.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Explore career paths', href: '/admissions/financial-aid', variant: 'outline' },
    ],
    facts: [
      { label: 'Fields with ROI', value: 'Engineering · CS · Accounting · MBA' },
      { label: 'Visa sponsorship ease', value: 'High demand: CS, engineering, accounting' },
      { label: 'Bangladeshi pathways', value: 'IT, banking, consulting most common returns' },
      { label: 'Expected outcomes', value: 'Work visa · employment within 6 months post-grad' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'Choosing a major is the highest-stakes decision you will make as a student, because it determines not only what you study but where you can work, how much you earn, and how easily you can secure a work visa post-graduation. Interest matters, but so does feasibility. If you love philosophy but need to earn a living in the USA, studying philosophy is a poor choice — unless you have family money backing you.',
    },
    { type: 'heading', text: 'The ROI question: cost in, outcome out' },
    {
      type: 'paragraph',
      text: 'Return on investment is blunt but useful. Below are fields ranked by typical outcomes for Bangladeshi graduates studying abroad.',
    },
    {
      type: 'table',
      head: [
        'Field',
        'Typical cost (USD)',
        'Entry salary',
        'Visa sponsorship likelihood',
        'Typical employer',
      ],
      rows: [
        [
          'Computer Science / Software Engineering',
          '$80,000–120,000',
          'USD 90,000–130,000',
          'Very high',
          'Google, Microsoft, Amazon',
        ],
        [
          'Data Science / Analytics',
          '$80,000–110,000',
          'USD 85,000–120,000',
          'High',
          'Tech firms, consulting, finance',
        ],
        [
          'Electrical Engineering',
          '$100,000–140,000',
          'USD 85,000–110,000',
          'High',
          'Semiconductors, aerospace, telecom',
        ],
        [
          'Accounting / CPA pathway',
          '$60,000–100,000',
          'USD 70,000–90,000',
          'High',
          'Big Four (Deloitte, EY, PwC, KPMG)',
        ],
        [
          'Business / MBA',
          '$80,000–200,000',
          'USD 95,000–200,000+',
          'High (MBA)',
          'Consulting, finance, tech',
        ],
        [
          'Finance / Economics',
          '$70,000–110,000',
          'USD 75,000–110,000',
          'Moderate–high',
          'Banking, hedge funds, consulting',
        ],
        [
          'Civil / Mechanical Engineering',
          '$90,000–130,000',
          'USD 70,000–95,000',
          'Moderate',
          'Construction, automotive, industrial',
        ],
        [
          'Nursing',
          '$60,000–100,000',
          'USD 65,000–85,000',
          'Very high',
          'Hospitals, healthcare systems (US only)',
        ],
        [
          'Biology / Life Sciences (undergrad)',
          '$70,000–110,000',
          'USD 45,000–65,000 (no grad degree)',
          'Low',
          'Depends on graduate school',
        ],
        [
          'Humanities (undergrad)',
          '$70,000–120,000',
          'USD 40,000–55,000',
          'Low',
          'Depends on graduate school',
        ],
      ],
    },
    {
      type: 'callout',
      title: 'Salary is not the only outcome',
      text: 'Starting salary matters for repaying debt, but visa sponsorship matters more for staying in your chosen country. A field with low starting salary but high sponsorship likelihood (like nursing) may be better ROI than high-salary but low-sponsorship field.',
    },
    { type: 'heading', text: 'Fields with high visa sponsorship potential' },
    {
      type: 'paragraph',
      text: 'If you want to work in the USA, UK or Canada post-graduation, certain fields make this vastly easier because employers actively sponsor visas.',
    },
    {
      type: 'list',
      items: [
        'Computer Science / Software Engineering: massive demand, starting salaries USD 90,000+, visa sponsorship is routine.',
        'Data Science: newer field, but equally sponsored and well-paid.',
        'Accountancy: the Big Four actively recruit internationally and sponsor work visas.',
        'Nursing (USA): chronic shortage; visas are sponsored quickly and eagerly.',
        'Petroleum / Chemical Engineering: industry-specific sponsorship.',
        'MBA: many employers sponsor for MBA graduates, particularly in consulting and finance.',
      ],
    },
    { type: 'heading', text: 'What Bangladeshi students commonly study abroad' },
    {
      type: 'paragraph',
      text: 'Looking at actual Bangladeshi student enrolments abroad tells you something: these fields have proven outcomes and employer networks.',
    },
    {
      type: 'list',
      items: [
        'Computer Science / IT: by far the largest group. Returns are high, and the Bangladeshi diaspora in tech is deep.',
        'Business / Commerce: second-largest; MBA is common for mid-career professionals.',
        'Engineering (all types): strong pathway to work visas and good salaries.',
        'Accounting: growing, especially students pursuing CPA or chartered accountant credentials.',
        'Medicine / Nursing: smaller numbers, but highly successful outcomes in the USA.',
        'Law: smaller number, and requires local bar exams, which is a barrier.',
      ],
    },
    { type: 'heading', text: 'The career trajectory for Bangladeshi graduates' },
    {
      type: 'paragraph',
      text: 'A typical path for a Bangladeshi CS graduate looks like this:',
    },
    {
      type: 'table',
      head: ['Timeline', 'Action', 'Location'],
      rows: [
        [
          'Year 1–3 (abroad)',
          'Complete degree; network heavily; intern (if possible)',
          'USA, UK, or Canada',
        ],
        [
          'Last semester',
          'Secure job offer from international company',
          'Employer sponsors work visa',
        ],
        [
          'Year 3–5 (abroad)',
          'Work for multinational or tech company; gain experience',
          'USA, UK, or Canada',
        ],
        ['Year 5+', 'Option A: pursue permanent residency or citizenship', 'Abroad'],
        [
          'Year 5+',
          'Option B: return to Bangladesh at senior level with international experience',
          'Bangladesh',
        ],
      ],
    },
    { type: 'heading', text: 'Choosing a field: practical steps' },
    {
      type: 'paragraph',
      text: 'Here is how to make the choice:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'List three to five fields that interest you. If nothing interests you, start with broad areas (technology, business, healthcare).',
        'For each field, research: typical entry salary in your target country, visa sponsorship frequency, and Bangladeshi alumni working in that field.',
        'Check if the field requires additional credentials (CPA for accounting, IELTS UKVI for UK visa, etc.). Factor these costs and timelines in.',
        'Interview two to three Bangladeshi professionals working in each field. Ask them: was the visa easy to get? Would you do it again? What surprised you?',
        'If you are between two fields, choose the one with better visa sponsorship prospects. Career interest matters less than career feasibility when you are financing a degree yourself.',
      ],
    },
    { type: 'heading', text: 'The major you choose may not be the career you have' },
    {
      type: 'paragraph',
      text: 'A computer science degree opens doors in tech, finance, consulting, and even government. A business degree is portable across industries. Humanities degrees close doors. If you are unsure, choose a field that is broad and marketable.',
    },
    {
      type: 'list',
      items: [
        'Technical fields (CS, engineering, accounting) open doors. You can move into business or other roles with that foundation.',
        'Pure business degrees (commerce, management) are more specific. Employers expect you to understand the field.',
        'Humanities (English, history, philosophy) require extraordinary academic performance or graduate school to compete for professional roles.',
      ],
    },
  ],
  related: [
    {
      tag: 'Planning',
      title: 'University rankings and how to read them',
      desc: 'Finding universities strong in your field, not just prestigious overall.',
      meta: 'Guide',
      href: '/resources/rankings-guides',
    },
    {
      tag: 'Funding',
      title: 'Scholarships and financial aid',
      desc: 'Understanding ROI and affordability across fields and destinations.',
      meta: 'Guide',
      href: '/admissions/financial-aid',
    },
    {
      tag: 'Contact',
      title: 'Talk to a counselor',
      desc: 'Discuss your goals and get personalized major and career advice.',
      meta: 'Link',
      href: '/contact',
    },
  ],
  faq: [
    {
      question: 'Is it worth studying engineering if I do not love the subject?',
      answer:
        'If you are funding your own degree, yes. Engineering offers the highest ROI, the easiest visa sponsorship, and the clearest career path. If your family can fund any field you choose, then study what you love. But if cost matters, engineering is a safe bet.',
    },
    {
      question: 'Should I choose a university based on programme rank or overall university rank?',
      answer:
        'Programme rank first. A top-ranked CS programme at a mid-tier university is better for your career than an average CS programme at a highly ranked university. Employers care about your degree specialisation and where you gained skills, not the university’s overall prestige.',
    },
    {
      question:
        'Will studying in a less-expensive country (Europe) limit my career options compared to studying in the USA?',
      answer:
        'For technical fields (CS, engineering), no. Employers sponsor based on skills, not university location. For business and consulting, US degrees have a prestige premium, but it is not insurmountable if you excel. Choose based on cost and programme quality first, prestige second.',
    },
  ],
};
