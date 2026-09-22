import type { Metadata } from 'next';
import { adminGetUser } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { CounselorForm } from '@/components/admin/counselor-form';
import { Flash, single } from '@/components/admin/flash';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { getAdminClient } from '@/lib/admin/api';
import { updateCounselorAction } from '@/lib/admin/actions/students';

export const metadata: Metadata = { title: 'Edit counselor' };

export default async function EditCounselorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const { data: user } = await adminGetUser({ client, path: { id } });
  if (!user) notFound();

  const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

  return (
    <>
      <PortalHeader title={name} blurb={`Student · ${user.email}`} />

      <Flash message={single(query.flash)} />

      <CounselorForm initial={user.counselor} action={updateCounselorAction.bind(null, user.id)} />
    </>
  );
}
