import type { Metadata } from 'next';

import { HubPage } from '@/components/templates/hub-page';
import { courseFamilies } from '@/content/exams';
import { testPrepHub } from '@/content/hubs/test-prep';
import type { GridCard } from '@/content/types';
import { getPublishedCourses } from '@/lib/cms';
import { deliveryModeLabels } from '@/lib/cms-enums';
import { coursePath } from '@/lib/course-view';
import { formatDayMonth } from '@/lib/dates';

export const metadata: Metadata = testPrepHub.seo;

/* Statically built, re-rendered daily so "next batch" moves on; an admin
   save refreshes it sooner. */
export const revalidate = 86400;

/**
 * The test-prep hub. Its course cards come from the CMS — every published
 * course, in the admin's order — so a course launched in the panel appears
 * here without a deploy. The hand-written card list in `content/hubs` is
 * kept as the fallback for when the API cannot be reached at build time.
 */
export default async function TestPrepPage() {
  const courses = await getPublishedCourses();

  const familyOf = new Map(
    courseFamilies.flatMap((family) => family.slugs.map((slug) => [slug, family.title] as const)),
  );

  const cards: readonly GridCard[] =
    courses.length > 0
      ? courses.map((course) => ({
          tag: familyOf.get(course.slug),
          title: course.name,
          desc: course.description,
          meta: [
            course.modes.map((mode) => deliveryModeLabels[mode]).join(' · '),
            course.nextBatch
              ? `Next batch ${formatDayMonth(course.nextBatch.startsOn)}`
              : 'Dates soon',
          ].join(' · '),
          href: coursePath(course.slug),
          image: course.thumbnailUrl ?? undefined,
        }))
      : testPrepHub.cards.items;

  return <HubPage content={{ ...testPrepHub, cards: { ...testPrepHub.cards, items: cards } }} />;
}
