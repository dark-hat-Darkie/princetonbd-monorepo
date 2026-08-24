import type { Metadata } from 'next';

import { Panel, PanelEmpty, PanelRow } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { student } from '@/content/dashboard/student';
import { formatDayMonth, formatTime, formatWeekday, relativeDay } from '@/lib/dates';

export const metadata: Metadata = { title: 'Schedule', robots: { index: false, follow: false } };

export default function SchedulePage() {
  const link = portalLinkFor('/dashboard/schedule');

  /* Sorted here rather than relied on from the record: the source is hand
     written, and a schedule out of order is worse than no schedule. */
  const sessions = [...student.sessions].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const tasks = [...student.tasks]
    .filter((task) => !task.done)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));

  return (
    <>
      <PortalHeader title="Schedule" blurb={link?.blurb ?? ''} />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Upcoming sessions" meta={`${String(sessions.length)} scheduled`}>
          {sessions.length === 0 ? (
            <PanelEmpty>
              Nothing scheduled. Your instructor will post the next block soon.
            </PanelEmpty>
          ) : (
            sessions.map((session) => (
              <PanelRow key={session.id} className="gap-5">
                <div className="w-[68px] flex-none text-center">
                  <div className="font-display text-[20px] leading-none text-ink-deep">
                    {formatDayMonth(session.startsAt).split(' ')[0]}
                  </div>
                  <div className="mt-1 text-[11px] font-bold tracking-[.1em] text-gold-deep uppercase">
                    {formatDayMonth(session.startsAt).split(' ')[1]}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[15.5px] font-bold text-ink-deep">{session.title}</div>
                  <div className="mt-1 text-[13px] text-muted">
                    {formatWeekday(session.startsAt)} &middot; {formatTime(session.startsAt)}{' '}
                    &middot; {session.durationMinutes} min
                  </div>
                  <div className="mt-1 text-[13px] text-warm">
                    {session.location} &middot; {session.instructor}
                  </div>
                </div>

                <span
                  className={
                    session.mode === 'Campus'
                      ? 'flex-none rounded-[2px] bg-cream px-2.5 py-1 text-[11px] font-bold tracking-[.08em] text-gold-deep uppercase'
                      : 'flex-none rounded-[2px] bg-band px-2.5 py-1 text-[11px] font-bold tracking-[.08em] text-warm uppercase'
                  }
                >
                  {session.mode}
                </span>
              </PanelRow>
            ))
          )}
        </Panel>

        <Panel title="Deadlines" meta={`${String(tasks.length)} open`}>
          {tasks.length === 0 ? (
            <PanelEmpty>Nothing due.</PanelEmpty>
          ) : (
            tasks.map((task) => (
              <PanelRow key={task.id} className="flex-col gap-1.5">
                <div className="flex w-full items-baseline justify-between gap-3">
                  <span className="text-[11px] font-bold tracking-[.1em] text-gold-deep uppercase">
                    {task.kind}
                  </span>
                  <span className="flex-none text-[12.5px] whitespace-nowrap text-warm">
                    {relativeDay(task.dueAt)}
                  </span>
                </div>
                <span className="text-[15px] leading-[1.45] text-ink-soft">{task.title}</span>
              </PanelRow>
            ))
          )}
        </Panel>
      </div>
    </>
  );
}
