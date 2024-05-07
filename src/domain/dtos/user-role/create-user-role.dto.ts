import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  roleId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
