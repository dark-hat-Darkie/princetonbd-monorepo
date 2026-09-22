import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateEnrollmentDto {
  /** A published course. The fee comes from this row, never the request. */
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  courseId!: string;

  /** An open batch of that course. Fee overrides the course price when set. */
  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  batchId?: string | null;
}
