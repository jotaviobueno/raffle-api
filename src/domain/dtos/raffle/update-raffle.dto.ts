import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRaffleDto } from './create-raffle.dto';
import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRaffleDto extends PartialType(
  OmitType(CreateRaffleDto, ['sellerId']),
) {
  id: string;

  @ApiProperty({ type: [Number], nullable: true, required: false })
  @IsInt({ each: true })
  @IsOptional()
  quantity?: number[];
}
