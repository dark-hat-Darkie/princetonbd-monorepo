import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  batchStatuses,
  deliveryModes,
  weekdays,
  type BatchStatus,
  type DeliveryMode,
  type Weekday,
} from '@repo/db';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsISO8601,
  IsIn,
  IsInt,
  IsOptional,
  IsUUID,
  Matches,
  Min,
} from 'class-validator';

import { HHMM_PATTERN, ISO_DATE_PATTERN } from '../../common/dhaka-date.js';

export class CreateBatchDto {
  @ApiProperty({ enum: deliveryModes, enumName: 'DeliveryMode' })
  @IsIn(deliveryModes)
  mode!: DeliveryMode;

  /** Required for a classroom batch, must be empty for a live-online one. */
  @ApiPropertyOptional({ nullable: true, type: String, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  branchId?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  teacherId?: string | null;

  /** Dhaka calendar day, YYYY-MM-DD. */
  @ApiProperty({ example: '2026-10-12' })
  @Matches(ISO_DATE_PATTERN, { message: 'startsOn must be YYYY-MM-DD' })
  @IsISO8601({ strict: true }, { message: 'startsOn must be a real date' })
  startsOn!: string;

  @ApiProperty({ example: '2026-12-18' })
  @Matches(ISO_DATE_PATTERN, { message: 'endsOn must be YYYY-MM-DD' })
  @IsISO8601({ strict: true }, { message: 'endsOn must be a real date' })
  endsOn!: string;

  @ApiProperty({ enum: weekdays, enumName: 'Weekday', isArray: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'Pick at least one day of the week' })
  @ArrayUnique()
  @IsIn(weekdays, { each: true })
  days!: Weekday[];

  /** Dhaka wall-clock time, HH:MM (24-hour). */
  @ApiProperty({ example: '18:30' })
  @Matches(HHMM_PATTERN, { message: 'startTime must be HH:MM' })
  startTime!: string;

  @ApiProperty({ example: '20:30' })
  @Matches(HHMM_PATTERN, { message: 'endTime must be HH:MM' })
  endTime!: string;

  @ApiPropertyOptional({ enum: batchStatuses, enumName: 'BatchStatus' })
  @IsOptional()
  @IsIn(batchStatuses)
  status?: BatchStatus;

  @ApiPropertyOptional({ nullable: true, type: Number })
  @IsOptional()
  @IsInt()
  @Min(0)
  seatsLeft?: number | null;

  /** Whole taka; overrides the course price for this run. Null means the course price. */
  @ApiPropertyOptional({ nullable: true, type: Number })
  @IsOptional()
  @IsInt()
  @Min(0)
  feeAmount?: number | null;
}
