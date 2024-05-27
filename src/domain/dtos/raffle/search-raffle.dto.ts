import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { QueryParamsDto } from '../shared';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchRaffleDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false, type: Boolean })
  @Transform(({ value }) => value === 'true')
  isFinished?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false, type: Boolean })
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false, type: Boolean })
  @Transform(({ value }) => value === 'true')
  isVisible?: boolean;
}
