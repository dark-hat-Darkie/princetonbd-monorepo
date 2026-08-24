import type { CompanyContent } from '@/content/types';

export const eventsPage: CompanyContent = {
  path: '/events',
  seo: {
    title: 'Events at Princeton Review Bangladesh — info sessions, webinars and practice tests',
    description:
      'Free information sessions, webinars, practice-test days and campus open houses. Find upcoming events at Gulshan, Dhanmondi and Chattogram campuses.',
  },
  hero: {
    eyebrow: 'Events',
    title: 'Sit a free practice test. Tour a campus. Ask a counselor.',
    intro:
      'Free information sessions, webinars on university admissions and study abroad, free full-length practice tests every Saturday, and campus open days. All free, no obligation.',
    facts: [
      { label: 'Free practice tests', value: 'Every Saturday' },
      { label: 'Locations', value: 'Gulshan · Dhanmondi · Chattogram · Online' },
      { label: 'Tests available', value: 'SAT · ACT · GRE · GMAT · IELTS' },
      { label: 'RSVP required', value: 'Email or call to book' },
    ],
  },
  body: [
    {
      type: 'paragraph',
      text: 'We run free events every week: practice tests on Saturday mornings, information sessions on Wednesday evenings, and webinars on themes like "Getting into US universities" or "Is an MBA worth the cost?". Everything is free and no obligation to enrol. You sit a real test, get a real score, and talk to someone who knows the admissions landscape.',
    },
    { type: 'heading', text: 'Free practice-test days' },
    {
      type: 'paragraph',
      text: 'Full-length, properly proctored tests in the format you will actually sit. Every test is scored the same day and reviewed by an instructor. You see your score, you understand what is costing you points, and you leave with a clear sense of where you are and how far your target is.',
    },
    {
      type: 'list',
      items: [
        'When: Every Saturday morning, three sessions per day (8 am, 10 am, 12 pm)',
        'Where: Gulshan campus, Dhanmondi campus, Chattogram campus, or online (Zoom)',
        'Tests: SAT, ACT, GRE, GMAT, IELTS — you choose',
        'Cost: Free',
        'Length: Two to four hours depending on the test',
        'Outcome: Scored the same day, reviewed by an instructor',
      ],
    },
    { type: 'heading', text: 'Information sessions' },
    {
      type: 'paragraph',
      text: 'Small-group sessions where we walk you through the landscape: which exam to sit, which universities fit your profile, how admissions timelines work, and where scholarships come from. You sit a short diagnostic, we score it while you are here, and then a counselor walks you through what it means.',
    },
    {
      type: 'list',
      items: [
        'When: Wednesday evenings, 6 pm to 7:30 pm',
        'Topics: Test selection, admissions strategy, study-abroad pathways, scholarship hunting',
        'Group size: Eight to fifteen students',
        'Cost: Free',
        'Book via: hello@princetonreviewbd.com or phone the campus',
      ],
    },
    { type: 'heading', text: 'Webinars and online events' },
    {
      type: 'paragraph',
      text: 'Live online sessions on specific topics: "The US admissions timeline", "How the SAT changed", "Paying for university", "Getting scholarships", and more. Interactive — you can ask questions live — and recorded so you can watch later if the timing does not work.',
    },
    {
      type: 'list',
      items: [
        'When: Weekday evenings, 7 pm to 8 pm',
        'Format: 40 minutes on topic, 20 minutes for questions',
        'Cost: Free',
        'Sign up: emailed calendar of upcoming webinars when you contact us',
      ],
    },
    { type: 'heading', text: 'Campus open days' },
    {
      type: 'paragraph',
      text: 'Walk our campuses, meet instructors, see the classrooms and the mock-test facilities, and talk to current students about what it is like to study with us. Held monthly at each campus.',
    },
    { type: 'heading', text: 'Event schedule (recurring)' },
    {
      type: 'paragraph',
      text: 'This is our standard weekly schedule. For specific dates, book through the website or contact us at hello@princetonreviewbd.com.',
    },
    {
      type: 'table',
      head: ['Day', 'Time', 'Event', 'Location', 'To book'],
      rows: [
        [
          'Saturday',
          '8:00 am',
          'Free practice test',
          'All campuses + online',
          'hello@princetonreviewbd.com',
        ],
        [
          'Saturday',
          '10:00 am',
          'Free practice test',
          'All campuses + online',
          'hello@princetonreviewbd.com',
        ],
        [
          'Saturday',
          '12:00 pm',
          'Free practice test',
          'All campuses + online',
          'hello@princetonreviewbd.com',
        ],
        [
          'Wednesday',
          '6:00 pm',
          'Information session',
          'Gulshan + Dhanmondi',
          'hello@princetonreviewbd.com',
        ],
        ['Monday', '7:00 pm', 'Webinar: Admissions', 'Online', 'Sign up via website'],
        ['Thursday', '7:00 pm', 'Webinar: Scholarships', 'Online', 'Sign up via website'],
        [
          'Second Sunday',
          '2:00 pm',
          'Campus open day',
          'Gulshan or Dhanmondi',
          'hello@princetonreviewbd.com',
        ],
        [
          'Fourth Saturday',
          '10:00 am',
          'Campus open day',
          'Chattogram',
          'hello@princetonreviewbd.com',
        ],
      ],
    },
    { type: 'heading', text: 'How to book' },
    {
      type: 'paragraph',
      text: 'Email hello@princetonreviewbd.com with the event you want to attend, your name, phone number and which test you are interested in (for practice-test days). You can also call any campus directly.',
    },
  ],
};
