import type { CompanyContent } from '@/content/types';

export const mediaPage: CompanyContent = {
  path: '/media',
  seo: {
    title: 'Press enquiries — Princeton Review Bangladesh media kit and contact',
    description:
      'Media kit, brand guidelines, fact sheet and spokesperson contact for Princeton Review Bangladesh. For press enquiries email press@princetonreviewbd.com.',
  },
  hero: {
    eyebrow: 'Press',
    title: 'Newsroom',
    intro:
      'Media enquiries, brand assets, and information for journalists covering education, test preparation and study abroad. For press contact email press@princetonreviewbd.com.',
  },
  body: [
    {
      type: 'heading',
      text: 'About Princeton Review Bangladesh',
      id: 'about',
    },
    {
      type: 'paragraph',
      text: 'Princeton Review Bangladesh is part of the global Princeton Review network, founded in Princeton, New Jersey in 1980. We prepare students in Dhaka and Chattogram for standardised tests — SAT, ACT, GRE, GMAT, IELTS and TOEFL — and advise on admissions and study abroad. We operate teaching campuses in Gulshan and Dhanmondi in Dhaka, and in Chattogram, as well as live online programmes.',
    },
    { type: 'heading', text: 'Key facts' },
    {
      type: 'list',
      items: [
        'Founded: 1980 (global network); Bangladesh operations established 2005',
        'Students served: 12,000+ across Bangladesh',
        'Campuses: Gulshan, Dhanmondi and Chattogram',
        'Online reach: Live programmes open to students across Bangladesh',
        'Faculty: 50+ trained instructors',
        'Programmes: Test preparation, tutoring, admissions counseling, study-abroad guidance',
      ],
    },
    { type: 'heading', text: 'Media assets' },
    {
      type: 'paragraph',
      text: 'Brand guidelines, logos and fact sheets are available for accredited journalists and media outlets. Please request assets from press@princetonreviewbd.com with details of your publication and intended use.',
    },
    {
      type: 'list',
      items: [
        'Company logo (light and dark versions)',
        'High-resolution headshots of leadership',
        'Campus photography',
        'Fact sheet (PDF)',
        'Timeline of milestones in Bangladesh',
      ],
    },
    { type: 'heading', text: 'Spokespersons and expert interviews' },
    {
      type: 'paragraph',
      text: 'We offer expert commentary on test preparation, university admissions, international education and the study-abroad pathway. Our leadership can speak to trends in where Bangladeshi students are applying, changes in university admissions and how standardised tests are evolving.',
    },
    {
      type: 'list',
      items: [
        'Spokesperson availability: comments on admissions and test trends',
        'Expert interviews: one-on-one on education policy, student mobility and university access',
        'Student testimonials: we can connect journalists with consenting students for on-record interviews',
        'Data and research: anonymised data on score trends, university outcomes and scholarship patterns',
      ],
    },
    { type: 'heading', text: 'Contact and requests' },
    {
      type: 'paragraph',
      text: 'For all press enquiries, please email press@princetonreviewbd.com. Include the publication, your deadline, the story angle and the specific information you need. We aim to respond within one business day.',
    },
    {
      type: 'list',
      items: [
        'Email: press@princetonreviewbd.com',
        'General enquiries: hello@princetonreviewbd.com',
        'Dhaka office: +880 1700-000000',
        'Chattogram office: +880 1700-000002',
      ],
    },
    { type: 'heading', text: 'Our story in the news' },
    {
      type: 'paragraph',
      text: 'Links to recent coverage will appear here. If you have covered Princeton Review Bangladesh or plan to, we would appreciate you letting us know so we can share your work.',
    },
  ],
};
