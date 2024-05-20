import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUtmCampaignDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, nullable: true })
  isActive?: boolean;
}
