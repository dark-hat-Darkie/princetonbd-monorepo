import type { GuideContent } from '../types';

export const visa: GuideContent = {
  path: '/study-abroad/visa',
  seo: {
    title: 'Student visa interviews and documentation from Bangladesh',
    description:
      'How to prepare for student visa interviews: the USA F-1 interview in Dhaka, UK Student visa decisions, Canada study permits and more. What to bring and what they are really asking.',
  },
  hero: {
    eyebrow: 'Visa guide',
    title: 'Visa interviews and documents: preparing from Dhaka.',
    intro:
      'The visa interview is the final hurdle before you leave. It is not difficult if you are prepared. Here is what each embassy is actually checking, what documents you need, and how to present yourself without sounding rehearsed.',
    actions: [
      { label: 'Talk to a counselor', href: '/contact' },
      {
        label: 'Check embassy details',
        href: '/study-abroad/university-finder',
        variant: 'outline',
      },
    ],
    facts: [
      { label: 'F-1 interview', value: 'US Embassy Dhaka · 2–3 minutes · short and direct' },
      { label: 'UK Student visa', value: 'Decision-only (no interview) · requires CAS and funds' },
      {
        label: 'Canada study permit',
        value: 'Online application · PAL may be required · no interview',
      },
      {
        label: 'Universal requirement',
        value: 'Funds documentation · I-20, CAS, CoE or equivalent',
      },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'The visa interview (or application, depending on the country) is where embassies and immigration authorities make a final check: can you actually pay for this, and do you intend to comply with the visa conditions? Controversy and paranoia thrive here because the stakes are high and the criteria can seem opaque. In reality, they are simple.',
    },
    { type: 'heading', text: 'The F-1 visa interview (USA)' },
    {
      type: 'paragraph',
      text: 'The F-1 interview at the US Embassy in Dhaka is notoriously brief — often two to three minutes. The consular officer has already read your file: your I-20, your academic record, your funding documents. The interview is to confirm you are the person in the documents and that you can articulate your purpose.',
    },
    {
      type: 'list',
      items: [
        'The officer will ask: why are you studying this field, why this university, how are you paying, and what will you do after?',
        'Answers should be short, unrehearsed, and honest. Over-preparation is obvious and counterproductive.',
        'Have your I-20 ready and accessible. Know your SEVIS number.',
        'Have evidence of funding: bank statements, sponsor affidavits, or scholarship letters. Show it if asked; do not volunteer it.',
        'Expect the question: do you intend to return to Bangladesh? Say yes and mean it. This is the key question.',
      ],
    },
    {
      type: 'callout',
      title: 'The visa refusal myth',
      text: 'Refusals do happen, but usually only to applicants with inconsistencies in their documents or answers. If your I-20 says you are studying engineering but you tell the officer you are interested in philosophy, you have a problem. Otherwise, presumptively you are approved. The burden is on the applicant to prove they should be denied.',
    },
    { type: 'heading', text: 'UK Student visa (decision-only, no interview)' },
    {
      type: 'paragraph',
      text: 'The UK does not conduct in-person interviews for Student visas from Bangladesh. Your application is processed entirely online. The decision hinges on your documents.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'You receive a Confirmation of Acceptance for Studies (CAS) from your university once you have paid a deposit and provided proof of English language ability.',
        'You apply online via the UK visa portal, uploading your CAS, passport, financial documents (bank statements, sponsor letters), and proof of English language proficiency.',
        'The Home Office processes the application, usually within 3–8 weeks.',
        'Approval is digital; there is no visa sticker. You simply proceed to the airport with your BRP (Biometric Residence Permit) appointment letter.',
      ],
    },
    { type: 'heading', text: 'Canada study permit (online application)' },
    {
      type: 'paragraph',
      text: 'Like the UK, Canada processes most study permits online for Bangladeshi applicants. Some applicants are selected for interviews, but this is a small minority.',
    },
    {
      type: 'list',
      items: [
        'You must provide your Letter of Acceptance from your university, proof of funds (bank statements, GIC confirmation, or PAL), proof of English language proficiency, and sometimes a Provincial Attestation Letter (depending on your province of study).',
        'Application is online via IRCC (Immigration, Refugees and Citizenship Canada). Processing takes 2–8 weeks.',
        'If selected for an interview, you will be invited to the Canadian visa application centre in Dhaka. Interviews are conversational and check your ties to Bangladesh and your intent to study.',
        'You receive a document called a port-of-entry (PoE) letter; you do not get a visa sticker in your passport. Show this letter at the airport and receive your study permit on arrival.',
      ],
    },
    { type: 'heading', text: 'Australia student visa (online, rare interviews)' },
    {
      type: 'paragraph',
      text: 'Student visas for Australia are processed online with the Department of Home Affairs. Interviews are very rare unless the department has questions about your application.',
    },
    {
      type: 'list',
      items: [
        'Submit your Confirmation of Enrolment (CoE), proof of funds, proof of English language proficiency, and personal details via the online portal.',
        'Processing typically takes 1–4 weeks.',
        'If the department has concerns about your Genuine Student assessment, you may be invited to an interview (by phone or video) to explain your intent. Be honest and specific: what appeals to you about this field, this university, this country?',
        'Approval is digital; your visa is attached to your passport details. You receive a grant notification letter.',
      ],
    },
    { type: 'heading', text: 'European student visas (country-specific)' },
    {
      type: 'paragraph',
      text: 'Europe is fragmented: each country has its own visa rules, though many are Schengen visas. Below are the key players:',
    },
    {
      type: 'list',
      items: [
        'Germany: student visa issued by the German Embassy in Dhaka. You must show proof of language ability (usually B2 in German or proof of English-taught programme), proof of funds (blocked account of EUR 934 per month), and your acceptance letter. Interviews are common but usually routine.',
        'Netherlands: residence permit (MVV) issued before departure. Documents: acceptance letter, proof of funds, proof of English, and a clean background check. No interview.',
        'Belgium and Italy: residence permits issued by local authorities upon arrival. You apply through the respective embassies in Dhaka with similar documentation; no interviews standard.',
      ],
    },
    { type: 'heading', text: 'What documents you universally need' },
    {
      type: 'table',
      head: ['Document type', 'What it proves', 'Issued by'],
      rows: [
        ['Acceptance letter', 'You have been admitted and have a place', 'University'],
        [
          'Financial documents',
          'You can afford tuition and living costs',
          'Bank (statements) or employer (sponsorship letter)',
        ],
        [
          'English language test',
          'You can speak and study in English',
          'IELTS, TOEFL, Duolingo, or equivalent provider',
        ],
        ['Passport', 'Your identity and citizenship', 'Bangladesh government'],
        [
          'Birth certificate (copy)',
          'Proof of age and citizenship',
          'Local authority in Bangladesh',
        ],
        ['Police clearance', 'You have no criminal record', 'Bangladesh Police'],
      ],
    },
    { type: 'heading', text: 'Practical tips for visa success' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Get your documents organised well before deadlines. Passport renewal can take weeks; do this first.',
        'Sit your English language test at least three months before your visa application. Results take time to arrive.',
        'If your parents are your financial sponsors, get affidavits and bank statements in their names well in advance.',
        'Do not lie on any document or in any interview. Inconsistencies between your application documents and your interview answers are red flags.',
        'If you are asked about your plans after graduation, be honest. Saying you will definitely return to Bangladesh is expected; saying you will explore job markets honestly is also acceptable.',
        'Dress neatly if you have an in-person interview. Professional dress (no jeans, no loud colours) is standard.',
        'Bring original and photocopied documents to any in-person appointment. Originals stay with you unless explicitly asked to submit them.',
      ],
    },
  ],
  related: [
    {
      tag: 'Destination',
      title: 'The United States F-1 visa',
      desc: 'Detailed walk-through of the F-1 interview and I-20 document.',
      meta: 'Guide',
      href: '/study-abroad/destinations/usa',
    },
    {
      tag: 'Preparation',
      title: 'Before you depart',
      desc: 'After your visa is approved: health cover, accommodation, banking and airport day.',
      meta: 'Guide',
      href: '/study-abroad/pre-departure',
    },
    {
      tag: 'Contact',
      title: 'Talk to a counselor about your specific case',
      desc: 'Visa decisions are individual. Get advice tailored to your circumstances.',
      meta: 'Link',
      href: '/contact',
    },
  ],
  faq: [
    {
      question: 'What if I am refused a visa?',
      answer:
        'Refusals are rare if your documents are consistent and you demonstrate intent to study and return. If refused, you usually receive a written reason. Most refusals can be corrected: gather the missing document, clarify the inconsistency, and reapply. Some countries charge a reapplication fee; some do not. Do not ignore a refusal — address the cause and try again.',
    },
    {
      question: 'Do I need a police clearance if I have never committed a crime?',
      answer:
        'Yes. Most countries require a police clearance certificate from Bangladesh even if you have no criminal history. This is a routine document and is not an investigation — you simply apply to your local police station. It takes 2–4 weeks. Budget time for this.',
    },
    {
      question: "What if my parents' bank account is in one name but they are both supporting me?",
      answer:
        'Get an affidavit from both parents stating they are jointly supporting your studies and that the funds in the named account are for your use. Have this notarised by a lawyer or commissioner. This strengthens your application and removes ambiguity about fund ownership.',
    },
  ],
};
