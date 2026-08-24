import type { Metadata } from 'next';

import { Panel, PanelEmpty } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { ProgressMeter } from '@/components/dashboard/progress-meter';
import { ScoreChart } from '@/components/dashboard/score-chart';
import { StatTile } from '@/components/dashboard/stat-tile';
import { student } from '@/content/dashboard/student';
import { formatFullDate } from '@/lib/dates';

export const metadata: Metadata = { title: 'Scores', robots: { index: false, follow: false } };

export default function ScoresPage() {
  const link = portalLinkFor('/dashboard/scores');
  const scores = student.scores;
  const first = scores[0];
  const latest = scores[scores.length - 1];
  const previous = scores[scores.length - 2];

  /* Section names come from the data rather than being hard-coded, so this
     table is correct for an exam with three sections as well as two. */
  const sectionNames = latest?.sections.map((section) => section.name) ?? [];

  return (
    <>
      <PortalHeader title="Scores" blurb={link?.blurb ?? ''} />

      {!latest || !first ? (
        <Panel>
          <PanelEmpty>You have not sat a mock yet. Your first one is a diagnostic.</PanelEmpty>
        </Panel>
      ) : (
        <>
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatTile label="Latest" value={String(latest.total)} />
            <StatTile
              label="Target"
              value={String(student.targetScore)}
              delta={{
                direction: 'up',
                text: `${String(Math.max(0, student.targetScore - latest.total))} points to go`,
              }}
            />
            <StatTile
              label="Since diagnostic"
              value={`+${String(latest.total - first.total)}`}
              delta={{ direction: 'up', text: `from ${String(first.total)}` }}
            />
            <StatTile
              label="Last change"
              value={
                previous
                  ? `${latest.total >= previous.total ? '+' : ''}${String(latest.total - previous.total)}`
                  : '—'
              }
              delta={
                previous
                  ? {
                      direction: latest.total >= previous.total ? 'up' : 'down',
                      text: `vs ${previous.label}`,
                    }
                  : undefined
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.5fr_1fr]">
            <Panel title="Progress to target" meta={`${String(scores.length)} sittings`}>
              <div className="px-4 py-5">
                <ScoreChart scores={scores} target={student.targetScore} />
              </div>
            </Panel>

            <Panel title="Latest section scores" meta={latest.label}>
              <div className="flex flex-col gap-5 px-6 py-6">
                {latest.sections.map((section) => (
                  <ProgressMeter
                    key={section.name}
                    label={section.name}
                    value={section.score}
                    max={section.max}
                    caption={`${String(section.score)} / ${String(section.max)}`}
                  />
                ))}
              </div>
            </Panel>
          </div>

          {/* The table is not a fallback — it is the accessible reading of the
              same data, and the only way to compare exact figures. */}
          <Panel className="mt-7" title="Every sitting">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <caption className="sr-only">
                  Full-length mock results, oldest first, with section breakdowns.
                </caption>
                <thead>
                  <tr>
                    {['Sitting', 'Date', ...sectionNames, 'Total'].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="border-b border-b-gold px-6 py-3 text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score) => (
                    <tr key={score.id}>
                      <th
                        scope="row"
                        className="border-b border-b-[rgba(27,36,54,.07)] px-6 py-3.5 text-[14.5px] font-bold text-ink-deep"
                      >
                        {score.label}
                      </th>
                      <td className="border-b border-b-[rgba(27,36,54,.07)] px-6 py-3.5 text-[14px] whitespace-nowrap text-muted">
                        {formatFullDate(score.takenOn)}
                      </td>
                      {sectionNames.map((name) => (
                        <td
                          key={name}
                          className="border-b border-b-[rgba(27,36,54,.07)] px-6 py-3.5 text-[14px] text-ink-soft"
                        >
                          {score.sections.find((section) => section.name === name)?.score ?? '—'}
                        </td>
                      ))}
                      <td className="border-b border-b-[rgba(27,36,54,.07)] px-6 py-3.5 font-display text-[17px] text-chart">
                        {score.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}
    </>
  );
}
