import Link from 'next/link';

import { telHref, contact } from '@/content/site/contact';
import { footerColumns, legalLinks, year } from '@/content/site/footer';
import { Container } from '@/components/ui/container';
import { BrandMark } from '@/components/ui/brand-mark';

export function SiteFooter() {
  return (
    <footer className="bg-ink text-foot-text">
      <Container className="pt-[72px] pb-8">
        <div className="grid grid-cols-1 gap-11 border-b border-b-[rgba(244,241,232,.1)] pb-[52px] sm:grid-cols-2 lg:grid-cols-3 nav:grid-cols-[1.7fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-[290px]">
            <BrandMark variant="footer" className="mb-5" />
            <p className="mb-5 text-[14px] leading-[1.65] text-foot-muted">
              Premier test preparation, tutoring &amp; admissions counseling &mdash; locally
              operated in Bangladesh.
            </p>
            <address className="text-[13.5px] leading-[1.75] text-foot-text not-italic">
              {contact.address}
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={telHref(contact.phone)}>{contact.phone}</a>
            </address>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <div className="mb-[18px] text-[11px] font-bold tracking-[.14em] text-gold-light uppercase">
                {column.title}
              </div>
              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[14px] text-foot-text transition-colors duration-200 hover:text-foot-bright"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 pt-[26px] text-[13px] text-foot-dim">
          <span>&copy; {year} Princeton Review Bangladesh. All rights reserved.</span>
          <div className="flex gap-[26px]">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-foot-bright"
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
