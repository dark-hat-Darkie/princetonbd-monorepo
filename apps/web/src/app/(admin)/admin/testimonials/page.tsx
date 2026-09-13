import type { Metadata } from 'next';
import { adminListTestimonials } from '@repo/api-client';
import Link from 'next/link';

import { adminLinkFor } from '@/components/admin/admin-nav';
import { DataTable } from '@/components/admin/data-table';
import { EmptyState } from '@/components/admin/empty-state';
import { Flash, single } from '@/components/admin/flash';
import { StatusBadge } from '@/components/admin/status-badge';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { getAdminClient } from '@/lib/admin/api';

export const metadata: Metadata = { title: 'Testimonials' };

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const link = adminLinkFor('/admin/testimonials');
  const client = await getAdminClient();
  const { data: testimonials = [] } = await adminListTestimonials({ client });

  return (
    <>
      <PortalHeader title="Testimonials" blurb={link?.blurb ?? ''}>
        <CtaButton href="/admin/testimonials/new" size="sm">
          New testimonial
        </CtaButton>
      </PortalHeader>

      <Flash message={single(params.flash)} />

      <DataTable
        rows={testimonials}
        rowKey={(testimonial) => testimonial.id}
        empty={
          <EmptyState
            title="No testimonials yet."
            body="Add student quotes and choose which course pages show them."
            action={{ label: 'Add a testimonial', href: '/admin/testimonials/new' }}
          />
        }
        columns={[
          {
            key: 'name',
            header: 'Student',
            cell: (testimonial) => (
              <div>
                <Link
                  href={`/admin/testimonials/${testimonial.id}`}
                  className="font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {testimonial.name}
                </Link>
                <div className="text-[12.5px] text-muted-2">{testimonial.result}</div>
              </div>
            ),
          },
          {
            key: 'quote',
            header: 'Quote',
            cell: (testimonial) => {
              const truncated = testimonial.quote.slice(0, 90);
              return truncated.length < testimonial.quote.length ? `${truncated}…` : truncated;
            },
          },
          {
            key: 'courses',
            header: 'Courses',
            cell: (testimonial) => testimonial.courses.map((c) => c.name).join(' · ') || '—',
          },
          {
            key: 'status',
            header: 'Status',
            cell: (testimonial) => (
              <StatusBadge status={testimonial.isActive ? 'active' : 'inactive'} />
            ),
          },
          {
            key: 'order',
            header: 'Order',
            className: 'text-right',
            cell: (testimonial) => testimonial.sortOrder,
          },
        ]}
      />
    </>
  );
}
