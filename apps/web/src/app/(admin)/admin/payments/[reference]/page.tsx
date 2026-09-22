import type { Metadata } from 'next';
import { adminGetPayment } from '@repo/api-client';
import { notFound } from 'next/navigation';

import { Flash, single } from '@/components/admin/flash';
import { StatusBadge } from '@/components/admin/status-badge';
import { Panel, PanelRow } from '@/components/dashboard/panel';
import { PortalHeader } from '@/components/dashboard/portal-shell';
import { CtaButton } from '@/components/ui/cta-button';
import { Button } from '@/components/ui/form/button';
import { getAdminClient } from '@/lib/admin/api';
import { resyncPaymentAction } from '@/lib/admin/actions/payments';
import { formatPrice } from '@/lib/money';

export const metadata: Metadata = { title: 'Payment detail' };

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <PanelRow>
      <span className="w-40 flex-none text-[13px] font-bold tracking-[.08em] text-muted-2 uppercase">
        {label}
      </span>
      <span className="flex-1 text-[14.5px] leading-[1.55] text-ink">{children}</span>
    </PanelRow>
  );
}

/**
 * One payment attempt with everything support needs: who paid, for what, how
 * much, what the provider last said, and a re-sync that asks the provider
 * again. The payload panel is the raw verification record — the audit trail
 * the incident review asks for first.
 */
export default async function AdminPaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ reference }, query] = await Promise.all([params, searchParams]);
  const client = await getAdminClient();
  const { data: payment, response } = await adminGetPayment({ client, path: { reference } });
  if (!payment || response?.status === 404) notFound();

  return (
    <>
      <PortalHeader
        title={payment.providerReference ?? 'Uncreated attempt'}
        blurb="Payment attempt"
      >
        <form action={resyncPaymentAction.bind(null, payment.providerReference ?? '')}>
          <Button type="submit" variant="outline" size="sm" disabled={!payment.providerReference}>
            Re-sync now
          </Button>
        </form>
        <CtaButton href="/admin/payments" size="sm" variant="outline">
          All payments
        </CtaButton>
      </PortalHeader>

      <Flash message={single(query.flash)} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Attempt">
          <Row label="Payment">
            <StatusBadge status={payment.status} />
          </Row>
          <Row label="Enrollment">
            <StatusBadge status={payment.enrollmentStatus} />
          </Row>
          <Row label="Amount">
            <span className="tabular-nums">
              {formatPrice({ amount: payment.amount, currency: 'BDT' })}
            </span>
          </Row>
          <Row label="Paid at">{payment.paidAt ?? '—'}</Row>
          <Row label="Attempt id">
            <span className="font-mono text-[13px]">{payment.attemptId}</span>
          </Row>
          <Row label="Enrollment id">
            <span className="font-mono text-[13px]">{payment.enrollmentId}</span>
          </Row>
        </Panel>

        <Panel title="Student">
          <Row label="Name">{payment.studentName}</Row>
          <Row label="Email">{payment.studentEmail}</Row>
          <Row label="Phone">{payment.phone ?? '—'}</Row>
          <Row label="Education">{payment.education ?? '—'}</Row>
          <Row label="Address">{payment.address ?? '—'}</Row>
        </Panel>

        <Panel title="Course">
          <Row label="Course">{payment.courseName}</Row>
          <Row label="Batch starts">{payment.batchStartsOn ?? 'Any batch'}</Row>
        </Panel>

        <Panel title="Provider record" meta="as last verified">
          {payment.lastProviderPayload ? (
            <pre className="overflow-x-auto rounded-sm bg-panel px-5 py-4 font-mono text-[12.5px] leading-[1.6] text-ink-soft">
              {JSON.stringify(payment.lastProviderPayload, null, 2)}
            </pre>
          ) : (
            <PanelRow>
              <span className="text-[14.5px] text-muted-2">
                No verification record yet — the attempt never reached the provider, or no status
                check has run.
              </span>
            </PanelRow>
          )}
        </Panel>
      </div>
    </>
  );
}
