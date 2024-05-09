import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTicketDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: true })
  customerId?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ nullable: true, required: true })
  email?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
