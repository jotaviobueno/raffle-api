import { Global, Module, forwardRef } from '@nestjs/common';
import { RoleGuard } from './guards';
import { UserModule } from '../user/user.module';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repository/role.repository';
import { UserRoleController } from './controllers/user-role.controller';
import { UserRoleRepository } from './repository/user-role.repository';
import { UserRoleService } from './services/user-role.service';

@Global()
@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [RoleController, UserRoleController],
  providers: [
    RoleGuard,
    RoleService,
    RoleRepository,
    UserRoleRepository,
    UserRoleService,
  ],
  exports: [RoleGuard, RoleService, UserRoleService],
})
export class RoleModule {}
