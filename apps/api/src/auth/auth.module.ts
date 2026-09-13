import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module.js';
import { RolesGuard } from './roles.guard.js';
import { WorkosAuthGuard } from './workos-auth.guard.js';
import { WorkosService } from './workos.service.js';

@Module({
  imports: [UsersModule],
  providers: [WorkosService, WorkosAuthGuard, RolesGuard],
  exports: [WorkosService, WorkosAuthGuard, RolesGuard],
})
export class AuthModule {}
