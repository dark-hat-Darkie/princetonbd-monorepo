'use client';

import type { CurriculumModuleDto } from '@repo/api-client';
import { useActionState } from 'react';

import { FormAlert } from '@/components/admin/flash';
import { ModuleListEditor, type ModuleRow } from '@/components/admin/module-list-editor';
import { Button } from '@/components/ui/form/button';
import { initialAdminFormState, type AdminFormState } from '@/lib/admin/form-state';

function toRows(modules: readonly CurriculumModuleDto[]): ModuleRow[] {
  return modules.map((module) => ({
    title: module.title,
    summary: module.summary,
    topicsText: module.topics.join('\n'),
    hours: module.hours === null ? '' : String(module.hours),
    outcome: module.outcome ?? '',
  }));
}

export function CurriculumForm({
  action,
  initial,
}: {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  initial: readonly CurriculumModuleDto[];
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);

  return (
    <form action={formAction} noValidate className="flex max-w-[840px] flex-col gap-6">
      <FormAlert message={state.message} />

      <ModuleListEditor initial={toRows(initial)} errors={state.errors} />

      <div className="flex flex-wrap items-center gap-3 border-t border-t-line pt-6">
        <Button type="submit" pending={pending} pendingLabel="Saving…">
          Save curriculum
        </Button>
        <span className="text-[13px] text-muted-2">
          Replaces the whole module list; positions follow the order above.
        </span>
      </div>
    </form>
  );
}
