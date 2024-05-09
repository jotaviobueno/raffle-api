import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateThemeDto {
  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty()
  primary: string;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty()
  link: string;

  @IsHexColor()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  font?: string;

  sellerId: string;

  parent: Omit<CreateThemeDto, 'sellerId' | 'parent'>;
}
