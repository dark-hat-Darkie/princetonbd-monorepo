import type { Metadata } from 'next';

import { Panel, PanelEmpty, PanelRow } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { portalLinkFor } from '@/components/dashboard/portal-nav';
import { CtaButton } from '@/components/ui/cta-button';
import { student } from '@/content/dashboard/student';
import { formatDayMonth } from '@/lib/dates';

export const metadata: Metadata = { title: 'Resources', robots: { index: false, follow: false } };

export default function ResourcesPage() {
  const link = portalLinkFor('/dashboard/resources');

  const resources = [...student.resources].sort((a, b) => b.addedOn.localeCompare(a.addedOn));
  const courseName = (slug: string | null) =>
    student.courses.find((course) => course.slug === slug)?.name ?? 'General';

  return (
    <>
      <PortalHeader title="Resources" blurb={link?.blurb ?? ''}>
        <CtaButton href="/resources" size="sm" variant="outline">
          Public advice library
        </CtaButton>
      </PortalHeader>

      <Panel title="Your materials" meta={`${String(resources.length)} items`}>
        {resources.length === 0 ? (
          <PanelEmpty>Nothing has been shared with you yet.</PanelEmpty>
        ) : (
          resources.map((resource) => (
            <PanelRow key={resource.id} className="gap-5">
              <span className="mt-0.5 w-[104px] flex-none text-[11px] font-bold tracking-[.1em] text-gold-deep uppercase">
                {resource.kind}
              </span>

              <div className="min-w-0 flex-1">
                <div className="text-[15.5px] font-bold text-ink-deep">{resource.title}</div>
                <p className="mt-1 text-[14px] leading-[1.55] text-muted">{resource.description}</p>
                <div className="mt-1.5 text-[12.5px] text-warm">
                  {courseName(resource.courseSlug)} &middot; added{' '}
                  {formatDayMonth(resource.addedOn)}
                </div>
              </div>
            </PanelRow>
          ))
        )}
      </Panel>

      <p className="mt-6 max-w-[640px] border-l-[3px] border-l-gold bg-cream px-6 py-4 text-[14px] leading-[1.6] text-ink-soft">
        Downloads are not wired up yet &mdash; this list is showing placeholder items until the
        materials service is connected.
      </p>
    </>
  );
}
