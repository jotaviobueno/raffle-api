import { IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchCartDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  customerId?: string;
}
