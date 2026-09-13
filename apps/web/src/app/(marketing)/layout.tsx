import { AnnouncementBar } from '@/components/site/announcement-bar';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { JsonLd } from '@/components/ui/json-ld';
import { contact } from '@/content/site/contact';
import { getBranches } from '@/lib/cms';
import { siteDescription, siteName, siteUrl } from '@/lib/site';

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
 *
 * The one fetch here — the branch list for the organisation's structured
 * data — is tagged and cached like every other CMS read, so the subtree stays
 * static; it returns nothing if the API is unreachable at build time.
 */
export default async function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const branches = await getBranches();

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
          ...(branches.length > 0
            ? {
                location: branches.map((branch) => ({
                  '@type': 'Place',
                  name: branch.name,
                  ...(branch.phone ? { telephone: branch.phone } : {}),
                  ...(branch.address
                    ? { address: { '@type': 'PostalAddress', streetAddress: branch.address } }
                    : {}),
                })),
              }
            : {}),
        }}
      />

      {/* The brand rule across the very top of the document — yellow running
          into green, the two colours stated together once before the page uses
          them separately. */}
      <div
        aria-hidden
        className="h-[3px] bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent)_55%,var(--color-brand))]"
      />

      <AnnouncementBar />
      <SiteHeader />

      <main id="main">{children}</main>

      <SiteFooter />
    </div>
  );
}
