import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { withAuth } from '@workos-inc/authkit-nextjs';

import { Panel, PanelEmpty } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { ProgressMeter } from '@/components/dashboard/progress-meter';
import { CtaButton } from '@/components/ui/cta-button';
import { loadStudentCourses } from '@/lib/dashboard-courses';
import { formatFullDate } from '@/lib/dates';

export const metadata: Metadata = { title: 'My courses', robots: { index: false, follow: false } };

const statusLabel = {
  'in-progress': 'In progress',
  upcoming: 'Starts soon',
  complete: 'Complete',
} as const;

/**
 * The learner's own enrollments, joined to the catalog: course name and
 * syllabus from the course, dates/room/teacher from the batch. Anything the
 * API cannot supply is left out rather than invented — no exam tag, no
 * attendance count, no per-learner progress yet.
 */
export default async function CoursesPage() {
  const { user } = await withAuth();

  if (!user) {
    redirect('/sign-in');
  }

  const link = portalLinkFor('/dashboard/courses');
  const result = await loadStudentCourses();

  if ('error' in result) {
    return (
      <>
        <PortalHeader title="My courses" blurb={link?.blurb ?? ''} />
        <Panel>
          <PanelEmpty>
            We could not reach the API just now. Your enrolments are safe — try reloading.
          </PanelEmpty>
        </Panel>
      </>
    );
  }

  const courses = result.courses;

  return (
    <>
      <PortalHeader title="My courses" blurb={link?.blurb ?? ''}>
        <CtaButton href="/test-prep" size="sm" variant="outline">
          Browse all courses
        </CtaButton>
      </PortalHeader>

      {courses.length === 0 ? (
        <Panel>
          <PanelEmpty>You are not enrolled in anything yet.</PanelEmpty>
        </Panel>
      ) : (
        <div className="flex flex-col gap-7">
          {courses.map((course) => {
            const done = course.modules.filter((unit) => unit.complete).length;

            return (
              <Panel key={course.slug}>
                <div className="grid grid-cols-1 gap-8 px-6 py-7 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span
                        className={
                          course.status === 'in-progress'
                            ? 'rounded-[2px] bg-cream px-2.5 py-1 text-[11px] font-bold tracking-[.08em] text-gold-deep uppercase'
                            : 'rounded-[2px] bg-band px-2.5 py-1 text-[11px] font-bold tracking-[.08em] text-warm uppercase'
                        }
                      >
                        {statusLabel[course.status]}
                      </span>
                    </div>

                    <h2 className="mb-3 font-display text-[25px] leading-[1.2] font-normal text-ink-deep">
                      {course.name}
                    </h2>

                    <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[13.5px]">
                      <dt className="text-warm">Format</dt>
                      <dd className="text-ink-soft">{course.format}</dd>
                      <dt className="text-warm">Instructor</dt>
                      <dd className="text-ink-soft">{course.instructor}</dd>
                      <dt className="text-warm">Runs</dt>
                      <dd className="text-ink-soft">
                        {formatFullDate(course.startsOn)} &ndash; {formatFullDate(course.endsOn)}
                      </dd>
                    </dl>

                    <div className="flex flex-col gap-4">
                      <ProgressMeter
                        label="Syllabus covered"
                        value={done}
                        max={course.modules.length}
                        caption={`${String(done)} of ${String(course.modules.length)} units`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 text-[10.5px] font-bold tracking-[.16em] text-gold-deep uppercase">
                      Syllabus
                    </div>
                    <ol className="border-t border-t-[rgba(27,36,54,.09)]">
                      {course.modules.map((unit, index) => (
                        <li
                          key={unit.title}
                          className="flex items-center gap-4 border-b border-b-[rgba(27,36,54,.07)] py-3"
                        >
                          <span
                            aria-hidden
                            className={
                              unit.complete
                                ? 'flex size-5 flex-none items-center justify-center rounded-full bg-chart text-[11px] text-cream'
                                : 'flex size-5 flex-none items-center justify-center rounded-full border border-[rgba(27,36,54,.2)] font-display text-[10px] text-warm'
                            }
                          >
                            {unit.complete ? '✓' : String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={
                              unit.complete
                                ? 'text-[14.5px] text-muted line-through decoration-[rgba(27,36,54,.25)]'
                                : 'text-[14.5px] text-ink-soft'
                            }
                          >
                            {unit.title}
                          </span>
                          <span className="sr-only">
                            {unit.complete ? 'Complete' : 'Not yet covered'}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </>
  );
}
