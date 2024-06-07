import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  fee?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  instructions: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ nullable: true, required: false })
  isActive?: boolean;

  @IsUUID()
  @IsNotEmpty()
  gatewayId: string;
}
