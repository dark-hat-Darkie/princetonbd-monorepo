import type { GuideContent } from '../types';

export const destinationEurope: GuideContent = {
  path: '/study-abroad/destinations/europe',
  seo: {
    title: 'Studying in Europe from Bangladesh — low-cost masters, visas and student life',
    description:
      'Europe for Bangladeshi students: Germany, Netherlands, Italy and Belgium. Low tuition, English-taught masters, Schengen student visas and the reality of working while studying.',
  },
  image: {
    src: '/images/destination-europe.jpg',
    alt: 'A sandstone European university building seen across its lawn',
  },
  hero: {
    eyebrow: 'Destination guide',
    title: 'Europe, the underrated path.',
    intro:
      'The most affordable option for postgraduate study and often overlooked because it requires navigating different visa regimes by country. Here is what each major destination costs, how visas work, and what the trade-offs are.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Find universities', href: '/study-abroad/university-finder', variant: 'outline' },
    ],
    facts: [
      { label: 'Tuition range', value: 'EUR 0–8,000 annually (Germany · Netherlands)' },
      { label: 'Visa type', value: 'Schengen Student visa (country-specific)' },
      { label: 'Intakes', value: 'September (most) · February or March (some)' },
      { label: 'Key test', value: 'IELTS/TOEFL (for English-taught); German test (Germany)' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'Europe is the least expensive place to do a masters or diploma, because several countries (especially Germany and parts of the Netherlands) charge little to no tuition. The trade-offs are straightforward: you must navigate Schengen visa rules, which differ from country to country, and you will need to learn at least basic German or Dutch. But if cost is a constraint, nowhere else comes close.',
    },
    { type: 'heading', text: 'Germany: tuition-free public universities' },
    {
      type: 'paragraph',
      text: 'Most public universities in Germany charge no tuition for international students at the postgraduate level. This applies in Baden-Württemberg, Bavaria, Berlin, North Rhine-Westphalia and most other states. Masters degrees last one to two years.',
    },
    {
      type: 'list',
      items: [
        'Tuition is free or EUR 1,500–3,500 per semester (varies by state and programme).',
        'Living costs in Berlin or Munich run EUR 900–1,400 per month.',
        'Many programmes are taught in English, especially at larger research universities.',
        'Language requirement: many programmes require German language certificate (usually B2 level) at application. English-taught options exist but are fewer.',
        'Student visa: German national visa for students, processed by the German embassy in Dhaka.',
      ],
    },
    { type: 'heading', text: 'The Netherlands: modest fees, many English programmes' },
    {
      type: 'paragraph',
      text: 'Dutch universities charge international students a set amount per year, lower than UK or Australia, and the vast majority of postgraduate programmes are taught in English.',
    },
    {
      type: 'list',
      items: [
        'Tuition: typically EUR 5,000–12,000 per year.',
        'Living costs: EUR 1,000–1,500 per month in Amsterdam or Utrecht; EUR 800–1,200 outside major cities.',
        'Visa: D visa for study, processed through Dutch migration services.',
        'Most programmes are taught in English; no language requirement beyond English proficiency.',
        'Work: permitted up to twenty-six hours per week (or fifty-six hours during June, July, August).',
      ],
    },
    { type: 'heading', text: 'Italy: income-assessed fees' },
    {
      type: 'paragraph',
      text: 'Italian universities charge fees on a sliding scale based on family income. For international students from outside the EU, fees are usually EUR 1,000–4,000 per year, but programmes taught entirely in English are rare.',
    },
    {
      type: 'list',
      items: [
        'Tuition: EUR 1,000–4,000 per year depending on means and programme.',
        'Living costs: EUR 700–1,100 per month outside major cities.',
        'Language: many Italian-taught programmes exist, but English-taught options are limited. Italian language level A2–B1 is typically needed.',
        'Student visa: issued for one year, renewable upon proof of continued enrolment.',
      ],
    },
    { type: 'heading', text: 'Belgium: affordable and accessible' },
    {
      type: 'paragraph',
      text: 'Belgium sits between Germany’s free model and Western Europe’s higher costs. Tuition is moderate, and Flanders (Dutch-speaking Belgium) has many English-taught programmes.',
    },
    {
      type: 'list',
      items: [
        'Tuition: EUR 2,000–6,000 per year for international postgraduate students.',
        'Living costs: EUR 1,000–1,400 per month in Brussels and Antwerp.',
        'Language: Flanders universities offer English-taught postgraduate degrees; French Wallonia universities are more likely to require French.',
        'Student visa: residence permit issued by local authorities; no separate visa interview required.',
      ],
    },
    { type: 'heading', text: 'Cost comparison across Europe' },
    {
      type: 'table',
      head: ['Country', 'Annual tuition', 'Living costs', 'Total annual'],
      rows: [
        ['Germany (public)', 'EUR 0–3,500', 'EUR 10,800–16,800', 'EUR 10,800–20,300'],
        ['Netherlands', 'EUR 5,000–12,000', 'EUR 10,000–18,000', 'EUR 15,000–30,000'],
        ['Belgium', 'EUR 2,000–6,000', 'EUR 10,000–16,000', 'EUR 12,000–22,000'],
        ['Italy', 'EUR 1,000–4,000', 'EUR 8,000–13,000', 'EUR 9,000–17,000'],
      ],
    },
    {
      type: 'callout',
      title: 'The language barrier is real',
      text: 'Germany and Italy will require language learning. You can do a lot of an undergraduate degree in English in Germany, but masters programmes often assume higher language ability. Plan 3–6 months of language study before applying if you have not studied German or Italian before.',
    },
    { type: 'heading', text: 'Schengen student visa process' },
    {
      type: 'paragraph',
      text: 'The European student visa process differs by country, but the general steps are:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Receive acceptance letter from your university.',
        'Show proof of financial capacity: bank statements or sponsor declarations showing enough funds for one year of tuition and living costs.',
        'Sit language test (IELTS/TOEFL for English-taught, or German/Dutch/Italian certificate for local-language programmes).',
        'Apply for visa at the relevant embassy in Dhaka (e.g., German Embassy, Dutch Embassy).',
        'Visa is usually issued for one year and renewable upon proof of continued studies.',
      ],
    },
    { type: 'heading', text: 'Work during studies' },
    {
      type: 'paragraph',
      text: 'Student work allowances vary sharply by country. Germany and the Netherlands permit up to twenty hours per week; Italy is more restrictive. Plan your finances as if you will not earn during term time. Summer and holiday income, if available, is a bonus.',
    },
  ],
  related: [
    {
      tag: 'Destination',
      title: 'United Kingdom',
      desc: 'One-year masters, clearer post-study work options and higher cost.',
      meta: 'Guide',
      href: '/study-abroad/destinations/uk',
    },
    {
      tag: 'Funding',
      title: 'Scholarships & external funding',
      desc: 'Erasmus Mundus scholarships and other funding sources for European study.',
      meta: 'Guide',
      href: '/study-abroad/scholarships',
    },
    {
      tag: 'Preparation',
      title: 'Before you go: visa interviews, banking and arrival',
      desc: 'What to expect at your visa interview and how to prepare financially for your first month.',
      meta: 'Guide',
      href: '/study-abroad/pre-departure',
    },
  ],
  faq: [
    {
      question: 'Do I need to speak German to study in Germany?',
      answer:
        'Not for all programmes. Many research universities offer English-taught masters degrees. However, many programmes (particularly in humanities and business) are taught in German and require a German language certificate (usually B2) at entry. Research your specific programme carefully before you apply. If you want to work in Germany after graduation, German language skills are valuable even if your degree was taught in English.',
    },
    {
      question:
        'How does the Schengen visa work if I want to study in one country but travel to others?',
      answer:
        'The Schengen student visa issued by one country (say, the Netherlands) allows you to travel and study within the Schengen area. However, you must be registered as a student in your primary country of study, and your visa is tied to that university. If you move to a different country or university during your studies, you may need to apply for a new visa.',
    },
    {
      question: 'What happens to my visa after I graduate in Europe?',
      answer:
        'Most Schengen student visas expire when your course ends. Unlike the UK or Canada, there is no automatic transition to a work visa. You must either find an employer willing to sponsor you (which requires finding a job and going through a work-visa process) or leave the Schengen area. Some countries offer short grace periods; check your specific country’s rules.',
    },
  ],
};
