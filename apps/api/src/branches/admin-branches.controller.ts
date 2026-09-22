import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator.js';
import {
  ApiAdminErrors,
  ApiConflict,
  ApiNotFound,
  ApiValidationErrors,
} from '../common/http/api-errors.decorator.js';
import { BranchesService } from './branches.service.js';
import { BranchDto } from './dto/branch.dto.js';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { UpdateBranchDto } from './dto/update-branch.dto.js';

@ApiTags('admin: branches')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin/branches', version: '1' })
export class AdminBranchesController {
  constructor(private readonly branches: BranchesService) {}

  @Get()
  @ApiOperation({ operationId: 'adminListBranches', summary: 'List all branches' })
  @ApiOkResponse({ type: [BranchDto] })
  adminListBranches(): Promise<BranchDto[]> {
    return this.branches.adminList();
  }

  @Post()
  @ApiOperation({ operationId: 'adminCreateBranch', summary: 'Create a branch' })
  @ApiCreatedResponse({ type: BranchDto })
  @ApiValidationErrors()
  @ApiConflict('Slug already in use')
  adminCreateBranch(@Body() body: CreateBranchDto): Promise<BranchDto> {
    return this.branches.create(body);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'adminGetBranch', summary: 'Get a branch' })
  @ApiOkResponse({ type: BranchDto })
  @ApiNotFound('Branch')
  adminGetBranch(@Param('id', ParseUUIDPipe) id: string): Promise<BranchDto> {
    return this.branches.adminGet(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'adminUpdateBranch', summary: 'Update a branch' })
  @ApiOkResponse({ type: BranchDto })
  @ApiValidationErrors()
  @ApiNotFound('Branch')
  @ApiConflict('Slug already in use')
  adminUpdateBranch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBranchDto,
  ): Promise<BranchDto> {
    return this.branches.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ operationId: 'adminDeleteBranch', summary: 'Delete a branch' })
  @ApiNoContentResponse()
  @ApiNotFound('Branch')
  @ApiConflict('Branch is still referenced by a batch or teacher')
  adminDeleteBranch(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.branches.remove(id);
  }
}
