import type { Metadata } from 'next';
import { adminGetTestimonial, adminListCourses } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { TestimonialForm } from '@/components/admin/testimonial-form';
import { ConfirmForm } from '@/components/admin/confirm-form';
import { Flash, single } from '@/components/admin/flash';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { getAdminClient } from '@/lib/admin/api';
import { deleteTestimonialAction, updateTestimonialAction } from '@/lib/admin/actions/testimonials';

export const metadata: Metadata = { title: 'Edit testimonial' };

export default async function EditTestimonialPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const [{ data: testimonial }, { data: courses = [] }] = await Promise.all([
    adminGetTestimonial({ client, path: { id } }),
    adminListCourses({ client }),
  ]);
  if (!testimonial) notFound();

  return (
    <>
      <PortalHeader title={testimonial.name} blurb={testimonial.result}>
        <ConfirmForm
          action={deleteTestimonialAction.bind(null, testimonial.id)}
          confirm={`Delete this quote from "${testimonial.name}"? It disappears from every course page.`}
          label="Delete"
          pendingLabel="Deleting…"
        />
      </PortalHeader>

      <Flash message={single(query.flash)} />

      <TestimonialForm
        action={updateTestimonialAction.bind(null, testimonial.id)}
        courses={courses}
        initial={testimonial}
      />
    </>
  );
}
