import type { Metadata } from 'next';

import { CourseForm } from '@/components/admin/course-form';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { createCourseAction } from '@/lib/admin/actions/courses';

export const metadata: Metadata = { title: 'New course' };

export default function NewCoursePage() {
  return (
    <>
      <PortalHeader
        title="New course"
        blurb="Name, price and description now; curriculum, batches and teachers once it exists."
      />
      <CourseForm action={createCourseAction} />
    </>
  );
}
