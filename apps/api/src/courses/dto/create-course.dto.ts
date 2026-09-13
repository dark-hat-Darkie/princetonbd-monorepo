import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { courseStatuses, deliveryModes, type CourseStatus, type DeliveryMode } from '@repo/db';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

import { SLUG_PATTERN } from '../../common/slug.js';

export class CreateCourseDto {
  /** URL segment under /test-prep/. Derived from `name` when omitted. */
  @ApiPropertyOptional({ example: 'sat', pattern: SLUG_PATTERN.source })
  @IsOptional()
  @IsString()
  @Matches(SLUG_PATTERN, { message: 'slug must be lower-case letters, digits and single hyphens' })
  @MaxLength(80)
  slug?: string;

  @ApiProperty({ example: 'SAT' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  /** One or two sentences; shown on cards and used as the default page intro. */
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  /** Public URL from the upload endpoint. Null clears it. */
  @ApiPropertyOptional({ nullable: true, type: String })
  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(1024)
  thumbnailUrl?: string | null;

  /** Whole taka. */
  @ApiProperty({ example: 45000 })
  @IsInt()
  @Min(0)
  priceAmount!: number;

  @ApiPropertyOptional({ example: 'per 10-week course' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  priceUnit?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(200, { each: true })
  feeIncludes?: string[];

  @ApiProperty({ enum: deliveryModes, enumName: 'DeliveryMode', isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(deliveryModes, { each: true })
  modes!: DeliveryMode[];

  @ApiPropertyOptional({ enum: courseStatuses, enumName: 'CourseStatus' })
  @IsOptional()
  @IsIn(courseStatuses)
  status?: CourseStatus;

  @ApiPropertyOptional({ nullable: true, type: Number })
  @IsOptional()
  @IsInt()
  @Min(0)
  durationWeeks?: number | null;

  @ApiPropertyOptional({ nullable: true, type: Number })
  @IsOptional()
  @IsInt()
  @Min(0)
  taughtHours?: number | null;

  @ApiPropertyOptional({ nullable: true, type: Number })
  @IsOptional()
  @IsInt()
  @Min(0)
  mockCount?: number | null;

  @ApiPropertyOptional({ nullable: true, type: String, example: 'Max 10' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  classSize?: string | null;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(300, { each: true })
  outcomes?: string[];

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
