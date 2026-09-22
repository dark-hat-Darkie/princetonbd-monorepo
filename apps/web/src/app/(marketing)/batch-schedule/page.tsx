import type { Metadata } from 'next';

import { BatchFinder } from '@/components/schedule/batch-finder';
import { CtaSection } from '@/components/sections/cta-section';
import { PageHero } from '@/components/ui/page-hero';
import { Section } from '@/components/ui/section';
import { editorialFor } from '@/content/exams';
import { breadcrumbFor } from '@/content/site/routes';
import { getBranches, getPublishedCourses, getUpcomingBatches } from '@/lib/cms';
import { coursePath } from '@/lib/course-view';
import { bdtPrice } from '@/lib/money';
import {
  parseSelection,
  placeOptions,
  popularSearches,
  toScheduleBatch,
  type ScheduleCourse,
} from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'Batch schedule — upcoming batches by campus and course',
  description:
    'Every upcoming Princeton Review Bangladesh batch in one place. Pick a campus and a course to see start dates, class days and times, seats and fees, and reserve a seat from the list.',
};

/**
 * The batch schedule: every upcoming batch across every published course,
 * narrowed by campus and course.
 *
 * Reads `?branch=` and `?course=` so a shared link and a no-JavaScript
 * visit both land on the right list; that makes the page dynamically
 * rendered, like /contact, but the three CMS reads behind it are cached and
 * tagged like every other, so a request costs a render and no API calls.
 * Filtering after the first paint happens in the browser (see
 * `BatchFinder`), which is why every batch is fetched here rather than only
 * the ones the URL asks for.
 */
export default async function BatchSchedulePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [params, batches, branches, courses] = await Promise.all([
    searchParams,
    getUpcomingBatches(),
    getBranches(),
    getPublishedCourses(),
  ]);

  const courseBySlug = new Map<string, ScheduleCourse>(
    courses.map((course) => [
      course.slug,
      {
        slug: course.slug,
        name: course.name,
        path: coursePath(course.slug),
        interest: editorialFor(course.slug)?.interest ?? 'Something else',
        price: bdtPrice(course.priceAmount),
      },
    ]),
  );

  /* A batch whose course is missing from the listing (a race between two
     cached reads, at worst) is dropped rather than shown without a price. */
  const rows = batches.flatMap((batch) => {
    const course = courseBySlug.get(batch.courseSlug);
    return course ? [toScheduleBatch(batch, course)] : [];
  });

  const places = placeOptions(branches);
  const courseOptions = courses.map((course) => ({ key: course.slug, label: course.name }));
  const initial = parseSelection(params, { places, courses: courseOptions });

  const facts = [
    { label: 'Upcoming batches', value: String(rows.length) },
    {
      label: 'Where',
      value: `${String(branches.length)} ${branches.length === 1 ? 'campus' : 'campuses'} + live online`,
    },
    { label: 'Courses', value: String(courses.length) },
    { label: 'Time zone', value: 'Dhaka (GMT+6)' },
  ];

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/batch-schedule')}
        eyebrow="Batch schedule"
        title="Find a batch that fits your week."
        intro="Choose a campus and a course to see every upcoming batch — start date, class days and times, seats and fee — and reserve a seat straight from the list."
        facts={facts}
      />

      <Section>
        <BatchFinder
          batches={rows}
          places={places}
          courses={courseOptions}
          popular={popularSearches(rows)}
          initial={initial}
        />
      </Section>

      <CtaSection
        eyebrow="Nothing that fits?"
        title="Tell us when you can study."
        body="Batches are added every month. Book a free consultation, tell us your target date and the hours you have, and an advisor will hold a seat in the next batch that fits — or arrange 1-on-1 tutoring around your schedule."
        action={{ label: 'Book a free consultation', href: '/contact' }}
      />
    </>
  );
}
