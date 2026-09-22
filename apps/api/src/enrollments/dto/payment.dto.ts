import { ApiProperty } from '@nestjs/swagger';
import { paymentAttemptStatuses, type PaymentAttemptStatus } from '@repo/db';

/** What the browser needs to hand off to the provider's hosted checkout. */
export class PaymentInitDto {
  @ApiProperty({ format: 'uuid' })
  enrollmentId!: string;

  @ApiProperty({ format: 'uuid' })
  attemptId!: string;

  @ApiProperty({ example: 'PAY-AB12CD34EF56GH78' })
  providerReference!: string;

  @ApiProperty({
    example: 'https://payments.example.com/api/payment?reference=PAY-AB12CD34EF56GH78',
  })
  paymentUrl!: string;

  @ApiProperty({ example: 8500 })
  amount!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;

  @ApiProperty({ enum: paymentAttemptStatuses, enumName: 'PaymentAttemptStatus' })
  status!: PaymentAttemptStatus;
}

/** Verified enrollment + attempt state. The success page renders from this, never the URL. */
export class PaymentStatusDto {
  @ApiProperty({ format: 'uuid' })
  enrollmentId!: string;

  @ApiProperty({ example: 'pending_payment' })
  enrollmentStatus!: string;

  @ApiProperty({ format: 'uuid' })
  attemptId!: string;

  @ApiProperty({ enum: paymentAttemptStatuses, enumName: 'PaymentAttemptStatus' })
  attemptStatus!: PaymentAttemptStatus;

  @ApiProperty({ example: 'PAY-AB12CD34EF56GH78', nullable: true, type: String })
  providerReference!: string | null;

  @ApiProperty({ example: 8500 })
  amount!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;

  /** The provider's own status word, for the admin timeline. */
  @ApiProperty({ example: 'success' })
  providerStatus!: string;

  /** When our side recorded settlement. Null until an attempt verifies. */
  @ApiProperty({ nullable: true, type: String, format: 'date-time' })
  paidAt!: string | null;
}
