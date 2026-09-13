import type { Metadata } from 'next';
import { adminGetBranch } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { BranchForm } from '@/components/admin/branch-form';
import { ConfirmForm } from '@/components/admin/confirm-form';
import { Flash, single } from '@/components/admin/flash';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { getAdminClient } from '@/lib/admin/api';
import { deleteBranchAction, updateBranchAction } from '@/lib/admin/actions/branches';

export const metadata: Metadata = { title: 'Edit branch' };

export default async function EditBranchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const { data: branch } = await adminGetBranch({ client, path: { id } });
  if (!branch) notFound();

  return (
    <>
      <PortalHeader title={branch.name} blurb={`Branch · ${branch.slug}`}>
        <ConfirmForm
          action={deleteBranchAction.bind(null, branch.id)}
          confirm={`Delete "${branch.name}"? This only works if no batch or teacher still uses it.`}
          label="Delete"
          pendingLabel="Deleting…"
        />
      </PortalHeader>

      <Flash message={single(query.flash)} />

      <BranchForm action={updateBranchAction.bind(null, branch.id)} initial={branch} />
    </>
  );
}
