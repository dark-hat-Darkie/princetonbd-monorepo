import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

import { SLUG_PATTERN } from '../../common/slug.js';

export class CreateTeacherDto {
  /** URL segment. Derived from `name` when omitted. */
  @ApiPropertyOptional({ example: 'farzana-haque', pattern: SLUG_PATTERN.source })
  @IsOptional()
  @IsString()
  @Matches(SLUG_PATTERN, { message: 'slug must be lower-case letters, digits and single hyphens' })
  @MaxLength(80)
  slug?: string;

  @ApiProperty({ example: 'Farzana Haque' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 'Lead Instructor, Quantitative' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  designation!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @ApiPropertyOptional({ nullable: true, type: String })
  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(1024)
  imageUrl?: string | null;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  branchId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
