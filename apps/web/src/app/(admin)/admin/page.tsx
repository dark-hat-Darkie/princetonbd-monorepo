import type { Metadata } from 'next';
import { adminGetOverview } from '@repo/api-client';

import { adminLinkFor } from '@/components/admin/admin-nav';
import { Panel, PanelRow } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { StatTile } from '@/components/dashboard/stat-tile';
import { CtaButton } from '@/components/ui/cta-button';
import { getAdminClient } from '@/lib/admin/api';

export const metadata: Metadata = { title: 'Overview' };

/** The admin front page: counts, and the shortcuts an admin opens most. */
export default async function AdminOverviewPage() {
  const link = adminLinkFor('/admin');
  const client = await getAdminClient();
  const { data: overview } = await adminGetOverview({ client });

  return (
    <>
      <PortalHeader title="Overview" blurb={link?.blurb ?? ''}>
        <CtaButton href="/admin/courses/new" size="sm">
          New course
        </CtaButton>
      </PortalHeader>

      {overview ? (
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile
            label="Published courses"
            value={String(overview.courses.published)}
            delta={{
              direction: 'flat',
              text: `${String(overview.courses.draft)} draft · ${String(overview.courses.archived)} archived`,
            }}
          />
          <StatTile label="Upcoming batches" value={String(overview.upcomingBatches)} />
          <StatTile label="Teachers" value={String(overview.teachers)} />
          <StatTile label="Branches" value={String(overview.branches)} />
        </div>
      ) : (
        <p className="mb-7 text-[14.5px] leading-[1.6] text-danger">
          The API did not answer. Counts are unavailable until it does.
        </p>
      )}

      <Panel title="Where to start">
        <PanelRow>
          <span className="flex-1 text-[15px] leading-[1.5] text-ink-soft">
            Set up <strong className="text-ink">branches</strong> before scheduling classroom
            batches, and add <strong className="text-ink">teachers</strong> before assigning them to
            courses. A course is invisible on the site until its status is{' '}
            <strong className="text-ink">published</strong>.
          </span>
        </PanelRow>
        <PanelRow>
          <span className="flex-1 text-[15px] leading-[1.5] text-ink-soft">
            Every save refreshes the public course pages. Listings can lag by one visit while they
            refresh in the background.
          </span>
        </PanelRow>
      </Panel>
    </>
  );
}
