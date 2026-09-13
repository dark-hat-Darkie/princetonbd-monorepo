import type { Metadata } from 'next';
import Image from 'next/image';

import { CtaSection } from '@/components/sections/cta-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Pill } from '@/components/ui/pill';
import { breadcrumbFor } from '@/content/site/routes';
import { getBranches, getTeachers } from '@/lib/cms';
import { initialsOf } from '@/lib/course-view';

export const metadata: Metadata = {
  title: 'Our instructors — who actually teaches your course',
  description:
    'The faculty behind Princeton Review Bangladesh: what they teach, where they trained, and the scores they hold themselves. Every instructor completes 40+ hours of training before their first class.',
};

export const revalidate = 86400;

/**
 * The faculty page, from the CMS: every active teacher, the courses they are
 * assigned to, and their home branch.
 *
 * A photo when one has been uploaded, otherwise the yellow-on-ink monogram,
 * which carries the page well enough that shipping without photographs is a
 * legitimate choice rather than a fallback.
 */
export default async function InstructorsPage() {
  const [teachers, branches] = await Promise.all([getTeachers(), getBranches()]);
  const campusNames = branches.map((branch) => branch.name.replace(/^Dhaka — /, ''));

  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/about/instructors')}
        eyebrow="Faculty"
        title="Taught by people who sat the test themselves."
        intro="We hire on two things: the score, and whether you can explain how you got it. Both are tested before anyone is put in front of a class."
        facts={[
          { label: 'Faculty', value: String(teachers.length) },
          { label: 'Training', value: '40+ hours before first class' },
          { label: 'Class size', value: 'Capped at 10–12' },
          ...(campusNames.length > 0
            ? [{ label: 'Campuses', value: campusNames.join(' · ') }]
            : []),
        ]}
      />

      <Container as="section" className="py-16 lg:py-20">
        {teachers.length === 0 ? (
          <p className="text-[15px] leading-[1.6] text-muted">
            Faculty profiles are being updated. Book a free diagnostic and you will meet your
            instructor before you enrol.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <li
                key={teacher.id}
                className="flex flex-col rounded-md border border-line bg-surface p-7 shadow-card"
              >
                <div className="mb-5 flex items-center gap-4">
                  {teacher.imageUrl ? (
                    <span className="relative size-14 flex-none overflow-hidden rounded-full bg-panel">
                      <Image
                        src={teacher.imageUrl}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="flex size-14 flex-none items-center justify-center rounded-full bg-ink font-display text-[20px] font-bold tracking-[.04em] text-accent"
                    >
                      {initialsOf(teacher.name)}
                    </span>
                  )}
                  <div>
                    <div className="font-display text-[20px] leading-[1.2] font-semibold tracking-[-.02em] text-ink">
                      {teacher.name}
                    </div>
                    <div className="mt-1 text-[12.5px] font-semibold tracking-[.02em] text-brand-ink">
                      {teacher.designation}
                    </div>
                  </div>
                </div>

                {teacher.bio ? (
                  <p className="mb-5 flex-1 text-[14.5px] leading-[1.6] text-muted">
                    {teacher.bio}
                  </p>
                ) : null}

                {teacher.courses.length > 0 ? (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {teacher.courses.map((course) => (
                      <Pill key={course.id} href={`/test-prep/${course.slug}`}>
                        {course.name}
                      </Pill>
                    ))}
                  </div>
                ) : null}

                {teacher.branch ? (
                  <div className="border-t border-t-line pt-4 text-[12.5px] tracking-[.02em] text-muted-2">
                    {teacher.branch.name}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Container>

      <FeatureGrid
        eyebrow="How we hire"
        title="The bar, stated plainly."
        intro="Four things every instructor clears before they teach a paying student."
        features={[
          {
            title: 'A score in the top percentile',
            desc: 'On the exam they will teach, sat under real conditions — not a claimed score from years ago.',
          },
          {
            title: 'A teaching audition',
            desc: 'A live lesson to a real class, observed. Knowing the answer and being able to teach it are different skills.',
          },
          {
            title: '40+ hours of training',
            desc: 'Our method, our materials, and how to diagnose a wrong answer rather than just correct it.',
          },
          {
            title: 'Observed every term',
            desc: 'Classes are observed and student feedback is read. Instructors who slip get support, then get moved.',
          },
        ]}
      />

      <CtaSection
        eyebrow="Join us"
        title="Think you could teach here?"
        body="We are always looking for people who scored well and can explain why. Tell us what you teach and we will arrange an audition."
        action={{ label: 'Get in touch', href: '/contact' }}
      />
    </>
  );
}
