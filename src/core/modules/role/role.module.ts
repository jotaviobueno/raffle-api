import { Global, Module } from '@nestjs/common';
import { RoleGuard } from './guards';
import { UserModule } from '../user/user.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';
import { UserRoleController } from './controllers/user-role.controller';
import { GatewayModule } from '../gateway/gateway.module';
import { TerminusModule } from '@nestjs/terminus';

@Global()
@Module({
  imports: [UserModule, GatewayModule, TerminusModule],
  controllers: [RoleController, UserRoleController],
  providers: [RoleGuard, RoleService, RoleRepository],
  exports: [RoleGuard, RoleService],
})
export class RoleModule {}
