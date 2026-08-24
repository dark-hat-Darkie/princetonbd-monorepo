import type { ProgramContent } from '../types';
import { bdtPrice } from '@/lib/money';
import { commonFaq } from '../shared';

export const admissionsMedical: ProgramContent = {
  path: '/admissions/medical',
  seo: {
    title: 'Medical school admissions for Bangladeshi students — US MD, UK MBBS, Australia',
    description:
      'Expert guidance on US medical school (MD/DO), UK medical school (MBBS), and Australian medical programmes. Application strategy, test prep and clinical experience coaching.',
  },
  hero: {
    eyebrow: 'Medical school admissions',
    title: 'Medicine abroad: strategy from Year 11 through enrolment.',
    intro:
      'Medical school admissions abroad are not just grades. US schools need MCAT and clinical experience; UK schools need UCAT and demonstrated commitment; Australia needs prerequisites and GAMSAT. We coach all three paths.',
    actions: [
      { label: 'Begin medical school planning', href: '/contact' },
      { label: 'Pathway guide', href: '#', variant: 'outline' },
    ],
    facts: [
      { label: 'Pathways supported', value: 'US MD/DO, UK MBBS, Australia medical' },
      { label: 'Test coverage', value: 'MCAT, UCAT, GAMSAT' },
      { label: 'Timeline', value: 'Starting Year 11–12, through enrolment' },
      { label: 'Application cycles', value: 'AMCAS, UCAS Medicine, direct applications' },
    ],
  },
  features: {
    eyebrow: 'Medical admissions coaching',
    title: 'Clinical, academic and strategic guidance.',
    intro:
      'Medicine requires more than test scores: clinical experience, research, leadership and a demonstrated understanding of the profession. We coach every dimension.',
    items: [
      {
        title: 'Clinical experience and shadowing',
        desc: 'Guidance on finding and maximizing clinical placements, shadowing and volunteer experience. US schools want 200+ clinical hours; UK schools want evidence of understanding the profession.',
      },
      {
        title: 'Test preparation—MCAT, UCAT or GAMSAT',
        desc: 'Specialised tutoring in medical entry exams. MCAT tutoring on sciences and critical thinking; UCAT coaching on reasoning under time pressure; GAMSAT guidance on writing.',
      },
      {
        title: 'School selection and application strategy',
        desc: 'Matching your profile to US medical schools, UK medical schools or Australian programmes. International applicants are rare; we help you stand out.',
      },
      {
        title: 'Personal statements and interviews',
        desc: 'Coaching on medical school essays (US personal statement, UK UCAS, Australian written questions) and mock interviews with practising physicians.',
      },
    ],
  },
  process: {
    eyebrow: 'How medical school applications work',
    title: 'Building a complete medical school profile.',
    steps: [
      {
        no: '01',
        title: 'Pathway decision and planning',
        desc: 'US, UK or Australia? Each has different prerequisites, timelines and test requirements. We help you choose based on your academics and goals.',
      },
      {
        no: '02',
        title: 'Clinical experience and academics',
        desc: 'Building clinical hours, volunteering and research. Parallel academic planning (summer science courses for US MD, sciences for UK MBBS).',
      },
      {
        no: '03',
        title: 'Test preparation and applications',
        desc: 'Targeted tutoring on MCAT, UCAT or GAMSAT, paired with application submission. US applicants typically submit in June; UK in October.',
      },
      {
        no: '04',
        title: 'Interviews and acceptance',
        desc: 'Mock interviews with physician feedback. Once offers arrive, guidance on school selection and preparing for matriculation.',
      },
    ],
  },
  formats: [
    {
      name: 'Essentials',
      pitch:
        'Pathway decision, clinical strategy and test planning. For students starting their medical journey in Year 11 or 12.',
      price: bdtPrice(80000),
      priceUnit: 'for the full cycle',
      facts: ['Shared guidance', 'Quarterly check-ins', 'Test planning'],
      includes: [
        'Pathway assessment (US, UK or Australia)',
        'Clinical experience roadmap',
        'Test selection and timeline',
        'Application system overview',
      ],
      href: '/contact',
    },
    {
      name: 'Comprehensive',
      pitch:
        'Dedicated counselor, full test prep, personal statement coaching and interview preparation.',
      price: bdtPrice(220000),
      priceUnit: 'for the full cycle',
      facts: ['Dedicated counselor', 'Monthly meetings', 'On-campus or online tutoring'],
      includes: [
        'Clinical experience and research strategy',
        'Full MCAT, UCAT or GAMSAT tutoring',
        'Personal statement coaching through all drafts',
        'School selection and application strategy',
        'Mock interviews with physician feedback',
      ],
      href: '/contact',
      featured: true,
    },
    {
      name: 'Premium',
      pitch:
        'Everything in Comprehensive, plus year-round counseling from application through enrolment with international medical advisor support.',
      price: bdtPrice(380000),
      priceUnit: 'for the full cycle',
      facts: ['Senior medical advisor', 'Bi-weekly meetings', '24-hour response'],
      includes: [
        'Everything in Comprehensive',
        'Ongoing clinical hours and research coaching',
        'Post-interview strategy and offer negotiation',
        'Visa and immigration guidance',
        'Pre-matriculation gap-year planning if needed',
      ],
      href: '/contact',
    },
  ],
  stats: [
    { value: '87%', label: 'Accepted to a medical school on their preferred pathway' },
    { value: '200+', label: 'Average clinical hours per successful US applicant' },
    { value: '3–5', label: 'Medical schools on a typical shortlist' },
    { value: '2–3', label: 'Years from start of counseling to enrolment' },
  ],
  testimonials: ['admissions'],
  faq: [
    {
      question: 'Which pathway should I choose—US, UK or Australia?',
      answer:
        'It depends on your academics, finances and career goals. US medical school (MD/DO) is rigorous and requires MCAT and substantial clinical experience; UK medicine (MBBS) is typically three years and requires UCAT; Australia has various pathways. We help you assess which fits your profile.',
    },
    {
      question: 'How much clinical experience do I need?',
      answer:
        'US medical schools typically want 200–400 clinical hours from successful applicants. UK schools look for evidence of medical exposure and understanding but not specific hour counts. We help you build meaningful experience, not just clock hours.',
    },
    {
      question: 'Can I apply to medical schools in multiple countries?',
      answer:
        'Yes, many students apply to both UK and US medical schools. However, timelines and applications differ—UK UCAS closes in October; US AMCAS opens in June. We help you coordinate applications across pathways and systems.',
    },
    ...commonFaq,
  ],
};
