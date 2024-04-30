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
} from 'class-validator';
import { PUBLIC_ROLE_ENUM } from 'src/common/enums';
import { IsCpfCnpj } from 'src/common/validators';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  password?: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsCpfCnpj()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  document?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ nullable: true, type: Date })
  birthDate?: Date;

  @IsEnum(PUBLIC_ROLE_ENUM)
  @IsNotEmpty()
  @ApiProperty({ nullable: true, enum: PUBLIC_ROLE_ENUM })
  code: keyof typeof PUBLIC_ROLE_ENUM;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;
}
