import type { MetadataRoute } from 'next';

import { routes } from '@/content/site/routes';
import { absoluteUrl } from '@/lib/site';

/**
 * Generated from the same route registry the navigation and breadcrumbs use,
 * so a page cannot be in the menu and missing from the sitemap.
 *
 * `lastModified` is deliberately omitted. Stamping every entry with the build
 * time tells crawlers the whole site changed on every deploy, which is both
 * untrue and a good way to have the signal ignored.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.path.startsWith('/legal/')
        ? ('yearly' as const)
        : ('monthly' as const),
      priority: route.priority ?? 0.6,
    })),
  ];
}
