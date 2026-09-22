import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { InjectEnv, type ApiEnv } from '../config/env.module.js';

export interface ProviderCreateInput {
  title: string;
  subtitle: string;
  externalUserId: string;
  enrollmentId: string;
  payableAmount: number;
  currency: string;
}

export interface ProviderCreateResult {
  reference: string;
  status: string;
  paymentUrl: string;
}

export interface ProviderStatusResult {
  reference: string;
  sourceSite: string | null;
  externalUserId: string | null;
  paymentStatus: string;
  payableAmount: number | null;
  currency: string | null;
  paidAt: string | null;
  raw: ProviderJson;
}

/** The provider's loosely-typed JSON envelope. */
export type ProviderJson = Record<string, unknown>;

/** One lenient outcome probe: transport error, HTTP status, parsed body. */
export interface OutcomeProbe {
  status: number;
  json: ProviderJson | null;
  error: string | null;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/**
 * Thin HTTP wrapper around the centralized payment app.
 *
 * Only this service ever sees `PAYMENTS_API_TOKEN`, and it never logs it —
 * error paths keep the status code plus a truncated body with any
 * `token`-shaped substring scrubbed. When no credentials are configured the
 * service throws 503 so the rest of the app boots and serves the CMS
 * normally; the enroll flow reports "payments unavailable" instead of 500ing.
 */
@Injectable()
export class PaymentsClient {
  constructor(@InjectEnv() private readonly env: ApiEnv) {}

  configured(): boolean {
    return Boolean(this.env.PAYMENTS_BASE_URL && this.env.PAYMENTS_API_TOKEN);
  }

  private requireConfig(): { baseUrl: string; token: string } {
    const baseUrl = this.env.PAYMENTS_BASE_URL;
    const token = this.env.PAYMENTS_API_TOKEN;
    if (!baseUrl || !token) {
      throw new ServiceUnavailableException('Online payments are not configured yet');
    }
    return { baseUrl, token };
  }

  async createPayment(input: ProviderCreateInput): Promise<ProviderCreateResult> {
    const { baseUrl, token } = this.requireConfig();
    const body = {
      items: [
        {
          id: input.enrollmentId,
          title: input.title,
          subtitle: input.subtitle,
          price: input.payableAmount,
          discount_price: 0,
        },
      ],
      custom_field: {
        item_type: 'course',
        pay_for: 'course payment',
        user_id: input.externalUserId,
        cart_id: [input.enrollmentId],
      },
      success_method: {
        model_name: this.env.PAYMENTS_SUCCESS_MODEL,
        function_name: this.env.PAYMENTS_SUCCESS_FUNCTION,
      },
      tax: 0,
      coupon: null,
      coupon_discount: 0,
      payable_amount: input.payableAmount,
      currency: input.currency,
      cancel_url: this.env.PAYMENTS_CANCEL_URL,
      success_url: this.env.PAYMENTS_SUCCESS_URL,
      external_reference: input.enrollmentId,
    };

    const json = await this.post<ProviderJson>(`${baseUrl}/api/payment-init`, token, body);
    const reference = asString(json.transaction_id) || asString(json.reference);
    if (!json.success || !reference) {
      throw new ServiceUnavailableException('Payment provider rejected the request');
    }
    return {
      reference,
      status: asString(json.status) || 'pending',
      paymentUrl:
        typeof json.payment_url === 'string' && json.payment_url
          ? json.payment_url
          : `${baseUrl}/api/payment?reference=${encodeURIComponent(reference)}`,
    };
  }

  async getStatus(reference: string): Promise<ProviderStatusResult> {
    const { baseUrl, token } = this.requireConfig();
    const json = await this.get<ProviderJson>(
      `${baseUrl}/api/payment-init/${encodeURIComponent(reference)}`,
      token,
    );
    if (!json.success) {
      throw new ServiceUnavailableException('Payment provider could not report status');
    }
    const externalUserId = asString(json.external_user_id);
    return {
      reference: asString(json.transaction_id) || reference,
      sourceSite: asString(json.source_site) || null,
      externalUserId: externalUserId === '' ? null : externalUserId,
      paymentStatus: asString(json.payment_status) || 'pending',
      payableAmount: typeof json.payable_amount === 'number' ? json.payable_amount : null,
      currency: asString(json.currency) || null,
      paidAt: asString(json.paid_at) || null,
      raw: json,
    };
  }

