import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  instructions: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ nullable: true })
  isActive?: boolean;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true })
  paymentGatewayConfigId?: string;
}
