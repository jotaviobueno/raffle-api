import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchQuotasDto extends QueryParamsDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  raffleId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  customerId?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  number?: number;
}
