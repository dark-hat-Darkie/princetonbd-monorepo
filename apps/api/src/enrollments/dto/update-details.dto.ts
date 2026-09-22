import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * The applicant snapshot stored on the enrollment. Every field is optional
 * except the name: a learner can start checkout with just a course and fill
 * the rest in before paying. The payment step requires the name at minimum;
 * required-ness beyond that is a product call, enforced here in one place.
 */
export class UpdateEnrollmentDetailsDto {
  @ApiPropertyOptional({ example: 'Ayesha Rahman' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters' })
  @MaxLength(120)
  fullName?: string;

  /** Dhaka calendar day, YYYY-MM-DD. Must be a past date. */
  @ApiPropertyOptional({ example: '2004-03-18' })
  @IsOptional()
  @Matches(ISO_DATE_PATTERN, { message: 'dateOfBirth must be YYYY-MM-DD' })
  @IsISO8601({ strict: true }, { message: 'dateOfBirth must be a real date' })
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: '01712345678' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string;

  @ApiPropertyOptional({ example: 'HSC' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  educationLevel?: string;

  @ApiPropertyOptional({ example: 'Dhaka College' })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  institution?: string;

  @ApiPropertyOptional({ example: 2024 })
  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(2100)
  graduationYear?: number;

  @ApiPropertyOptional({ example: 'House 12, Road 5, Dhanmondi' })
  @IsOptional()
  @IsString()
  @MaxLength(240)
  addressLine1?: string;

  @ApiPropertyOptional({ example: 'Apartment 3B' })
  @IsOptional()
  @IsString()
  @MaxLength(240)
  addressLine2?: string;

  @ApiPropertyOptional({ example: 'Dhaka' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @ApiPropertyOptional({ example: 'Prefers weekend batches' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
