import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  primary: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  secundary: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  sellerId: string;

  parent: Omit<CreateColorDto, 'sellerId' | 'parent'>;
}
