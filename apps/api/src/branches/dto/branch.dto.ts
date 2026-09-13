import { ApiProperty } from '@nestjs/swagger';
import type { Branch } from '@repo/db';

export class BranchDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'dhaka-gulshan' })
  slug!: string;

  @ApiProperty({ example: 'Dhaka — Gulshan' })
  name!: string;

  @ApiProperty({
    nullable: true,
    type: String,
    example: 'House 00, Road 00, Gulshan-2, Dhaka 1212',
  })
  address!: string | null;

  @ApiProperty({ nullable: true, type: String, example: '+880 1700-000000' })
  phone!: string | null;

  /** Inactive branches are hidden from public lists but keep their history. */
  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  sortOrder!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: string;

  static fromEntity(row: Branch): BranchDto {
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      address: row.address,
      phone: row.phone,
      isActive: row.isActive,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}
