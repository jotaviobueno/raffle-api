import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchOrderDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;
}
