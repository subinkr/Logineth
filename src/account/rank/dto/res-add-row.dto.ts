import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResAddRow {
  @ApiProperty({ example: '추가했습니다.' })
  @IsString()
  message: string;
}
