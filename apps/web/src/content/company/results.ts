import type { CompanyContent } from '@/content/types';

export const resultsPage: CompanyContent = {
  path: '/about/results',
  seo: {
    title: 'Our results — SAT, ACT, GRE & GMAT outcomes from Princeton Review Bangladesh',
    description:
      'Score improvements, admissions to top universities, and scholarships won by students who studied at Princeton Review Bangladesh.',
  },
  hero: {
    eyebrow: 'Our results',
    title: 'Where our students end up, and the scores they get there.',
    intro:
      'Actual results from actual students: score improvements, admissions to Ivy League, STEM universities and business schools, and scholarships that change the affordability equation.',
    facts: [
      { label: 'Average SAT improvement', value: '+210 points' },
      { label: 'Admitted to top choice', value: '94%' },
      { label: 'Scholarship range', value: 'Full ride to $15k USD' },
      { label: 'Completed course', value: 'Sat the official exam' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'The figures below are drawn from students who completed their full course schedule, attended classes and mocks regularly, and sat the official exam in the test year. They do not include students who sat a single mock and then went home, or who enrolled for a one-off tutoring session. Individual results vary — score improvement depends on your starting point, the time you invest between classes, and the exam you are taking.',
    },
    { type: 'heading', text: 'SAT and ACT outcomes' },
    {
      type: 'paragraph',
      text: 'Bangladeshi high school students applying to US universities. Most are applying alongside the TOEFL or IELTS, and most are asking for financial aid.',
    },
    {
      type: 'table',
      head: ['Student', 'Starting score', 'Final score', 'Improvement', 'University', 'Outcome'],
      rows: [
        ['Nafisa R.', 'SAT 1250', 'SAT 1540', '+290', 'NUS, Singapore', 'Admitted with merit aid'],
        [
          'Mahin H.',
          'ACT 24',
          'ACT 34',
          '+10',
          'University of Michigan',
          'Admitted with scholarship',
        ],
        ['Raiyan K.', 'SAT 1200', 'SAT 1480', '+280', 'UPenn', 'Admitted'],
        [
          'Amina S.',
          'ACT 26',
          'ACT 32',
          '+6',
          'University of Toronto',
          'Admitted with full scholarship',
        ],
      ],
    },
    { type: 'heading', text: 'Graduate admissions: GRE and GMAT' },
    {
      type: 'paragraph',
      text: 'Students applying for Masters programmes in the US, UK, Canada and Australia. GMAT takers are heading toward business school; GRE takers span engineering, data science, public policy and research.',
    },
    {
      type: 'table',
      head: ['Student', 'Exam', 'Starting', 'Final', 'Programme', 'Location'],
      rows: [
        ['Tanvir A.', 'GRE', '305', '328', 'MS Data Science', 'University of Toronto'],
        ['Farhana I.', 'GMAT', '620', '730', 'MBA', 'INSEAD, France'],
        ['Samir P.', 'GRE', '310', '335', 'MS Engineering', 'CMU'],
        ['Rashida K.', 'GMAT', '640', '720', 'MBA', 'London Business School'],
      ],
    },
    { type: 'heading', text: 'English test results' },
    {
      type: 'paragraph',
      text: 'IELTS and TOEFL scores for admission and work visas. Most students sit an English test alongside their subject exam, so these run parallel to SAT / ACT / GRE.',
    },
    {
      type: 'table',
      head: ['Student', 'Exam', 'Starting', 'Final', 'Purpose'],
      rows: [
        ['Sadia K.', 'IELTS', '6.5', '8.0', 'Imperial College London admission'],
        ['Tasnim Z.', 'TOEFL', '95', '112', 'University of Melbourne + scholarship'],
        ['Hasan M.', 'IELTS', '5.5', '7.5', 'University of Manchester'],
        ['Karim T.', 'TOEFL', '88', '108', 'NYU Stern'],
      ],
    },
    {
      type: 'callout',
      title: 'A word on what these figures mean',
      text: 'These are representative outcomes from cohorts that completed the full course, sat mocks on schedule, and sat the official exam within the advertised test year. We do not track students who did one or two sessions and disappeared, or who enrolled on exam day hoping for a miracle. Individual results vary based on starting score, study hours between classes, exam difficulty that sitting, and how universities are reading applications that cycle. Nobody can promise a specific score or admission.',
    },
  ],
  stats: [
    { value: '1540', label: 'Highest SAT this year' },
    { value: '94%', label: 'Enrolled at first-choice university' },
    { value: '$180k', label: 'Total scholarships awarded, 2024' },
    { value: '40+ hrs', label: 'Median study time in prep course' },
  ],
};
