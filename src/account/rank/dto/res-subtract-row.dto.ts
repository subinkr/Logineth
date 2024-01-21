import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResSubtractRow {
  @ApiProperty({ example: '삭제했습니다.' })
  @IsString()
  message: string;
}
