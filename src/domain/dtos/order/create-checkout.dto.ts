import { ApiProperty } from '@nestjs/swagger';
import {
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

  @ApiProperty({ nullable: true })
  // @IsCreditCard()
  @IsString()
  @IsOptional()
  number?: string;

  @ApiProperty({ nullable: true })
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
}
