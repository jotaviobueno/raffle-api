import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, nullable: true, required: false })
  tax?: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  planCycleId: string;
}
