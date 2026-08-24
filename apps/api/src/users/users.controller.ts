import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { User } from '@repo/db';

import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@ApiBearerAuth('workos')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly users: UsersService) {}

  /** Returns the profile of the authenticated caller. */
  @Get('me')
  @ApiOperation({ operationId: 'getCurrentUser', summary: 'Get the authenticated user' })
  @ApiOkResponse({ type: UserResponseDto })
  getCurrentUser(@CurrentUser() user: User): UserResponseDto {
    return UserResponseDto.fromEntity(user);
  }

  /** Returns a single user by internal id. */
  @Get(':id')
  @ApiOperation({ operationId: 'getUserById', summary: 'Get a user by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    const user = await this.users.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return UserResponseDto.fromEntity(user);
  }
}
