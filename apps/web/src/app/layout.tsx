import type { Metadata } from 'next';
import { Hanken_Grotesk, Libre_Caslon_Text, Newsreader } from 'next/font/google';

import { siteDescription, siteName, siteUrl } from '@/lib/site';
import './globals.css';

/* Self-hosted through next/font rather than the design's blocking <link> to
   Google. Same families and axes, no third-party request on the critical path. */
const libreCaslon = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-caslon',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

/* The design requests Newsreader in italic only (`ital,opsz,wght@1,6..72,…`). */
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-newsreader',
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
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${libreCaslon.variable} ${hanken.variable} ${newsreader.variable} bg-canvas font-sans text-ink antialiased selection:bg-gold-light selection:text-ink [text-rendering:optimizeLegibility]`}
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
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2 focus:text-on-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
