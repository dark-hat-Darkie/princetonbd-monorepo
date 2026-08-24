import type { Metadata } from 'next';

import { CtaSection } from '@/components/sections/cta-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Pill } from '@/components/ui/pill';
import { instructors } from '@/content/people';
import { breadcrumbFor } from '@/content/site/routes';

export const metadata: Metadata = {
  title: 'Our instructors — who actually teaches your course',
  description:
    'The faculty behind Princeton Review Bangladesh: what they teach, where they trained, and the scores they hold themselves. Every instructor completes 40+ hours of training before their first class.',
};

/**
 * The faculty page.
 *
 * Rendered from monograms rather than photographs. The design's initials
 * treatment carries this well, and shipping a real page with no photographs
 * beats shipping stock images of people who do not work here.
 */
export default function InstructorsPage() {
  return (
    <>
      <PageHero
        breadcrumb={breadcrumbFor('/about/instructors')}
        eyebrow="Faculty"
        title="Taught by people who sat the test themselves."
        intro="We hire on two things: the score, and whether you can explain how you got it. Both are tested before anyone is put in front of a class."
        facts={[
          { label: 'Faculty', value: String(instructors.length) },
          { label: 'Training', value: '40+ hours before first class' },
          { label: 'Class size', value: 'Capped at 10–12' },
          { label: 'Campuses', value: 'Gulshan · Dhanmondi · Chattogram' },
        ]}
      />

      <Container as="section" className="py-16 lg:py-20">
        <ul className="grid grid-cols-1 gap-px border border-[rgba(27,36,54,.09)] bg-[rgba(27,36,54,.09)] sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <li key={instructor.name} className="flex flex-col bg-surface px-7 py-8">
              <div className="mb-5 flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex size-14 flex-none items-center justify-center rounded-full bg-ink font-display text-[20px] text-gold-pale"
                >
                  {instructor.initials}
                </span>
                <div>
                  <div className="font-display text-[20px] leading-[1.2] text-ink-deep">
                    {instructor.name}
                  </div>
                  <div className="mt-1 text-[12.5px] tracking-[.02em] text-warm">
                    {instructor.role}
                  </div>
                </div>
              </div>

              <p className="mb-5 flex-1 text-[14.5px] leading-[1.6] text-muted">
                {instructor.credential}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {instructor.teaches.map((subject) => (
                  <Pill key={subject}>{subject}</Pill>
                ))}
              </div>

              <div className="border-t border-t-[rgba(27,36,54,.09)] pt-4 text-[12.5px] tracking-[.02em] text-warm">
                {instructor.campus}
              </div>
            </li>
          ))}
        </ul>
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
        action={{ label: 'Teach for us', href: '/careers/teach' }}
      />
    </>
  );
}
