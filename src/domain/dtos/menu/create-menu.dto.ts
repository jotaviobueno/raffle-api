import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ nullable: true, required: false })
  label?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  icon?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  href?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  parentId?: string;
}
