/**
 * The portal's navigation, and the page titles that go with it.
 *
 * One list so the sidebar, the mobile drawer and each page header cannot drift
 * apart — a page's own heading is read from here rather than retyped.
 */
export interface PortalLink {
  href: string;
  label: string;
  /** Rendered under the page title. */
  blurb: string;
}

export const portalLinks: readonly PortalLink[] = [
  {
    href: '/dashboard',
    label: 'Overview',
    blurb: 'Where you stand today, and what needs doing next.',
  },
  {
    href: '/dashboard/courses',
    label: 'My courses',
    blurb: 'What you are enrolled in, and how far through you are.',
  },
  {
    href: '/dashboard/schedule',
    label: 'Schedule',
    blurb: 'Every class, mock and check-in in the weeks ahead.',
  },
  {
    href: '/dashboard/scores',
    label: 'Scores',
    blurb: 'Every mock you have sat, and the distance left to your target.',
  },
  {
    href: '/dashboard/applications',
    label: 'Applications',
    blurb: 'Your university shortlist and where each one has got to.',
  },
  {
    href: '/dashboard/resources',
    label: 'Resources',
    blurb: 'Materials, recordings and practice sets for your courses.',
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    blurb: 'The account we hold for you.',
  },
];

export function portalLinkFor(href: string): PortalLink | undefined {
  return portalLinks.find((link) => link.href === href);
}
