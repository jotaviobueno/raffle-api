import { ApiProperty } from '@nestjs/swagger';
import { ThemeEntity } from './theme.entity';

export class ThemeWithRelationsEntity extends ThemeEntity {
  @ApiProperty({ type: ThemeEntity })
  secondaryTheme: ThemeEntity;
}
