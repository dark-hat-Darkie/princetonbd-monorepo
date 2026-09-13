import type { Metadata } from 'next';
import { adminListCourses } from '@repo/api-client';

import { TestimonialForm } from '@/components/admin/testimonial-form';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { createTestimonialAction } from '@/lib/admin/actions/testimonials';
import { getAdminClient } from '@/lib/admin/api';

export const metadata: Metadata = { title: 'New testimonial' };

export default async function NewTestimonialPage() {
  const client = await getAdminClient();
  const { data: courses = [] } = await adminListCourses({ client });

  return (
    <>
      <PortalHeader
        title="New testimonial"
        blurb="A student quote, and the course pages it may appear on."
      />
      <TestimonialForm action={createTestimonialAction} courses={courses} />
    </>
  );
}
