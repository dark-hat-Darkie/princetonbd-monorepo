'use client';

import type { CourseDetailDto } from '@repo/api-client';
import Link from 'next/link';
import { useActionState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/form/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Field, Fieldset } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { errorIdFor } from '@/components/ui/form/input-class';
import { Select } from '@/components/ui/form/select';
import { Textarea } from '@/components/ui/form/textarea';
import { presignUploadAction } from '@/lib/admin/actions/uploads';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';
import {
  courseStatusLabels,
  courseStatuses,
  deliveryModeLabels,
  deliveryModes,
} from '@/lib/cms-enums';

/**
 * The course record. The four fields an admin fills first sit at the top;
 * everything that only refines the public page is folded away below so a
 * new course is a thirty-second job.
 */
export function CourseForm({
  action,
  initial,
}: {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  initial?: CourseDetailDto;
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const values = state.values;
  const errors = state.errors ?? {};
  const value = (key: string, fallback: string) => values?.[key] ?? fallback;
  const list = (key: string, fallback: readonly string[]) => values?.[key] ?? fallback.join('\n');
  const checked = (key: string, item: string, fallback: boolean) =>
    values ? (values[key] ?? '').split(',').includes(item) : fallback;

  return (
    <form action={formAction} noValidate className="flex max-w-[760px] flex-col gap-6">
      <FormAlert message={state.message} />

      <Field id="name" label="Name" error={errors.name}>
        <Input
          id="name"
          name="name"
          required
          defaultValue={value('name', initial?.name ?? '')}
          invalid={Boolean(errors.name)}
          placeholder="SAT"
        />
      </Field>

      <Field
        id="slug"
        label="Slug"
        optional
        hint={
          initial
            ? 'Changing this changes the public URL; old links will stop working.'
            : 'The public URL becomes /test-prep/<slug>. Leave blank to derive it from the name.'
        }
        error={errors.slug}
      >
        <Input
          id="slug"
          name="slug"
          defaultValue={value('slug', initial?.slug ?? '')}
          invalid={Boolean(errors.slug)}
          placeholder="sat"
        />
      </Field>

      <Field
        id="description"
        label="Description"
        hint="One or two sentences. Shown on course cards and as the page intro when no editorial copy exists."
        error={errors.description}
      >
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={value('description', initial?.description ?? '')}
          invalid={Boolean(errors.description)}
        />
      </Field>

      <ImageUpload
        name="thumbnailUrl"
        label="Thumbnail"
        kind="course-thumbnail"
        defaultValue={values?.thumbnailUrl ?? initial?.thumbnailUrl ?? ''}
        error={errors.thumbnailUrl}
        presign={presignUploadAction}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="priceAmount" label="Price (BDT)" error={errors.priceAmount}>
          <Input
            id="priceAmount"
            name="priceAmount"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            required
            defaultValue={value('priceAmount', initial ? String(initial.priceAmount) : '')}
            invalid={Boolean(errors.priceAmount)}
            placeholder="45000"
          />
        </Field>
        <Field id="priceUnit" label="Price unit" error={errors.priceUnit}>
          <Input
            id="priceUnit"
            name="priceUnit"
            required
            defaultValue={value('priceUnit', initial?.priceUnit ?? 'per course')}
            invalid={Boolean(errors.priceUnit)}
            placeholder="per 10-week course"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Fieldset legend="Delivery modes" error={errors.modes} errorId={errorIdFor('modes')}>
          <div className="flex flex-col gap-2">
            {deliveryModes.map((mode) => (
              <Checkbox
                key={mode}
                id={`modes-${mode}`}
                name="modes"
                value={mode}
                label={deliveryModeLabels[mode]}
                defaultChecked={checked('modes', mode, initial?.modes.includes(mode) ?? true)}
              />
            ))}
          </div>
        </Fieldset>

        <Field
          id="status"
          label="Status"
          hint="Only published courses appear on the site."
          error={errors.status}
        >
          <Select
            id="status"
            name="status"
            defaultValue={value('status', initial?.status ?? 'draft')}
            invalid={Boolean(errors.status)}
          >
            {courseStatuses.map((status) => (
              <option key={status} value={status}>
                {courseStatusLabels[status]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <details
        open={Boolean(initial)}
        className="group rounded-md border border-line bg-subtle open:bg-surface"
      >
        <summary className="cursor-pointer list-none px-6 py-4 text-[11px] font-bold tracking-[.12em] text-ink-soft uppercase marker:content-['']">
          <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
          Fee details, course facts and outcomes
        </summary>

        <div className="flex flex-col gap-6 border-t border-t-line px-6 py-6">
          <Field
            id="feeIncludes"
            label="What the fee includes"
            optional
            hint="One item per line; the bullet list on the fee card."
            error={errors.feeIncludes}
          >
            <Textarea
              id="feeIncludes"
              name="feeIncludes"
              rows={5}
              defaultValue={list('feeIncludes', initial?.feeIncludes ?? [])}
              invalid={Boolean(errors.feeIncludes)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <Field id="durationWeeks" label="Weeks" optional error={errors.durationWeeks}>
              <Input
                id="durationWeeks"
                name="durationWeeks"
                type="number"
                min={0}
                defaultValue={value('durationWeeks', initial?.durationWeeks?.toString() ?? '')}
                invalid={Boolean(errors.durationWeeks)}
              />
            </Field>
            <Field id="taughtHours" label="Taught hours" optional error={errors.taughtHours}>
              <Input
                id="taughtHours"
                name="taughtHours"
                type="number"
                min={0}
                defaultValue={value('taughtHours', initial?.taughtHours?.toString() ?? '')}
                invalid={Boolean(errors.taughtHours)}
              />
            </Field>
            <Field id="mockCount" label="Mocks" optional error={errors.mockCount}>
              <Input
                id="mockCount"
                name="mockCount"
                type="number"
                min={0}
                defaultValue={value('mockCount', initial?.mockCount?.toString() ?? '')}
                invalid={Boolean(errors.mockCount)}
              />
            </Field>
            <Field id="classSize" label="Class size" optional error={errors.classSize}>
              <Input
                id="classSize"
                name="classSize"
                defaultValue={value('classSize', initial?.classSize ?? '')}
                invalid={Boolean(errors.classSize)}
                placeholder="Max 10"
              />
            </Field>
          </div>

          <Field
            id="outcomes"
            label="Outcomes"
            optional
            hint='One per line; "By the end of the course you will…" under the curriculum.'
            error={errors.outcomes}
          >
            <Textarea
              id="outcomes"
              name="outcomes"
              rows={4}
              defaultValue={list('outcomes', initial?.outcomes ?? [])}
              invalid={Boolean(errors.outcomes)}
            />
          </Field>

          <Field
            id="sortOrder"
            label="Sort order"
            optional
            hint="Lower numbers list first."
            error={errors.sortOrder}
            className="max-w-[200px]"
          >
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={value('sortOrder', String(initial?.sortOrder ?? 0))}
              invalid={Boolean(errors.sortOrder)}
            />
          </Field>
        </div>
      </details>

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          {initial ? 'Save course' : 'Create course'}
        </Button>
        <Link
          href="/admin/courses"
          className="text-[14px] text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
