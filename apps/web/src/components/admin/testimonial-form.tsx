'use client';

import type { CourseSummaryDto, TestimonialWithCoursesDto } from '@repo/api-client';
import Link from 'next/link';
import { useActionState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/form/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Field, Fieldset } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { Textarea } from '@/components/ui/form/textarea';
import { errorIdFor } from '@/components/ui/form/input-class';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';
import { presignUploadAction } from '@/lib/admin/actions/uploads';

export interface TestimonialFormValues {
  name: string;
  result: string;
  quote: string;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  courseIds: string[];
}

export function TestimonialForm({
  action,
  courses,
  initial,
}: {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  courses: readonly CourseSummaryDto[];
  initial?: TestimonialWithCoursesDto;
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const values = state.values;
  const value = (key: Exclude<keyof TestimonialFormValues, 'courseIds'>, fallback: string) =>
    values?.[key] ?? fallback;
  const chosen = values
    ? (values.courseIds ?? '').split(',')
    : (initial?.courses.map((c) => c.id) ?? []);
  const { errors } = state;

  return (
    <form action={formAction} noValidate className="flex max-w-[720px] flex-col gap-6">
      <FormAlert message={state.message} />

      <Field id="name" label="Name" error={errors?.name}>
        <Input
          id="name"
          name="name"
          required
          defaultValue={value('name', initial?.name ?? '')}
          invalid={Boolean(errors?.name)}
          placeholder="Nafisa Rahman"
        />
      </Field>

      <Field id="result" label="Result" error={errors?.result}>
        <Input
          id="result"
          name="result"
          required
          defaultValue={value('result', initial?.result ?? '')}
          invalid={Boolean(errors?.result)}
          placeholder='Score and destination, e.g. "SAT 1540 · NUS, Singapore"'
        />
      </Field>

      <Field id="quote" label="Quote" error={errors?.quote}>
        <Textarea
          id="quote"
          name="quote"
          rows={4}
          required
          defaultValue={value('quote', initial?.quote ?? '')}
          invalid={Boolean(errors?.quote)}
        />
      </Field>

      <ImageUpload
        name="imageUrl"
        label="Photo"
        kind="testimonial-image"
        hint="Optional. The site shows a monogram when there is none."
        defaultValue={values?.imageUrl ?? initial?.imageUrl ?? ''}
        error={errors?.imageUrl}
        presign={presignUploadAction}
      />

      <Fieldset
        legend="Shown on these courses"
        hint="Tick every course page this quote may appear on."
        error={errors?.courseIds}
        errorId={errorIdFor('courseIds')}
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {courses.map((course) => (
            <Checkbox
              key={course.id}
              id={`course-${course.id}`}
              name="courseIds"
              value={course.id}
              label={course.name}
              description={`/test-prep/${course.slug}`}
              defaultChecked={chosen.includes(course.id)}
            />
          ))}
        </div>
      </Fieldset>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          id="sortOrder"
          label="Sort order"
          optional
          hint="Lower numbers list first."
          error={errors?.sortOrder}
        >
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            inputMode="numeric"
            defaultValue={value('sortOrder', String(initial?.sortOrder ?? 0))}
            invalid={Boolean(errors?.sortOrder)}
          />
        </Field>
        <Checkbox
          id="isActive"
          name="isActive"
          label="Active"
          description="Inactive quotes are hidden everywhere but kept."
          defaultChecked={values ? values.isActive === 'on' : (initial?.isActive ?? true)}
          className="sm:mt-6"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          {initial ? 'Save testimonial' : 'Create testimonial'}
        </Button>
        <Link
          href="/admin/testimonials"
          className="text-[14px] text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
