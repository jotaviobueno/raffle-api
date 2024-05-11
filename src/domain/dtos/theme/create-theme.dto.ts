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

  @ApiProperty({ nullable: true, required: false })
  @IsHexColor()
  @IsOptional()
  background?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsHexColor()
  @IsOptional()
  foreground?: string;

  sellerId: string;

  parent: Omit<CreateThemeDto, 'sellerId' | 'parent'>;
}
