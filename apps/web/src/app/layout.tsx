import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';

import { siteDescription, siteName, siteUrl } from '@/lib/site';
import './globals.css';

/* Self-hosted through next/font rather than a blocking <link> to Google. No
   third-party request on the critical path.

   Bricolage Grotesque carries an `opsz` axis defaulting to 14 — the setting for
   small text. Including the axis lets the browser's default
   `font-optical-sizing: auto` track it with the font size, so the 72px hero
   headline gets the tight, closed display cut instead of the airy caption one.
   Without it every headline renders at the caption optical size. */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  /* `%s` is filled from each page's own `title`; the home page and any page
     without one fall back to `default`. */
  title: {
    default: 'Princeton Review Bangladesh — Test prep, tutoring & admissions counseling',
    template: '%s | Princeton Review Bangladesh',
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    siteName,
    locale: 'en_BD',
  },
  /* The marketing site is a public brochure; the session-only routes are kept
     out of the index by robots.ts rather than per-page directives. */
  robots: { index: true, follow: true },
};

/**
 * Root layout: fonts, global styles and document scaffolding only.
 *
 * `withAuth()` deliberately does NOT live here. Reading the session touches
 * cookies, which opts every route into dynamic rendering — including the
 * marketing page, which should be static and CDN-cacheable. Session-aware
 * routes get it from the `(app)` layout instead.
 *
 * `scroll-pt-[104px]` is the sticky header's 92px plus a little air. Without it
 * every in-page jump — the hero's #programs and #enroll, and the contents rail
 * on the guide pages — lands with the target heading hidden underneath the bar.
 * Keep it in step with the header height in site-header.tsx.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-[104px]">
      <body
        className={`${bricolage.variable} ${hanken.variable} bg-canvas font-sans text-ink antialiased selection:bg-accent selection:text-on-accent [text-rendering:optimizeLegibility]`}
        /* Browser extensions commonly stamp attributes onto <body> before
           React hydrates — ColorZilla adds `cz-shortcut-listen="true"`,
           Grammarly adds `data-gr-ext-installed` — which React reports as a
           hydration mismatch even though the server output is correct.
           This suppresses the warning for THIS element's own attributes and
           text only; it does not cascade to children, so genuine mismatches
           inside the app are still reported. */
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-on-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
