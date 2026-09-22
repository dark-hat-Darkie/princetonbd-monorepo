import type { Metadata } from 'next';
import { adminGetTeacher, adminListBranches } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { TeacherForm } from '@/components/admin/teacher-form';
import { ConfirmForm } from '@/components/admin/confirm-form';
import { Flash, single } from '@/components/admin/flash';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { getAdminClient } from '@/lib/admin/api';
import { deleteTeacherAction, updateTeacherAction } from '@/lib/admin/actions/teachers';

export const metadata: Metadata = { title: 'Edit teacher' };

export default async function EditTeacherPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const [{ data: teacher }, { data: branches = [] }] = await Promise.all([
    adminGetTeacher({ client, path: { id } }),
    adminListBranches({ client }),
  ]);
  if (!teacher) notFound();

  const activeBranches = branches.filter((b) => b.isActive || teacher.branch?.id === b.id);

  return (
    <>
      <PortalHeader title={teacher.name} blurb={`Teacher · ${teacher.slug}`}>
        <ConfirmForm
          action={deleteTeacherAction.bind(null, teacher.id)}
          confirm={`Delete "${teacher.name}"? This only works if no course or batch still lists them; deactivate instead to keep the history.`}
          label="Delete"
          pendingLabel="Deleting…"
        />
      </PortalHeader>

      <Flash message={single(query.flash)} />

      <TeacherForm
        action={updateTeacherAction.bind(null, teacher.id)}
        branches={activeBranches}
        initial={teacher}
      />
    </>
  );
}
