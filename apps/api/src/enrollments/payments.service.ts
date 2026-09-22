import {
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  and,
  batches,
  count,
  courses,
  desc,
  enrollments,
  eq,
  ilike,
  or,
  paymentAttempts,
  users,
  type Database,
  type Enrollment,
  type EnrollmentStatus,
  type PaymentAttempt,
  type PaymentAttemptStatus,
  type User,
} from '@repo/db';

import { ValidationFailedException } from '../common/http/validation-failed.exception.js';
import { InjectDb } from '../database/database.module.js';
import { EnrollmentsService } from './enrollments.service.js';
import {
  AdminPaymentDetailDto,
  AdminPaymentListDto,
  type AdminPaymentListQuery,
} from './dto/admin-payment.dto.js';
import { PaymentInitDto, PaymentStatusDto } from './dto/payment.dto.js';
import { PaymentsClient } from './payments-client.js';

/**
 * Payment orchestration over the centralized payment app.
 *
 * The invariant: enrollment becomes `active` only inside `applyStatus`,
 * and only when the provider's own status lookup says `success` for the
 * exact amount we locked at init. Browser redirects, query params, and
 * client claims never grant anything — the success page polls
 * `GET /enrollments/:id/status`, which funnels through here.
 */
@Injectable()
export class PaymentsService {
  constructor(
    @InjectDb() private readonly db: Database,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly provider: PaymentsClient,
  ) {}

  /* --- learner ------------------------------------------------------------- */

  async initPayment(user: User, enrollmentId: string): Promise<PaymentInitDto> {
    const enrollment = await this.enrollmentsService.loadOwned(user.id, enrollmentId);
    if (enrollment.status === 'active') {
      throw new ConflictException('This enrollment is already paid');
    }
    if (!enrollment.fullName) {
      throw ValidationFailedException.forField('fullName', 'Add the student details before paying');
    }

    const fee = await this.enrollmentsService.feeFor(enrollment.courseId, enrollment.batchId);
    const names = await this.describe(enrollment);

    /* One live attempt per enrollment: resume it when the learner refreshes,
       goes back, or double-clicks Pay. */
    const [open] = await this.db
      .select()
      .from(paymentAttempts)
      .where(
        and(
          eq(paymentAttempts.enrollmentId, enrollment.id),
          or(eq(paymentAttempts.status, 'pending'), eq(paymentAttempts.status, 'processing')),
        ),
      )
      .limit(1);

    const attempt =
      open ??
      (
        await this.db
          .insert(paymentAttempts)
          .values({ enrollmentId: enrollment.id, amount: fee.amount, currency: fee.currency })
          .returning()
      )[0]!;

    /* A locked amount is final for its attempt: a price edit after the first
       init must not silently move the charged total. */
    if (attempt.amount !== fee.amount) {
      throw ValidationFailedException.forField(
        'enrollment',
        'The course fee changed since this payment was started. Contact support to restart checkout.',
      );
    }

    if (attempt.providerReference) {
      return this.toInitDto(enrollment, attempt);
    }

    let created;
    try {
      created = await this.provider.createPayment({
        title: names.title,
        subtitle: names.subtitle,
        externalUserId: user.id,
        enrollmentId: attempt.id,
        payableAmount: attempt.amount,
        currency: attempt.currency,
      });
    } catch (error) {
      await this.db
        .update(paymentAttempts)
        .set({ status: 'failed' })
        .where(eq(paymentAttempts.id, attempt.id));
      throw error;
    }

    /* Persist the exact redirect addresses the provider was given, so a
       wrong-redirect incident can be settled from our own audit trail. */
    const redirectUrls = this.provider.redirectUrls();
    const [updated] = await this.db
      .update(paymentAttempts)
      .set({
        providerReference: created.reference,
        status: this.toAttemptStatus(created.status),
        successUrl: redirectUrls.successUrl,
        cancelUrl: redirectUrls.cancelUrl,
      })
      .where(eq(paymentAttempts.id, attempt.id))
      .returning();
    await this.db
      .update(enrollments)
      .set({ status: 'pending_payment' })
      .where(eq(enrollments.id, enrollment.id));

    return this.toInitDto(enrollment, updated!);
  }

  async verifyStatus(user: User, enrollmentId: string): Promise<PaymentStatusDto> {
    return this.verifyEnrollment(await this.enrollmentsService.loadOwned(user.id, enrollmentId));
  }

