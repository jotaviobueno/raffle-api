import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  @IsNotEmpty()
  roleId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
