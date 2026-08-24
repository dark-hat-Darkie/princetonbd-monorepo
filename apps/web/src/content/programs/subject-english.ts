import type { ProgramContent } from '../types';
import { commonFaq } from '../shared';

export const subjectEnglish: ProgramContent = {
  path: '/tutoring/subjects/english',
  seo: {
    title: 'English language and literature tutoring — O-Level, A-Level, IB',
    description:
      'English literature and language tutoring across all curricula. Essay technique, text analysis, unseen-passage strategy and exam-focused writing.',
  },
  hero: {
    eyebrow: 'English tutoring',
    title: 'Analysis taught as a craft, not a guessing game.',
    intro:
      'Good analysis is not inspiration; it’s pattern recognition. A text has themes, motifs, devices and structures. Your tutor teaches you to find them systematically so you can write a convincing essay under time pressure.',
    actions: [
      { label: 'Book an English tutor', href: '/contact' },
      { label: 'Browse our subjects', href: '/tutoring', variant: 'outline' },
    ],
    facts: [
      { label: 'Streams', value: 'Language, literature, or combined' },
      { label: 'Texts', value: 'Guided reading with analysis drills' },
      { label: 'Essays', value: 'Marked and reviewed within 24 hours' },
      { label: 'Unseen', value: 'Strategy for reading and planning timed essays' },
    ],
  },
  features: {
    eyebrow: 'How English tutoring builds analytical writers',
    title: 'From reading to essay, one system.',
    intro:
      'The students who excel at A-Level English don’t read harder; they read more systematically. They’ve learned a method for spotting what matters.',
    items: [
      {
        title: 'Close reading by device',
        desc: 'Your tutor teaches you to scan for imagery, syntax, tone shifts and structure as you read. Mark the text in class, then build your essay from the annotations.',
      },
      {
        title: 'Essay from outline',
        desc: 'A good essay starts with a crisp outline, not a draft. We drill the thinking before the writing: thesis, three points, one quote per point. The prose flows after that.',
      },
      {
        title: 'Timed-essay technique',
        desc: 'You have 90 minutes and a blank page. Your tutor shows you the reading-planning-writing split that fits, and the shortcuts that don’t sacrifice quality.',
      },
      {
        title: 'Unseen passage strategy',
        desc: 'You’ve never seen this text. An hour to read it and write an essay. Your tutor teaches a predictable method: skim for themes, then read for devices.',
      },
    ],
  },
  stats: [
    { value: '91%', label: 'Improve their essay grade by one band' },
    { value: '22 essays', label: 'Marked and reviewed per student per term' },
    { value: '4.9/5', label: 'English tutor rating' },
    { value: '8/9 GCSEs', label: 'Average outcome for consistently attending students' },
  ],
  testimonials: ['tutoring', 'english'],
  faq: [
    {
      question: 'Should I study literature and language together or separately?',
      answer:
        'That depends on your curriculum and school—A-Level allows both paths. Our tutors can teach them together or apart. Many students find they reinforce each other: language techniques you learn help you analyse literature essays.',
    },
    {
      question: 'How many texts should I have read before starting tutoring?',
      answer:
        'We can start from scratch or polish halfway through. Some students arrive with three texts done; others haven’t started. Your tutor will set reading for homework and review it in the first session.',
    },
    {
      question: 'Do tutors mark essays the way the examiner will?',
      answer:
        'We use the mark scheme and descriptors, yes. Your tutor will write a comment showing you where you earned marks and where an examiner would have wanted more precision or evidence.',
    },
    ...commonFaq,
  ],
};
