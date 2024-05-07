import { SetMetadata } from '@nestjs/common';
import { PERMISSION_ENUM } from 'src/common/enums';

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permissions: PERMISSION_ENUM[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
