import type { Metadata } from 'next';
import { getCurrentUser } from '@repo/api-client';
import { redirect } from 'next/navigation';
import { withAuth } from '@workos-inc/authkit-nextjs';

import { Panel, PanelEmpty } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { ProgressMeter } from '@/components/dashboard/progress-meter';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { CtaButton } from '@/components/ui/cta-button';
import { initialsOf } from '@/lib/course-view';
import { getApiClient } from '@/lib/api';
import { loadStudentCourses } from '@/lib/dashboard-courses';
import { formatTime, relativeDay } from '@/lib/dates';

export const metadata: Metadata = {
  title: 'Overview',
  robots: { index: false, follow: false },
};

/**
 * The portal's front page: your courses and your counselor.
 *
 * Both are live: courses come from the learner's enrollments (same loader as
 * My courses, so the two pages cannot drift apart) and the counselor is what
 * an admin assigned on the student's record.
 */
export default async function OverviewPage() {
  /* No `ensureSignedIn` here — the proxy already enforces it (see
     src/proxy.ts). Requesting it from a Server Component would trigger a
     session-cookie write, which Next.js forbids outside Server Actions and
     Route Handlers. */
  const { user } = await withAuth();

  if (!user) {
    /* Unreachable while the proxy matcher covers this route; kept so the type
       narrows and a matcher mistake fails loudly instead of rendering blanks. */
    redirect('/sign-in');
  }

  const link = portalLinkFor('/dashboard');
  const client = await getApiClient();
  const [{ data: profile }, result] = await Promise.all([
    getCurrentUser({ client }),
    loadStudentCourses(),
  ]);
  const counselor = profile?.counselor ?? null;
  const courses = 'courses' in result ? result.courses : [];
  const active = courses.filter((course) => course.status === 'in-progress');

  return (
    <>
      <PortalHeader
        title={`Good to see you, ${user.firstName ?? 'there'}.`}
        blurb={link?.blurb ?? ''}
      >
        <CtaButton href="/dashboard/courses" size="sm" variant="outline">
          View courses
        </CtaButton>
      </PortalHeader>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-7">
          <Panel title="Course progress" action={{ label: 'Courses', href: '/dashboard/courses' }}>
            {'error' in result ? (
              <PanelEmpty>
                We could not reach the API just now. Your enrolments are safe — try
                reloading.
              </PanelEmpty>
            ) : active.length === 0 ? (
              <PanelEmpty>No course in progress right now.</PanelEmpty>
            ) : (
              <div className="flex flex-col gap-5 px-6 py-5">
                {active.map((course) => {
                  const done = course.modules.filter((unit) => unit.complete).length;

                  return (
                    <ProgressMeter
                      key={course.slug}
                      label={course.name}
                      value={done}
                      max={course.modules.length}
                      caption={`${String(done)} of ${String(course.modules.length)} units covered`}
                    />
                  );
                })}
              </div>
            )}
          </Panel>
        </div>

        <div className="flex flex-col gap-7">
          <Panel title="Your counselor">
            {counselor ? (
              <div className="flex items-start gap-4 px-6 py-5">
                <span
                  aria-hidden
                  className="flex size-12 flex-none items-center justify-center rounded-full bg-ink font-display text-[16px] text-gold-pale"
                >
                  {initialsOf(counselor.name)}
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[18px] text-ink-deep">
                    {counselor.name}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-warm">
                    {counselor.role ?? 'Counselor'}
                  </div>
                  <div className="mt-3 text-[13.5px] text-muted">
                    {counselor.nextCheckIn ? (
                      <>
                        Next check-in {relativeDay(counselor.nextCheckIn)}, at{' '}
                        {formatTime(counselor.nextCheckIn)}.
                      </>
                    ) : (
                      'Next check-in to be scheduled.'
                    )}
                  </div>
                  {counselor.email ? (
                    <a
                      href={`mailto:${counselor.email}`}
                      className="mt-2 inline-block text-[13.5px] text-ink underline decoration-gold underline-offset-4"
                    >
                      {counselor.email}
                    </a>
                  ) : counselor.phone ? (
                    <a
                      href={`tel:${counselor.phone}`}
                      className="mt-2 inline-block text-[13.5px] text-ink underline decoration-gold underline-offset-4"
                    >
                      {counselor.phone}
                    </a>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="px-6 py-5">
                <p className="text-[14px] leading-[1.6] text-muted">
                  No counselor assigned yet. Contact us and we will pair you with one.
                </p>
                <CtaButton href="/contact" size="sm" variant="outline" className="mt-4">
                  Contact us
                </CtaButton>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
