import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import type { User } from '@repo/db';

/**
 * The counselor an admin assigned to a student, as the portal renders it.
 *
 * Null on the user when no counselor is assigned yet.
 */
export class CounselorDto {
  @ApiProperty({ example: 'Shafqat Rahman' })
  name!: string;

  @ApiPropertyOptional({ nullable: true, type: String })
  role!: string | null;

  @ApiPropertyOptional({ nullable: true, type: String, format: 'email' })
  email!: string | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  phone!: string | null;

  @ApiPropertyOptional({ nullable: true, type: String, format: 'date-time' })
  nextCheckIn!: string | null;

  static fromUser(user: User): CounselorDto | null {
    if (!user.counselorName) {
      return null;
    }
    return {
      name: user.counselorName,
      role: user.counselorRole,
      email: user.counselorEmail,
      phone: user.counselorPhone,
      nextCheckIn: user.counselorNextCheckIn?.toISOString() ?? null,
    };
  }
}

/**
 * Assign (or clear) a student's counselor.
 *
 * Every field is optional for partial edits; an explicit `null` name clears
 * the whole assignment. Other explicit nulls clear their own column.
 */
export class UpdateCounselorDto {
  @ApiPropertyOptional({ nullable: true, type: String, example: 'Shafqat Rahman' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  role?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String, format: 'email' })
  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  nextCheckIn?: string | null;
}
