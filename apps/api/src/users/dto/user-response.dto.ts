import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { User } from '@repo/db';

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

  @ApiProperty({ format: 'date-time' })
  createdAt!: string;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      workosId: user.workosId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePictureUrl: user.profilePictureUrl,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
