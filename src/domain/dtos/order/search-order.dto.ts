import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchOrderDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  orderStatusId?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  customer?: string;
}
