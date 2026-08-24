import type { GuideContent } from '../types';

export const scholarships: GuideContent = {
  path: '/study-abroad/scholarships',
  seo: {
    title: 'Scholarships for Bangladeshi students — realistic funding for study abroad',
    description:
      'Where Bangladeshi students actually get funding: merit scholarships, graduate assistantships, Fulbright, Chevening, Erasmus Mundus and Commonwealth scholarships. What you really have to win.',
  },
  hero: {
    eyebrow: 'Funding guide',
    title: 'Money for study abroad: the honest account.',
    intro:
      'Scholarship funding exists. It is real. But the likelihood of a full scholarship with no strings attached is close to zero. Here is where money actually comes from, which scholarships Bangladeshi students win, and how to position yourself.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      {
        label: 'Explore universities',
        href: '/study-abroad/university-finder',
        variant: 'outline',
      },
    ],
    facts: [
      { label: 'Merit scholarships', value: 'Common at US publics · Usually auto-awarded' },
      { label: 'External funding', value: 'Fulbright · Chevening · Erasmus Mundus' },
      {
        label: 'Graduate assistantships',
        value: 'Stipend + tuition waiver · Most common for MS/PhD',
      },
      {
        label: 'Application bonus',
        value: 'Apply early · Full financial documents · Clear record',
      },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'The money is there, but it is not freely given. Universities have limited funds for international students, and they deploy those funds strategically. External scholarships (government-backed, like Fulbright or Chevening) are even more competitive. The students who win tend to have strong academic records, clear purpose, and in many cases, the financial means to cover tuition if the scholarship does not come through.',
    },
    { type: 'heading', text: 'Merit scholarships at US universities' },
    {
      type: 'paragraph',
      text: 'Most US public universities and mid-tier private institutions award merit scholarships automatically based on your test scores and GPA. These are not full rides; they typically cover 25–50% of tuition. But they accumulate.',
    },
    {
      type: 'list',
      items: [
        'Public flagships (Michigan, Purdue, Ohio State): commonly award USD 8,000–18,000 per year for international students with strong SAT/ACT.',
        'Mid-tier private universities: USD 12,000–25,000 per year for competitive applicants.',
        'Highly selective universities: often meet 100% of demonstrated need for admitted international students, but admission rates are under 5%.',
        'These scholarships are typically renewable year on year if you maintain a minimum GPA (usually 3.0).',
      ],
    },
    { type: 'heading', text: 'Graduate assistantships: the working path' },
    {
      type: 'paragraph',
      text: 'The most common way Bangladeshi MS and PhD students fund their degrees is through graduate assistantships: a stipend plus full tuition waiver in exchange for teaching or research work.',
    },
    {
      type: 'list',
      items: [
        'Assistantships are typically 15–20 hours per week and cover your tuition + living costs (though living stipends vary widely).',
        'Competition is fierce, particularly for engineering and computer science positions.',
        'Your research fit and letters of recommendation matter more than test scores.',
        'Many programmes guarantee funding for all admitted PhD students; few do for masters students.',
      ],
    },
    { type: 'heading', text: 'External scholarships: Fulbright, Chevening and Commonwealth' },
    {
      type: 'paragraph',
      text: 'Government and bilateral scholarship schemes exist but are highly competitive. Below are the main ones available to Bangladeshi students.',
    },
    {
      type: 'table',
      head: ['Scheme', 'Coverage', 'Competitiveness', 'Who wins'],
      rows: [
        [
          'Fulbright (US)',
          'Full tuition + living allowance',
          'Very competitive',
          'Top 10% academics, leadership background',
        ],
        [
          'Chevening (UK)',
          'Tuition + living allowance',
          'Highly competitive',
          'Strong academics + professional experience',
        ],
        [
          'Erasmus Mundus (Europe)',
          'Tuition + monthly stipend',
          'Competitive',
          'EU bias, but scholarships exist for partners outside',
        ],
        [
          'Commonwealth (mainly UK)',
          'Tuition + airfare',
          'Competitive',
          'Top academics, development focus',
        ],
      ],
    },
    {
      type: 'callout',
      title: 'The selection reality',
      text: 'If you are applying for Fulbright or Chevening, assume 1 in 100+ applicants from Bangladesh will win full funding. Many of those winners have parents in government, established work experience, or rare field specialisation. Do not hang your entire funding plan on external scholarships.',
    },
    { type: 'heading', text: 'Institutional scholarships: university-specific funds' },
    {
      type: 'paragraph',
      text: 'Many universities offer scholarships specific to certain countries or regions, or scholarships for particular fields of study.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Research each university’s international student scholarship page: look for Bangladesh-specific scholarships or regional funds.',
        'Email the graduate programme director or financial aid office with your CV and specific inquiry about funding opportunities.',
        'Ask about departmental scholarships or assistantships that are not advertised broadly.',
        'Apply early: many scholarships are allocated on a rolling basis, and funds dry up.',
      ],
    },
    { type: 'heading', text: 'How to position yourself for funding' },
    {
      type: 'paragraph',
      text: 'Whether you are chasing merit scholarships, assistantships, or external funding, these factors increase your chances:',
    },
    {
      type: 'list',
      items: [
        'Strong academic transcript: GPA 3.5+ and consistent grades matter. Gap years or grade improvements over time can work in your favour.',
        'Competitive test scores: a high SAT/ACT or GRE matters for assistantship eligibility and merit scholarships.',
        'Demonstrated financial need: counterintuitively, showing you have some skin in the game (your parents are contributing) strengthens your application. Universities want students who will graduate, and students with family support graduate.',
        'Clear research or career purpose: applicants who know what field they want to pursue and why are more fundable than those exploring options.',
        'Strong letters of recommendation: from professors or employers who can speak to your academic ability and character.',
      ],
    },
    { type: 'heading', text: 'Loans and sponsors' },
    {
      type: 'paragraph',
      text: 'If scholarships do not materialize, you have other options. Many Bangladeshi families use a combination of personal savings, loans from Bangladeshi banks (some offer education loans to students studying abroad), and sponsorship by relatives abroad. Factor these into your plan early.',
    },
  ],
  related: [
    {
      tag: 'Destination',
      title: 'Studying in the USA',
      desc: 'Merit scholarships and graduate assistantships are most common here.',
      meta: 'Guide',
      href: '/study-abroad/destinations/usa',
    },
    {
      tag: 'Resource',
      title: 'Financial aid and affordability',
      desc: 'How universities calculate aid, ROI and cost-benefit analysis per destination.',
      meta: 'Link',
      href: '/admissions/financial-aid',
    },
    {
      tag: 'Planning',
      title: 'Your study-abroad timeline',
      desc: 'When scholarships open, application deadlines and decision seasons.',
      meta: 'Link',
      href: '/study-abroad/university-finder',
    },
  ],
  faq: [
    {
      question: 'Should I study in Germany if I cannot get a full scholarship?',
      answer:
        'Yes. Germany’s low-cost public universities make it a strong option even without a full scholarship. You and your family may be able to fund one or two years out of savings or loans, particularly if you secure part-time work. A full scholarship is valuable but not necessary in low-cost countries.',
    },
    {
      question: 'How far in advance should I apply for scholarships?',
      answer:
        'Most university scholarships and graduate assistantships are awarded alongside admission, usually between December and March for a September intake. Apply to the university by the early application deadline if you want to be considered for funding. Fulbright and other external schemes have specific deadlines, often in July–August for funding the following academic year.',
    },
    {
      question: 'If I do not win a scholarship, can I defer my admission and reapply next year?',
      answer:
        'Some universities allow deferral for a year, but policies vary. It is better to accept admission without funding and explore part-time work, loans, or family support to begin your degree, rather than lose your place. You can sometimes transfer institutions or move to different funding after your first year if your grades are strong.',
    },
  ],
};
