import { IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchCustomerSellerDto extends QueryParamsDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;
}
