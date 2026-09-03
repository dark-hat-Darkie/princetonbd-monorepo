import Link from 'next/link';

import { telHref, contact } from '@/content/site/contact';
import { footerColumns, legalLinks, year } from '@/content/site/footer';
import { Container } from '@/components/ui/container';
import { BrandMark } from '@/components/ui/brand-mark';

export function SiteFooter() {
  return (
    <footer className="bg-ink text-on-ink/70">
      <Container className="pt-[72px] pb-8">
        {/* Brand block beside the links, with the link columns in their own
            nested grid. A single flat grid worked while there were four
            columns; at eight the brand block would occupy one cell of the first
            row and the fifth column would wrap underneath it. Nesting lets the
            columns reflow 2 -> 3 -> 4 per row without the brand ever being part
            of that flow. */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 border-b border-b-line-invert pb-[52px] nav:grid-cols-[minmax(240px,1fr)_3.1fr]">
          <div className="max-w-[300px]">
            <BrandMark variant="footer" className="mb-5" />
            <p className="mb-5 text-[14px] leading-[1.65] text-on-ink/55">
              Premier test preparation, tutoring &amp; admissions counseling &mdash; locally
              operated in Bangladesh.
            </p>
            <address className="text-[13.5px] leading-[1.75] text-on-ink/70 not-italic">
              {contact.address}
              <br />
              <a href={`mailto:${contact.email}`} className="rounded-sm hover:text-accent">
                {contact.email}
              </a>
              <br />
              <a href={telHref(contact.phone)} className="rounded-sm hover:text-accent">
                {contact.phone}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <div className="mb-[18px] text-[11px] font-bold tracking-[.14em] text-accent uppercase">
                  {column.title}
                </div>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="rounded-sm text-[14px] leading-[1.35] text-on-ink/70 transition-colors duration-200 hover:text-on-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 pt-[26px] text-[13px] text-on-ink/50">
          <span>&copy; {year} Princeton Review Bangladesh. All rights reserved.</span>
          <div className="flex gap-[26px]">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-sm transition-colors duration-200 hover:text-on-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
