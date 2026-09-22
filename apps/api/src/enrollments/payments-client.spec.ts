import { ServiceUnavailableException } from '@nestjs/common';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PaymentsClient } from './payments-client.js';

function makeClient(baseUrl = 'https://payments.example.com'): PaymentsClient {
  return new PaymentsClient({
    PAYMENTS_BASE_URL: baseUrl,
    PAYMENTS_API_TOKEN: 'test-token',
    PAYMENTS_TIMEOUT_MS: 1000,
    PAYMENTS_SOURCE_SITE: 'princetonbd',
    PAYMENTS_SUCCESS_MODEL: 'PurchaseCourse',
    PAYMENTS_SUCCESS_FUNCTION: 'purchase_course',
    PAYMENTS_SUCCESS_URL: 'http://localhost:3000/enroll/success',
    PAYMENTS_CANCEL_URL: 'http://localhost:3000/enroll/failed',
  } as never);
}

function reply(status: number, body: unknown): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      }),
    ),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

async function messageOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof ServiceUnavailableException) return error.message;
    throw error;
  }
  throw new Error('expected a ServiceUnavailableException');
}

describe('PaymentsClient provider refusals', () => {
  it('names misconfiguration when the redirect host is not allowlisted', async () => {
    const client = makeClient();
    reply(422, {
      success: false,
      message: 'cancel_url/success_url is not an allowed host for this client.',
    });

    await expect(messageOf(client.getStatus('PAY-NOPE'))).resolves.toMatch(/not allowlisted/);
  });

  it('keeps other refusals as a short provider excerpt', async () => {
    const client = makeClient();
    reply(422, { success: false, message: 'payable_amount mismatch' });

    await expect(messageOf(client.getStatus('PAY-NOPE'))).resolves.toMatch(/refused the payment/);
  });
});

type RouteBody = { status: number; body: unknown } | { fail: true };

/** One fetch mock answering per provider endpoint: success, fail, cancel, status. */
function mockOutcomeRoutes(routes: {
  success?: RouteBody;
  fail?: RouteBody;
  cancel?: RouteBody;
  status?: RouteBody;
}): string[] {
  const seen: string[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      seen.push(url);
      const route = url.includes('/api/payment-init/')
        ? (routes.status ?? { status: 404, body: {} })
        : url.endsWith('/success')
          ? (routes.success ?? { status: 404, body: {} })
          : url.endsWith('/fail')
            ? (routes.fail ?? { status: 404, body: {} })
            : (routes.cancel ?? { status: 404, body: {} });
      if ('fail' in route) return Promise.reject(new Error('socket hang up'));
      const body = route.body;
      return Promise.resolve(
        new Response(typeof body === 'string' ? body : JSON.stringify(body), {
          status: route.status,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }),
  );
  return seen;
}

describe('PaymentsClient.getOutcome', () => {
  it('takes success from the outcome page with its amount', async () => {
    const client = makeClient();
    mockOutcomeRoutes({
      success: {
        status: 200,
        body: { payment_status: 'success', payable_amount: 8500, currency: 'BDT' },
      },
    });

    const outcome = await client.getOutcome('PAY-ABC');

    expect(outcome.paymentStatus).toBe('success');
    expect(outcome.payableAmount).toBe(8500);
  });

  it('takes failure from the fail page even when the status API still says pending', async () => {
    const client = makeClient();
    mockOutcomeRoutes({
      fail: { status: 200, body: { payment_status: 'failed' } },
      status: { status: 200, body: { success: true, payment_status: 'pending' } },
    });

    const outcome = await client.getOutcome('PAY-STUCK');

    expect(outcome.paymentStatus).toBe('failed');
  });

  it('asks the cancel page on the apex host', async () => {
    const client = makeClient('https://my.payments.example.com');
    const seen = mockOutcomeRoutes({
      cancel: { status: 200, body: { payment_status: 'cancelled' } },
    });

    const outcome = await client.getOutcome('PAY-ABC');

    expect(outcome.paymentStatus).toBe('cancelled');
    expect(seen).toContain('https://payments.example.com/api/payment/PAY-ABC/cancel');
  });

  it('treats an unreadable page as unknown and falls back to pending', async () => {
    const client = makeClient();
    mockOutcomeRoutes({
      success: { status: 200, body: '<html>ok</html>' },
      status: { status: 200, body: { success: true, payment_status: 'pending' } },
    });

    const outcome = await client.getOutcome('PAY-ABC');

    expect(outcome.paymentStatus).toBe('pending');
  });

  it('throws when every source hard-fails', async () => {
    const client = makeClient();
    mockOutcomeRoutes({
      success: { fail: true },
      fail: { fail: true },
      cancel: { fail: true },
      status: { fail: true },
    });

    await expect(messageOf(client.getOutcome('PAY-ABC'))).resolves.toMatch(/could not report/);
  });
});
