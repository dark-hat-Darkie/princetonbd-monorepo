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
      { label: 'Compare all courses', href: '/test-prep/compare', variant: 'outline' },
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
    eyebrow: 'English proficiency',
    title: 'The score your offer depends on.',
    intro:
      'Every destination asks for proof of English before it issues an offer or a visa. We prepare you for whichever test your universities accept — and help you pick the one that plays to your strengths.',
    items: [
      {
        no: '01',
        tag: 'English proficiency',
        title: 'IELTS',
        desc: 'Accepted everywhere the UK, Australia and Canada send offers. Band-focused coaching across all four modules, with examiner-style speaking feedback every week.',
        meta: 'Academic · Paper or computer',
        href: '/test-prep/ielts',
      },
      {
        no: '02',
        tag: 'English proficiency',
        title: 'TOEFL',
        desc: 'The US default. Integrated-task practice, pacing for the shortened format, and the note-taking method the listening and speaking sections reward.',
        meta: 'iBT · Home edition',
        href: '/test-prep/toefl',
      },
      {
        no: '03',
        tag: 'English proficiency',
        title: 'Duolingo English Test',
        desc: 'Adaptive, taken from home, results in two days — and accepted by a growing list of universities. We coach the question types and the video-interview component.',
        meta: 'Online · Adaptive',
        href: '/test-prep/duolingo',
      },
      {
        no: '04',
        tag: 'English proficiency',
        title: 'PTE Academic',
        desc: 'Computer-scored end to end, so technique matters as much as English. Strong for Australia and increasingly accepted in the UK and Canada.',
        meta: 'Computer-based · Fast results',
        href: '/test-prep/pte',
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
