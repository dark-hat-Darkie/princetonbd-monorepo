import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { enrollmentStatuses, paymentAttemptStatuses } from '@repo/db';

export class AdminPaymentListQuery {
  @ApiPropertyOptional({ enum: paymentAttemptStatuses, enumName: 'PaymentAttemptStatus' })
  @IsOptional()
  @IsIn(paymentAttemptStatuses)
  status?: string;

  /** Matches provider reference, student name, or enrollment id. */
  @ApiPropertyOptional({ example: 'PAY-AB12' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  perPage?: number;
}

export class AdminPaymentListItemDto {
  @ApiProperty({ format: 'uuid' })
  attemptId!: string;

  @ApiProperty({ example: 'PAY-AB12CD34EF56GH78', nullable: true, type: String })
  providerReference!: string | null;

  @ApiProperty({ format: 'uuid' })
  enrollmentId!: string;

  @ApiProperty()
  studentName!: string;

  @ApiProperty()
  studentEmail!: string;

  @ApiProperty()
  courseName!: string;

  @ApiProperty({ nullable: true, type: String })
  batchStartsOn!: string | null;

  @ApiProperty({ example: 8500 })
  amount!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;

  @ApiProperty({ enum: paymentAttemptStatuses, enumName: 'PaymentAttemptStatus' })
  status!: string;

  @ApiProperty({ enum: enrollmentStatuses, enumName: 'EnrollmentStatus' })
  enrollmentStatus!: string;
}

export class AdminPaymentListDto {
  @ApiProperty({ type: [AdminPaymentListItemDto] })
  data!: AdminPaymentListItemDto[];

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  perPage!: number;

  @ApiProperty({ example: 42 })
  total!: number;
}

export class AdminPaymentDetailDto extends AdminPaymentListItemDto {
  @ApiProperty({ nullable: true, type: String })
  paidAt!: string | null;

  @ApiProperty({ type: Object, nullable: true })
  lastProviderPayload!: Record<string, unknown> | null;

  @ApiProperty({ nullable: true, type: String })
  phone!: string | null;

  @ApiProperty({ nullable: true, type: String })
  education!: string | null;

  @ApiProperty({ nullable: true, type: String })
  address!: string | null;
}
