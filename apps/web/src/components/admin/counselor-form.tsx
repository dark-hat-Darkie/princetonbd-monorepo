'use client';

import type { CounselorDto } from '@repo/api-client';
import Link from 'next/link';
import { useActionState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { Button } from '@/components/ui/form/button';
import { Field } from '@/components/ui/form/field';
import { Input } from '@/components/ui/form/input';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';
import { checkInToInput } from '@/lib/admin/schemas/counselor';

export interface CounselorFormValues {
  name: string;
  role: string;
  email: string;
  phone: string;
  nextCheckIn: string;
}

/**
 * Assign the counselor shown on the student's portal overview. Every field
 * is optional: clearing the name removes the assignment entirely.
 */
export function CounselorForm({
  initial,
  action,
}: {
  initial?: CounselorDto | null;
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const values = state.values;
  const value = (key: keyof CounselorFormValues, fallback: string) => values?.[key] ?? fallback;
  const { errors } = state;

  return (
    <form action={formAction} noValidate className="flex max-w-[720px] flex-col gap-6">
      <FormAlert message={state.message} />

      <Field
        id="name"
        label="Counselor name"
        optional
        hint="Clear the name to remove the assignment entirely."
        error={errors?.name}
      >
        <Input
          id="name"
          name="name"
          defaultValue={value('name', initial?.name ?? '')}
          invalid={Boolean(errors?.name)}
          placeholder="Shafqat Rahman"
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="role" label="Role" optional error={errors?.role}>
          <Input
            id="role"
            name="role"
            defaultValue={value('role', initial?.role ?? '')}
            invalid={Boolean(errors?.role)}
            placeholder="Senior Admissions Counselor"
          />
        </Field>
        <Field id="phone" label="Phone" optional error={errors?.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={value('phone', initial?.phone ?? '')}
            invalid={Boolean(errors?.phone)}
            placeholder="+880 1700-000000"
          />
        </Field>
      </div>

      <Field id="email" label="Email" optional error={errors?.email}>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={value('email', initial?.email ?? '')}
          invalid={Boolean(errors?.email)}
          placeholder="counselling@princetonreviewbd.com"
        />
      </Field>

      <Field
        id="nextCheckIn"
        label="Next check-in"
        optional
        hint="Dhaka time."
        error={errors?.nextCheckIn}
      >
        <Input
          id="nextCheckIn"
          name="nextCheckIn"
          type="datetime-local"
          defaultValue={value('nextCheckIn', checkInToInput(initial?.nextCheckIn))}
          invalid={Boolean(errors?.nextCheckIn)}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          Save counselor
        </Button>
        <Link
          href="/admin/students"
          className="text-[14px] text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
