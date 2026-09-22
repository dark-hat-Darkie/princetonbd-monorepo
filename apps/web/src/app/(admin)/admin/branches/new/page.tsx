import type { Metadata } from 'next';

import { BranchForm } from '@/components/admin/branch-form';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { createBranchAction } from '@/lib/admin/actions/branches';

export const metadata: Metadata = { title: 'New branch' };

export default function NewBranchPage() {
  return (
    <>
      <PortalHeader title="New branch" blurb="A campus classroom batches can be scheduled at." />
      <BranchForm action={createBranchAction} />
    </>
  );
}
