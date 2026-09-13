'use client';

import type { BranchDto, TeacherWithCoursesDto } from '@repo/api-client';
import Link from 'next/link';
import { useActionState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/form/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Field } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { Select } from '@/components/ui/form/select';
import { Textarea } from '@/components/ui/form/textarea';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';
import { presignUploadAction } from '@/lib/admin/actions/uploads';

export interface TeacherFormValues {
  slug: string;
  name: string;
  designation: string;
  bio: string | null;
  imageUrl: string | null;
  branchId: string | null;
  isActive: boolean;
  sortOrder: number;
}

export function TeacherForm({
  action,
  branches,
  initial,
}: {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  branches: readonly BranchDto[];
  initial?: TeacherWithCoursesDto;
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const values = state.values;
  const value = (key: keyof TeacherFormValues, fallback: string) => values?.[key] ?? fallback;
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
        />
      </Field>

      <Field
        id="slug"
        label="Slug"
        optional
        hint="Lower-case letters, digits and hyphens. Leave blank to derive it from the name."
        error={errors?.slug}
      >
        <Input
          id="slug"
          name="slug"
          defaultValue={value('slug', initial?.slug ?? '')}
          invalid={Boolean(errors?.slug)}
        />
      </Field>

      <Field id="designation" label="Designation" error={errors?.designation}>
        <Input
          id="designation"
          name="designation"
          required
          defaultValue={value('designation', initial?.designation ?? '')}
          invalid={Boolean(errors?.designation)}
          placeholder="Lead Instructor, Quantitative"
        />
      </Field>

      <Field
        id="bio"
        label="Bio"
        optional
        hint="One or two lines: the credential that matters."
        error={errors?.bio}
      >
        <Textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={value('bio', initial?.bio ?? '')}
          invalid={Boolean(errors?.bio)}
        />
      </Field>

      <ImageUpload
        name="imageUrl"
        label="Photo"
        kind="teacher-image"
        defaultValue={values?.imageUrl ?? initial?.imageUrl ?? ''}
        error={errors?.imageUrl}
        presign={presignUploadAction}
      />

      <Field id="branchId" label="Home branch" optional error={errors?.branchId}>
        <Select
          id="branchId"
          name="branchId"
          defaultValue={value('branchId', initial?.branch?.id ?? '')}
          invalid={Boolean(errors?.branchId)}
        >
          <option value="">No home branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </Select>
      </Field>

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
          description="Inactive teachers stay on their courses and batches but are hidden from the public site."
          defaultChecked={values ? values.isActive === 'on' : (initial?.isActive ?? true)}
          className="sm:mt-6"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          {initial ? 'Save teacher' : 'Create teacher'}
        </Button>
        <Link
          href="/admin/teachers"
          className="text-[14px] text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
