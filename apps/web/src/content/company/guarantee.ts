import type { CompanyContent } from '@/content/types';

export const guaranteePage: CompanyContent = {
  path: '/about/guarantee',
  seo: {
    title: 'The Princeton Review score guarantee — free course repeat if you miss your target',
    description:
      'If you complete your course, attend classes and mocks, and sit the official exam but do not reach your target score, your next course is free. Terms, conditions and how to claim.',
  },
  hero: {
    eyebrow: 'The guarantee',
    title: 'Reach your target score, or study again — free.',
    intro:
      'We stake our reputation on your result. Complete your course and mock schedule, sit the official exam, and if you do not hit the agreed target, your next full course is on us.',
    facts: [
      { label: 'Applies to', value: 'SAT · ACT · GRE · GMAT · IELTS' },
      { label: 'Your investment', value: 'Attend every class and mock' },
      { label: 'Our investment', value: 'Free repeat course' },
      { label: 'Terms', value: 'See enrolment-terms' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'The score guarantee is simple: enrol in a full Princeton Review course, agree on a target score, complete the course and sit the official exam. If you do not reach that target, you study the next full course for free. No catch, no asterisk, no "except for these students".',
    },
    { type: 'heading', text: 'What the guarantee covers' },
    {
      type: 'list',
      items: [
        'Any exam we teach: SAT, ACT, GRE, GMAT, IELTS, TOEFL.',
        'Any target score agreed at enrolment, as long as it is mathematically reasonable for your starting point.',
        'One free repeat of the full course if you do not hit that target on your first official exam.',
        'The repeat is a full course: classes, mocks, reviews, and the works.',
      ],
    },
    { type: 'heading', text: 'What you must do to qualify' },
    {
      type: 'paragraph',
      text: 'The guarantee is a two-way agreement. We promise to get you to your target; you promise to show up and do the work.',
    },
    {
      type: 'list',
      items: [
        'Attend at least 90% of scheduled classes. Life happens — travel, illness, exams in other subjects. That is fine. Disappearing is not.',
        'Sit every scheduled full-length mock test in the same conditions as the real exam: timed, proctored, without your phone.',
        'Attend the review session after each mock to understand your mistakes.',
        'Sit the official exam within the test window agreed at enrolment. If you defer your exam date beyond that window, you lose the guarantee.',
        'No side tutoring from competing providers while you are enrolled with us.',
      ],
    },
    { type: 'heading', text: 'What the guarantee does not cover' },
    {
      type: 'list',
      items: [
        'One-off tutoring sessions or drop-in classes. The guarantee applies to full courses only.',
        'Changing your target score after enrolment. Your target is set at registration and locked in.',
        'Sitting the exam in a different format than you trained for. Train for digital SAT, sit digital SAT.',
        'Score improvements due to external tutoring. If you are seeing another provider, your results are on them, not us.',
        'Admissions outcomes. We guarantee a score, not an admission letter. A score is testable; an admissions decision is not.',
      ],
    },
    { type: 'heading', text: 'How to make a claim' },
    {
      type: 'paragraph',
      text: 'As soon as your official score is released, email a copy to hello@princetonreviewbd.com with your enrolment date and your target score. Include your official score report and confirmation that you sat the exam. Our registrar will verify your attendance and mock-test records. If everything is in order, you will receive an enrolment voucher for the next full course within five working days.',
    },
    {
      type: 'paragraph',
      text: 'Full terms and conditions are available in our enrolment-terms document. Read that before you sign up so there is no confusion about what the guarantee is and what it is not.',
    },
  ],
  features: {
    eyebrow: 'What the guarantee means',
    title: 'We are confident. Here is why.',
    items: [
      {
        title: 'Faculty trained on top global university curricula',
        desc: 'Instructors are selected on their own scores and trained for over 40 hours before they teach a single class.',
      },
      {
        title: 'Full-length adaptive mock tests, scored & reviewed',
        desc: 'Every mock is scored the way the real exam scores, with a review session on every paper you sit.',
      },
      {
        title: 'Small cohorts with measured weekly progress',
        desc: 'Capped class sizes so your instructor knows your weak spots by name, not by spreadsheet.',
      },
      {
        title: 'Written commitment',
        desc: 'Your target is agreed and documented at enrolment. No moving the goalposts, no "actually we can only offer eight points".',
      },
    ],
  },
};
