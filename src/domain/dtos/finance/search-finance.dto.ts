import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchFinanceDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true })
  orderId?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true })
  customerId?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true })
  sellerId?: string;
}
