import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import { SLUG_PATTERN } from '../../common/slug.js';

export class CreateBranchDto {
  /** URL segment. Derived from `name` when omitted. */
  @ApiPropertyOptional({ example: 'dhaka-gulshan', pattern: SLUG_PATTERN.source })
  @IsOptional()
  @IsString()
  @Matches(SLUG_PATTERN, { message: 'slug must be lower-case letters, digits and single hyphens' })
  @MaxLength(80)
  slug?: string;

  @ApiProperty({ example: 'Dhaka — Gulshan' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiPropertyOptional({
    nullable: true,
    type: String,
    example: 'House 00, Road 00, Gulshan-2, Dhaka 1212',
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String, example: '+880 1700-000000' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
