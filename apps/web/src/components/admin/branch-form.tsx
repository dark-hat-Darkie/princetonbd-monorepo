'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { Button } from '@/components/ui/form/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Field } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';

export interface BranchFormValues {
  slug: string;
  name: string;
  address: string | null;
  phone: string | null;
  isActive: boolean;
  sortOrder: number;
}

/**
 * Create and edit share one form; `initial` decides which. Uncontrolled
 * inputs seeded from the echoed values first, then the record, so a rejected
 * submission never loses what was typed.
 */
export function BranchForm({
  action,
  initial,
}: {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  initial?: BranchFormValues;
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const values = state.values;
  const value = (key: keyof BranchFormValues, fallback: string) => values?.[key] ?? fallback;

  return (
    <form action={formAction} noValidate className="flex max-w-[720px] flex-col gap-6">
      <FormAlert message={state.message} />

      <Field id="name" label="Name" error={state.errors?.name}>
        <Input
          id="name"
          name="name"
          required
          defaultValue={value('name', initial?.name ?? '')}
          invalid={Boolean(state.errors?.name)}
          placeholder="Dhaka — Gulshan"
        />
      </Field>

      <Field
        id="slug"
        label="Slug"
        optional
        hint="Lower-case letters, digits and hyphens. Leave blank to derive it from the name."
        error={state.errors?.slug}
      >
        <Input
          id="slug"
          name="slug"
          defaultValue={value('slug', initial?.slug ?? '')}
          invalid={Boolean(state.errors?.slug)}
          placeholder="dhaka-gulshan"
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="address" label="Address" optional error={state.errors?.address}>
          <Input
            id="address"
            name="address"
            defaultValue={value('address', initial?.address ?? '')}
            invalid={Boolean(state.errors?.address)}
          />
        </Field>
        <Field id="phone" label="Phone" optional error={state.errors?.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={value('phone', initial?.phone ?? '')}
            invalid={Boolean(state.errors?.phone)}
            placeholder="+880 1700-000000"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          id="sortOrder"
          label="Sort order"
          optional
          hint="Lower numbers list first."
          error={state.errors?.sortOrder}
        >
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            inputMode="numeric"
            defaultValue={value('sortOrder', String(initial?.sortOrder ?? 0))}
            invalid={Boolean(state.errors?.sortOrder)}
          />
        </Field>
        <Checkbox
          id="isActive"
          name="isActive"
          label="Active"
          description="Inactive branches stay on existing batches but cannot be picked for new ones."
          defaultChecked={values ? values.isActive === 'on' : (initial?.isActive ?? true)}
          className="sm:mt-6"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          {initial ? 'Save branch' : 'Create branch'}
        </Button>
        <Link
          href="/admin/branches"
          className="text-[14px] text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
