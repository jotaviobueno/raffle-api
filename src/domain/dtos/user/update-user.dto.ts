import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['code']),
) {
  id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar?: string;
}
