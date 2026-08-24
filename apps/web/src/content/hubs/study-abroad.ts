import type { HubContent } from '../types';
import { commonFaq } from '../shared';

export const studyAbroadHub: HubContent = {
  path: '/study-abroad',
  seo: {
    title: 'Study abroad from Bangladesh — USA, UK, Canada, Australia, Europe',
    description:
      'End-to-end guidance for Bangladeshi students applying to universities abroad. School selection, applications, essays, scholarships, visas, pre-departure — everything you need to move to a new country and thrive there.',
  },
  hero: {
    eyebrow: 'Study abroad',
    title: 'The whole journey, start to finish.',
    intro:
      'Moving to another country is big. We guide you through every decision: which universities fit, how to fund them, how to get a visa, how to arrive ready to thrive. Start with a free consultation.',
    actions: [
      { label: 'Book a free consultation', href: '/contact' },
      { label: 'Compare scholarships', href: '/study-abroad/scholarships', variant: 'outline' },
    ],
    facts: [
      { label: 'Destinations', value: 'USA · UK · Canada · Australia · Europe' },
      { label: 'Scholarships researched', value: '10,000+ annually' },
      { label: 'Students placed', value: '500+ each year' },
      { label: 'Support languages', value: 'Bengali · English' },
    ],
  },
  strip: {
    kicker: 'Study in',
    items: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Europe'],
  },
  cards: {
    eyebrow: 'Plan your journey',
    title: 'Every destination, every step of the way.',
    intro:
      'From choosing where to apply to arriving on your first day, we guide you through the whole process. Start by exploring your destination.',
    items: [
      {
        no: '01',
        tag: 'Destination',
        title: 'United States',
        desc: 'The world’s largest higher education system. We help you navigate the Common App, understand US financial aid, and build a school list that fits your profile and budget.',
        meta: 'Liberal arts · Research universities · Community college',
        href: '/study-abroad/destinations/usa',
      },
      {
        no: '02',
        tag: 'Destination',
        title: 'United Kingdom',
        desc: 'Three-year degrees, specialized curricula, and a more straightforward admissions process. We coach you through UK university applications, visa requirements and student visa finances.',
        meta: 'Russell Group · Research-led · Specialist',
        href: '/study-abroad/destinations/uk',
      },
      {
        no: '03',
        tag: 'Destination',
        title: 'Canada',
        desc: 'Quality education, diverse cities, and growing international student infrastructure. We guide applications to Canadian universities and help you understand Canadian student visa pathways.',
        meta: 'Research universities · Regional diversity',
        href: '/study-abroad/destinations/canada',
      },
      {
        no: '04',
        tag: 'Destination',
        title: 'Australia',
        desc: 'English-taught higher education in a welcoming country. We help you navigate the Australian university system, student visa requirements and the transition to living and studying there.',
        meta: 'Go8 · Newer universities · Study hubs',
        href: '/study-abroad/destinations/australia',
      },
      {
        no: '05',
        tag: 'Destination',
        title: 'Europe',
        desc: 'Affordable education, integrated cities, and a growing number of English-taught programmes. We guide applications to continental universities and student visa processes.',
        meta: 'Netherlands · Germany · France · Nordics',
        href: '/study-abroad/destinations/europe',
      },
      {
        no: '06',
        tag: 'Planning',
        title: 'University finder',
        desc: 'Search and compare universities across continents by location, major, funding, and student experience. Build a shortlist that actually fits you.',
        meta: 'Interactive tool',
        href: '/study-abroad/university-finder',
      },
      {
        no: '07',
        tag: 'Planning',
        title: 'Scholarships & funding',
        desc: 'We research and match you with scholarships you are eligible for: from full rides to partial funding, merit-based and need-based alike.',
        meta: 'Institutional · Government · NGO',
        href: '/study-abroad/scholarships',
      },
      {
        no: '08',
        tag: 'Planning',
        title: 'Visa & documentation',
        desc: 'Student visa requirements vary by country, intake and university. We walk you through the documentation you need and the timeline that works.',
        meta: 'Country-specific guides',
        href: '/study-abroad/visa',
      },
      {
        no: '09',
        tag: 'Planning',
        title: 'Pre-departure',
        desc: 'Practical advice on arriving prepared: housing, banking, healthcare, orientation, making friends and adjusting to a new place. You are set up for success from day one.',
        meta: 'Country guides · Checklists',
        href: '/study-abroad/pre-departure',
      },
    ],
  },
  features: {
    eyebrow: 'Why here',
    title: 'What our study abroad guidance includes.',
    items: [
      {
        title: 'Deep country expertise',
        desc: 'We place students in five countries across four continents every year. We know the universities, the visa systems and the real student experience.',
      },
      {
        title: 'Financial strategy',
        desc: 'Funding is the most common reason students do not go abroad. We research institutional scholarships, government schemes and alternative funding so finance does not stop you.',
      },
      {
        title: 'Cultural transition support',
        desc: 'Moving countries is not just an academic decision; it is a life decision. We prepare you for the practical and emotional reality of studying far from home.',
      },
      {
        title: 'Whole-journey accountability',
        desc: 'One counselor guides you from school selection through pre-departure checklist. Continuity means nothing falls through the cracks.',
      },
    ],
  },
  stats: [
    { value: '500+', label: 'Students placed abroad annually' },
    { value: '10,000+', label: 'Scholarships researched each year' },
    { value: '$15–60k', label: 'Typical scholarship range, per year' },
    { value: '94%', label: 'Arrive at university visa-ready' },
  ],
  testimonials: ['study-abroad'],
  faq: [
    {
      question: 'Can I study abroad if my school grades are not perfect?',
      answer:
        'Absolutely. Universities care about trajectory, not just absolute grades. A student whose marks improved from 60% to 85% over two years tells a better story than consistent 80%. We help you frame your academic history and find universities that see your potential.',
    },
    {
      question: 'How much does studying abroad actually cost?',
      answer:
        'It varies hugely. A year at a public US university might be $25,000–40,000; a UK degree might be £27,000 total; a European programme might cost €5,000–15,000 per year. Many universities also offer substantial scholarships to international students. We help you understand what each destination actually costs and where the scholarships are.',
    },
    {
      question: 'How early should I start planning?',
      answer:
        'Earlier is better. If you are considering university abroad, ideal timing is two years before you plan to start — that gives you time to think, research, prepare your applications and organize funding. But we also work with students who decide later; it just means a tighter timeline.',
    },
    ...commonFaq,
  ],
};
