import { portalLinkFor, type PortalLink } from '@/components/dashboard/portal-nav';

/**
 * The admin panel's navigation and page titles, one list, same idea as the
 * student portal's `portal-nav.ts`: the sidebar, the drawer and every page
 * header read from here.
 *
 * Every section except Overview uses prefix matching because its pages nest:
 * `/admin/courses/<id>/batches/new` is still "Courses".
 *
 * No link to the student portal: an admin account is not a student account,
 * and `/dashboard` sends admins straight back here.
 */
export const adminLinks: readonly PortalLink[] = [
  {
    href: '/admin',
    label: 'Overview',
    blurb: 'What is published, what is scheduled, and what still needs attention.',
  },
  {
    href: '/admin/courses',
    label: 'Courses',
    blurb: 'Every course: price, curriculum, batches, teachers and testimonials.',
    match: 'prefix',
  },
  {
    href: '/admin/branches',
    label: 'Branches',
    blurb: 'The campuses classroom batches run at.',
    match: 'prefix',
  },
  {
    href: '/admin/teachers',
    label: 'Teachers',
    blurb: 'The faculty shown on course pages, and where each one is based.',
    match: 'prefix',
  },
  {
    href: '/admin/testimonials',
    label: 'Testimonials',
    blurb: 'Student quotes and the courses each one may appear on.',
    match: 'prefix',
  },
  {
    href: '/admin/payments',
    label: 'Payments',
    blurb: 'Every enrollment payment: status, student, amount, and verification timeline.',
    match: 'prefix',
  },
  {
    href: '/admin/students',
    label: 'Students',
    blurb: 'Everyone with an account, and the counselor assigned to each one.',
    match: 'prefix',
  },
];

export function adminLinkFor(href: string): PortalLink | undefined {
  return portalLinkFor(href, adminLinks);
}
