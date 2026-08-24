import type { GuideContent } from '../types';

export const preDeparture: GuideContent = {
  path: '/study-abroad/pre-departure',
  seo: {
    title: 'Before you leave: banking, accommodation, health and arrival essentials',
    description:
      'The practical checklist before you fly: opening a bank account abroad, booking accommodation, health insurance, packing essentials and navigating your first week.',
  },
  hero: {
    eyebrow: 'Practical guide',
    title: 'Four weeks before you leave.',
    intro:
      'Your visa is approved and your flight is booked. Now comes the logistics: banking, accommodation, health insurance, and airport procedures. Miss these and your first month is chaos. Get them right and you start on solid ground.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      {
        label: 'Explore accommodation',
        href: '/study-abroad/university-finder',
        variant: 'outline',
      },
    ],
    facts: [
      { label: 'Bank account', value: 'Open before arrival · keep Bangladesh account active' },
      {
        label: 'Accommodation',
        value: 'Book 6–8 weeks ahead · on-campus dorms vs private rentals',
      },
      {
        label: 'Health insurance',
        value: 'Mandatory · included in tuition or purchased separately',
      },
      {
        label: 'Currency',
        value: 'Carry USD 1,000–2,000 in cash · rest via bank transfer or card',
      },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'The paperwork and planning are done. Now is the time for the mundane: housing, money, insurance, and logistics. These details determine whether you arrive confused and panicked or calm and organised.',
    },
    { type: 'heading', text: 'Banking: the foundation' },
    {
      type: 'paragraph',
      text: 'Open a bank account in your destination country before or immediately upon arrival. You cannot live off cash; you will not survive long with a only Bangladesh card. Here is what you need to know by country:',
    },
    {
      type: 'list',
      items: [
        'USA: you need a Social Security Number (SSN) to open an account. Apply for an ITIN (Individual Taxpayer Identification Number) before you arrive via the IRS, or open a student account directly at your university or a local branch (Chase, Bank of America, Wells Fargo are large) using your passport and I-20.',
        'UK: high street banks (HSBC, Barclays, Nationwide) accept international students. Bring your passport, proof of address (university letter), and visa paperwork. Opening takes 10 minutes; the card arrives in 7–10 days.',
        'Canada: banks (Royal Bank, TD, Scotiabank) have student account packages. Proof of student status and passport is usually enough.',
        'Australia: all major banks accept international students with passport and proof of enrolment. CBA and ANZ are most common.',
      ],
    },
    {
      type: 'callout',
      title: 'Keep your Bangladesh account open',
      text: 'Do not close your account at your Bangladesh bank. You will need to receive occasional remittances from home, and keeping the relationship active simplifies future transfers. Set up arrangements with your parents or guarantor to make deposits before your visa begins.',
    },
    { type: 'heading', text: 'Accommodation: timing and choices' },
    {
      type: 'paragraph',
      text: 'Accommodation is tight in university towns. Late booking means bad options at inflated prices. Start looking 6–8 weeks before your arrival. Your choices are typically:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'University residence halls (on-campus dorms): cheaper (USD/GBP/CAD 400–800 per month), inclusive of utilities, and full of students. Demand is high; book immediately after your acceptance.',
        'Private student housing (managed by agencies): slightly more expensive, but often better quality and less bureaucracy. Companies like IQ, Nido and Unite operate in the UK; Unilodgers and similar in the US.',
        'Private rentals (via Rightmove, Zillow, Kijiji): cheapest in theory but most work. You will need to sign a lease, provide a guarantor (sometimes a bank guarantee), and manage utilities separately.',
        'Homestay: rare for postgraduate students but sometimes available. Usually arranged through the university.',
      ],
    },
    {
      type: 'paragraph',
      text: 'For your first year or first semester, on-campus or managed student housing is worth the premium. It reduces moving logistics and puts you near other students. Move to private rentals once you know the city.',
    },
    { type: 'heading', text: 'Health insurance and medical registration' },
    {
      type: 'paragraph',
      text: 'Health cover is non-negotiable. Many countries legally require it; all are sensible to have it.',
    },
    {
      type: 'list',
      items: [
        'USA: your university will require proof of health insurance. Enrol in the university plan (USD 800–2,000 per year) or provide proof of equivalent private coverage. Do not skip this; a hospital visit without insurance is financial ruin.',
        'UK: the NHS (National Health Service) is free to students once you are registered. Register at a GP (general practitioner) office near your accommodation within your first month. Bring your visa documents and proof of address.',
        'Canada and Australia: provincial and state health plans cover residents, but as a student you typically enrol in a university or private plan (included in tuition or purchased separately, CAD/AUD 800–1,500 per year).',
        'Europe: registered health systems exist but vary by country. Many universities require supplementary insurance; budget EUR 500–1,200 per year.',
      ],
    },
    { type: 'heading', text: 'Currency, credit cards and cash' },
    {
      type: 'paragraph',
      text: 'Carry some physical currency, but not all your money. A mix of cash and cards is safest:',
    },
    {
      type: 'list',
      items: [
        'Carry USD 1,000–2,000 in cash. Exchange this at a bank or ATM upon arrival.',
        'Open a bank account on day one and transfer funds from Bangladesh (this takes 2–5 business days).',
        'Use your Bangladesh credit card or debit card sparingly — foreign transaction fees apply (usually 2–3%).',
        'Once your local bank account and card are active, use that for all transactions.',
        'Keep your Bangladesh card as a backup for emergencies.',
      ],
    },
    { type: 'heading', text: 'Packing: essentials and what to buy on arrival' },
    {
      type: 'paragraph',
      text: 'You will be tempted to overpack. Resist. Most goods are cheaper and available where you are going. Here is what actually matters:',
    },
    {
      type: 'table',
      head: ['Category', 'Bring from Bangladesh', 'Buy on arrival'],
      rows: [
        [
          'Clothing',
          'Underwear, socks (6–8 pairs each), 1–2 warm layers',
          'Winter coat, jeans, everyday clothes (better local prices)',
        ],
        [
          'Documents',
          'Passport, copies of all documents, medical records',
          'Local driver license or ID (after arrival)',
        ],
        [
          'Electronics',
          'Phone (unlocked if possible), chargers, adapters',
          'Local SIM card, laptop (if you need one)',
        ],
        [
          'Toiletries',
          '3–4 weeks supply (deodorant, razors, special skincare)',
          'Toothpaste, shampoo, soap, common medicines',
        ],
        [
          'Medications',
          'All regular medications + 3-month supply',
          'Get prescriptions filled locally',
        ],
      ],
    },
    { type: 'heading', text: 'Airport day and arrival' },
    {
      type: 'paragraph',
      text: 'You have done the work. Now comes the practical reality of the journey.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Arrive at Dhaka International at least three hours before your flight (five hours for US destinations).',
        'Have your passport, visa approval letter (or digital copy), and boarding pass ready.',
        'Expect to declare any electronics or high-value items at customs (not strictly required, but useful if returning to Bangladesh with the same items).',
        'Once at your destination airport, collect luggage and proceed through immigration. Have your visa documentation, accommodation address, and contact details ready.',
        'Exit the airport and head to your accommodation. Most universities arrange airport pickups; check your student email for details.',
      ],
    },
    { type: 'heading', text: 'First-week admin and settling in' },
    {
      type: 'list',
      items: [
        'Register with local authorities or services as required (UK: GP registration; Canada: health services; Australia: TFN – Tax File Number).',
        'Visit your university student services and residential office. Confirm your housing, get campus access cards, and register for orientation.',
        'Open your local bank account on day two or three.',
        'Arrange your phone plan: local SIM card (cheapest) or international roaming (expensive, avoid long-term).',
        'Find a local supermarket and buy basics: toiletries, snacks, basic groceries.',
        'Attend all orientation events. They are time-consuming and sometimes cheesy, but they are where you meet people.',
      ],
    },
  ],
  related: [
    {
      tag: 'Preparation',
      title: 'Student visa interviews and documentation',
      desc: 'Before departure: getting your visa approved and preparing documents.',
      meta: 'Guide',
      href: '/study-abroad/visa',
    },
    {
      tag: 'Destination',
      title: 'Studying in the USA',
      desc: 'USA-specific advice: banking, health insurance and Social Security Numbers.',
      meta: 'Guide',
      href: '/study-abroad/destinations/usa',
    },
    {
      tag: 'Contact',
      title: 'Talk to a counselor',
      desc: 'Get personalised advice for your destination and circumstances.',
      meta: 'Link',
      href: '/contact',
    },
  ],
  faq: [
    {
      question: 'Should I open a bank account before I leave Bangladesh or after I arrive?',
      answer:
        'After you arrive is safer. You will have your accommodation address (required for most account openings), you can verify your visa and enrolment status in person, and you avoid the risk of scams. Plan to open your account in the first 48 hours of arrival.',
    },
    {
      question: 'What if I cannot access my Bangladesh account from abroad?',
      answer:
        'This is rare but possible if your bank’s online system does not work internationally. Before you leave, talk to your bank and set up mobile or online banking, and inform them you are moving abroad (some banks flag large international transfers as fraud). Test your access before you depart.',
    },
    {
      question: 'Do I need to buy travel insurance for my flight?',
      answer:
        'Travel insurance is not mandatory but is wise. Prices range from USD 20–80 for one-way flights. It covers cancellation, baggage loss, and emergency medical costs during travel. Many credit cards include travel insurance; check your card benefits before you buy separate coverage.',
    },
  ],
};
