import { ApiProperty } from '@nestjs/swagger';
import { enrollmentStatuses, type Enrollment, type EnrollmentStatus } from '@repo/db';

/** An enrollment with its server-computed fee. No payment credentials. */
export class EnrollmentDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  courseId!: string;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  batchId!: string | null;

  @ApiProperty({ enum: enrollmentStatuses, enumName: 'EnrollmentStatus' })
  status!: EnrollmentStatus;

  /** Whole taka, from the course or its batch override. */
  @ApiProperty({ example: 8500 })
  feeAmount!: number;

  @ApiProperty({ example: 'BDT' })
  feeCurrency!: string;

  @ApiProperty()
  fullName!: string;

  @ApiProperty({ nullable: true, type: String })
  dateOfBirth!: string | null;

  @ApiProperty({ nullable: true, type: String })
  phone!: string | null;

  @ApiProperty({ nullable: true, type: String })
  educationLevel!: string | null;

  @ApiProperty({ nullable: true, type: String })
  institution!: string | null;

  @ApiProperty({ nullable: true, type: Number })
  graduationYear!: number | null;

  @ApiProperty({ nullable: true, type: String })
  addressLine1!: string | null;

  @ApiProperty({ nullable: true, type: String })
  addressLine2!: string | null;

  @ApiProperty({ nullable: true, type: String })
  city!: string | null;

  @ApiProperty({ nullable: true, type: String })
  notes!: string | null;

  static fromEntity(row: Enrollment, fee: { amount: number; currency: string }): EnrollmentDto {
    return {
      id: row.id,
      courseId: row.courseId,
      batchId: row.batchId,
      status: row.status,
      feeAmount: fee.amount,
      feeCurrency: fee.currency,
      fullName: row.fullName,
      dateOfBirth: row.dateOfBirth,
      phone: row.phone,
      educationLevel: row.educationLevel,
      institution: row.institution,
      graduationYear: row.graduationYear,
      addressLine1: row.addressLine1,
      addressLine2: row.addressLine2,
      city: row.city,
      notes: row.notes,
    };
  }
}
