import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { PUBLIC_ROLE_ENUM } from 'src/common/enums';
import { IsCpfCnpj } from 'src/common/validators';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsMobilePhone()
  @IsOptional()
  @ApiProperty()
  mobilePhone: string;

  @IsCpfCnpj()
  @IsOptional()
  @ApiProperty()
  document: string;

  @IsEnum(PUBLIC_ROLE_ENUM)
  @IsNotEmpty()
  @ApiProperty({ nullable: true, enum: PUBLIC_ROLE_ENUM })
  code: keyof typeof PUBLIC_ROLE_ENUM;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  phone?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;
}
