import { ROLE_ENUM } from 'src/common/enums';

export class UserCreateEventDto {
  code: keyof typeof ROLE_ENUM;
  userId: string;
}
