import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { TeacherView } from '@/lib/course-view';

/**
 * Who teaches this course. Rendered only when the CMS names someone for it —
 * an empty "meet your instructors" band is worse than none.
 *
 * A photo when one has been uploaded, the monogram otherwise; the monogram
 * treatment is good enough that shipping without photographs is a choice,
 * not a fallback.
 */
export function InstructorStrip({
  name,
  teachers,
}: {
  name: string;
  teachers: readonly TeacherView[];
}) {
  if (teachers.length === 0) return null;

  return (
    <Container as="section" className="py-(--section-y-sm) lg:py-(--section-y)">
      <SectionHeading
        eyebrow="Your instructors"
        title={`Who teaches the ${name} course.`}
        action={{ label: 'Meet the whole faculty', href: '/about/instructors' }}
        className="mb-12"
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <li
            key={teacher.id}
            className="flex gap-5 rounded-md border border-line bg-surface p-6 shadow-card"
          >
            {teacher.imageUrl ? (
              <span className="relative size-12 flex-none overflow-hidden rounded-full bg-panel">
                <Image src={teacher.imageUrl} alt="" fill sizes="48px" className="object-cover" />
              </span>
            ) : (
              <span
                aria-hidden
                className="flex size-12 flex-none items-center justify-center rounded-full bg-ink font-display text-[15px] font-bold tracking-[.04em] text-accent"
              >
                {teacher.initials}
              </span>
            )}
            <div className="min-w-0">
              <div className="font-display text-[18px] leading-[1.25] font-semibold text-ink">
                {teacher.name}
              </div>
              <div className="mt-0.5 text-[12.5px] font-semibold tracking-[.02em] text-brand-ink">
                {teacher.designation}
              </div>
              {teacher.bio ? (
                <p className="mt-2.5 text-[13.5px] leading-[1.55] text-muted">{teacher.bio}</p>
              ) : null}
              {teacher.branchName ? (
                <div className="mt-2.5 text-[12.5px] text-muted-2">{teacher.branchName}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
