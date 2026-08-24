import type { GuideContent } from '../types';

export const destinationUsa: GuideContent = {
  path: '/study-abroad/destinations/usa',
  seo: {
    title: 'Studying in the USA from Bangladesh — costs, tests, visas and timelines',
    description:
      'What it actually takes to study in the United States from Bangladesh: which tests you need, what a year costs, how funding works, and the F-1 visa interview.',
  },
  image: {
    src: '/images/destination-usa.jpg',
    alt: 'A red-brick collegiate building on a university lawn in the United States',
  },
  hero: {
    eyebrow: 'Destination guide',
    title: 'The United States, honestly costed.',
    intro:
      'The most popular destination for Bangladeshi students, and the most misunderstood. Here is the real timeline, the real cost, and where the money actually comes from.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Find universities', href: '/study-abroad/university-finder', variant: 'outline' },
    ],
    facts: [
      { label: 'Tests', value: 'SAT/ACT or GRE/GMAT · TOEFL/IELTS' },
      { label: 'Intakes', value: 'Fall (main) · Spring' },
      { label: 'Apply by', value: 'Nov–Jan for the following Fall' },
      { label: 'Visa', value: 'F-1, interviewed in Dhaka' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'The United States takes more Bangladeshi students than any other country, and it is also where the largest amount of money is left on the table. Most of that is not because students are underqualified — it is because they apply late, apply to the wrong tier of university, or never ask for the aid that was there.',
    },
    { type: 'heading', text: 'Which tests you need' },
    {
      type: 'paragraph',
      text: 'For undergraduate admission you need proof of English and, at most universities that still require it, an SAT or ACT score. Many US universities are now permanently test-optional — but "optional" is not "irrelevant" for an international applicant asking for money. A strong score is one of the few pieces of evidence a US admissions committee can read the same way for a student from Dhaka as for one from Denver.',
    },
    {
      type: 'list',
      items: [
        'Undergraduate: SAT or ACT, plus TOEFL, IELTS or the Duolingo English Test.',
        'Masters and PhD: GRE for most fields, GMAT for business, plus an English test.',
        'A handful of programmes waive the English test if your instruction was in English — ask, do not assume.',
      ],
    },
    { type: 'heading', text: 'What a year actually costs' },
    {
      type: 'paragraph',
      text: 'Sticker price and what students actually pay are two different numbers. Below is the realistic annual range before aid, in US dollars, including living costs.',
    },
    {
      type: 'table',
      head: ['Type of university', 'Tuition', 'Living', 'Total before aid'],
      rows: [
        ['Public, in a smaller city', '$12,000–$25,000', '$10,000–$14,000', '$22,000–$39,000'],
        ['Public, flagship', '$25,000–$40,000', '$12,000–$18,000', '$37,000–$58,000'],
        ['Private, mid-tier', '$35,000–$50,000', '$14,000–$20,000', '$49,000–$70,000'],
        ['Private, highly selective', '$55,000–$65,000', '$18,000–$24,000', '$73,000–$89,000'],
      ],
    },
    {
      type: 'callout',
      title: 'The counter-intuitive part',
      text: 'The most expensive universities are often the cheapest to attend. A handful of highly selective private universities meet full demonstrated need for international students, which can mean paying less than at a mid-tier public university. The catch is that admission rates are in the single digits.',
    },
    { type: 'heading', text: 'Where the money comes from' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Need-based aid, at the small number of universities that offer it to international students at all.',
        'Merit scholarships, which are common at public flagships and mid-tier privates and are usually awarded automatically from your application.',
        'Graduate assistantships — a stipend plus a tuition waiver in exchange for teaching or research. This is how most Bangladeshi MS and PhD students actually fund the degree.',
        'On-campus employment, capped at 20 hours a week during term. Useful for living costs, never enough for tuition.',
      ],
    },
    { type: 'heading', text: 'The timeline that works' },
    {
      type: 'paragraph',
      text: 'Counting backwards from a Fall intake, the application is due between November and January. That means test dates need to be behind you by October, which means preparation starts in the summer — roughly fifteen months before you fly.',
    },
    {
      type: 'table',
      head: ['When', 'What happens'],
      rows: [
        ['Mar–Jun (year before)', 'Diagnostic, choose SAT/ACT or GRE/GMAT, begin preparation'],
        ['Jul–Oct', 'Sit the admissions test; sit TOEFL or IELTS; build the shortlist'],
        ['Oct–Dec', 'Essays, recommendations, financial documents'],
        ['Nov–Jan', 'Submit applications and aid forms'],
        ['Feb–Apr', 'Decisions and aid packages arrive'],
        ['Apr–Jun', 'Accept, receive the I-20, pay SEVIS, book the visa interview'],
        ['Jun–Aug', 'F-1 interview in Dhaka, then departure'],
      ],
    },
    { type: 'heading', text: 'The F-1 visa interview' },
    {
      type: 'paragraph',
      text: 'The interview at the US Embassy in Dhaka is short — often under three minutes — and turns on two questions: can you pay for this, and do you intend to return. Have your I-20, your funding evidence and a clear, unrehearsed answer about why this programme at this university. Over-preparation reads as coached, which does not help.',
    },
    {
      type: 'callout',
      title: 'A word on agents',
      text: 'Nobody can guarantee you a visa, and nobody legitimate charges you for a "guaranteed" admission. If someone offers either, walk away.',
    },
  ],
  related: [
    {
      tag: 'Destination',
      title: 'United Kingdom',
      desc: 'One-year masters, September intakes and a two-year graduate route.',
      meta: 'Guide',
      href: '/study-abroad/destinations/uk',
    },
    {
      tag: 'Destination',
      title: 'Canada',
      desc: 'Co-op degrees, a clear work-permit path and lower total cost than the US.',
      meta: 'Guide',
      href: '/study-abroad/destinations/canada',
    },
    {
      tag: 'Funding',
      title: 'Scholarships & funding',
      desc: 'Where the money is, who actually gets it, and when to ask.',
      meta: 'Guide',
      href: '/study-abroad/scholarships',
    },
  ],
  faq: [
    {
      question: 'Is test-optional really optional for Bangladeshi applicants?',
      answer:
        'Technically yes, practically not quite. Without a score, an admissions officer has fewer comparable signals from an unfamiliar school system — and merit scholarships at many universities are still keyed to test scores. If you can produce a strong score, produce it.',
    },
    {
      question: 'How much bank balance do I need to show?',
      answer:
        'Enough to cover the first year as stated on your I-20 — tuition plus living costs, minus any scholarship. The funds must be documented and available, not merely promised.',
    },
    {
      question: 'Can I work while studying?',
      answer:
        'On an F-1 you may work on campus up to 20 hours a week during term and full time in holidays. Off-campus work requires authorisation. Plan your budget as if the income is zero.',
    },
  ],
};
