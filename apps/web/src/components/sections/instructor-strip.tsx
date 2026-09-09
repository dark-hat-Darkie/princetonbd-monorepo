import type { Instructor } from '@/content/people';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Who teaches this course. Rendered only when the roster names someone for
 * the exam — an empty "meet your instructors" band is worse than none.
 */
export function InstructorStrip({
  name,
  instructors,
}: {
  name: string;
  instructors: readonly Instructor[];
}) {
  if (instructors.length === 0) return null;

  return (
    <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
      <SectionHeading
        eyebrow="Your instructors"
        title={`Who teaches the ${name} course.`}
        action={{ label: 'Meet the whole faculty', href: '/about/instructors' }}
        className="mb-12"
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <li
            key={instructor.name}
            className="flex gap-5 rounded-md border border-line bg-surface p-6 shadow-card"
          >
            <span
              aria-hidden
              className="flex size-12 flex-none items-center justify-center rounded-full bg-ink font-display text-[15px] font-bold tracking-[.04em] text-accent"
            >
              {instructor.initials}
            </span>
            <div className="min-w-0">
              <div className="font-display text-[18px] leading-[1.25] font-semibold text-ink">
                {instructor.name}
              </div>
              <div className="mt-0.5 text-[12.5px] font-semibold tracking-[.02em] text-brand-ink">
                {instructor.role}
              </div>
              <p className="mt-2.5 text-[13.5px] leading-[1.55] text-muted">
                {instructor.credential}
              </p>
              <div className="mt-2.5 text-[12.5px] text-muted-2">{instructor.campus}</div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
