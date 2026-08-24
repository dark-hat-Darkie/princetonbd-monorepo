import type { HubContent } from '../types';
import { commonFaq } from '../shared';

export const onlineCoursesHub: HubContent = {
  path: '/online-courses',
  seo: {
    title: 'Online courses in Bangladesh — test prep, live online, self-paced learning',
    description:
      'Flexible online learning formats: live-streamed courses from our instructors, self-paced video libraries, and on-demand content. Perfect for students anywhere in Bangladesh.',
  },
  hero: {
    eyebrow: 'Online learning',
    title: 'Wherever you are, whenever you are ready.',
    intro:
      'Not everyone can make Gulshan on a Tuesday afternoon. Study live with instructors in real time, move at your own pace, or mix the two. All formats, delivered online.',
    actions: [
      { label: 'Browse all courses', href: '/online-courses/live-online' },
      { label: 'Book a free diagnostic', href: '/free-diagnostic', variant: 'outline' },
    ],
    facts: [
      { label: 'Formats', value: 'LiveOnline · Self-paced · On-demand library' },
      { label: 'Exams covered', value: 'SAT · ACT · GRE · GMAT · IELTS · TOEFL · AP' },
      { label: 'Availability', value: '24/7 self-paced · Scheduled live classes' },
      { label: 'Access', value: 'Anywhere in Bangladesh · Recorded sessions' },
    ],
  },
  cards: {
    eyebrow: 'Choose your format',
    title: 'Online learning, multiple ways.',
    intro:
      'Whether you want the structure of a live class, the flexibility of self-paced study, or a video library you can dip into, we have a format that matches how you learn best.',
    items: [
      {
        no: '01',
        tag: 'Format',
        title: 'LiveOnline classes',
        desc: 'Real-time instruction with our faculty, live Q&A, and the camaraderie of a cohort. Study from home with the structure and support of a classroom.',
        meta: 'Weekly schedules · Recorded sessions',
        href: '/online-courses/live-online',
      },
      {
        no: '02',
        tag: 'Format',
        title: 'Self-paced',
        desc: 'Move at your own speed through video lessons, drills, and full-length mocks. Perfect for students balancing school, work, or a custom timeline.',
        meta: '6–12 month access',
        href: '/online-courses/self-paced',
      },
      {
        no: '03',
        tag: 'Format',
        title: 'On-demand library',
        desc: 'Curated video content covering specific topics and sections. Search for exactly what you need, watch once or dozens of times.',
        meta: '1000+ lessons',
        href: '/online-courses/on-demand',
      },
      {
        no: '04',
        tag: 'Free to start',
        title: 'Free practice tests',
        desc: 'Full-length, timed mock exams for SAT, ACT, GRE, GMAT, IELTS and TOEFL. Sit one, get a score report and see where to focus your prep.',
        meta: 'Unlimited attempts',
        href: '/free-practice-tests',
      },
      {
        no: '05',
        tag: 'Free to start',
        title: 'Free diagnostic',
        desc: 'A short, adaptive diagnostic that scores immediately. Get a baseline score and personalized recommendations on what to study next.',
        meta: '30 minutes · No registration',
        href: '/free-diagnostic',
      },
      {
        no: '06',
        tag: 'Free to start',
        title: 'Events & webinars',
        desc: 'Live Q&A sessions with our instructors, admissions panels, scholarship webinars and study strategy sessions. Free to attend, no booking required.',
        meta: 'Twice weekly · All timezones',
        href: '/events',
      },
    ],
  },
  features: {
    eyebrow: 'Why here',
    title: 'What makes our online learning different.',
    items: [
      {
        title: 'Instruction, not just content',
        desc: 'We do not just upload videos. Every online course is taught live by an instructor trained in pacing, engagement and creating classroom community — even through a screen.',
      },
      {
        title: 'Adaptive and personalized',
        desc: 'Our platform adapts to your level and pace. Take longer on weak areas, accelerate through what you know, skip what you have mastered.',
      },
      {
        title: 'Full support, online',
        desc: 'Live office hours, forum discussion, one-to-one tutoring add-ons and email support. Online learning is not solitary learning.',
      },
      {
        title: 'The same rigorous curriculum',
        desc: 'LiveOnline classes follow the identical syllabus to our classroom courses. No watered-down version; just delivered differently.',
      },
    ],
  },
  stats: [
    { value: '5,000+', label: 'Students studying online this year' },
    { value: '98%', label: 'Course completion rate' },
    { value: '1000+', label: 'On-demand videos available' },
    { value: '24/7', label: 'Learning access' },
  ],
  testimonials: ['online'],
  faq: [
    {
      question: 'Is online learning as effective as classroom instruction?',
      answer:
        'Yes, when done well. Our online students show the same score improvements as classroom students because the instruction is the same, the teachers are the same, and the preparation is equally rigorous. The difference is just delivery — video instead of whiteboard.',
    },
    {
      question: 'Can I switch between formats during my course?',
      answer:
        'Yes. Many students start with self-paced to see how they go, then jump into a LiveOnline cohort once they know where they stand. You can also add one-to-one tutoring if you need it. Talk to an enrolment advisor about what flexibility works for you.',
    },
    {
      question: 'How long do I have access to recorded sessions?',
      answer:
        'LiveOnline courses include access to recorded sessions for the duration of your course, typically three to six months. Self-paced courses grant six to twelve months of access depending on the package. On-demand library content has lifetime access once purchased.',
    },
    ...commonFaq,
  ],
};
