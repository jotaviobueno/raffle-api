import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AUTH_TYPE_ENUM } from 'src/common/enums';

export class CreateAuthDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false, nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  password?: string;

  @IsMobilePhone()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  mobilePhone?: string;

  @IsEnum(AUTH_TYPE_ENUM)
  @IsNotEmpty()
  @ApiProperty({ enum: AUTH_TYPE_ENUM })
  type: AUTH_TYPE_ENUM;
}
