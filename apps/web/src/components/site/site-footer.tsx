import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';

import { contact, socials, telHref, type SocialLink } from '@/content/site/contact';
import { footerColumns, footerDisclaimers, legalLinks, year } from '@/content/site/footer';
import { Container } from '@/components/ui/container';
import { BrandMark } from '@/components/ui/brand-mark';

const socialIcons: Record<SocialLink['icon'], typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

export function SiteFooter() {
  return (
    <footer className="bg-ink text-on-ink/70">
      <Container className="pt-12 pb-8">
        {/* Brand block beside the links, with the link columns in their own
            nested grid, so the columns reflow 2 -> 3 -> 4 per row on narrower
            screens without the brand block ever being part of that flow. */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 border-b border-b-line-invert pb-8 nav:grid-cols-[minmax(240px,1fr)_3.1fr]">
          <div className="max-w-[300px]">
            <BrandMark variant="footer" className="mb-4" />
            <p className="mb-4 text-[14px] leading-[1.5] text-on-ink/55">
              Premier test preparation, tutoring &amp; admissions counseling &mdash; locally
              operated in Bangladesh.
            </p>
            <address className="text-[13.5px] leading-[1.55] text-on-ink/70 not-italic">
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
            {socials.length > 0 ? (
              <div className="mt-4 flex gap-2">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-full border border-line-invert text-on-ink/70 transition-colors duration-200 hover:text-accent"
                    >
                      <Icon className="size-[16px]" aria-hidden />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <div className="mb-3 text-[11px] font-bold tracking-[.14em] text-accent uppercase">
                  {column.title}
                </div>
                <div className="flex flex-col gap-2">
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

        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 pt-5 text-[13px] text-on-ink/50">
          <span>&copy; {year} Princeton Review Bangladesh. All rights reserved.</span>
          <div className="flex gap-5">
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

        {footerDisclaimers.map((disclaimer) => (
          <p key={disclaimer} className="pt-3 text-[12px] leading-[1.5] text-on-ink/40">
            {disclaimer}
          </p>
        ))}
      </Container>
    </footer>
  );
}
