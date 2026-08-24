import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { withAuth } from '@workos-inc/authkit-nextjs';

import { Panel, PanelEmpty, PanelRow } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { ProgressMeter } from '@/components/dashboard/progress-meter';
import { ScoreChart } from '@/components/dashboard/score-chart';
import { StatTile } from '@/components/dashboard/stat-tile';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { CtaButton } from '@/components/ui/cta-button';
import { student } from '@/content/dashboard/student';
import { daysUntil, formatDayMonth, formatTime, formatWeekday, relativeDay } from '@/lib/dates';

export const metadata: Metadata = {
  title: 'Overview',
  robots: { index: false, follow: false },
};

/**
 * The portal's front page: where you stand, and what is next.
 *
 * Ordered by what a student opens it to find — the countdown and the score
 * gap first, then the work that is due, then everything else.
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
  const latest = student.scores[student.scores.length - 1];
  const previous = student.scores[student.scores.length - 2];
  const gap = latest ? student.targetScore - latest.total : student.targetScore;
  const daysToTest = daysUntil(student.testDate);

  const active = student.courses.filter((course) => course.status === 'in-progress');
  const nextSession = student.sessions[0];
  const openTasks = student.tasks.filter((task) => !task.done).slice(0, 4);

  return (
    <>
      <PortalHeader
        title={`Good to see you, ${user.firstName ?? 'there'}.`}
        blurb={link?.blurb ?? ''}
      >
        <CtaButton href="/dashboard/schedule" size="sm" variant="outline">
          View schedule
        </CtaButton>
        <CtaButton href="/contact" size="sm">
          Message your counselor
        </CtaButton>
      </PortalHeader>

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label={`${student.targetExam} target`}
          value={String(student.targetScore)}
          delta={
            gap > 0
              ? { direction: 'up', text: `${String(gap)} points to go` }
              : { direction: 'up', text: 'Target reached' }
          }
        />
        <StatTile
          label="Latest mock"
          value={latest ? String(latest.total) : '—'}
          delta={
            latest && previous
              ? {
                  direction: latest.total >= previous.total ? 'up' : 'down',
                  text: `${latest.total >= previous.total ? '+' : ''}${String(latest.total - previous.total)} since ${previous.label}`,
                }
              : undefined
          }
        />
        <StatTile
          label="Test date"
          value={formatDayMonth(student.testDate)}
          delta={{ direction: 'flat', text: `${String(daysToTest)} days away` }}
        />
        <StatTile
          label="Open tasks"
          value={String(student.tasks.filter((task) => !task.done).length)}
          delta={
            openTasks[0]
              ? { direction: 'flat', text: `next due ${relativeDay(openTasks[0].dueAt)}` }
              : undefined
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-7">
          <Panel
            title="Score progress"
            meta={`${String(student.scores.length)} sittings`}
            action={{ label: 'All scores', href: '/dashboard/scores' }}
          >
            <div className="px-4 py-5">
              <ScoreChart scores={student.scores} target={student.targetScore} />
            </div>
          </Panel>

          <Panel title="Due next" action={{ label: 'Schedule', href: '/dashboard/schedule' }}>
            {openTasks.length === 0 ? (
              <PanelEmpty>Nothing outstanding. Enjoy it while it lasts.</PanelEmpty>
            ) : (
              openTasks.map((task) => (
                <PanelRow key={task.id}>
                  <span className="mt-[3px] w-[86px] flex-none text-[11px] font-bold tracking-[.1em] text-gold-deep uppercase">
                    {task.kind}
                  </span>
                  <span className="flex-1 text-[15px] leading-[1.45] text-ink-soft">
                    {task.title}
                  </span>
                  <span className="flex-none text-[13px] whitespace-nowrap text-warm">
                    {relativeDay(task.dueAt)}
                  </span>
                </PanelRow>
              ))
            )}
          </Panel>
        </div>

        <div className="flex flex-col gap-7">
          {nextSession ? (
            <Panel title="Next class">
              <div className="px-6 py-5">
                <div className="mb-1 text-[11px] font-bold tracking-[.14em] text-gold-deep uppercase">
                  {formatWeekday(nextSession.startsAt)} &middot;{' '}
                  {formatDayMonth(nextSession.startsAt)}
                </div>
                <div className="mb-3 font-display text-[22px] leading-[1.25] text-ink-deep">
                  {nextSession.title}
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13.5px]">
                  <dt className="text-warm">Time</dt>
                  <dd className="text-ink-soft">
                    {formatTime(nextSession.startsAt)} &middot; {nextSession.durationMinutes} min
                  </dd>
                  <dt className="text-warm">Where</dt>
                  <dd className="text-ink-soft">{nextSession.location}</dd>
                  <dt className="text-warm">With</dt>
                  <dd className="text-ink-soft">{nextSession.instructor}</dd>
                </dl>
              </div>
            </Panel>
          ) : null}

          <Panel title="Course progress" action={{ label: 'Courses', href: '/dashboard/courses' }}>
            {active.length === 0 ? (
              <PanelEmpty>No course in progress right now.</PanelEmpty>
            ) : (
              <div className="flex flex-col gap-5 px-6 py-5">
                {active.map((course) => (
                  <ProgressMeter
                    key={course.slug}
                    label={course.name}
                    value={course.sessionsAttended}
                    max={course.sessionsTotal}
                    caption={`${String(course.sessionsAttended)} of ${String(course.sessionsTotal)} sessions`}
                  />
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Your counselor">
            <div className="flex items-start gap-4 px-6 py-5">
              <span
                aria-hidden
                className="flex size-12 flex-none items-center justify-center rounded-full bg-ink font-display text-[16px] text-gold-pale"
              >
                {student.counselor.initials}
              </span>
              <div className="min-w-0">
                <div className="font-display text-[18px] text-ink-deep">
                  {student.counselor.name}
                </div>
                <div className="mt-0.5 text-[12.5px] text-warm">{student.counselor.role}</div>
                <div className="mt-3 text-[13.5px] text-muted">
                  Next check-in {relativeDay(student.counselor.nextCheckIn)}, at{' '}
                  {formatTime(student.counselor.nextCheckIn)}.
                </div>
                <a
                  href={`mailto:${student.counselor.email}`}
                  className="mt-2 inline-block text-[13.5px] text-ink underline decoration-gold underline-offset-4"
                >
                  {student.counselor.email}
                </a>
              </div>
            </div>
          </Panel>

          <Panel title="Notices" meta={`${String(student.announcements.length)}`}>
            {student.announcements.map((note) => (
              <PanelRow key={note.id} className="flex-col gap-1.5">
                <div className="flex w-full items-baseline justify-between gap-3">
                  <span className="text-[15px] font-bold text-ink-deep">{note.title}</span>
                  <span className="flex-none text-[12px] whitespace-nowrap text-warm">
                    {formatDayMonth(note.postedOn)}
                  </span>
                </div>
                <p className="text-[14px] leading-[1.6] text-muted">{note.body}</p>
              </PanelRow>
            ))}
          </Panel>
        </div>
      </div>
    </>
  );
}
