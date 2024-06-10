import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  roleId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  expiresAt?: Date;
}
