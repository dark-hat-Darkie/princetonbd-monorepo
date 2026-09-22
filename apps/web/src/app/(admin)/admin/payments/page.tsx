import type { Metadata } from 'next';
import { adminListPayments, type PaymentAttemptStatus } from '@repo/api-client';
import Link from 'next/link';

import { adminLinkFor } from '@/components/admin/admin-nav';
import { DataTable } from '@/components/admin/data-table';
import { EmptyState } from '@/components/admin/empty-state';
import { Flash, single } from '@/components/admin/flash';
import { StatusBadge } from '@/components/admin/status-badge';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { inputClass, labelClass } from '@/components/ui/form/input-class';
import { getAdminClient } from '@/lib/admin/api';
import { formatDayMonth } from '@/lib/dates';
import { formatPrice } from '@/lib/money';
import { cn } from '@/lib/cn';

export const metadata: Metadata = { title: 'Payments' };

const statuses = ['pending', 'processing', 'success', 'failed', 'cancelled', 'expired'] as const;

function pageHref(params: Record<string, string | undefined>, page: number): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  query.set('page', String(page));
  return `/admin/payments?${query.toString()}`;
}

/** Every enrollment payment, newest first — the money view of the platform. */
export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const link = adminLinkFor('/admin/payments');
  const status = single(params.status);
  const q = single(params.q);
  const page = Math.max(1, Number(single(params.page) ?? '1') || 1);

  const client = await getAdminClient();
  const { data } = await adminListPayments({
    client,
    query: {
      ...(status ? { status: status as PaymentAttemptStatus } : {}),
      ...(q ? { q } : {}),
      page,
      perPage: 20,
    },
  });

  const rows = data?.data ?? [];
  const total = data?.total ?? 0;
  const perPage = data?.perPage ?? 20;
  const lastPage = Math.max(1, Math.ceil(total / perPage));

  return (
    <>
      <PortalHeader title="Payments" blurb={link?.blurb ?? ''} />

      <Flash message={single(params.flash)} />

      <form
        method="get"
        action="/admin/payments"
        className="mb-6 flex flex-wrap items-end gap-4 rounded-lg border border-line bg-surface px-5 py-4"
      >
        <label htmlFor="payments-status" className={cn(labelClass, 'flex flex-col gap-2')}>
          Status
          <select
            id="payments-status"
            name="status"
            defaultValue={status ?? ''}
            className={inputClass(false)}
          >
            <option value="">Every status</option>
            {statuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="payments-q"
          className={cn(labelClass, 'flex min-w-[220px] flex-1 flex-col gap-2')}
        >
          Reference, student, or enrollment
          <input
            id="payments-q"
            name="q"
            type="search"
            defaultValue={q ?? ''}
            placeholder="PAY-… · name · enrollment id"
            className={inputClass(false)}
          />
        </label>
        <button
          type="submit"
          className="cursor-pointer rounded-full border border-transparent bg-ink px-5 py-3 text-[11px] font-bold tracking-[.11em] text-on-ink uppercase hover:bg-ink-soft"
        >
          Filter
        </button>
        {(status ?? q) ? (
          <Link
            href="/admin/payments"
            className="px-1 py-3 text-[13px] text-ink underline underline-offset-4 hover:text-brand-ink"
          >
            Clear
          </Link>
        ) : null}
      </form>

      <DataTable
        rows={rows}
        rowKey={(row) => row.attemptId}
        empty={
          <EmptyState
            title="No payments yet."
            body="Payments appear here the moment a learner starts checkout. Share a course link and they will."
          />
        }
        columns={[
          {
            key: 'reference',
            header: 'Reference',
            cell: (row) =>
              row.providerReference ? (
                <Link
                  href={`/admin/payments/${row.providerReference}`}
                  className="font-mono text-[13px] font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:text-brand-ink hover:decoration-brand"
                >
                  {row.providerReference}
                </Link>
              ) : (
                <span className="text-muted-2">Not created</span>
              ),
          },
          {
            key: 'student',
            header: 'Student',
            cell: (row) => (
              <>
                <span className="font-semibold text-ink">{row.studentName}</span>
                <span className="block text-[12.5px] text-muted-2">{row.studentEmail}</span>
              </>
            ),
          },
          {
            key: 'course',
            header: 'Course',
            cell: (row) => (
              <>
                {row.courseName}
                {row.batchStartsOn ? (
                  <span className="block text-[12.5px] text-muted-2 tabular-nums">
                    starts {formatDayMonth(row.batchStartsOn)}
                  </span>
                ) : null}
              </>
            ),
          },
          {
            key: 'amount',
            header: 'Amount',
            className: 'text-right',
            cell: (row) => (
              <span className="tabular-nums">
                {formatPrice({ amount: row.amount, currency: 'BDT' })}
              </span>
            ),
          },
          {
            key: 'status',
            header: 'Payment',
            cell: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'enrollment',
            header: 'Enrollment',
            cell: (row) => <StatusBadge status={row.enrollmentStatus} />,
          },
          {
            key: 'open',
            header: <span className="sr-only">Actions</span>,
            className: 'text-right',
            cell: (row) =>
              row.providerReference ? (
                <CtaButton
                  href={`/admin/payments/${row.providerReference}`}
                  size="sm"
                  variant="outline"
                >
                  Open
                </CtaButton>
              ) : null,
          },
        ]}
      />

      {lastPage > 1 ? (
        <nav aria-label="Payments pages" className="mt-6 flex items-center gap-3">
          {page > 1 ? (
            <CtaButton size="sm" variant="outline" href={pageHref({ status, q }, page - 1)}>
              ← Newer
            </CtaButton>
          ) : null}
          <span className="text-[13px] text-muted-2 tabular-nums">
            Page {String(page)} of {String(lastPage)} · {String(total)} payments
          </span>
          {page < lastPage ? (
            <CtaButton size="sm" variant="outline" href={pageHref({ status, q }, page + 1)}>
              Older →
            </CtaButton>
          ) : null}
        </nav>
      ) : null}
    </>
  );
}
