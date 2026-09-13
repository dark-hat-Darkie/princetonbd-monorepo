import { revalidatePath, revalidateTag, updateTag } from 'next/cache';

import { CMS_TAG, courseTag } from '@/lib/cms-tags';

/**
 * Bring the public site up to date after an admin write.
 *
 * Two mechanisms on purpose. `updateTag` on the touched course pages expires
 * them outright, so the admin who just changed a price and opens the page
 * sees the new price rather than a stale copy served while a refresh runs
 * in the background. `revalidateTag(…, 'max')` on the umbrella tag marks
 * everything else (listings, the compare table, the contact page's batch
 * lookup) stale-while-revalidate, which is the right trade for pages nobody
 * is waiting on. The path call covers the route itself, not just its data.
 *
 * Only callable from a Server Action — `updateTag` refuses anywhere else.
 */
export function revalidateCms({
  courseSlugs = [],
}: { courseSlugs?: readonly string[] } = {}): void {
  for (const slug of courseSlugs) {
    updateTag(courseTag(slug));
  }
  revalidateTag(CMS_TAG, 'max');
  revalidatePath('/test-prep/[slug]', 'page');
}
