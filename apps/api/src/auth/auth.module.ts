import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module.js';
import { WorkosAuthGuard } from './workos-auth.guard.js';
import { WorkosService } from './workos.service.js';

@Module({
  imports: [UsersModule],
  providers: [WorkosService, WorkosAuthGuard],
  exports: [WorkosService, WorkosAuthGuard],
})
export class AuthModule {}
