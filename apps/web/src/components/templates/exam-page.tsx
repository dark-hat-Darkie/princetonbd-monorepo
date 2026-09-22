import { BatchList } from '@/components/sections/batch-list';
import { CourseFeeCard } from '@/components/sections/course-fee-card';
import { CtaSection } from '@/components/sections/cta-section';
import { CurriculumSection } from '@/components/sections/curriculum';
import { FaqSection } from '@/components/sections/faq-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { GuaranteeBand } from '@/components/sections/guarantee-band';
import { InstructorStrip } from '@/components/sections/instructor-strip';
import { StatsBand } from '@/components/sections/stats-band';
import { Testimonials } from '@/components/sections/testimonials';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHero } from '@/components/ui/page-hero';
import { defaultClosing, guaranteeBand } from '@/content/shared';
import { breadcrumbFor } from '@/content/site/routes';
import { batchLabel } from '@/lib/batches';
import type { CourseView } from '@/lib/course-view';
import { enrollHref } from '@/lib/enroll';
import { absoluteUrl, siteName, siteUrl } from '@/lib/site';

const availability = {
  open: 'https://schema.org/InStock',
  filling: 'https://schema.org/LimitedAvailability',
  waitlist: 'https://schema.org/PreOrder',
  closed: 'https://schema.org/SoldOut',
} as const;

/**
 * A single course's page — the site's highest-intent template.
 *
 * Takes a `CourseView`: the CMS record merged with its editorial overlay by
 * `lib/course-view.ts`, so this template never has to know which half a
 * field came from. The fee sits in the hero beside the title, the curriculum
 * follows, and the batch schedule is the enrolment surface: every "Enrol"
 * carries the batch into the enquiry form.
 */
export function ExamPage({ course }: { course: CourseView }) {
  const closing = course.closing ?? defaultClosing;
  const next = course.batches[0];
  const { curriculum } = course;
  const { totals } = curriculum;

  const heroFacts = [
    totals.weeks !== null ? `${String(totals.weeks)} weeks` : null,
    totals.taughtHours !== null ? `${String(totals.taughtHours)} taught hours` : null,
    totals.classSize ? `${totals.classSize} per class` : null,
    'Written score guarantee',
  ].filter((item): item is string => item !== null);

  return (
    <>
      {/* One Course, with a CourseInstance per scheduled batch, so a search
          result can show real dates and prices rather than a vague listing. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${course.name} preparation`,
          description: course.seo.description,
          url: absoluteUrl(course.path),
          ...(course.thumbnailUrl ? { image: course.thumbnailUrl } : {}),
          provider: { '@type': 'EducationalOrganization', name: siteName, url: siteUrl },
          ...(totals.weeks !== null ? { timeRequired: `P${String(totals.weeks)}W` } : {}),
          offers: {
            '@type': 'Offer',
            category: 'Paid',
            price: course.fee.price.amount,
            priceCurrency: course.fee.price.currency,
            url: absoluteUrl(course.path),
          },
          syllabusSections: curriculum.modules.map((module) => ({
            '@type': 'Syllabus',
            name: module.title,
            description: module.summary,
          })),
          hasCourseInstance: course.batches.map((batch) => {
            const fee = batch.fee ?? course.fee.price;

            return {
              '@type': 'CourseInstance',
              name: batchLabel(course.name, batch),
              courseMode: batch.mode === 'classroom' ? 'Onsite' : 'Online',
              ...(totals.taughtHours !== null
                ? { courseWorkload: `PT${String(totals.taughtHours)}H` }
                : {}),
              startDate: batch.startsOn,
              endDate: batch.endsOn,
              courseSchedule: {
                '@type': 'Schedule',
                startDate: batch.startsOn,
                endDate: batch.endsOn,
                repeatFrequency: 'Weekly',
                description: batch.schedule,
              },
              location: batch.branch
                ? {
                    '@type': 'Place',
                    name: batch.branch.name,
                    ...(batch.branch.address
                      ? {
                          address: {
                            '@type': 'PostalAddress',
                            streetAddress: batch.branch.address,
                          },
                        }
                      : {}),
                  }
                : { '@type': 'VirtualLocation', url: absoluteUrl(course.path) },
              ...(batch.teacherName
                ? { instructor: { '@type': 'Person', name: batch.teacherName } }
                : {}),
              offers: {
                '@type': 'Offer',
                category: 'Paid',
                price: fee.amount,
                priceCurrency: fee.currency,
                availability: availability[batch.status],
                url: absoluteUrl(enrollHref({ courseSlug: course.slug, batchId: batch.id })),
              },
            };
          }),
        }}
      />

      <PageHero
        breadcrumb={breadcrumbFor(course.path)}
        {...course.hero}
        note={
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
            {heroFacts.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        }
        aside={<CourseFeeCard course={course} next={next} />}
      />

      {curriculum.modules.length > 0 ? (
        <CurriculumSection name={course.name} curriculum={curriculum} />
      ) : null}

      <FeatureGrid
        eyebrow={course.includes.eyebrow}
        title={course.includes.title}
        intro={course.includes.intro}
        features={course.includes.items}
      />

      <BatchList course={course} batches={course.batches} />

      <InstructorStrip name={course.name} teachers={course.teachers} />

      <GuaranteeBand
        eyebrow={guaranteeBand.eyebrow}
        title={guaranteeBand.title}
        body={guaranteeBand.body}
        action={guaranteeBand.action}
        features={guaranteeBand.features}
      />

      {course.stats?.length ? <StatsBand stats={course.stats} /> : null}

      {course.testimonials.length > 0 ? (
        <Testimonials
          eyebrow="Student outcomes"
          title={`What ${course.name} students did next.`}
          items={course.testimonials}
        />
      ) : null}

      <FaqSection title={`${course.name} questions, answered.`} items={course.faq} />

      <CtaSection
        eyebrow={closing.eyebrow}
        title={closing.title}
        body={closing.body}
        action={closing.action}
      />
    </>
  );
}
