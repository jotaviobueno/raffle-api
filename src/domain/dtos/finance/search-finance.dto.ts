import { IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchFinanceDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true })
  orderId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true })
  customerId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true })
  sellerId?: string;
}