  /**
   * Verify starting from a provider reference instead of our enrollment id.
   * The lookup itself is owner-scoped — another learner's (or a forged)
   * reference 404s exactly like an unknown one — so return pages may accept
   * `?reference=` links without trusting them.
   */
  async verifyByReference(user: User, reference: string): Promise<PaymentStatusDto> {
    return this.verifyEnrollment(await this.loadEnrollmentByReference(user.id, reference));
  }

  private async verifyEnrollment(enrollment: Enrollment): Promise<PaymentStatusDto> {
    /* Fast path: a settled enrollment re-renders without another provider
       round-trip; the admin re-sync forces a fresh check. */
    if (enrollment.status === 'active') {
      return this.toStatusDto(enrollment, await this.latestAttempt(enrollment.id), 'success');
    }
    /* Every open attempt is checked, newest first — not just the latest.
       Retries, double-clicks, and back-button resubmits each open their own
       attempt, and the learner may have paid any one of them. The first
       verified success grants the enrollment. */
    let checked = 0;
    let lastError: unknown = null;
    for (const attempt of await this.openAttempts(enrollment.id)) {
      if (!attempt.providerReference) continue;
      try {
        const provider = await this.provider.getOutcome(attempt.providerReference);
        checked += 1;
        const applied = await this.applyStatus(
          attempt.id,
          enrollment,
          provider.paymentStatus,
          provider.raw,
        );
        enrollment.status = applied.enrollment.status;
        if (applied.enrollment.status === 'active') {
          return this.toStatusDto(applied.enrollment, applied.attempt, provider.paymentStatus);
        }
      } catch (error) {
        lastError = error;
      }
    }
    /* Nothing verified and every check failed: surface the outage rather
       than a misleading "pending". */
    if (checked === 0 && lastError) {
      throw lastError instanceof Error
        ? lastError
        : new ServiceUnavailableException('Payment verification failed');
    }
    const latest = await this.latestAttempt(enrollment.id);
    return this.toStatusDto(enrollment, latest, latest?.status ?? 'pending');
  }

  /* --- admin --------------------------------------------------------------- */

  async adminList(query: AdminPaymentListQuery): Promise<AdminPaymentListDto> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;
    const term = query.q?.trim();

    const filters = [
      ...(query.status ? [eq(paymentAttempts.status, query.status as PaymentAttemptStatus)] : []),
      ...(term
        ? [
            or(
              ilike(paymentAttempts.providerReference, `%${term}%`),
              ilike(enrollments.fullName, `%${term}%`),
            ),
          ]
        : []),
    ];

    const where = filters.length > 0 ? and(...filters) : undefined;
    const [totalRow] = await this.db
      .select({ value: count() })
      .from(paymentAttempts)
      .innerJoin(enrollments, eq(paymentAttempts.enrollmentId, enrollments.id))
      .where(where);
    const total = totalRow?.value ?? 0;

    const rows = await this.db
      .select({
        attempt: paymentAttempts,
        enrollment: enrollments,
        user: users,
        course: courses,
        batch: batches,
      })
      .from(paymentAttempts)
      .innerJoin(enrollments, eq(paymentAttempts.enrollmentId, enrollments.id))
      .innerJoin(users, eq(enrollments.userId, users.id))
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .leftJoin(batches, eq(enrollments.batchId, batches.id))
      .where(where)
      .orderBy(desc(paymentAttempts.createdAt))
      .limit(perPage)
      .offset((page - 1) * perPage);

