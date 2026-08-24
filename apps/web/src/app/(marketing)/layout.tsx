import { AnnouncementBar } from '@/components/site/announcement-bar';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { JsonLd } from '@/components/ui/json-ld';
import { campuses, contact } from '@/content/site/contact';
import { absoluteUrl, siteDescription, siteName, siteUrl } from '@/lib/site';

/**
 * Chrome for every public marketing page.
 *
 * The landing page used to render all of this inline. Hoisting it into a
 * layout is what makes a second page possible at all — and it keeps the header
 * and footer mounted across navigations, so the sticky bar does not re-mount
 * and the mega-menu keeps its open/closed state while a route transitions.
 *
 * Deliberately NOT in the root layout: `(app)` routes carry their own chrome,
 * and the root layout must stay free of anything that reads cookies so this
 * whole subtree can be statically rendered (see the note in ../layout.tsx).
 */
export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Declared once here rather than per page: it describes the business,
          not the document, and repeating it on sixty pages would say the same
          thing sixty times. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: siteName,
          url: siteUrl,
          description: siteDescription,
          email: contact.email,
          telephone: contact.phone,
          areaServed: 'BD',
          location: campuses.map((campus) => ({
            '@type': 'Place',
            name: campus.name,
            telephone: campus.phone,
            address: { '@type': 'PostalAddress', streetAddress: campus.address },
          })),
          sameAs: [absoluteUrl('/about')],
        }}
      />

      {/* Gold rule across the very top of the document. */}
      <div
        aria-hidden
        className="h-[3px] bg-[linear-gradient(90deg,#b8934e,#dcc492_45%,#b8934e)]"
      />

      <AnnouncementBar />
      <SiteHeader />

      <main id="main">{children}</main>

      <SiteFooter />
    </div>
  );
}
