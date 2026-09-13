'use client';

import type { TeacherWithCoursesDto } from '@repo/api-client';
import Link from 'next/link';
import { useActionState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { Button } from '@/components/ui/form/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Fieldset } from '@/components/ui/form/field';
import { errorIdFor } from '@/components/ui/form/input-class';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';

/** Which teachers appear on the course page. Order follows the list order. */
export function CourseTeachersForm({
  action,
  teachers,
  assigned,
}: {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  teachers: readonly TeacherWithCoursesDto[];
  assigned: readonly string[];
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const chosen = state.values ? (state.values.teacherIds ?? '').split(',') : assigned;

  return (
    <form action={formAction} noValidate className="flex max-w-[760px] flex-col gap-6">
      <FormAlert message={state.message} />

      {teachers.length === 0 ? (
        <p className="text-[15px] leading-[1.6] text-muted">
          No teachers exist yet.{' '}
          <Link href="/admin/teachers/new" className="text-brand-ink underline underline-offset-4">
            Add one
          </Link>{' '}
          and come back.
        </p>
      ) : (
        <Fieldset
          legend="Teachers on this course"
          hint="Inactive teachers are listed but hidden from the public page."
          error={state.errors?.teacherIds}
          errorId={errorIdFor('teacherIds')}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {teachers.map((teacher) => (
              <Checkbox
                key={teacher.id}
                id={`teacher-${teacher.id}`}
                name="teacherIds"
                value={teacher.id}
                label={`${teacher.name}${teacher.isActive ? '' : ' (inactive)'}`}
                description={teacher.designation}
                defaultChecked={chosen.includes(teacher.id)}
              />
            ))}
          </div>
        </Fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          Save teachers
        </Button>
      </div>
    </form>
  );
}
