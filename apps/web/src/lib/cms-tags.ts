/**
 * Cache tags shared by the public read path (`lib/cms.ts`, which attaches
 * them to fetches) and the admin write path (`lib/admin/revalidate.ts`,
 * which expires them). One module so a renamed tag cannot leave one side
 * pointing at nothing.
 */

/** On every CMS fetch; expiring it refreshes every public page at once. */
export const CMS_TAG = 'cms';
export const COURSES_TAG = 'cms:courses';
export const BATCHES_TAG = 'cms:batches';
export const BRANCHES_TAG = 'cms:branches';
export const TEACHERS_TAG = 'cms:teachers';

/** One course page; used for read-your-own-writes after an admin saves it. */
export function courseTag(slug: string): string {
  return `cms:course:${slug}`;
}
