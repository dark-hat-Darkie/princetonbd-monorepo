import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { userRoles, type User, type UserRole } from '@repo/db';

import { CounselorDto } from './counselor.dto.js';

/**
 * Public shape of a user.
 *
 * Kept separate from the Drizzle row type on purpose: the table is free to
 * grow internal columns without silently widening the API surface, and this
 * class is what `@nestjs/swagger` turns into the OpenAPI schema that
 * `packages/api-client` is generated from.
 */
export class UserResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Identifier of this user in WorkOS.' })
  workosId!: string;

  @ApiProperty({ format: 'email' })
  email!: string;

  @ApiPropertyOptional({ nullable: true, type: String })
  firstName!: string | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  lastName!: string | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  profilePictureUrl!: string | null;

  /** Application role. Admins can open the CMS and call the admin endpoints. */
  @ApiProperty({ enum: userRoles, enumName: 'UserRole' })
  role!: UserRole;

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  /** The admin-assigned counselor, or null when none is assigned yet. */
  @ApiPropertyOptional({ type: CounselorDto, nullable: true })
  counselor!: CounselorDto | null;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      workosId: user.workosId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePictureUrl: user.profilePictureUrl,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      counselor: CounselorDto.fromUser(user),
    };
  }
}
