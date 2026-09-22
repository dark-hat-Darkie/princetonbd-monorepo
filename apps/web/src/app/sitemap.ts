import type { MetadataRoute } from 'next';

import { routes } from '@/content/site/routes';
import { getPublishedCourses } from '@/lib/cms';
import { coursePath } from '@/lib/course-view';
import { absoluteUrl } from '@/lib/site';

/**
 * Generated from the same route registry the navigation and breadcrumbs use,
 * so a page cannot be in the menu and missing from the sitemap — plus every
 * published course, since a course launched in the admin panel has a page
 * whether or not the registry names it yet.
 *
 * `lastModified` is deliberately omitted. Stamping every entry with the build
 * time tells crawlers the whole site changed on every deploy, which is both
 * untrue and a good way to have the signal ignored.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const registered = new Set(routes.map((route) => route.path));
  const courses = await getPublishedCourses();

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.path.startsWith('/legal/')
        ? ('yearly' as const)
        : ('monthly' as const),
      priority: route.priority ?? 0.6,
    })),
    ...courses
      .filter((course) => !registered.has(coursePath(course.slug)))
      .map((course) => ({
        url: absoluteUrl(coursePath(course.slug)),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
  ];
}
