import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { PUBLIC_ROLE_ENUM, USER_TYPE_ENUM } from 'src/common/enums';
import { IsCpfCnpj } from 'src/common/validators';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  password?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobilePhone: string;

  @IsEnum(USER_TYPE_ENUM)
  @IsOptional()
  @ApiProperty({ enum: USER_TYPE_ENUM })
  type?: USER_TYPE_ENUM;

  @IsCpfCnpj()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  document?: string;

  @IsEnum(PUBLIC_ROLE_ENUM)
  @IsNotEmpty()
  @ApiProperty({ enum: PUBLIC_ROLE_ENUM })
  code: keyof typeof PUBLIC_ROLE_ENUM;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  phone?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  incomeValue?: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  birthDate?: Date;
}
