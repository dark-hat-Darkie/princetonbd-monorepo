import type { Metadata } from 'next';
import { adminListBranches } from '@repo/api-client';

import { TeacherForm } from '@/components/admin/teacher-form';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { createTeacherAction } from '@/lib/admin/actions/teachers';
import { getAdminClient } from '@/lib/admin/api';

export const metadata: Metadata = { title: 'New teacher' };

export default async function NewTeacherPage() {
  const client = await getAdminClient();
  const { data: branches = [] } = await adminListBranches({ client });
  const activeBranches = branches.filter((b) => b.isActive);

  return (
    <>
      <PortalHeader title="New teacher" blurb="A member of the faculty shown on course pages." />
      <TeacherForm action={createTeacherAction} branches={activeBranches} />
    </>
  );
}
