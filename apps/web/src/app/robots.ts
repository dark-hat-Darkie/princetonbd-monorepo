import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      /* Session-only routes. Nothing here is secret — the proxy already
         guards them — but they are worthless in an index. */
      disallow: ['/dashboard', '/auth/', '/sign-in'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
