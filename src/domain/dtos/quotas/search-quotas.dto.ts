import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchQuotasDto extends QueryParamsDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true })
  raffleId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true })
  customerId?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  number?: number;
}
