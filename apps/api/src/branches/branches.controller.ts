import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../common/decorators/public.decorator.js';
import { BranchesService } from './branches.service.js';
import { BranchDto } from './dto/branch.dto.js';

@ApiTags('branches')
@Public()
@Controller({ path: 'branches', version: '1' })
export class BranchesController {
  constructor(private readonly branches: BranchesService) {}

  @Get()
  @ApiOperation({ operationId: 'listBranches', summary: 'List active branches' })
  @ApiOkResponse({ type: [BranchDto] })
  listBranches(): Promise<BranchDto[]> {
    return this.branches.findActive();
  }
}
