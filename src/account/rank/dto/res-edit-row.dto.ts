import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResEditRow {
  @ApiProperty({ example: '수정했습니다.' })
  @IsString()
  message: string;
}
