import type { GuideContent } from '../types';

export const rankingsGuides: GuideContent = {
  path: '/resources/rankings-guides',
  seo: {
    title: 'How to read university rankings critically and build a real shortlist',
    description:
      'What QS, THE and US News rankings actually measure, why they are useful and misleading, and how to build a shortlist that serves your goals instead of chasing prestige.',
  },
  hero: {
    eyebrow: 'Resources',
    title: 'Rankings: useful and misleading.',
    intro:
      'University rankings are everywhere, and they are seductive — a single number that seems to solve the choice. They solve nothing. Here is what rankings actually measure, what they miss, and how to use them without letting them use you.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      { label: 'Find universities', href: '/study-abroad/university-finder', variant: 'outline' },
    ],
    facts: [
      { label: 'Main ranking bodies', value: 'QS · THE · US News · Niche (USA)' },
      {
        label: 'Metrics used',
        value: 'Reputation (mostly) · graduation outcomes · research output',
      },
      { label: 'Rankings stability', value: 'Top 10 stable · 20–200 shuffles annually' },
      { label: 'Common pitfall', value: 'Applying only to top 50 · ignoring fit and outcomes' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'Rankings exist because they are easy to understand and share. A single number (34th or 127th) is comforting. It is also misleading. Here is why they matter less than you think, which ones to read, and how to build a shortlist that actually serves your goals.',
    },
    { type: 'heading', text: 'What rankings measure' },
    {
      type: 'paragraph',
      text: 'Most university rankings rely heavily on reputation — what academics and employers think about each university. Below is a rough breakdown of how the major ranking systems weight their metrics:',
    },
    {
      type: 'table',
      head: ['Metric', 'QS weight', 'THE weight', 'US News weight'],
      rows: [
        ['Reputation (academic)', '40%', '33%', 'N/A'],
        ['Employer reputation', '10%', 'N/A', 'N/A'],
        ['Research output', '20%', '30%', '20%'],
        ['International diversity', '10%', '7%', '5%'],
        ['Student–faculty ratio', '20%', '30%', 'N/A'],
      ],
    },
    {
      type: 'callout',
      title: 'Reputation is inertia, not current quality',
      text: 'A university that ranked highly twenty years ago is likely to rank highly today, even if its actual teaching quality has not changed. Similarly, a new or rising university takes years to climb rankings, even if it is developing genuinely good programmes. Rankings lag reality.',
    },
    { type: 'heading', text: 'The problem with overall rankings' },
    {
      type: 'paragraph',
      text: 'An overall ranking — QS Global Top 100 — is too broad. Here is what it does not tell you:',
    },
    {
      type: 'list',
      items: [
        'It conflates research output with teaching quality. A university that publishes a lot may be indifferent to undergraduate teaching.',
        'It is geographic — QS and THE favour universities in English-speaking countries and Europe, simply because more academics vote and more media coverage exists.',
        'It ignores specialisation. A university might rank 40th overall but 5th in your field. Conversely, a top-20 university might be weak in your subject.',
        'It does not measure employability, salary outcomes, or your actual success after graduation — metrics that matter more than prestige.',
      ],
    },
    { type: 'heading', text: 'Subject rankings are more useful' },
    {
      type: 'paragraph',
      text: 'If you are studying engineering, accountancy, computer science or medicine, ignore the overall ranking and look at the subject ranking. QS, THE and US News all publish subject-specific rankings.',
    },
    {
      type: 'list',
      items: [
        'Subject rankings use the same methodology as overall rankings but are focused: they survey academics and employers in that specific field.',
        'A university ranked 200th overall but 50th in computer science is a far better choice for a CS masters than a university ranked 40th overall with average CS programmes.',
        'Subject rankings tend to be more accurate because academics voting on them are close to the field.',
      ],
    },
    { type: 'heading', text: 'Major ranking bodies and what they do well' },
    {
      type: 'table',
      head: ['Ranking', 'Strength', 'Bias', 'Best for'],
      rows: [
        [
          'QS Global Rankings',
          'International coverage; detailed breakdown',
          'English-speaking bias; employer opinion weighted',
          'Comparing across countries',
        ],
        [
          'THE World Rankings',
          'Research-focused; transparent methodology',
          'Favours research-heavy institutions; Anglophone',
          'Understanding research quality',
        ],
        [
          'US News Global',
          'Deep US data; subject rankings strong',
          'USA bias; less useful outside USA',
          'US master’s programmes',
        ],
        [
          'Niche (USA only)',
          'Student-experience focused; detailed',
          'No international coverage',
          'US undergraduate choice',
        ],
      ],
    },
    { type: 'heading', text: 'Building a shortlist that is not just a ranking list' },
    {
      type: 'paragraph',
      text: 'Here is how to use rankings without being used by them:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Start with your field and criteria. Do you want cutting-edge research? Industry connections? Low cost? A specific city? Let your goals guide you, not rankings.',
        'Find the subject ranking for your field. Identify universities ranked 20–100 that appear in your target countries. (Why 20–100? The difference between 5th and 25th is noise; 100+ rarely offers better teaching or outcomes than 20–100.)',
        'For each university on your list, check: tuition, location, programme length, work-permit options, job outcomes. Rankings do not tell you these.',
        'Read recent graduate reviews on Glassdoor, Reddit, or the university’s Facebook groups. Real students are honest about teaching quality and support.',
        'Ignore prestige for prestige’s sake. A mid-ranked university with a strong track record in your field and better affordability is a better choice than a top-20 school with an average programme in your subject.',
      ],
    },
    { type: 'heading', text: 'The trap of the all-star shortlist' },
    {
      type: 'paragraph',
      text: 'Many Bangladeshi applicants build a shortlist that is 80% top-50 universities and 20% backups. This is a mistake.',
    },
    {
      type: 'list',
      items: [
        'Highly selective universities (top 20 globally) have admission rates below 5%. Applying to eight of them does not increase your odds; it wastes application fees.',
        'A balanced shortlist is 30% reach schools (admission rate below 10%), 40% target schools (admission rate 10–30%), and 30% safety schools (admission rate above 30%).',
        'Target and safety schools often offer better funding and will actually want you, which matters when you are choosing where to spend tens of thousands of dollars.',
      ],
    },
    { type: 'heading', text: 'Outcomes matter more than rankings' },
    {
      type: 'paragraph',
      text: 'The questions you should really ask:',
    },
    {
      type: 'list',
      items: [
        'Where do graduates work six months after completing the programme? LinkedIn and the university’s career services can tell you.',
        'What is the median salary for graduates in your field, by country? This varies widely and is not reflected in rankings.',
        'How many graduates secure work visas in your destination country? A high-ranking university with poor employment outcomes is expensive tourism, not education.',
        'What is the job title of Bangladeshi alumni working in your target industry? Request informational interviews; people are generous with honest advice.',
      ],
    },
  ],
  related: [
    {
      tag: 'Resource',
      title: 'Finding the right university for you',
      desc: 'Beyond rankings: fit, affordability, and outcomes.',
      meta: 'Link',
      href: '/study-abroad/university-finder',
    },
    {
      tag: 'Planning',
      title: 'Majors and careers',
      desc: 'Choosing a field and understanding ROI by destination and discipline.',
      meta: 'Guide',
      href: '/resources/majors-and-careers',
    },
    {
      tag: 'Funding',
      title: 'Scholarships and affordability',
      desc: 'Cost-benefit analysis across destinations and which universities offer funding.',
      meta: 'Guide',
      href: '/study-abroad/scholarships',
    },
  ],
  faq: [
    {
      question: 'Should I only apply to top-50 universities?',
      answer:
        'No. A balanced shortlist is far stronger. Top-50 universities have rejection rates above 90% for international applicants; your odds improve if you apply to universities ranked 50–200 where you are a strong fit. You will also find better funding and more personal attention at those institutions.',
    },
    {
      question: 'Are some ranking systems better than others?',
      answer:
        'They measure different things. QS is most international; THE emphasises research; US News is best for American universities. Use all three and look for consensus: if a university ranks highly on all three, it likely has genuine strength. If it ranks well on one but poorly on others, that specialisation might be good for your field but ask why the gap exists.',
    },
    {
      question: 'How much should I trust graduate reviews and feedback?',
      answer:
        'Heavily. Read 10–20 recent reviews on Glassdoor or Reddit before deciding. Look for themes, not individual complaints. If three graduates mention poor support for international students, that is a signal. If one person complains about a difficult professor, ignore it.',
    },
  ],
};
