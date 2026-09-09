import type { ExamContent } from '@/content/types';
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
import { batchFee, batchLabel, batchesFor, enrolHref } from '@/content/batches';
import { instructorsFor } from '@/content/people';
import { defaultClosing, guaranteeBand, testimonialsFor } from '@/content/shared';
import { campuses } from '@/content/site/contact';
import { breadcrumbFor } from '@/content/site/routes';
import { absoluteUrl, siteName, siteUrl } from '@/lib/site';

const availability = {
  open: 'https://schema.org/InStock',
  filling: 'https://schema.org/LimitedAvailability',
  waitlist: 'https://schema.org/PreOrder',
  closed: 'https://schema.org/SoldOut',
} as const;

/**
 * A single exam's course page — the site's highest-intent template, and the
 * one repeated most often (twelve exams).
 *
 * One course per exam. The fee sits in the hero beside the title, the
 * curriculum follows, and the batch schedule is the enrolment surface: every
 * "Enrol" carries the batch into the enquiry form.
 *
 * `now` is a prop so a test can pin the date the batch list is filtered by;
 * the route files set `revalidate` so a built page re-filters daily.
 */
export function ExamPage({ content, now = new Date() }: { content: ExamContent; now?: Date }) {
  const closing = content.closing ?? defaultClosing;
  const quotes = testimonialsFor(content.testimonials ?? []);
  const upcoming = batchesFor(content.slug, now);
  const next = upcoming[0];
  const faculty = instructorsFor(content.name);
  const { curriculum } = content;

  return (
    <>
      {/* One Course, with a CourseInstance per scheduled batch, so a search
          result can show real dates and prices rather than a vague listing. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${content.name} preparation`,
          description: content.seo.description,
          url: absoluteUrl(content.path),
          provider: { '@type': 'EducationalOrganization', name: siteName, url: siteUrl },
          timeRequired: `P${String(curriculum.totals.weeks)}W`,
          offers: {
            '@type': 'Offer',
            category: 'Paid',
            price: content.fee.price.amount,
            priceCurrency: content.fee.price.currency,
            url: absoluteUrl(content.path),
          },
          syllabusSections: curriculum.modules.map((module) => ({
            '@type': 'Syllabus',
            name: module.title,
            description: module.summary,
          })),
          hasCourseInstance: upcoming.map((batch) => {
            const campus = campuses.find((entry) => entry.name === batch.campus);
            const fee = batchFee(content, batch);

            return {
              '@type': 'CourseInstance',
              name: batchLabel(content, batch),
              courseMode: batch.mode === 'Classroom' ? 'Onsite' : 'Online',
              courseWorkload: `PT${String(curriculum.totals.taughtHours)}H`,
              startDate: batch.startsOn,
              endDate: batch.endsOn,
              courseSchedule: {
                '@type': 'Schedule',
                startDate: batch.startsOn,
                endDate: batch.endsOn,
                repeatFrequency: 'Weekly',
                description: batch.schedule,
              },
              location: campus
                ? {
                    '@type': 'Place',
                    name: campus.name,
                    address: { '@type': 'PostalAddress', streetAddress: campus.address },
                  }
                : { '@type': 'VirtualLocation', url: absoluteUrl(content.path) },
              ...(batch.instructor
                ? { instructor: { '@type': 'Person', name: batch.instructor } }
                : {}),
              offers: {
                '@type': 'Offer',
                category: 'Paid',
                price: fee.amount,
                priceCurrency: fee.currency,
                availability: availability[batch.status],
                url: absoluteUrl(enrolHref(content, batch)),
              },
            };
          }),
        }}
      />

      <PageHero
        breadcrumb={breadcrumbFor(content.path)}
        {...content.hero}
        note={
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
            {[
              `${String(curriculum.totals.weeks)} weeks`,
              `${String(curriculum.totals.taughtHours)} taught hours`,
              `${curriculum.totals.classSize} per class`,
              'Written score guarantee',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        }
        aside={<CourseFeeCard exam={content} next={next} />}
      />

      <CurriculumSection name={content.name} curriculum={curriculum} />

      <FeatureGrid
        eyebrow={content.includes.eyebrow}
        title={content.includes.title}
        intro={content.includes.intro}
        features={content.includes.items}
      />

      <BatchList exam={content} batches={upcoming} />

      <InstructorStrip name={content.name} instructors={faculty} />

      <GuaranteeBand
        eyebrow={guaranteeBand.eyebrow}
        title={guaranteeBand.title}
        body={guaranteeBand.body}
        action={guaranteeBand.action}
        features={guaranteeBand.features}
      />

      {content.stats?.length ? <StatsBand stats={content.stats} /> : null}

      {quotes.length ? (
        <Testimonials
          eyebrow="Student outcomes"
          title={`What ${content.name} students did next.`}
          items={quotes}
        />
      ) : null}

      <FaqSection title={`${content.name} questions, answered.`} items={content.faq} />

      <CtaSection
        eyebrow={closing.eyebrow}
        title={closing.title}
        body={closing.body}
        action={closing.action}
      />
    </>
  );
}
