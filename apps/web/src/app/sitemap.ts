import type { MetadataRoute } from 'next';

import { articles } from '@/content/resources/articles';
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
    /* Articles are the one part of the site behind a dynamic segment, so they
       are not in the route registry and have to be added explicitly. Here
       `lastModified` IS meaningful — it is the publication date, not the build
       time. */
    ...articles.map((article) => ({
      url: absoluteUrl(`/resources/${article.slug}`),
      lastModified: article.published,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
