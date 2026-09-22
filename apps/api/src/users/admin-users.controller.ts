import { Body, Controller, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator.js';
import {
  ApiAdminErrors,
  ApiNotFound,
  ApiValidationErrors,
} from '../common/http/api-errors.decorator.js';
import { UpdateCounselorDto } from './dto/counselor.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { UsersService } from './users.service.js';

@ApiTags('admin: users')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin/users', version: '1' })
export class AdminUsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @ApiOperation({ operationId: 'adminListUsers', summary: 'List all users' })
  @ApiOkResponse({ type: [UserResponseDto] })
  adminListUsers(): Promise<UserResponseDto[]> {
    return this.users.adminList();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'adminGetUser', summary: 'Get a user' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFound('User')
  adminGetUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    return this.users.adminGet(id);
  }

  @Patch(':id/counselor')
  @ApiOperation({ operationId: 'adminUpdateUserCounselor', summary: 'Assign the counselor' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiValidationErrors()
  @ApiNotFound('User')
  adminUpdateUserCounselor(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCounselorDto,
  ): Promise<UserResponseDto> {
    return this.users.updateCounselor(id, body);
  }
}
