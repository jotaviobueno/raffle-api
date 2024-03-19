import { SetMetadata } from '@nestjs/common';
import { ROLE_ENUM } from 'src/common/enums';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: ROLE_ENUM[]) => SetMetadata(ROLE_KEY, roles);