  /**
   * The combined truth for one reference: the provider's per-outcome pages
   * (`/api/payment/{ref}/success|fail|cancel`) plus the documented status
   * API, asked in parallel. The status API alone can sit on `pending` after
   * the real outcome is already visible on the outcome pages, so every
   * source votes and terminal outcomes win by precedence:
   * success > failed > cancelled > expired > pending.
   *
   * Only JSON affirmations count — an unreadable body or a transport error
   * is `unknown`, never a vote. When nothing affirmative arrives but at
   * least one source hard-failed (network, timeout, unreadable), this
   * throws, preserving the "could not confirm" UX instead of a false
   * pending. All-quiet (4xxs, empty) resolves to pending: try again later.
   */
  async getOutcome(reference: string): Promise<ProviderStatusResult> {
    const { baseUrl, token } = this.requireConfig();
    const encoded = encodeURIComponent(reference);
    /* The cancel page lives on the apex host while success/fail live on the
       app host — the one host quirk the payment team gave us. */
    const cancelBase = baseUrl.replace('://my.', '://');
    const probes: [
      Promise<OutcomeProbe>,
      Promise<OutcomeProbe>,
      Promise<OutcomeProbe>,
      Promise<OutcomeProbe>,
    ] = [
      this.probe(`${baseUrl}/api/payment/${encoded}/success`, token),
      this.probe(`${baseUrl}/api/payment/${encoded}/fail`, token),
      this.probe(`${cancelBase}/api/payment/${encoded}/cancel`, token),
      this.probe(`${baseUrl}/api/payment-init/${encoded}`, token),
    ];
    const [success, failed, cancelled, documented] = await Promise.all(probes);

    const votes = [
      { kind: 'success' as const, probe: success },
      { kind: 'failed' as const, probe: failed },
      { kind: 'cancelled' as const, probe: cancelled },
      { kind: 'status' as const, probe: documented },
    ];
    const affirmed = new Set(
      votes.flatMap(({ kind, probe }) => {
        const status = probe.json ? PaymentsClient.normalizeOutcome(probe.json) : null;
        /* A kind page affirming its own outcome, or any source carrying an
           explicit terminal word, counts as a vote for that outcome. */
        if (kind !== 'status' && status === kind) return [kind];
        if (status === 'success' || status === 'failed' || status === 'cancelled') return [status];
        return [];
      }),
    );

    const hardError = votes.some(({ probe }) => probe.error !== null);
    let paymentStatus = 'pending';
    if (affirmed.has('success')) paymentStatus = 'success';
    else if (affirmed.has('failed')) paymentStatus = 'failed';
    else if (affirmed.has('cancelled')) paymentStatus = 'cancelled';
    else if (hardError) {
      throw new ServiceUnavailableException('Payment provider could not report status');
    }

    const firstAmount = votes
      .map(({ probe }) => probe.json)
      .find((json): json is ProviderJson => !!json && typeof json.payable_amount === 'number');
    const amount = firstAmount ? (firstAmount.payable_amount as number) : null;
    const firstCurrency = votes
      .map(({ probe }) => (probe.json ? asString(probe.json.currency) : ''))
      .find((currency) => currency !== '');
    const firstPaidAt = votes
      .map(({ probe }) => (probe.json ? asString(probe.json.paid_at) : ''))
      .find((paidAt) => paidAt !== '');

    return {
      reference,
      sourceSite: this.env.PAYMENTS_SOURCE_SITE,
      externalUserId: null,
      paymentStatus,
      payableAmount: amount,
      currency: firstCurrency ?? null,
      paidAt: firstPaidAt ?? null,
      raw: {
        payable_amount: amount,
        sources: {
          success: success.json,
          fail: failed.json,
          cancel: cancelled.json,
          status: documented.json,
        },
      },
    };
  }

