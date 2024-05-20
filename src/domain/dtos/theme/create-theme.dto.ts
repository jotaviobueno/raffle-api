import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateThemeDto {
  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  primary: string;

  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  secondary: string;

  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  tertiary: string;

  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  quaternary: string;

  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  quinary: string;

  @ApiProperty()
  @IsHexColor()
  @IsNotEmpty()
  senary: string;

  sellerId: string;

  parent: Omit<CreateThemeDto, 'sellerId' | 'parent'>;
}
