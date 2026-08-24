import type { Metadata } from 'next';

import { Panel, PanelEmpty } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { CtaButton } from '@/components/ui/cta-button';
import { student } from '@/content/dashboard/student';
import { applicationStages } from '@/content/dashboard/types';
import { formatFullDate, relativeDay } from '@/lib/dates';

export const metadata: Metadata = {
  title: 'Applications',
  robots: { index: false, follow: false },
};

export default function ApplicationsPage() {
  const link = portalLinkFor('/dashboard/applications');

  const applications = [...student.applications].sort((a, b) =>
    a.deadline.localeCompare(b.deadline),
  );

  return (
    <>
      <PortalHeader title="Applications" blurb={link?.blurb ?? ''}>
        <CtaButton href="/study-abroad/university-finder" size="sm" variant="outline">
          Find more universities
        </CtaButton>
      </PortalHeader>

      {applications.length === 0 ? (
        <Panel>
          <PanelEmpty>
            Your shortlist is empty. Your counselor will build it with you at your next check-in.
          </PanelEmpty>
        </Panel>
      ) : (
        <div className="flex flex-col gap-5">
          {applications.map((application) => {
            const reached = applicationStages.indexOf(application.stage);

            return (
              <Panel key={application.id}>
                <div className="px-6 py-6">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-1.5 text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase">
                        {application.country} &middot; {application.intake}
                      </div>
                      <h2 className="font-display text-[23px] leading-[1.2] font-normal text-ink-deep">
                        {application.university}
                      </h2>
                      <div className="mt-1.5 text-[14px] text-muted">{application.programme}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase">
                        Deadline
                      </div>
                      <div className="mt-1 text-[14.5px] whitespace-nowrap text-ink-soft">
                        {formatFullDate(application.deadline)}
                      </div>
                      <div className="mt-0.5 text-[12.5px] whitespace-nowrap text-warm">
                        {relativeDay(application.deadline)}
                      </div>
                    </div>
                  </div>

                  {/* An ordered list, so the stages are announced as a sequence
                      and the current one is named — not signalled by colour. */}
                  <ol className="flex flex-wrap gap-x-1 gap-y-3">
                    {applicationStages.map((stage, index) => {
                      const done = index < reached;
                      const current = index === reached;

                      return (
                        <li key={stage} className="flex min-w-[92px] flex-1 flex-col gap-2">
                          <span
                            aria-hidden
                            className={
                              done || current
                                ? 'block h-[3px] rounded-full bg-chart'
                                : 'block h-[3px] rounded-full bg-[rgba(27,36,54,.12)]'
                            }
                          />
                          <span
                            className={
                              current
                                ? 'text-[11.5px] font-bold tracking-[.06em] text-ink-deep'
                                : 'text-[11.5px] tracking-[.06em] text-warm'
                            }
                          >
                            {stage}
                            {current ? <span className="sr-only"> — current stage</span> : null}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </>
  );
}
