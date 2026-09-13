import { ApiProperty } from '@nestjs/swagger';

export class CourseCountsDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  published!: number;

  @ApiProperty()
  draft!: number;

  @ApiProperty()
  archived!: number;
}

export class AdminOverviewDto {
  @ApiProperty({ type: () => CourseCountsDto })
  courses!: CourseCountsDto;

  /** Batches not closed and not yet ended (Dhaka calendar). */
  @ApiProperty()
  upcomingBatches!: number;

  @ApiProperty()
  teachers!: number;

  @ApiProperty()
  branches!: number;

  @ApiProperty()
  testimonials!: number;
}
