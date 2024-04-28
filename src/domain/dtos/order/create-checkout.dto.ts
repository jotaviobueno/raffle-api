import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCheckoutDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  cartId: string;

  @ApiProperty({ nullable: true, required: false })
  @IsCreditCard()
  @IsOptional()
  number?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  holder?: string;

  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  expirationMonth?: number;

  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  expirationYear?: number;

  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  cvv?: number;

  userAgent: string;

  ip: string;
}
