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
  /**
   * How the sidebar decides this link is the current one. `exact` (the
   * default) suits a flat tree of leaf pages; `prefix` lights a section
   * whose pages nest below it, as the admin panel's do.
   */
  match?: 'exact' | 'prefix';
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
    href: '/dashboard/settings',
    label: 'Settings',
    blurb: 'The account we hold for you.',
  },
];

export function portalLinkFor(
  href: string,
  links: readonly PortalLink[] = portalLinks,
): PortalLink | undefined {
  return links.find((link) => link.href === href);
}

/** Whether `pathname` is the page `link` points at, by the link's own rule. */
export function isPortalLinkActive(link: PortalLink, pathname: string): boolean {
  if (link.match === 'prefix') {
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  }
  return pathname === link.href;
}