  /**
   * One lenient probe: never throws. Transport failures, unreadable bodies,
   * and non-2xx answers are all reported, leaving the merge to decide.
   */
  private async probe(url: string, token: string): Promise<OutcomeProbe> {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(this.env.PAYMENTS_TIMEOUT_MS),
      });
      if (!response.ok) return { status: response.status, json: null, error: null };
      let json: ProviderJson | null = null;
      try {
        const parsed: unknown = await response.json();
        if (parsed && typeof parsed === 'object') json = parsed as ProviderJson;
      } catch {
        json = null;
      }
      return { status: response.status, json, error: null };
    } catch (error) {
      return {
        status: 0,
        json: null,
        error: error instanceof Error ? error.name : 'fetch failed',
      };
    }
  }

  /**
   * A provider body reduced to one outcome word, or null when it says
   * nothing usable. A bare `success: false` is deliberately *not* a failure
   * vote — on a fail page it would mean the opposite of what it says.
   */
  private static normalizeOutcome(
    body: ProviderJson,
  ): 'success' | 'failed' | 'cancelled' | 'expired' | 'pending' | null {
    const word = [body.payment_status, body.status, body.result, body.state].find(
      (value): value is string => typeof value === 'string',
    );
    if (word) {
      switch (word.toLowerCase()) {
        case 'success':
        case 'successful':
        case 'completed':
        case 'complete':
        case 'paid':
          return 'success';
        case 'failed':
        case 'fail':
        case 'failure':
          return 'failed';
        case 'cancelled':
        case 'canceled':
        case 'cancel':
          return 'cancelled';
        case 'expired':
          return 'expired';
        case 'pending':
        case 'processing':
        case 'initiated':
          return 'pending';
        default:
          return null;
      }
    }
    if (body.success === true) return 'success';
    return null;
  }

  private async post<T>(url: string, token: string, body: unknown): Promise<T> {
    return this.request<T>(url, token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  private async get<T>(url: string, token: string): Promise<T> {
    return this.request<T>(url, token, { method: 'GET' });
  }

  private async request<T>(url: string, token: string, init: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.env.PAYMENTS_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(url, {
        ...init,
        headers: { ...(init.headers ?? {}), Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        error instanceof Error && error.name === 'AbortError'
          ? 'Payment provider timed out'
          : 'Payment provider is unreachable',
      );
    } finally {
      clearTimeout(timer);
    }
    if (response.status === 401 || response.status === 403) {
      throw new ServiceUnavailableException('Payment provider rejected our credentials');
    }
    let json: T;
    try {
      json = (await response.json()) as T;
    } catch {
      throw new ServiceUnavailableException('Payment provider answered unreadably');
    }
    if (!response.ok) {
      /* Validation failures (422) carry field detail; surface a short,
         token-free excerpt rather than the raw provider body — except a
         redirect-host rejection, which is our own misconfiguration and
         deserves a message that says so instead of provider JSON. */
      const excerpt = PaymentsClient.scrub(JSON.stringify(json).slice(0, 300));
      if (/allowed host|success_url|cancel_url/i.test(excerpt)) {
        throw new ServiceUnavailableException(
          'Payment provider rejected our redirect addresses (host not allowlisted for this client)',
        );
      }
      throw new ServiceUnavailableException(`Payment provider refused the payment (${excerpt})`);
    }
    return json;
  }

  /**
   * The redirect addresses sent with every create call. The service persists
   * them per attempt as the audit record of what the provider was told.
   */
  redirectUrls(): { successUrl: string; cancelUrl: string } {
    return { successUrl: this.env.PAYMENTS_SUCCESS_URL, cancelUrl: this.env.PAYMENTS_CANCEL_URL };
  }

  /**
   * The hosted-checkout URL for a reference. The provider returns this at
   * creation; reconstructing the same shape lets learners resume an open
   * attempt without a second provider call.
   */
  paymentPageUrl(reference: string): string {
    const base = this.env.PAYMENTS_BASE_URL;
    if (!base) throw new ServiceUnavailableException('Online payments are not configured yet');
    return `${base}/api/payment?reference=${encodeURIComponent(reference)}`;
  }

  private static scrub(text: string): string {
    return text.replace(/(bearer\s+)[^\s"']+/gi, '$1[redacted]');
  }
}
