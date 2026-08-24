import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { navGroups } from '@/content/site/nav';
import { footerColumns, legalLinks } from '@/content/site/footer';
import { breadcrumbFor } from '@/content/site/routes';

export const metadata: Metadata = {
  title: 'Site map',
  description: 'Every page on the Princeton Review Bangladesh website, in one list.',
};

/**
 * Rendered from `nav.ts` and `footer.ts` rather than maintained by hand, so it
 * is a view of the site's real structure and cannot quietly fall behind it.
 */
export default function SiteMapPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/site-map')}
        eyebrow="Site map"
        title="Everything, in one list."
        intro="Every page the site holds, grouped the way the navigation groups them."
      />

      <Container as="section" className="py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {navGroups.map((group) => (
            <div key={group.href}>
              <Link
                href={group.href}
                className="mb-6 inline-block border-b-[1.5px] border-b-gold pb-1.5 font-display text-[24px] text-ink-deep"
              >
                {group.label}
              </Link>

              {group.columns.map((column) => (
                <div key={column.title} className="mb-6">
                  <div className="mb-3 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                    {column.title}
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="text-[14.5px] text-ink-nav transition-colors duration-200 hover:text-gold-deep"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* Footer-only destinations: legal documents, the resource library
              and the enquiry pages never appear in the mega-menu columns. */}
          <div>
            <span className="mb-6 inline-block border-b-[1.5px] border-b-gold pb-1.5 font-display text-[24px] text-ink-deep">
              More
            </span>

            {footerColumns.map((column) => (
              <div key={column.title} className="mb-6">
                <div className="mb-3 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                  {column.title}
                </div>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[14.5px] text-ink-nav transition-colors duration-200 hover:text-gold-deep"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mb-6">
              <div className="mb-3 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                Legal
              </div>
              <ul className="flex flex-col gap-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14.5px] text-ink-nav transition-colors duration-200 hover:text-gold-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
