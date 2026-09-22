import type { CourseDetailDto } from '@repo/api-client';

import { ConfirmForm } from '@/components/admin/confirm-form';
import { CourseTabs, type CourseTab } from '@/components/admin/course-tabs';
import { StatusBadge } from '@/components/admin/status-badge';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { deleteCourseAction } from '@/lib/admin/actions/courses';
import { coursePath } from '@/lib/course-view';

/** Header plus tabs for every page under a course. */
export function CourseHeader({ course, active }: { course: CourseDetailDto; active: CourseTab }) {
  return (
    <>
      <PortalHeader title={course.name} blurb={`/test-prep/${course.slug}`}>
        <StatusBadge status={course.status} />
        {course.status === 'published' ? (
          <CtaButton href={coursePath(course.slug)} size="sm" variant="outline">
            View page
          </CtaButton>
        ) : null}
        <ConfirmForm
          action={deleteCourseAction.bind(null, course.id, course.slug)}
          confirm={`Delete "${course.name}" and every batch, module and link under it? Archiving keeps the history; deleting does not.`}
          label="Delete"
          pendingLabel="Deleting…"
        />
      </PortalHeader>
      <CourseTabs courseId={course.id} active={active} />
    </>
  );
}