    return {
      data: rows.map((row) => ({
        attemptId: row.attempt.id,
        providerReference: row.attempt.providerReference,
        enrollmentId: row.enrollment.id,
        studentName:
          row.enrollment.fullName ||
          `${row.user.firstName ?? ''} ${row.user.lastName ?? ''}`.trim() ||
          row.user.email,
        studentEmail: row.user.email,
        courseName: row.course.name,
        batchStartsOn: row.batch?.startsOn ?? null,
        amount: row.attempt.amount,
        currency: row.attempt.currency,
        status: row.attempt.status,
        enrollmentStatus: row.enrollment.status,
      })),
      page,
      perPage,
      total,
    };
  }

  async adminGet(reference: string): Promise<AdminPaymentDetailDto> {
    const row = await this.loadByReference(reference);
    return this.toDetailDto(row);
  }

  async adminResync(reference: string): Promise<AdminPaymentDetailDto> {
    const row = await this.loadByReference(reference);
    if (!row.attempt.providerReference) {
      throw new ServiceUnavailableException('This attempt never reached the payment provider');
    }
    const provider = await this.provider.getOutcome(row.attempt.providerReference);
    const applied = await this.applyStatus(
      row.attempt.id,
      row.enrollment,
      provider.paymentStatus,
      provider.raw,
    );
    return this.toDetailDto({ ...row, attempt: applied.attempt, enrollment: applied.enrollment });
  }

  /* --- internals ----------------------------------------------------------- */

  /** Open attempts, newest first — every one the verifier must check. */
  private async openAttempts(enrollmentId: string): Promise<PaymentAttempt[]> {
    return this.db
      .select()
      .from(paymentAttempts)
      .where(
        and(
          eq(paymentAttempts.enrollmentId, enrollmentId),
          or(eq(paymentAttempts.status, 'pending'), eq(paymentAttempts.status, 'processing')),
        ),
      )
      .orderBy(desc(paymentAttempts.createdAt));
  }

  private async latestAttempt(enrollmentId: string): Promise<PaymentAttempt | undefined> {
    const [attempt] = await this.db
      .select()
      .from(paymentAttempts)
      .where(eq(paymentAttempts.enrollmentId, enrollmentId))
      .orderBy(desc(paymentAttempts.createdAt))
      .limit(1);
    return attempt;
  }

  /**
   * Persist a provider verdict. Runs both writes in one transaction so the
   * attempt and its enrollment can never disagree, and grants `active` only
   * on an exact `success` for the locked amount.
   */
  private async applyStatus(
    attemptId: string,
    enrollment: Enrollment,
    providerStatus: string,
    raw: Record<string, unknown>,
  ): Promise<{ attempt: PaymentAttempt; enrollment: Enrollment }> {
    const normalized = providerStatus.toLowerCase();
    const [current] = await this.db
      .select()
      .from(paymentAttempts)
      .where(eq(paymentAttempts.id, attemptId))
      .limit(1);
    if (!current) throw new NotFoundException(`Payment attempt ${attemptId} not found`);

    /* Defense in depth: the provider re-checks amounts gateway-side, but if
       its status payload ever disagrees with our locked total, hold the
       enrollment in pending rather than granting on a mismatched payment. */
    const payloadAmount = typeof raw.payable_amount === 'number' ? raw.payable_amount : null;
    const amountMismatch = payloadAmount !== null && payloadAmount !== current.amount;

    let attemptStatus = this.toAttemptStatus(normalized);
    let enrollmentStatus: EnrollmentStatus =
      normalized === 'success' && !amountMismatch ? 'active' : this.toEnrollmentStatus(normalized);
    if (enrollment.status === 'active' && enrollmentStatus !== 'active') {
      /* A settled enrollment never steps back: late fail/cancel callbacks
         after a success update the attempt timeline only. */
      enrollmentStatus = 'active';
    }
    if (enrollment.status === 'active') {
      attemptStatus = normalized === 'success' ? 'success' : current.status;
    }

    const scrubbed = JSON.parse(
      JSON.stringify(raw).replace(/(bearer\s+)[^\s"']+/gi, '$1[redacted]'),
    ) as Record<string, unknown>;

    const [[attempt], [updatedEnrollment]] = await this.db.transaction(async (tx) => {
      const attemptRows = await tx
        .update(paymentAttempts)
        .set({
          status: attemptStatus,
          lastProviderPayload: scrubbed,
          ...(attemptStatus === 'success' ? { paidAt: new Date() } : {}),
        })
        .where(eq(paymentAttempts.id, attemptId))
        .returning();
      const enrollmentRows = await tx
        .update(enrollments)
        .set({ status: enrollmentStatus })
        .where(eq(enrollments.id, enrollment.id))
        .returning();
      return [attemptRows, enrollmentRows] as const;
    });
    return { attempt: attempt!, enrollment: updatedEnrollment! };
  }

  private toAttemptStatus(providerStatus: string): PaymentAttemptStatus {
    switch (providerStatus.toLowerCase()) {
      case 'success':
        return 'success';
      case 'processing':
        return 'processing';
      case 'failed':
        return 'failed';
      case 'cancelled':
      case 'canceled':
        return 'cancelled';
      case 'expired':
        return 'expired';
      default:
        return 'pending';
    }
  }

  private toEnrollmentStatus(providerStatus: string): EnrollmentStatus {
    switch (providerStatus.toLowerCase()) {
      case 'failed':
        return 'failed';
      case 'cancelled':
      case 'canceled':
        return 'cancelled';
      case 'expired':
        return 'expired';
      default:
        return 'pending_payment';
    }
  }

  private toInitDto(enrollment: Enrollment, attempt: PaymentAttempt): PaymentInitDto {
    return {
      enrollmentId: enrollment.id,
      attemptId: attempt.id,
      providerReference: attempt.providerReference ?? '',
      paymentUrl: this.provider.paymentPageUrl(attempt.providerReference ?? ''),
      amount: attempt.amount,
      currency: attempt.currency,
      status: attempt.status,
    };
  }

  private toStatusDto(
    enrollment: Enrollment,
    attempt: PaymentAttempt | undefined,
    providerStatus: string,
  ): PaymentStatusDto {
    return {
      enrollmentId: enrollment.id,
      enrollmentStatus: enrollment.status,
      attemptId: attempt?.id ?? '',
      attemptStatus: attempt?.status ?? 'pending',
      providerReference: attempt?.providerReference ?? null,
      amount: attempt?.amount ?? 0,
      currency: attempt?.currency ?? 'BDT',
      providerStatus,
      paidAt: attempt?.paidAt ? attempt.paidAt.toISOString() : null,
    };
  }

  /**
   * The enrollment owning a provider reference, for the calling learner
   * only. Unknown references and other learners' references are
   * indistinguishable: both 404, so references are not enumerable.
   */
  private async loadEnrollmentByReference(userId: string, reference: string): Promise<Enrollment> {
    const [row] = await this.db
      .select({ enrollment: enrollments })
      .from(paymentAttempts)
      .innerJoin(enrollments, eq(paymentAttempts.enrollmentId, enrollments.id))
      .where(and(eq(paymentAttempts.providerReference, reference), eq(enrollments.userId, userId)))
      .limit(1);
    if (!row) throw new NotFoundException(`Payment ${reference} not found`);
    return row.enrollment;
  }

  private async describe(enrollment: Enrollment): Promise<{ title: string; subtitle: string }> {
    const [course] = await this.db
      .select({ name: courses.name })
      .from(courses)
      .where(eq(courses.id, enrollment.courseId))
      .limit(1);
    let subtitle = '';
    if (enrollment.batchId) {
      const [batch] = await this.db
        .select()
        .from(batches)
        .where(eq(batches.id, enrollment.batchId))
        .limit(1);
      if (batch) subtitle = `Batch starting ${batch.startsOn}`;
    }
    return { title: course?.name ?? 'Course enrollment', subtitle };
  }

  private async loadByReference(reference: string): Promise<{
    attempt: PaymentAttempt;
    enrollment: Enrollment;
    user: User;
    courseName: string;
    batchStartsOn: string | null;
  }> {
    const [row] = await this.db
      .select({
        attempt: paymentAttempts,
        enrollment: enrollments,
        user: users,
        course: courses,
        batch: batches,
      })
      .from(paymentAttempts)
      .innerJoin(enrollments, eq(paymentAttempts.enrollmentId, enrollments.id))
      .innerJoin(users, eq(enrollments.userId, users.id))
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .leftJoin(batches, eq(enrollments.batchId, batches.id))
      .where(eq(paymentAttempts.providerReference, reference))
      .limit(1);
    if (!row) throw new NotFoundException(`Payment ${reference} not found`);
    return {
      attempt: row.attempt,
      enrollment: row.enrollment,
      user: row.user,
      courseName: row.course.name,
      batchStartsOn: row.batch?.startsOn ?? null,
    };
  }

  private toDetailDto(row: {
    attempt: PaymentAttempt;
    enrollment: Enrollment;
    user: User;
    courseName: string;
    batchStartsOn: string | null;
  }): AdminPaymentDetailDto {
    const education = [row.enrollment.educationLevel, row.enrollment.institution]
      .filter(Boolean)
      .join(' · ');
    const address = [row.enrollment.addressLine1, row.enrollment.addressLine2, row.enrollment.city]
      .filter(Boolean)
      .join(', ');
    return {
      attemptId: row.attempt.id,
      providerReference: row.attempt.providerReference,
      enrollmentId: row.enrollment.id,
      studentName:
        row.enrollment.fullName ||
        `${row.user.firstName ?? ''} ${row.user.lastName ?? ''}`.trim() ||
        row.user.email,
      studentEmail: row.user.email,
      courseName: row.courseName,
      batchStartsOn: row.batchStartsOn,
      amount: row.attempt.amount,
      currency: row.attempt.currency,
      status: row.attempt.status,
      enrollmentStatus: row.enrollment.status,
      paidAt: row.attempt.paidAt ? row.attempt.paidAt.toISOString() : null,
      lastProviderPayload: row.attempt.lastProviderPayload,
      phone: row.enrollment.phone,
      education: education || null,
      address: address || null,
    };
  }
}
