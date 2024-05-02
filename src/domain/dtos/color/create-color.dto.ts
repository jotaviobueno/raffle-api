import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty()
  primary: string;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty()
  secundary: string;

  sellerId: string;

  parent: Omit<CreateColorDto, 'sellerId' | 'parent'>;
}
