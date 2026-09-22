'use client';

import type { BatchDto, BranchDto, CourseDetailDto, TeacherWithCoursesDto } from '@repo/api-client';
import Link from 'next/link';
import { useActionState, useState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { Button } from '@/components/ui/form/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Field, Fieldset } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { errorIdFor } from '@/components/ui/form/input-class';
import { Select } from '@/components/ui/form/select';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';
import {
  batchStatusLabels,
  batchStatuses,
  deliveryModeLabels,
  weekdayLabels,
  weekdays,
  type DeliveryMode,
} from '@/lib/cms-enums';

/**
 * One scheduled run of a course.
 *
 * The only client state is the delivery mode: a live-online batch has no
 * branch, so the branch select gives way to a hidden empty value rather
 * than asking the admin to clear it by hand. Everything else is a native
 * control — dates, times and a checkbox per weekday — so the form posts
 * cleanly without JavaScript too.
 */
export function BatchForm({
  action,
  course,
  branches,
  teachers,
  initial,
}: {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  course: Pick<CourseDetailDto, 'id' | 'name' | 'modes'>;
  branches: readonly BranchDto[];
  teachers: readonly TeacherWithCoursesDto[];
  initial?: BatchDto;
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const values = state.values;
  const errors = state.errors ?? {};
  const value = (key: string, fallback: string) => values?.[key] ?? fallback;

  const firstMode: DeliveryMode = course.modes[0] ?? 'classroom';
  const [mode, setMode] = useState<DeliveryMode>(
    (values?.mode as DeliveryMode | undefined) ?? initial?.mode ?? firstMode,
  );

  const chosenDays = values ? (values.days ?? '').split(',') : (initial?.days ?? []);

  return (
    <form action={formAction} noValidate className="flex max-w-[760px] flex-col gap-6">
      <FormAlert message={state.message} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="mode" label="Delivery mode" error={errors.mode}>
          <Select
            id="mode"
            name="mode"
            value={mode}
            invalid={Boolean(errors.mode)}
            onChange={(event) => {
              setMode(event.target.value as DeliveryMode);
            }}
          >
            {course.modes.map((option) => (
              <option key={option} value={option}>
                {deliveryModeLabels[option]}
              </option>
            ))}
          </Select>
        </Field>

        {mode === 'classroom' ? (
          <Field id="branchId" label="Branch" error={errors.branchId}>
            <Select
              id="branchId"
              name="branchId"
              defaultValue={value('branchId', initial?.branch?.id ?? '')}
              invalid={Boolean(errors.branchId)}
            >
              <option value="">Choose a branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                  {branch.isActive ? '' : ' (inactive)'}
                </option>
              ))}
            </Select>
          </Field>
        ) : (
          <div className="flex flex-col gap-2">
            <input type="hidden" name="branchId" value="" />
            <span className="text-[11px] font-bold tracking-[.12em] text-ink-soft uppercase">
              Branch
            </span>
            <p className="rounded-sm border border-line bg-subtle px-4 py-3 text-[14px] text-muted">
              Live online — no branch.
            </p>
          </div>
        )}
      </div>

      <Field id="teacherId" label="Teacher" optional error={errors.teacherId}>
        <Select
          id="teacherId"
          name="teacherId"
          defaultValue={value('teacherId', initial?.teacher?.id ?? '')}
          invalid={Boolean(errors.teacherId)}
        >
          <option value="">Not assigned yet</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="startsOn" label="Starts on" error={errors.startsOn}>
          <Input
            id="startsOn"
            name="startsOn"
            type="date"
            required
            defaultValue={value('startsOn', initial?.startsOn ?? '')}
            invalid={Boolean(errors.startsOn)}
          />
        </Field>
        <Field id="endsOn" label="Ends on" error={errors.endsOn}>
          <Input
            id="endsOn"
            name="endsOn"
            type="date"
            required
            defaultValue={value('endsOn', initial?.endsOn ?? '')}
            invalid={Boolean(errors.endsOn)}
          />
        </Field>
      </div>

      <Fieldset
        legend="Days of the week"
        hint="Dhaka time. Days render in this order on the site."
        error={errors.days}
        errorId={errorIdFor('days')}
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {weekdays.map((day) => (
            <Checkbox
              key={day}
              id={`days-${day}`}
              name="days"
              value={day}
              label={weekdayLabels[day].long}
              defaultChecked={chosenDays.includes(day)}
            />
          ))}
        </div>
      </Fieldset>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="startTime" label="Starts at" error={errors.startTime}>
          <Input
            id="startTime"
            name="startTime"
            type="time"
            required
            defaultValue={value('startTime', initial?.startTime ?? '')}
            invalid={Boolean(errors.startTime)}
          />
        </Field>
        <Field id="endTime" label="Ends at" error={errors.endTime}>
          <Input
            id="endTime"
            name="endTime"
            type="time"
            required
            defaultValue={value('endTime', initial?.endTime ?? '')}
            invalid={Boolean(errors.endTime)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field id="status" label="Status" error={errors.status}>
          <Select
            id="status"
            name="status"
            defaultValue={value('status', initial?.status ?? 'open')}
            invalid={Boolean(errors.status)}
          >
            {batchStatuses.map((status) => (
              <option key={status} value={status}>
                {batchStatusLabels[status]}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          id="seatsLeft"
          label="Seats left"
          optional
          hint='Shown as "Filling fast · N left".'
          error={errors.seatsLeft}
        >
          <Input
            id="seatsLeft"
            name="seatsLeft"
            type="number"
            min={0}
            defaultValue={value('seatsLeft', initial?.seatsLeft?.toString() ?? '')}
            invalid={Boolean(errors.seatsLeft)}
          />
        </Field>
        <Field
          id="feeAmount"
          label="Fee override (BDT)"
          optional
          hint={`Blank uses the ${course.name} course price.`}
          error={errors.feeAmount}
        >
          <Input
            id="feeAmount"
            name="feeAmount"
            type="number"
            min={0}
            defaultValue={value('feeAmount', initial?.feeAmount?.toString() ?? '')}
            invalid={Boolean(errors.feeAmount)}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          {initial ? 'Save batch' : 'Schedule batch'}
        </Button>
        <Link
          href={`/admin/courses/${course.id}/batches`}
          className="text-[14px] text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
