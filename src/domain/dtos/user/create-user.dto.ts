import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { PUBLIC_ROLE_ENUM, ROLE_ENUM, USER_TYPE_ENUM } from 'src/common/enums';
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

  @ValidateIf((dto) => dto.code === ROLE_ENUM.USER)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  password?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobilePhone: string;

  @IsEnum(USER_TYPE_ENUM)
  @IsNotEmpty()
  @ApiProperty({ enum: USER_TYPE_ENUM })
  type: USER_TYPE_ENUM;

  @IsCpfCnpj()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  document?: string;

  @IsEnum(PUBLIC_ROLE_ENUM)
  @IsNotEmpty()
  @ApiProperty({ enum: PUBLIC_ROLE_ENUM })
  code: PUBLIC_ROLE_ENUM;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  phone?: string;

  @ValidateIf((dto) => dto.code === ROLE_ENUM.CUSTOMER)
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  incomeValue: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  @Transform(({ value }) => new Date(value))
  birthDate: Date;
}
